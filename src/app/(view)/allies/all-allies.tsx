import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLinkIcon } from "lucide-react";
import { getAlliesApi } from "@/lib/api/core";
import { idk } from "@/lib/utils";
import Link from "next/link";

export default async function AllAllies() {
  let alliesList: any[] = [];

  try {
   
    const call: idk = await getAlliesApi({ page: 1 });
    
    // ২. ডাটা স্ট্রাকচার চেক করা হচ্ছে যাতে .map এরর না দেয়
    if (call?.data?.result && Array.isArray(call.data.result)) {
      alliesList = call.data.result;
    }
  } catch (error) {
    console.error("Allies Fetch Error during build/render:", error);
    // এরর হলে alliesList খালি থাকবে, ফলে বিল্ড থামবে না
    alliesList = []; 
  }

  // ৩. যদি কোনো ডাটা না থাকে তবে ইউজারকে একটি মেসেজ দেখানো
  if (alliesList.length === 0) {
    return (
      <div className="col-span-full py-20 text-center text-muted-foreground">
        No allies found or server is currently offline.
      </div>
    );
  }

  return (
    <>
      {alliesList.map((x: {
        _id: string;
        name: string;
        location: string;
        type: string;
        websiteURL?: string;
      }) => (
        <Card key={x._id} className="hover:shadow-md transition-shadow">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <Badge className="mx-auto bg-green-500/60 hover:bg-green-500/80">
              {x.type}
            </Badge>
            <div className="flex flex-col justify-between items-center gap-2">
              <h3 className="text-xl font-semibold text-center w-full leading-tight">
                {x.name}
              </h3>
              <p className="text-muted-foreground text-sm text-center">
                {x.location}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center items-center pb-6">
            {x.websiteURL && (
              <Button className="text-foreground w-full sm:w-auto" asChild variant="outline">
                <Link href={x.websiteURL} target="_blank">
                  <ExternalLinkIcon className="mr-2 h-4 w-4" />
                  Visit website
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </>
  );
}