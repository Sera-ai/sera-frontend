import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import OasParser from '../../components/Components.OasParser';

import SidebarLinkGroup from '../Partial.SidebarLinkGroup';

function CatalogSidebar({ sidebarOpen, setSidebarOpen, oas }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');
  const [filter, setFilter] = useState("");

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);


  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 secondaryDark bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200'
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="catbar"
        ref={sidebar}
        className={`flex catbar flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 shrink-0 mainDark transition-all duration-200 ease-in-out -translate-x-64
          }`}
      >

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <ul className="">

              {/* Inbox */}
              <li className={`catbarItem rounded-sm mb-0.5 last:mb-0 flex items-center ${(pathname === '/' || pathname.includes('catalog')) && 'secondaryDark'}`}>

              </li>

              {/* Inbox */}
              <li className={`catbarItem px-3 py-2 rounded-sm mb-0.5 last:mb-0 flex items-center ${pathname === '/catalog' && 'secondaryDark'}`}>
                <NavLink
                  end
                  to="/catalog"
                  className={`block text-slate-200 truncate transition duration-150 ${pathname === '/catalog' ? 'hover:text-slate-200' : 'hover:text-white'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M3 3.75C3 3.55109 3.07902 3.36032 3.21967 3.21967C3.36032 3.07902 3.55109 3 3.75 3H6.75C6.94891 3 7.13968 3.07902 7.28033 3.21967C7.42098 3.36032 7.5 3.55109 7.5 3.75V6.75C7.5 6.94891 7.42098 7.13968 7.28033 7.28033C7.13968 7.42098 6.94891 7.5 6.75 7.5H3.75C3.55109 7.5 3.36032 7.42098 3.21967 7.28033C3.07902 7.13968 3 6.94891 3 6.75V3.75ZM10.5 3.75C10.5 3.55109 10.579 3.36032 10.7197 3.21967C10.8603 3.07902 11.0511 3 11.25 3H14.25C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75V6.75C15 6.94891 14.921 7.13968 14.7803 7.28033C14.6397 7.42098 14.4489 7.5 14.25 7.5H11.25C11.0511 7.5 10.8603 7.42098 10.7197 7.28033C10.579 7.13968 10.5 6.94891 10.5 6.75V3.75ZM3 11.25C3 11.0511 3.07902 10.8603 3.21967 10.7197C3.36032 10.579 3.55109 10.5 3.75 10.5H6.75C6.94891 10.5 7.13968 10.579 7.28033 10.7197C7.42098 10.8603 7.5 11.0511 7.5 11.25V14.25C7.5 14.4489 7.42098 14.6397 7.28033 14.7803C7.13968 14.921 6.94891 15 6.75 15H3.75C3.55109 15 3.36032 14.921 3.21967 14.7803C3.07902 14.6397 3 14.4489 3 14.25V11.25ZM10.5 11.25C10.5 11.0511 10.579 10.8603 10.7197 10.7197C10.8603 10.579 11.0511 10.5 11.25 10.5H14.25C14.4489 10.5 14.6397 10.579 14.7803 10.7197C14.921 10.8603 15 11.0511 15 11.25V14.25C15 14.4489 14.921 14.6397 14.7803 14.7803C14.6397 14.921 14.4489 15 14.25 15H11.25C11.0511 15 10.8603 14.921 10.7197 14.7803C10.579 14.6397 10.5 14.4489 10.5 14.25V11.25Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Overview
                      </span>
                    </div>
                  </div>

                </NavLink>
              </li>

              {/* Dashboard */}
              <SidebarLinkGroup activecondition={false}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 px-3`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                              <path d="M9 6C8.60218 6 8.22064 5.84196 7.93934 5.56066C7.65804 5.27936 7.5 4.89782 7.5 4.5C7.5 4.10218 7.65804 3.72064 7.93934 3.43934C8.22064 3.15804 8.60218 3 9 3C9.39782 3 9.77936 3.15804 10.0607 3.43934C10.342 3.72064 10.5 4.10218 10.5 4.5C10.5 4.89782 10.342 5.27936 10.0607 5.56066C9.77936 5.84196 9.39782 6 9 6ZM9 6V12M9 12C9.39782 12 9.77936 12.158 10.0607 12.4393C10.342 12.7206 10.5 13.1022 10.5 13.5C10.5 13.8978 10.342 14.2794 10.0607 14.5607C9.77936 14.842 9.39782 15 9 15C8.60218 15 8.22064 14.842 7.93934 14.5607C7.65804 14.2794 7.5 13.8978 7.5 13.5C7.5 13.1022 7.65804 12.7206 7.93934 12.4393C8.22064 12.158 8.60218 12 9 12ZM4.737 9.372L8.013 5.628M13.263 9.372L9.9885 5.6295M5.25 10.5C5.25 10.1022 5.09196 9.72064 4.81066 9.43934C4.52936 9.15804 4.14782 9 3.75 9C3.35218 9 2.97064 9.15804 2.68934 9.43934C2.40804 9.72064 2.25 10.1022 2.25 10.5C2.25 10.8978 2.40804 11.2794 2.68934 11.5607C2.97064 11.842 3.35218 12 3.75 12C4.14782 12 4.52936 11.842 4.81066 11.5607C5.09196 11.2794 5.25 10.8978 5.25 10.5ZM15.75 10.5C15.75 10.1022 15.592 9.72064 15.3107 9.43934C15.0294 9.15804 14.6478 9 14.25 9C13.8522 9 13.4706 9.15804 13.1893 9.43934C12.908 9.72064 12.75 10.1022 12.75 10.5C12.75 10.8978 12.908 11.2794 13.1893 11.5607C13.4706 11.842 13.8522 12 14.25 12C14.6478 12 15.0294 11.842 15.3107 11.5607C15.592 11.2794 15.75 10.8978 15.75 10.5Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Endpoints
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block secondaryDark px-3" style={{ marginTop: 10, paddingTop: open ? 10 : 0, paddingBottom: open ? 10 : 0 }}>
                        <ul className={`pl-9 no-space mt-1 ${!open && 'hidden'}`}>
                          <form className="">
                            <div className="relative">
                              <label className="sr-only">
                                Search
                              </label>
                              <input
                                className="w-full dark:text-slate-300 text-sm secondaryDark border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none pb-3 pl-4 pr-0"
                                type="search"
                                placeholder="Search Endpoints"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                              />
                              <div className="absolute top-2.5 right-0" aria-label="Search">
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
                          <OasParser oas={oas} filter={filter} />

                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

            </ul>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CatalogSidebar;
