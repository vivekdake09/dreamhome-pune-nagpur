
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/supabaseClient';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [setupError, setSetupError] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Check if we're using placeholder Supabase credentials
      if (import.meta.env.VITE_SUPABASE_URL === undefined || 
          import.meta.env.VITE_SUPABASE_URL.includes('your-project-url')) {
        setSetupError(true);
        setIsLoading(false);
        return;
      }
      
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account",
      });
      
      navigate('/login');
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-gradient-to-br from-realestate-600 to-realestate-800">
      {/* Decorative background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-10"
        style={{ 
          backgroundImage: "url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1920&auto=format&fit=crop)",
          filter: 'blur(8px)'
        }}
      />
      
      {/* Back button */}
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute top-4 left-4 z-10 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20" 
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="h-4 w-4 text-white" />
      </Button>

      <Card className="w-full max-w-md relative z-10 bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Create an Account</CardTitle>
          <CardDescription className="text-gray-200">
            Enter your details to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {setupError && (
            <Alert variant="destructive" className="mb-6 bg-red-500/10 text-white border-red-500/20">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Configuration Error</AlertTitle>
              <AlertDescription>
                Supabase is not properly configured. Please set up valid credentials.
              </AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your.email@example.com" 
                        {...field}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="********" 
                        {...field}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Confirm Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="********" 
                        {...field}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2">
                <Button 
                  type="submit" 
                  className="w-full bg-white text-realestate-700 hover:bg-white/90" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing Up..." : "Sign Up"}
                </Button>
                <div className="text-center mt-2">
                  <p className="text-gray-300">
                    Already have an account?{" "}
                    <Button variant="link" className="p-0 text-white hover:text-white/80" onClick={() => navigate('/login')}>
                      Login
                    </Button>
                  </p>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
