"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import useFetch from "@/hooks/use-fetch";
import { userLogin } from "@/actions/user-actions";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string(),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    data: userLoginData,
    loading: userLoginLoading,
    error: userLoginError,
    fn: userLoginFn,
  } = useFetch(userLogin);

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    await userLoginFn(values);
  };

  useEffect(() => {
    if (userLoginError) {
      toast({
        title: "Error",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (userLoginData?.user) {
      setIsRedirecting(true);

      toast({
        title: "Success",
        description: "You have logged in successfully!",
      });

      // Use window.location.href for hard refresh - this ensures middleware reads the cookie
      setTimeout(() => {
        const redirectUrl = userLoginData.user.isAdmin
          ? "/admin/dashboard"
          : "/dashboard";
        window.location.href = redirectUrl;
      }, 1000);
    }
  }, [userLoginData, userLoginError]);

  const isLoading = userLoginLoading || isRedirecting;

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/5 backdrop-blur-2xl shadow-2xl px-8 py-12 relative">
        {/* Loading Overlay */}
        {isRedirecting && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-50">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-white mx-auto mb-4" />
              <p className="text-white text-lg font-medium">
                Redirecting to dashboard...
              </p>
            </div>
          </div>
        )}

        <h1 className="text-4xl font-extrabold text-center text-white mb-2">
          LOGIN
        </h1>

        <p className="text-center text-sm text-gray-300 mb-8">
          All OPJU students must register using their college mail ID
        </p>

        <div className="mb-8 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-300">
          <p className="mb-2 font-semibold text-white">Demo credentials</p>
          <p>Admin: admin@example.com / 1234</p>
          <p>User: user@example.com / 1234</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="h-11 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-sky-500 transition-colors"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="h-11 bg-white/5 border-white/20 text-white placeholder:text-gray-400 pr-16 focus:border-sky-500 transition-colors"
                        disabled={isLoading}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-sm text-white hover:opacity-80 disabled:opacity-50"
                        disabled={isLoading}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </FormControl>

                  <div className="mt-3 text-right">
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-white hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white text-base font-semibold disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {userLoginLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>

        <p className="mt-10 text-center text-sm text-white">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold underline underline-offset-4 hover:text-sky-400 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
