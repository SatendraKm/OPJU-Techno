import Image from "next/image";

interface FullPageBackgroundProps {
  src: string;
}

export default function FullPageBackground({ src }: FullPageBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src={src}
        alt="Page Background"
        fill
        priority
        quality={100}
        className="object-cover"
      />
    </div>
  );
}
