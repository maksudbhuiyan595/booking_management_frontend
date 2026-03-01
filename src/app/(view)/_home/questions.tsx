import { Button } from "@/components/ui/button";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { howl, idk } from "@/lib/utils";

export default async function Questions() {
  let faqs: idk[] = [];

  try {
    // API কল করার সময় try-catch ব্যবহার করা হয়েছে যাতে এরর আসলে সাইট ক্রাশ না করে
    const call: idk = await howl("/faqs");
    
    // ডাটা আছে কি না এবং সেটি অ্যারে কি না নিশ্চিত করা
    if (call && call.data && Array.isArray(call.data)) {
      faqs = call.data.slice(0, 6);
    }
  } catch (error) {
    console.error("FAQ Fetch Error on Home Page:", error);
    // এরর হলে খালি অ্যারে থাকবে, ফলে ম্যাপ ফাংশন এরর দেবে না
    faqs = [];
  }

  // যদি কোনো ডাটা না থাকে, তবে এই সেকশনটি দেখানোর প্রয়োজন নেই
  if (faqs.length === 0) {
    return null; 
  }

  return (
    <div className="w-full px-[7%]! grid lg:grid-cols-2 gap-6 mt-24! border-t pt-12!">
      <div className="space-y-6!">
        <h2 className="text-3xl lg:text-6xl font-bold">
          Got Questions? <br /> We&apos;ve Got Answers
        </h2>
        <p className="text-muted-foreground">
          We are always happy to hear from you. If you have any questions,
          suggestions or opinions, please do not hesitate to reach out to us.
        </p>
        <Button size="lg" className="text-foreground font-semibold">
          Contact Us
        </Button>
      </div>
      <div className="">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq: any) => (
            <AccordionItem key={faq._id} value={faq._id}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}