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
    const currencies = ['PLN', 'USD', 'EUR', 'GBP']
    const baseCurrency = 'PLN' // Using PLN as base currency
    
    // Fetch latest rates from exchangerate-api.com
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${Deno.env.get('EXCHANGE_RATE_API_KEY')}/latest/${baseCurrency}`)
    const data = await response.json()
    
    if (!data.conversion_rates) {
      throw new Error('Failed to fetch exchange rates')
    }

    const today = new Date().toISOString().split('T')[0]
    
    // Store rates in Supabase
    for (const targetCurrency of currencies) {
      if (targetCurrency === baseCurrency) continue
      
      const rate = data.conversion_rates[targetCurrency]
      
      await supabase
        .from('exchange_rates')
        .upsert({
          base_currency: baseCurrency,
          target_currency: targetCurrency,
          rate,
          date: today
        }, {
          onConflict: 'base_currency,target_currency,date'
        })
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})