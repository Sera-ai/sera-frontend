import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

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

  return (
    <div
      id="sidebar"
      ref={sidebar}
      className={` ${
        transparent ? "transBG " : "secondaryDark "
      } h-full flex sidebar flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-full overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 shrink-0  transition-all duration-200 ease-in-out -translate-x-64`}
    >
      {/* Sidebar header */}
      <li
        className={`sidebarLogo rounded-sm last:mb-0 flex items-center justify-center`}
      >
        <NavLink
          end
          to="/"
          className={`block text-slate-200 truncate transition duration-150  hover:text-white`}
        >
          <img src={"/src/assets/logo.png"} alt="Logo" width="24" height="24" />
        </NavLink>
      </li>

      {/* Links */}
      <div className="space-y-8">
        {/* Pages group */}
        <div>
          <ul className="sidebarList">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M3 10H1L10 1L19 10H17M3 10V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H15C15.5304 19 16.0391 18.7893 16.4142 18.4142C16.7893 18.0391 17 17.5304 17 17V10"
                    stroke={
                      pathname === "/" || pathname.includes("dashboard")
                        ? "#2B84EC"
                        : "#FFFFFF50"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 19V13C7 12.4696 7.21071 11.9609 7.58579 11.5858C7.96086 11.2107 8.46957 11 9 11H11C11.5304 11 12.0391 11.2107 12.4142 11.5858C12.7893 11.9609 13 12.4696 13 13V19"
                    stroke={
                      pathname === "/" || pathname.includes("dashboard")
                        ? "#2B84EC"
                        : "#FFFFFF50"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavLink>
            </li>*/}
            <li
              className={`sidebarItem sidebarEndItem rounded-sm mb-0.5 last:mb-0 flex items-center justify-center ${
                (pathname === "/" ||pathname.includes("inventory")) && "secondaryDarkPadded"
              }`}
            >
              <NavLink
                end
                to="/inventory"
                className={`block text-slate-200 truncate transition duration-150 ${
                  (pathname === "/" ||pathname.includes("inventory"))
                    ? "hover:text-slate-200"
                    : "hover:text-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M5 10L1 8V3L5 1L9 3M5 10L9 8M5 10V15L9 17L13 15V10M9 8V3M9 8L13 10M9 3L13 1L17 3V8L13 10"
                    stroke={
                      (pathname === "/" ||pathname.includes("inventory")) ? "#2B84EC" : "#FFFFFF50"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M9.99983 1C12.3357 3.06658 15.3843 4.14257 18.4998 4C18.9534 5.54302 19.0922 7.16147 18.908 8.75918C18.7237 10.3569 18.2202 11.9013 17.4272 13.3005C16.6343 14.6998 15.5682 15.9254 14.2923 16.9045C13.0164 17.8836 11.5566 18.5962 9.99983 19C8.44305 18.5962 6.98331 17.8836 5.70738 16.9045C4.43144 15.9254 3.36534 14.6998 2.57243 13.3005C1.77952 11.9013 1.27597 10.3569 1.09171 8.75918C0.907451 7.16147 1.04624 5.54302 1.49983 4C4.61536 4.14257 7.664 3.06658 9.99983 1Z"
                    stroke={"#FFFFFF50"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L10 9L18 12"
                    stroke={
                      pathname.includes("events") ? "#2B84EC" : "#FFFFFF50"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavLink>
            </li>
            <li
              className={`sidebarItem rounded-sm mb-0.5 last:mb-0 flex items-center justify-center ${
                pathname.includes("editor") && "secondaryDarkPadded"
              }`}
            >
              <NavLink
                end
                to="/editor"
                className={`block text-slate-200 truncate transition duration-150 ${
                  pathname.includes("editor")
                    ? "hover:text-slate-200"
                    : "hover:text-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M13 11H15M9 8H15M11 5H15M1 3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H17C17.5304 1 18.0391 1.21071 18.4142 1.58579C18.7893 1.96086 19 2.46957 19 3V17C19 17.5304 18.7893 18.0391 18.4142 18.4142C18.0391 18.7893 17.5304 19 17 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V3Z"
                    stroke={
                      pathname.includes("editor") ? "#2B84EC" : "#FFFFFF50"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavLink>
            </li>

            <li
              className={`sidebarItem rounded-sm mb-0.5 last:mb-0 flex items-center justify-center`}
            >
              <NavLink
                end
                to="/ecosystem"
                className={`block text-slate-200 truncate transition duration-150 ${
                  pathname.includes("ecosystem")
                    ? "hover:text-slate-200"
                    : "hover:text-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10 19.0122V19.0222M1 7.01223V7.02223M19 7.01223V7.02223M6 18.1122C4.63534 17.447 3.46122 16.447 2.58704 15.2056C1.71281 13.9642 1.16686 12.5218 1 11.0122M14 18.1122C15.3647 17.447 16.5387 16.447 17.413 15.2056C18.2872 13.9642 18.8331 12.5218 19 11.0122M4.2 3.01223C5.80809 1.69658 7.82204 0.977539 9.9 0.977539C11.978 0.977539 13.9919 1.69658 15.6 3.01223M7 10.0122C7 10.8083 7.31607 11.5713 7.87868 12.1339C8.44129 12.6966 9.20435 13.0122 10 13.0122C10.7956 13.0122 11.5587 12.6966 12.1213 12.1339C12.6839 11.5713 13 10.8083 13 10.0122C13 9.21698 12.6839 8.45391 12.1213 7.89131C11.5587 7.3287 10.7956 7.01223 10 7.01223C9.20435 7.01223 8.44129 7.3287 7.87868 7.89131C7.31607 8.45391 7 9.21698 7 10.0122Z"
                    stroke={
                      pathname.includes("ecosystem") ? "#2B84EC" : "#FFFFFF50"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="22"
                  viewBox="0 0 20 22"
                  fill="none"
                >
                  <path
                    d="M17.875 5.22983C18.2187 5.46529 18.5041 5.7488 18.7018 6.09119C18.8995 6.43357 19.0025 6.82246 19 7.21783V14.5018C19 15.3108 18.557 16.0568 17.842 16.4498L11.092 20.7198C10.7574 20.9036 10.3818 20.9999 10 20.9999C9.61824 20.9999 9.24224 20.9036 8.908 20.7198L2.158 16.4498C1.80817 16.2587 1.51612 15.977 1.31241 15.6343C1.1087 15.2916 1.0008 14.9005 1 14.5018V7.21683C1 6.40783 1.443 5.66283 2.158 5.22983L8.908 1.28983C9.25254 1.09987 9.63956 1.00024 10.033 1.00024C10.4224 1.00024 10.8135 1.09987 11.158 1.28983L17.908 5.22983H17.875Z"
                    stroke="white"
                    strokeOpacity="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.5 8.42174C13.812 8.60174 14.003 8.93674 14 9.29774V12.5747C14 12.9387 13.803 13.2747 13.485 13.4517L10.485 15.3737C10.3366 15.456 10.1697 15.4992 10 15.4992C9.83031 15.4992 9.6634 15.456 9.515 15.3737L6.515 13.4517C6.35872 13.3651 6.22851 13.2381 6.13794 13.084C6.04737 12.93 5.99974 12.7545 6 12.5757V9.29774C6 8.93374 6.197 8.59774 6.514 8.42074L9.514 6.63074C9.825 6.45674 10.204 6.45674 10.514 6.63074L13.514 8.42074H13.5V8.42174Z"
                    stroke="#2B84EC"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavLink>
            </li>
            <li
              className={`sidebarItem sidebarEndItem rounded-sm mb-0.5 last:mb-0 flex items-center justify-center ${
                pathname.includes("honeycomb") && "secondaryDarkPadded"
              }`}
            >
              <NavLink
                end
                to="/"
                className={`block text-slate-200 truncate transition duration-150 ${
                  pathname.includes("honeycomb")
                    ? "hover:text-slate-200"
                    : "hover:text-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="22"
                  viewBox="0 0 18 20"
                  fill="none"
                >
                  <path
                    d="M3.33032 6H14.6693C14.9577 5.99997 15.2422 6.06229 15.5047 6.1827C15.7667 6.30311 15.9996 6.47876 16.1874 6.6976C16.3752 6.91645 16.5134 7.17331 16.5922 7.45059C16.6718 7.72786 16.6901 8.01898 16.6463 8.304L15.3913 16.456C15.2824 17.1644 14.9234 17.8105 14.3793 18.2771C13.8352 18.7438 13.1421 19.0002 12.4253 19H5.57332C4.85672 19 4.1638 18.7434 3.61995 18.2768C3.0761 17.8102 2.71724 17.1643 2.60832 16.456L1.35332 8.304C1.30949 8.01898 1.32781 7.72786 1.40702 7.45059C1.48624 7.17331 1.62448 6.91645 1.81222 6.6976C2.00005 6.47876 2.23293 6.30311 2.49496 6.1827C2.75698 6.06229 3.04195 5.99997 3.33032 6Z"
                    stroke="white"
                    strokeOpacity="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.99951 9V4C5.99951 3.20435 6.31558 2.44129 6.87819 1.87868C7.4408 1.31607 8.20386 1 8.99951 1C9.79516 1 10.5582 1.31607 11.1208 1.87868C11.6834 2.44129 11.9995 3.20435 11.9995 4V9"
                    stroke="white"
                    strokeOpacity="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Expand / collapse button */}
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
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8 12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 15L18.35 18.35M9 15L5.65 18.35M5.65 5.65L9 9M18.35 5.65L15 9M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8622 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8622 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8622 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8622 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavLink>
            </li>
            {/* Settings */}
            <li
              className={`sidebarItem rounded-sm mb-0.5 last:mb-0 flex items-center justify-center`}
            >
              <NavLink
                end
                to="/"
                className={`block text-slate-200 truncate transition duration-150  hover:text-white`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 6C12 6.53043 12.2107 7.03914 12.5858 7.41421C12.9609 7.78929 13.4696 8 14 8C14.5304 8 15.0391 7.78929 15.4142 7.41421C15.7893 7.03914 16 6.53043 16 6M12 6C12 5.46957 12.2107 4.96086 12.5858 4.58579C12.9609 4.21071 13.4696 4 14 4C14.5304 4 15.0391 4.21071 15.4142 4.58579C15.7893 4.96086 16 5.46957 16 6M12 6H4M16 6H20M6 12C6 12.5304 6.21071 13.0391 6.58579 13.4142C6.96086 13.7893 7.46957 14 8 14C8.53043 14 9.03914 13.7893 9.41421 13.4142C9.78929 13.0391 10 12.5304 10 12M6 12C6 11.4696 6.21071 10.9609 6.58579 10.5858C6.96086 10.2107 7.46957 10 8 10C8.53043 10 9.03914 10.2107 9.41421 10.5858C9.78929 10.9609 10 11.4696 10 12M6 12H4M10 12H20M15 18C15 18.5304 15.2107 19.0391 15.5858 19.4142C15.9609 19.7893 16.4696 20 17 20C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18M15 18C15 17.4696 15.2107 16.9609 15.5858 16.5858C15.9609 16.2107 16.4696 16 17 16C17.5304 16 18.0391 16.2107 18.4142 16.5858C18.7893 16.9609 19 17.4696 19 18M15 18H4M19 18H20"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
