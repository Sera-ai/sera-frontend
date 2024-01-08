import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import OasParser from "../../../../components/custom/Custom.OasParser";

function InventorySidebar({ sidebarOpen, setSidebarOpen, oas, builder = false }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  const [filter, setFilter] = useState("");

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div
      id={"catbar"}
      ref={sidebar}
      className={`flex catbar flex-col z-40 ${builder ? "w-full" : "set-width"}`}
    >
      {/* Links */}
      <div className="space-y-8 h-full">
        {/* Pages group */}
        <ul className="h-full">
          {/* Dashboard */}

          <React.Fragment>
            <div className="px-6 pb-3 pt-5">
              <span>Endpoints</span>
            </div>
            <div
              className={`lg:hidden lg:sidebar-expanded:block 2xl:block h-full ${
                !builder && "mainDark"
              } overflow-x-hidden`}
              style={{
                paddingTop: open ? 6 : 0,
                paddingBottom: open ? 10 : 0,
              }}
            >
              <ul className={`no-space h-full mt-1 ${!open && "hidden"}`}>
                <form className=" px-5">
                  <div className="relative">
                    <label className="sr-only">Search</label>
                    <input
                      className={`w-full text-sm px-1 dark:text-slate-300 ${
                        !builder ? "mainDark" : "quadDark"
                      }  border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none`}
                      type="search"
                      placeholder="Search Endpoints"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    />
                    <div
                      className="absolute top-2.5 right-0"
                      aria-label="Search"
                    >
                      <svg
                        className="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-4 mr-2"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                        <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                      </svg>
                    </div>
                  </div>
                </form>
                <div
                  className={`p-4 ${!builder && "mainDark catSplit"} h-full`}
                >
                  <OasParser oas={oas} filter={filter} />
                </div>
              </ul>
            </div>
          </React.Fragment>
        </ul>
      </div>
    </div>
  );
}

export default InventorySidebar;
