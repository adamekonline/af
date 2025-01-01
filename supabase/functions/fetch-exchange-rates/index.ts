import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Create a Supabase client with the service role key
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseKey)

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting exchange rate fetch...');
    const currencies = ['PLN', 'USD', 'EUR', 'GBP']
    const today = new Date().toISOString().split('T')[0]
    
    // Fetch latest rates for each currency pair
    for (const baseCurrency of currencies) {
      console.log(`Fetching rates for base currency: ${baseCurrency}`);
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${Deno.env.get('EXCHANGE_RATE_API_KEY')}/latest/${baseCurrency}`
      )
      
      if (!response.ok) {
        throw new Error(`Failed to fetch rates for ${baseCurrency}: ${response.statusText}`);
      }
      
      const data = await response.json()
      
      if (!data.conversion_rates) {
        throw new Error(`No conversion rates found for ${baseCurrency}`);
      }

      console.log(`Successfully fetched rates for ${baseCurrency}`);
      
      // Store rates for each currency pair
      for (const targetCurrency of currencies) {
        if (targetCurrency === baseCurrency) continue
        
        const rate = data.conversion_rates[targetCurrency]
        console.log(`Storing rate: 1 ${baseCurrency} = ${rate} ${targetCurrency}`);
        
        const { error } = await supabase
          .from('exchange_rates')
          .upsert({
            base_currency: baseCurrency,
            target_currency: targetCurrency,
            rate,
            date: today
          }, {
            onConflict: 'base_currency,target_currency,date'
          })

        if (error) {
          console.error(`Error storing rate for ${baseCurrency}/${targetCurrency}:`, error);
          throw error;
        }
      }
    }

    console.log('Exchange rates update completed successfully');
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error updating exchange rates:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})