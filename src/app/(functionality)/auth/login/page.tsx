"use client";
import { useRouter } from "next/navigation";
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
import Cookies from "js-cookie";

// Schema
const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string(),
});

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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
        description: "Account not found, please sign up",
        variant: "destructive",
      });
      return;
    }

    if (userLoginData?.token) {
      Cookies.set("auth-token", userLoginData.token, { expires: 1 });

      toast({
        title: "Success",
        description: "You have logged in successfully!",
      });

      router.push(
        userLoginData.user.isAdmin ? "/admin/dashboard" : "/dashboard"
      );
    }
  }, [userLoginData, userLoginError, router]);

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/5 backdrop-blur-2xl shadow-2xl px-8 py-12">
        <h1 className="text-4xl font-extrabold text-center text-white mb-10">
          LOGIN
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="h-11 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
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
                  <FormLabel className="text-white text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="h-11 bg-white/5 border-white/20 text-white placeholder:text-gray-400 pr-16"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-sm text-white hover:opacity-80"
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
              disabled={!!userLoginLoading}
              className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white text-base font-semibold"
            >
              {userLoginLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <p className="mt-10 text-center text-sm text-white">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold underline underline-offset-4"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
