import React from "react";
import { PlayIcon } from "@heroicons/react/24/solid";

const Clips = ({ clip, imgsrc }) => {
  return (
    <>
      <div className="group relative h-28 w-32 cursor-pointer overflow-hidden rounded-xl transition-all duration-300 lg:h-24 lg:w-28 md:h-20 md:w-24 sm:h-14 sm:w-16">
        <img
          src={imgsrc}
          alt="img/clips"
          className="absolute inset-0 top-0 left-0 right-0 z-10 flex h-full w-full rounded-xl object-cover opacity-100 transition-opacity duration-500"
        />
        <div className="blur-effect-theme absolute top-11 left-11 right-0 z-[100] flex h-8 w-8 items-center justify-center rounded-full bg-white/75 opacity-100 lg:top-8 lg:left-9 md:h-5 md:w-5 sm:top-4 sm:left-5">
          <PlayIcon className="icon-style text-slate-900 md:h-3 md:w-3" />
        </div>
        <video
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          className="absolute top-0 left-0 right-0 z-0 flex h-full w-full rounded-xl object-cover opacity-0 group-hover:z-50 group-hover:opacity-100"
        >
          <source type="video/mp4" src={clip} />
        </video>
      </div>
    </>
  );
};

export default Clips;
