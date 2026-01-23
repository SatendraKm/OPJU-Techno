// app/(functionality)/layout.tsx
// import { ReactNode } from "react";

export default function FunctionalityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#3b0a0a] to-[#7f1d1d] pt-28 pb-10">
      {children}
    </div>
  );
}
