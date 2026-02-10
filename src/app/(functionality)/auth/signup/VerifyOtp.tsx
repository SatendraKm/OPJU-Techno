"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { sendWelcomeEmail } from "@/actions/mailer";

const otpSchema = z.object({
    otp: z.string().min(6, { message: "OTP must be 6 digits." }),
});

export default function VerifyOtp({ onNext }: { onNext: () => void }) {
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const form = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof otpSchema>) => {
        setIsVerifying(true);
        const storedOtp = sessionStorage.getItem("signupOtp");
        if (values.otp !== storedOtp) {
            toast({
                title: "Error",
                description: "The entered OTP is incorrect.",
                variant: "destructive",
            });
            setIsVerifying(false);
            return;
        }

        onNext();
        setIsVerifying(false);
    };

    const handleResendOtp = async () => {
        setIsResending(true);
        const recipientEmail = sessionStorage.getItem("signupEmail");
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        sessionStorage.setItem("signupOtp", newOtp);

        try {
            if (recipientEmail) {
                await sendWelcomeEmail(recipientEmail, newOtp);
            } else {
                toast({
                    title: "Error",
                    description: "Recipient email is missing.",
                    variant: "destructive",
                });
            }
            toast({
                title: "OTP Resent",
                description: "A new OTP has been sent to your email.",
                variant: "default",
            });
        } catch {
            toast({
                title: "Error",
                description: "Failed to resend OTP. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-transparent rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Verify OTP</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormItem>
                        <FormLabel>OTP</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Enter OTP" {...form.register("otp")} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    <Button type="submit" className="w-full" disabled={isVerifying || isResending}>
                        {isVerifying ? "Verifying" : "Verify OTP"}
                    </Button>
                </form>
            </Form>
            <Button onClick={handleResendOtp} className="w-full mt-4" disabled={isResending || isVerifying}>
                {isResending ? "Resending" : "Resend OTP"}
            </Button>
        </div>
    );
}