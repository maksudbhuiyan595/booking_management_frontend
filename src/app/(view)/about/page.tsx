import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { Suspense } from "react";
import TeamMems from "./team-mems";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { getAboutUsApi } from "@/lib/api/core";
import { imgCreator } from "@/lib/func/functions";
import { idk } from "@/lib/utils";

// ১. বিল্ড টাইমে এরর স্কিপ করতে এটি যোগ করুন
export const dynamic = "force-dynamic";

export default async function Page() {
  // ২. ডিফল্ট ডাটা সেট করা যাতে API ফেল করলে সাইট ক্রাশ না করে
  let aboutData: any = {
    heroImage: "",
    headerText: "About OneRide",
    subText: "Experience stress-free event transportation today.",
  };

  try {
    const call: idk = await getAboutUsApi();
    if (call && call.data) {
      aboutData = call.data;
    }
  } catch (error) {
    console.error("About Us Fetch Error:", error);
  }

  return (
    <>
      <header
        className="h-[80vh] w-full bg-cover bg-center font-serif"
        style={{ 
          backgroundImage: aboutData.heroImage 
            ? `url(${imgCreator(aboutData.heroImage)})` 
            : "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))" // ফলব্যাক ব্যাকগ্রাউন্ড
        }}
      >
        <div className="h-full w-full flex justify-center items-center backdrop-blur-xs backdrop-brightness-50">
          <div className="lg:w-1/2 flex flex-col justify-around items-center gap-12 text-center">
            <h1 className="text-3xl lg:text-6xl font-semibold text-white">
              {aboutData.headerText}
            </h1>
            <h3 className="text-sm px-4! lg:text-lg text-white/90">
              {aboutData.subText}
            </h3>
          </div>
        </div>
      </header>

      <main className="my-12! px-4! lg:px-[7%]! font-serif">
        <h2 className=" text-center text-4xl">Our core team member</h2>

        <div className="my-12! grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Suspense
            fallback={Array(8)
              .fill("")
              .map((_, i) => (
                <Skeleton className="w-full aspect-video" key={i} />
              ))}
          >
            {/* ৩. TeamMems এর ভেতরেও একইভাবে try-catch আছে কি না নিশ্চিত করুন */}
            <TeamMems />
          </Suspense>
        </div>

        <h2 className="text-4xl text-center mt-24!">Why People Trust Us</h2>
        <div className="my-12! grid md:grid-cols-3 gap-6">
          {trust.map((x, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <h3 className="text-2xl text-primary font-semibold">{x.title}</h3>
                <ul className="list-disc list-inside leading-relaxed space-y-2! mt-6!">
                  {x.features.map((y, i) => (
                    <li className="pl-6!" key={i}>
                      {y}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col justify-center items-center gap-8 bg-secondary/30 py-16 rounded-2xl">
          <h2 className="text-xl lg:text-4xl text-center">
            Ready to ride with us?
          </h2>
          <p className="text-sm lg:text-xl text-center max-w-2xl">
            Experience stress-free event transportation today. Join hundreds of happy riders.
          </p>
          <Button
            className="rounded py-6! px-12! text-sm lg:text-lg mx-auto! text-foreground font-bold"
            asChild
          >
            <Link href={`/events`}>Book your first seat</Link>
          </Button>
        </div>
      </main>
    </>
  );
}

const trust = [
  {
    title: "Reliable Service",
    features: [
      "Consistent pick-up locations",
      "On-time arrivals guaranteed",
      "Real-time tracking available",
    ],
  },
  {
    title: "Easy Booking",
    features: [
      "Simple online reservation",
      "Group booking options",
      "Instant confirmation",
    ],
  },
  {
    title: "Friendly Support",
    features: [
      "24/7 customer service",
      "BD-based support team",
      "Quick response times",
    ],
  },
];