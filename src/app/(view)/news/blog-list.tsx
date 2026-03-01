import BlogCard from "@/components/core/blog-card";
import { getBlogsApi } from "@/lib/api/core";
import { idk } from "@/lib/utils";
import React from "react";

export default async function BlogList() {
  let blogs: any[] = [];

  try {
    // ১. ডাটা ফেচিং সেফ করা হয়েছে
    const call: idk = await getBlogsApi("");
    console.log("API RESPONSE:", call);

    // ২. ডাটা স্ট্রাকচার চেক করা (call.data.result আছে কি না)
    if (call?.data?.result && Array.isArray(call.data.result)) {
      blogs = call.data.result;
    }
  } catch (error) {
    // ৩. এরর হলে কনসোলে দেখাবে কিন্তু বিল্ড থামাবে না
    console.error("BlogList Fetch Error:", error);
    blogs = []; 
  }

  // যদি কোনো ব্লগ না থাকে তবে একটি মেসেজ দেখানো
  if (blogs.length === 0) {
    return (
      <div className="col-span-full py-10 text-center text-muted-foreground">
        No blogs found at the moment.
      </div>
    );
  }

  return (
    <>
      {blogs.map((x: { _id: string; author: string; createdAt: string; title: string; thumbnail?: string }) => (
        <BlogCard
          _id={x._id}
          title={x.title}
          author={x.author}
          thumbnail={x.thumbnail}
          createdAt={x.createdAt}
          key={x._id}
        />
      ))}
    </>
  );
}