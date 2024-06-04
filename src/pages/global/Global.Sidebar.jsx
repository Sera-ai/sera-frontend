import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BuilderIcon,
  EcosystemIcon,
  EditorIcon,
  EventsIcon,
  HelpIcon,
  InventoryIcon,
  MarketIcon,
  SettingsIcon,
} from "../../assets/assets.svg";

function Sidebar({ sidebarOpen, setSidebarOpen, transparent = false }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

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

  const handleHelpClick = (event) => {
    event.preventDefault();
    const userConfirmed = window.confirm("You will be taken to the Sera documentation portal, continue?");
    if (userConfirmed) {
      window.location.href = '/'; // or use history.push('/') if you're using react-router's history
    }
  };
  

  return (
    <div
      id="sidebar"
      ref={sidebar}
      className={` ${
        transparent ? "transBG " : "secondaryDark "
      } h-full flex sidebar flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-full overflow-y-scroll lg:overflow-y-auto no-scrollbar w-56 lg:w-20 shrink-0  transition-all duration-200 ease-in-out -translate-x-56`}
    >
      {/* Links */}
      <div className="space-y-8">
        {/* Pages group */}
        <div>
          <ul className="sidebarList">
            {/* Sidebar header */}
            <li
              className={`sidebarLogo sidebarItem rounded-sm last:mb-0 flex items-center justify-center`}
            >
              <NavLink
                end
                to="/"
                className={`block text-slate-200 truncate transition duration-150  hover:text-white`}
              >
                <img
                  src={"/src/assets/logo.png"}
                  alt="Logo"
                  width="24"
                  height="24"
                />
              </NavLink>
            </li>

            {/* Inbox 
            <li
              className={`sidebarItem rounded-sm mb-0.5 last:mb-0 flex items-center justify-center ${
                (pathname === "/" || pathname.includes("dashboard")) &&
                "secondaryDarkPadded"
              }`}
            >
              <NavLink
                end
                to="/"
                className={`block text-slate-200 truncate transition duration-150 ${
                  pathname === "/" || pathname.includes("dashboard")
                    ? "hover:text-slate-200"
                    : "hover:text-white"
                }`}
              >
                hi
              </NavLink>
            </li>*/}
            <li
              className={`sidebarItem sidebarEndItem rounded-sm mb-0.5 last:mb-0 flex items-center justify-center ${
                (pathname === "/" || pathname.includes("inventory")) &&
                "secondaryDarkPadded"
              }`}
            >
              <NavLink
                end
                to="/inventory"
                className={`block text-slate-200 truncate transition duration-150 ${
                  pathname === "/" || pathname.includes("inventory")
                    ? "hover:text-slate-200"
                    : "hover:text-white"
                }`}
              >
                <InventoryIcon
                  color={
                    pathname === "/" || pathname.includes("inventory")
                      ? "#2B84EC"
                      : "#FFFFFF50"
                  }
                />
              </NavLink>
            </li>
            <li
              className={`sidebarItem rounded-sm mb-0.5 last:mb-0 flex items-center justify-center ${
                pathname.includes("events") && "secondaryDarkPadded"
              }`}
            >
              <NavLink
                end
                to="/events"
                className={`block text-slate-200 truncate transition duration-150 ${
                  pathname.includes("events")
                    ? "hover:text-slate-200"
                    : "hover:text-white"
                }`}
              >
                <EventsIcon
                  secondaryColor={
                    pathname.includes("events") ? "#2B84EC" : "#FFFFFF50"
                  }
                />
              </NavLink>
            </li>

            <li
              className={`sidebarItem sidebarEndItem rounded-sm mb-0.5 last:mb-0 flex items-center justify-center ${
                pathname.includes("builder") && "secondaryDarkPadded"
              }`}
            >
              <NavLink
                end
                to="/builder"
                className={`block text-slate-200 truncate transition duration-150 ${
                  pathname.includes("builder")
                    ? "hover:text-slate-200"
                    : "hover:text-white"
                }`}
              >
                <BuilderIcon />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="justify-end mt-auto">
        <div>
          <ul className="mt-3">
            {/* Support */}
            <li
              className={`sidebarItem rounded-sm mb-0.5 last:mb-0 flex items-center justify-center`}
            >
              <NavLink
                end
                to="/"
                className={`block text-slate-200 truncate transition duration-150  hover:text-white`}
                onClick={handleHelpClick}
              >
                <HelpIcon />
              </NavLink>
            </li>
            {/* Settings */}
            <li
              className={`sidebarItem rounded-sm mb-0.5 last:mb-0 flex items-center justify-center`}
            >
              <NavLink
                end
                to="/settings"
                className={`block text-slate-200 truncate transition duration-150  hover:text-white`}
              >
                <SettingsIcon />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
