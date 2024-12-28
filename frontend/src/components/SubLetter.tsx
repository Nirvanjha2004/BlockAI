"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";

export function SubLetter() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          At the heart of our NFT marketplace lies a vision: empowering creators
          and collectors to redefine the future of ownership and innovation. Our
          platform is not just a marketplace; it's a thriving ecosystem where
          art, technology, and community intersect. With a focus on inclusivity
          and accessibility, we cater to artists, developers, and enthusiasts
          alike, providing a seamless and secure environment to mint, buy, and
          sell digital assets.
        </p>
        <input
          type="text"
          placeholder="hi@manuarora.in"
          className="rounded-lg border p-2 border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
        />
      </div>
      <BackgroundBeams />
    </div>
  );
}
