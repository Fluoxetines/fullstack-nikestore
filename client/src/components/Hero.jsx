import React from "react";
import Clips from "./utils/Clips";
import SocialLink from "./utils/SocialLink";

const Hero = ({
  heroapi: { title, subtitle, btntext, img, sociallinks, videos },
}) => {
  // console.log(heroapi)
  return (
    <>
      <div className="relative flex h-auto w-auto flex-col">
        <div className="bg-theme clip-path absolute top-0 left-0 right-0 z-10 h-[85vh] w-auto opacity-100 lg:h-[75vh] md:h-[65vh] sm:h-[55vh]"></div>
        <div className="nike-container relative z-20 grid items-center justify-items-center opacity-100">
          <div className="mt-28 grid items-center justify-items-center md:mt-24">
            <h1 className="text-6xl font-extrabold text-slate-200 drop-shadow-sm filter lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl">
              {title}
            </h1>
            <h1 className="text-6xl font-extrabold text-slate-200 drop-shadow-sm filter lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl">
              {subtitle}
            </h1>
            <button
              type="button"
              className="button-theme my-5  rounded-xl bg-slate-200 shadow-slate-200"
            >
              {btntext}
            </button>
            <div className="absolute top-[33vh] left-[11%] grid h-auto w-auto items-center gap-5 xl:left-0 lg:top-[27vh] md:gap-3">
              {videos?.map((val, i) => (
                <Clips key={i} imgsrc={val.imgsrc} clip={val.clip} />
              ))}
            </div>
            <div className="absolute top-[33vh] right-0 grid items-center gap-3 lg:top-[27vh]">
              {sociallinks?.map((val, i) => (
                <SocialLink key={i} icon={val.icon} />
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <img
              src={img}
              alt="hero-img/img"
              className="transitions-theme h-[45vh] w-auto -rotate-[25deg] cursor-pointer object-fill hover:rotate-0 lg:h-[35vh] md:h-[31vh] sm:h-[21vh] xsm:h-[19vh]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
