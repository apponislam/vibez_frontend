import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function Badge() {
    return (
        <div className="flex justify-center items-center overflow-hidden">
            <Marquee direction="left" speed={80} pauseOnHover={true}>
                <Image className="mx-6 sm:mx-10 md:mx-16 w-24 sm:w-32 md:w-35 h-auto" src="/badge1.svg" alt="Badge 1" width={140} height={140} />
                <Image className="mx-6 sm:mx-10 md:mx-16 w-24 sm:w-32 md:w-35 h-auto" src="/badge2.svg" alt="Badge 2" width={140} height={140} />
                <Image className="mx-6 sm:mx-10 md:mx-16 w-24 sm:w-32 md:w-35 h-auto" src="/badge3.svg" alt="Badge 3" width={140} height={140} />
                <Image className="mx-6 sm:mx-10 md:mx-16 w-24 sm:w-32 md:w-35 h-auto" src="/badge4.svg" alt="Badge 4" width={140} height={140} />
                <Image className="mx-6 sm:mx-10 md:mx-16 w-24 sm:w-32 md:w-35 h-auto" src="/badge5.svg" alt="Badge 5" width={140} height={140} />
                <Image className="mx-6 sm:mx-10 md:mx-16 w-24 sm:w-32 md:w-35 h-auto" src="/badge1.svg" alt="Badge 1" width={140} height={140} />
                <Image className="mx-6 sm:mx-10 md:mx-16 w-24 sm:w-32 md:w-35 h-auto" src="/badge2.svg" alt="Badge 2" width={140} height={140} />
                <Image className="mx-6 sm:mx-10 md:mx-16 w-24 sm:w-32 md:w-35 h-auto" src="/badge3.svg" alt="Badge 3" width={140} height={140} />
                <Image className="mx-6 sm:mx-10 md:mx-16 w-24 sm:w-32 md:w-35 h-auto" src="/badge4.svg" alt="Badge 4" width={140} height={140} />
                <Image className="mx-6 sm:mx-10 md:mx-16 w-24 sm:w-32 md:w-35 h-auto" src="/badge5.svg" alt="Badge 5" width={140} height={140} />
            </Marquee>
        </div>
    );
}
