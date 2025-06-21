import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import PageTransition from "../components/animations/PageTransition";
import TranslateText from "../components/TranslateText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formSchema } from "../lib/validations/login";

const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    
    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { register, handleSubmit, formState: { errors } } = form;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setServerError(null);
        try {
            if (isRegistering) {
                await signUp(data.email, data.password);
                toast({ title: "Registration Successful", description: "Please sign in to continue." });
                setIsRegistering(false);
            } else {
                await signIn(data.email, data.password);
                toast({ title: "Signed in successfully", description: "Welcome back!" });
                navigate("/");
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
            setServerError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageTransition>
            <div className="flex items-center justify-center min-h-screen bg-background p-4">
                <motion.div 
                    className="w-full max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="glass-card p-8 rounded-2xl shadow-lg">
                        <h1 className="text-3xl font-bold text-center mb-2">
                            <TranslateText text={isRegistering ? "Create Account" : "Welcome Back"} />
                        </h1>
                        <p className="text-center text-muted-foreground mb-8">
                            <TranslateText text="Enter your credentials to continue" />
                        </p>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    {...register("email")}
                                    type="email"
                                    placeholder="you@example.com"
                                    className={`pl-10 h-12 ${errors.email ? 'border-destructive' : ''}`}
                                    aria-invalid={!!errors.email}
                                />
                            </div>
                            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={`pl-10 h-12 ${errors.password ? 'border-destructive' : ''}`}
                                    aria-invalid={!!errors.password}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}

                            {serverError && <p className="text-sm text-destructive text-center">{serverError}</p>}

                            <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    <TranslateText text={isRegistering ? "Sign Up" : "Sign In"} />
                                )}
                            </Button>
                        </form>

                        <p className="text-center text-sm text-muted-foreground mt-6">
                            <TranslateText text={isRegistering ? "Already have an account?" : "Don't have an account?"} />
                            <button 
                                className="font-semibold text-primary hover:underline ml-1"
                                onClick={() => {
                                    setIsRegistering(!isRegistering);
                                    form.reset();
                                    setServerError(null);
                                }}
                            >
                                <TranslateText text={isRegistering ? "Sign In" : "Create one"} />
                            </button>
                        </p>
                    </div>
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default Login;
