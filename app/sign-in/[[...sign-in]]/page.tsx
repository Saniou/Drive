import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
    return (
        <>
            <div className="">
                <Image src="/drive.jpeg" width={1001} height={2000} className="object-contain h-[100%] w-[83%]" alt="as" />
                <div className="absolute top-10 right-0">
                    <SignIn/>
                </div>
            </div>
        </>
    )
}