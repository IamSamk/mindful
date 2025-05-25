import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { toast } from '../components/ui/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Get the URL parameters
        const params = new URLSearchParams(window.location.search);
        const error = params.get('error');
        const errorDescription = params.get('error_description');

        if (error) {
          // If there's an error, show it to the user
          toast({
            title: "Verification Error",
            description: errorDescription || "Failed to verify email. Please try again or request a new verification link.",
            variant: "destructive"
          });
          navigate('/login');
          return;
        }

        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        if (session) {
          toast({
            title: "Email Verified",
            description: "Your email has been verified successfully. You can now sign in.",
          });
        }

        // Redirect to login page
        navigate('/login');
      } catch (error) {
        console.error('Error in email confirmation:', error);
        toast({
          title: "Verification Error",
          description: "An error occurred during email verification. Please try again.",
          variant: "destructive"
        });
        navigate('/login');
      }
    };

    handleEmailConfirmation();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Verifying your email...</h2>
        <p className="text-muted-foreground">Please wait while we confirm your email address.</p>
      </div>
    </div>
  );
};

export default AuthCallback; 