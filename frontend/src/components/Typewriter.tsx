"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Trending",
      className: "underline underline-offset-4 text-3xl",
    },
    {
      text: "Collections",
      className: "underline underline-offset-4 text-3xl",
    },
  ];
  return (
    <div className="flex flex-col items-start ml-40 justify-start h-[1rem]  ">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
