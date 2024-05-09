import React, { useState, useContext } from "react";

import SearchModal from "../../components/Components.ModalSearch";
import Notifications from "../../components/Components.DropdownNotifications";
import Help from "../../components/Components.DropdownHelp";
import UserMenu from "../../components/Components.DropdownProfile";
import Breadcrumbs from "../../components/custom/Custom.Breadcrumbs";
import { AppContext } from "../../provider/Provider.State";
import { ConsoleIcon, SearchIcon } from "../../assets/assets.svg";

function Header({ sidebarOpen, setSidebarOpen, transparent, title }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const { console } = useContext(AppContext);

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
          <SearchIcon />
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
          onClick={() => console[1](!console)}
        >
          <ConsoleIcon size={20}/>
        </div>
        <Notifications align="right" />
        <Help align="right" />

        {/*  Divider */}
      </div>
    </header>
  );
}

export default Header;
