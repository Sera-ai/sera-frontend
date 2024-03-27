import React, { useState } from "react";
import { CloseIcon } from "../../assets/assets.svg";

function Banner() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const query = new URLSearchParams(location.search);
  const template = query.get("template");
  const liteLink =
    template === "laravel"
      ? "https://github.com/cruip/laravel-tailwindcss-admin-dashboard-template"
      : "https://github.com/cruip/tailwind-dashboard-template";

  return (
    <>
      {bannerOpen && (
        <div className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-50">
          <div className="mainDark border border-transparent dark:border-slate-700 text-slate-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
            <div className="text-slate-500 inline-flex">
              <a
                className="font-medium hover:underline text-slate-50"
                href={liteLink}
                target="_blank"
                rel="noreferrer"
              >
                Download<span className="hidden sm:inline"> on GitHub</span>
              </a>{" "}
              <span className="italic px-1.5">or</span>{" "}
              <a
                className="font-medium hover:underline text-emerald-400"
                href="https://cruip.com/mosaic/"
                target="_blank"
                rel="noreferrer"
              >
                Check Premium Version
              </a>
            </div>
            <button
              className="text-slate-500 hover:text-slate-400 pl-2 ml-3 border-l border-gray-700"
              onClick={() => setBannerOpen(false)}
            >
              <span className="sr-only">Close</span>

              <CloseIcon className="shrink-0 fill-current" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
