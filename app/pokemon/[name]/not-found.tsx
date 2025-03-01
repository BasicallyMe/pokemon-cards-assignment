import Image from "next/image";

export default function NotFound() {
    return (
        <div className="h-svh flex flex-col items-center justify-center w-full">
            <Image src="/404-hero-image.png" width={150} height={150} alt="Placeholder" />
            <h2 className="text-5xl font-bold">404!</h2>
            <p className="w-2xl text-center text-sm text-gray-500">{`Jiggly! We couldn't find the pokemon you're looking for`}</p>
        </div>
    )
}