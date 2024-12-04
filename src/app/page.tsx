import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight  sm:text-6xl">
              A Way To Keep Track Of Your Shoe Mileage
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Keep Your Feet Healthy and Happy
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              {/* <Link href="#" className="text-sm font-semibold leading-6 ">
                Learn more <span aria-hidden="true">→</span>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
