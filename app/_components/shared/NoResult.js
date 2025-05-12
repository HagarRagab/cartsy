import Image from "next/image";
import Link from "next/link";

function NoResult({ imgSrc, alt, title, subTitle }) {
    return (
        <div className="flex flex-col gap-2 items-center justify-center min-h-[calc(100vh-212px)]">
            <div className="relative w-50 aspect-square mb-6">
                <Image src={imgSrc} alt={alt} fill className="object-contain" />
            </div>
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p>{subTitle}</p>
            <Link href="/" className="primary-btn px-6 py-2 rounded-md mt-6">
                Explore items
            </Link>
        </div>
    );
}

export default NoResult;
