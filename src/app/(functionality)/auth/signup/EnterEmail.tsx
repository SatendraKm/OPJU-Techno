"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { sendWelcomeEmail } from "@/actions/mailer";
import Link from "next/link";

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function EnterEmail({ onNext }: { onNext: () => void }) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof emailSchema>) => {
    setLoading(true);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await sendWelcomeEmail(values.email, otp);

    const isOutsider = !values.email.endsWith("@opju.ac.in");

    sessionStorage.setItem("signupEmail", values.email);
    sessionStorage.setItem("signupOtp", otp);
    sessionStorage.setItem("isOutsider", JSON.stringify(isOutsider));

    toast({
      title: "OTP Sent",
      description: `An OTP has been sent to ${values.email}. Please check your inbox.`,
    });

    setLoading(false);
    onNext();
  };

  return (
    <div className="space-y-8 text-white">
      {/* HEADING */}
      {/* FORM */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormItem>
            <FormLabel className="text-white">
              Email
            </FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-11 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                {...form.register("email")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-sky-500 hover:bg-sky-600 text-white font-semibold"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      </Form>

      {/* LOGIN LINK */}
      <p className="text-center text-sm text-white">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="underline underline-offset-4 font-semibold"
        >
          Log in
        </Link>
      </p>

      {/* NOTE */}
      <div className="text-sm text-gray-300">
        <p className="font-semibold mb-1">Note:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>OPJU students must use their college email.</li>
          <li>Check your spam folder if you don&apos;t receive the OTP.</li>
          <li>Contact support if you face any issues.</li>
        </ul>
      </div>
    </div>
  );
}
