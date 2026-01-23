"use client";

import EnterEmail from "./EnterEmail";
import VerifyOtp from "./VerifyOtp";
import SignupForm from "./SignupForm";
import { useState } from "react";

export default function SignupPage() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-transparent backdrop-blur-2xl shadow-2xl px-8 py-12 text-white">
        
        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-center mb-10">
          SIGN UP
        </h1>

        {/* STEPS */}
        {step === 1 && <EnterEmail onNext={handleNextStep} />}
        {step === 2 && <VerifyOtp onNext={handleNextStep} />}
        {step === 3 && <SignupForm />}
      </div>
    </div>
  );
}
