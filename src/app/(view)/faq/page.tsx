import React, { Suspense } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// @/lib/api এর বদলে আপনার আসল utils ফাইলটি ইমপোর্ট করুন
import { howl, idk } from "@/lib/utils"; 

export const dynamic = "force-dynamic";

async function FAQList() {
  try {
    // এখানে howl ব্যবহার করুন যেহেতু এটি আপনার প্রোজেক্টে আগে থেকেই আছে
    const response: idk = await howl("/faqs");
    const faqs = response?.data || [];

    if (faqs.length === 0) return <div className="py-10 text-center">No FAQs found.</div>;

    return (
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq: any) => (
          <AccordionItem key={faq._id} value={faq._id}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent>
              <div className="text-sm text-muted-foreground">{faq.answer}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  } catch (error) {
    console.error("FAQ Fetch Error:", error);
    return <div className="py-10 text-center text-red-500">Failed to load FAQs.</div>;
  }
}

export default function FAQPage() {
  return (
    <main className="pb-12 min-h-screen">
      <h1 className="text-6xl text-center py-12">FAQ</h1>
      <div className="w-4/5 mx-auto">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <FAQList />
        </Suspense>
      </div>
    </main>
  );
}