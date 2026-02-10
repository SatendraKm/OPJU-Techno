"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { userSignup } from "@/actions/user-actions";

const formSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "Full name must be at least 2 characters.",
    }),
    email: z.string().email(),
    mobileNumber: z.string().regex(/^\d{10}$/, {
      message: "Please enter a valid 10-digit mobile number.",
    }),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    branch: z.string().optional(),
    enrollmentNumber: z.string().optional(),
    address: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignupForm() {
  const router = useRouter();
  const isOutsider = JSON.parse(
    sessionStorage.getItem("isOutsider") || "true"
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      branch: "",
      enrollmentNumber: "",
      address: "",
    },
  });

  useEffect(() => {
    const email = sessionStorage.getItem("signupEmail") || "";
    form.setValue("email", email);
  }, [form]);

  const {
    data: userSignupData,
    loading: userSignupLoading,
    error: userSignupError,
    fn: userSignupFn,
  } = useFetch(userSignup);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userData = {
      ...values,
      isOutsider,
      branch: isOutsider ? "NA" : values.branch,
      enrollmentNumber: isOutsider
        ? "NA"
        : values.enrollmentNumber,
      address: isOutsider ? values.address : "OPJU",
    };

    await userSignupFn(userData);
  };

  useEffect(() => {
    if (userSignupError) {
      toast({
        title: "Error",
        description: "User not found",
        variant: "destructive",
      });
    }

    if (userSignupData) {
      toast({
        title: "Success",
        description: "Your account has been created successfully!",
      });
      router.push("/auth/login");
    }
  }, [userSignupError, userSignupData, router]);

  return (
    <div className="space-y-7 text-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* FULL NAME */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    className="h-11 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    disabled
                    className="h-11 bg-white/5 border-white/20 text-white opacity-70"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* MOBILE */}
          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Mobile Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your number"
                    className="h-11 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* OUTSIDER / INSIDER */}
          {isOutsider ? (
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your address"
                      className="h-11 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <>
              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Branch
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your branch"
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
                name="enrollmentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Enrollment Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter enrollment number"
                        className="h-11 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* PASSWORD */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="h-11 bg-white/5 border-white/20 text-white pr-16"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((p) => !p)
                      }
                      className="absolute right-3 top-3 text-sm text-white"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CONFIRM PASSWORD */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      className="h-11 bg-white/5 border-white/20 text-white pr-16"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((p) => !p)
                      }
                      className="absolute right-3 top-3 text-sm text-white"
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SUBMIT */}
          <Button
            type="submit"
            disabled={!!userSignupLoading}
            className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold"
          >
            {userSignupLoading ? "Submitting..." : "Create Account"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
