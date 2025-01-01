import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Login = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9b87f5]/10 to-[#D6BCFA]/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#8B5CF6] bg-clip-text text-transparent">
            AF
          </h1>
        </div>
        
        <Card className="w-full backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#9b87f5',
                      brandAccent: '#8B5CF6',
                      inputBackground: 'transparent',
                      inputText: 'inherit',
                      inputBorder: 'hsl(var(--border))',
                      inputBorderFocus: '#9b87f5',
                      inputBorderHover: '#8B5CF6',
                    },
                    space: {
                      inputPadding: '0.75rem',
                      buttonPadding: '0.75rem',
                    },
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '0.5rem',
                      buttonBorderRadius: '0.5rem',
                      inputBorderRadius: '0.5rem',
                    },
                  },
                },
                className: {
                  container: 'space-y-4',
                  button: 'w-full bg-gradient-to-r from-[#9b87f5] to-[#8B5CF6] text-white hover:opacity-90 transition-opacity duration-200',
                  input: 'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b87f5] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                  label: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                  loader: 'border-[#9b87f5]',
                },
              }}
              providers={[]}
              theme="light"
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email',
                    password_label: 'Password',
                    button_label: 'Sign In',
                    loading_button_label: 'Signing in...',
                    social_provider_text: 'Sign in with {{provider}}',
                    link_text: "Don't have an account? Sign up",
                  },
                },
              }}
              redirectTo={window.location.origin}
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={setRememberMe}
                className="data-[state=checked]:bg-[#9b87f5]"
              />
              <Label htmlFor="remember-me" className="text-sm text-muted-foreground">
                Remember me
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;