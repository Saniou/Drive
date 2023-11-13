import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
    return (
        <>
            <div className="" >
                <div className="absolute h-[100%] w-[100%]" >
                    <Image src="/drive.jpg" width={1001} height={2000} className=" object-contain h-[100%] w-[100%]" alt="as" />
                </div>
                < div className="absolute top-10 right-0" >
                    <SignUp/>
                </div>
            </div>
        </>
    )
}