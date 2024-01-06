import React, { useState, useContext } from "react";

import SearchModal from "../components/Components.ModalSearch";
import Notifications from "../components/Components.DropdownNotifications";
import Help from "../components/Components.DropdownHelp";
import UserMenu from "../components/Components.DropdownProfile";
import Breadcrumbs from "../components/Components.Breadcrumbs";
import { AppContext } from "../provider/Provider.State";

function Header({ sidebarOpen, setSidebarOpen, transparent, title }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const { console, setConsole } = useContext(AppContext);

  return (
    <header
      id="header"
      className={`z-30 header w-full px-4 flex items-center justify-between py-2 ${
        !transparent && "secondaryDark"
      }`}
    >
      {/* Header: Left side */}
      <div className="flex">
        <Breadcrumbs />
      </div>

      <div className="flex items-center">
          <button
            id="searchBar"
            className={`px-6 py-1 flex items-center space-x-3 justify-center bg-slate-100 hover:bg-slate-200 secondaryDark dark:hover:bg-slate-600/80 rounded-md ml-3 ${
              searchModalOpen && "bg-slate-200"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setSearchModalOpen(true);
            }}
            aria-controls="search-modal"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-current text-slate-500 dark:text-slate-400"
                d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
              />
              <path
                className="fill-current text-slate-400 dark:text-slate-500"
                d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
              />
            </svg>
            <span className="text-xs">Search Sera Workspace</span>
          </button>
          <SearchModal
            id="search-modal"
            searchId="search"
            modalOpen={searchModalOpen}
            setModalOpen={setSearchModalOpen}
          />
        </div>

      {/* Header: Right side */}
      <div className="flex items-center space-x-3">
        
        <hr className="w-px h-6 bg-slate-200 secondaryDark border-none" />
        <div
          style={{
            borderRadius: 50,
            backgroundColor: console ? "#191A21" : "#23232E",
            padding: 10,
          }}
          onClick={() => setConsole(!console)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10.6666 12.0002C10.8434 12.0002 11.013 11.9299 11.138 11.8049C11.263 11.6799 11.3333 11.5103 11.3333 11.3335C11.3333 11.1567 11.263 10.9871 11.138 10.8621C11.013 10.7371 10.8434 10.6668 10.6666 10.6668V12.0002ZM5.33325 10.6668C5.15644 10.6668 4.98687 10.7371 4.86185 10.8621C4.73682 10.9871 4.66659 11.1567 4.66659 11.3335C4.66659 11.5103 4.73682 11.6799 4.86185 11.8049C4.98687 11.9299 5.15644 12.0002 5.33325 12.0002V10.6668ZM5.80459 4.86216C5.74309 4.79849 5.66952 4.7477 5.58819 4.71276C5.50685 4.67782 5.41937 4.65943 5.33085 4.65866C5.24233 4.65789 5.15455 4.67476 5.07262 4.70828C4.99069 4.7418 4.91625 4.7913 4.85366 4.8539C4.79106 4.91649 4.74156 4.99093 4.70804 5.07286C4.67452 5.15479 4.65765 5.24258 4.65842 5.3311C4.65919 5.41962 4.67758 5.5071 4.71252 5.58843C4.74746 5.66977 4.79825 5.74333 4.86192 5.80483L5.80459 4.86216ZM7.33325 7.3335L7.80459 7.80483C7.92957 7.67981 7.99978 7.51027 7.99978 7.3335C7.99978 7.15672 7.92957 6.98718 7.80459 6.86216L7.33325 7.3335ZM4.86192 8.86216C4.79825 8.92366 4.74746 8.99722 4.71252 9.07856C4.67758 9.1599 4.65919 9.24738 4.65842 9.3359C4.65765 9.42442 4.67452 9.5122 4.70804 9.59413C4.74156 9.67606 4.79106 9.7505 4.85366 9.81309C4.91625 9.87569 4.99069 9.92519 5.07262 9.95871C5.15455 9.99223 5.24233 10.0091 5.33085 10.0083C5.41937 10.0076 5.50685 9.98917 5.58819 9.95423C5.66952 9.91929 5.74309 9.8685 5.80459 9.80483L4.86192 8.86216ZM4.66659 2.66683H11.3333V1.3335H4.66659V2.66683ZM13.3333 4.66683V11.3335H14.6666V4.66683H13.3333ZM11.3333 13.3335H4.66659V14.6668H11.3333V13.3335ZM2.66659 11.3335V4.66683H1.33325V11.3335H2.66659ZM4.66659 13.3335C4.13615 13.3335 3.62744 13.1228 3.25237 12.7477C2.8773 12.3726 2.66659 11.8639 2.66659 11.3335H1.33325C1.33325 12.2176 1.68444 13.0654 2.30956 13.6905C2.93468 14.3156 3.78253 14.6668 4.66659 14.6668V13.3335ZM13.3333 11.3335C13.3333 11.8639 13.1225 12.3726 12.7475 12.7477C12.3724 13.1228 11.8637 13.3335 11.3333 13.3335V14.6668C12.2173 14.6668 13.0652 14.3156 13.6903 13.6905C14.3154 13.0654 14.6666 12.2176 14.6666 11.3335H13.3333ZM11.3333 2.66683C11.8637 2.66683 12.3724 2.87754 12.7475 3.25262C13.1225 3.62769 13.3333 4.1364 13.3333 4.66683H14.6666C14.6666 3.78277 14.3154 2.93493 13.6903 2.30981C13.0652 1.68469 12.2173 1.3335 11.3333 1.3335V2.66683ZM4.66659 1.3335C3.78253 1.3335 2.93468 1.68469 2.30956 2.30981C1.68444 2.93493 1.33325 3.78277 1.33325 4.66683H2.66659C2.66659 4.1364 2.8773 3.62769 3.25237 3.25262C3.62744 2.87754 4.13615 2.66683 4.66659 2.66683V1.3335ZM10.6666 10.6668H5.33325V12.0002H10.6666V10.6668ZM4.86192 5.80483L6.86192 7.80483L7.80459 6.86216L5.80459 4.86216L4.86192 5.80483ZM6.86192 6.86216L4.86192 8.86216L5.80459 9.80483L7.80459 7.80483L6.86192 6.86216Z"
              fill="#94a3b8"
            />
          </svg>
        </div>
        <Notifications align="right" />
        <Help align="right" />

        {/*  Divider */}
        <hr className="w-px h-6 bg-slate-200 secondaryDark border-none" />
        <UserMenu align="right" />
      </div>
    </header>
  );
}

export default Header;
