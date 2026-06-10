import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Image
        src="/drive.jpg"
        alt="Drive"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-left"
      />
      {/* Darken on small screens so the photo stays visible behind the card */}
      <div className="absolute inset-0 -z-10 bg-black/40 md:bg-transparent" />

      <div className="flex min-h-screen items-center justify-center overflow-y-auto p-4 md:justify-end md:pr-[6%]">
        <SignUp />
      </div>
    </div>
  );
}
