import React, { useState, useEffect, useContext, useRef} from "react";
import { useLocation,Link } from "react-router-dom";

import SearchModal from "../../components/Components.ModalSearch";
import Notifications from "../../components/Components.DropdownNotifications";
import Help from "../../components/Components.DropdownHelp";
import UserMenu from "../../components/Components.DropdownProfile";
import Breadcrumbs from "../../components/custom/Custom.Breadcrumbs";
import { AppContext } from "../../provider/Provider.State";
import { ConsoleIcon, PlusIcon, SearchIcon } from "../../assets/assets.svg";
import { getGlobalSearch } from "../../provider/Provider.Data";
import AddInstance from "../../components/Components.AddInstance";
import Transition from "../../utils/Transition";

function Header({transparent }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [addInstanceModalOpen, setAddInstanceModalOpen] = useState(false);
  const [instanceDropdownOpen, setInstanceDropdownOpen] = useState(false);
  const { console: cnsl, setConsole } = useContext(AppContext);
  const [globalSearch, setGlobalSearch] = useState([]);
  const location = useLocation();
  const dropdown = useRef(null);

  const changeGlobalSearch = async (res) => {
    try {
      const searchResult = await getGlobalSearch({ searchTerm: res });
      console.log(searchResult)
      if(searchResult) setGlobalSearch(Array.isArray(searchResult) ? searchResult : []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!instanceDropdownOpen || dropdown.current.contains(target)) return;
      setInstanceDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!instanceDropdownOpen || keyCode !== 27) return;
      setInstanceDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <header
      id="header"
      className={`z-30 header w-full pr-4 flex items-center justify-between py-2 ${
        !transparent && "secondaryDark"
      }`}
    >
      {/* Header: Left side */}
      <div className="flex">
        {location.pathname == "/" ? 
        (<InstanceSelector onClick={(e) => {
          e.stopPropagation();
          setAddInstanceModalOpen(true);
        }}
        instanceDropdown={(e) => {
          e.stopPropagation();
          setInstanceDropdownOpen(true)
        }}
        
        />):
        (<div className="pl-4"><Breadcrumbs /></div>)
        }
        
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
          onChangeInput={changeGlobalSearch}
          searchResults={globalSearch}
        />
        <AddInstance
          searchId="search"
          modalOpen={addInstanceModalOpen}
          setModalOpen={setAddInstanceModalOpen}
        />
      </div>

      <Transition
        className={`origin-top-left z-10 absolute top-10  max-w-80  mainDark border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 left-3`}
        show={instanceDropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setInstanceDropdownOpen(true)}
          onBlur={() => setInstanceDropdownOpen(false)}
        >
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-4">Other Instances</div>
          <ul>
            <li className="border-b border-slate-200 dark:border-slate-700 last:border-0">
              <Link
                className="block flex space-x-2 py-2 px-4 hover:bg-slate-50 dark:hover:bg-slate-700/20"
                to="#0"
                onClick={() => setInstanceDropdownOpen(false)}
              >
                <UniqueGrid seedString={SERA_HOSTNAME} />
                <span className="text-xs">{SERA_HOSTNAME} - 127.0.0.1</span>
              </Link>
            </li>
          </ul>
        </div>
      </Transition>

      {/* Header: Right side */}
      <div className="flex items-center space-x-3">
        <hr className="w-px h-6 bg-slate-200 secondaryDark border-none" />
        <div
          style={{
            borderRadius: 50,
            backgroundColor: cnsl ? "#191A21" : "#23232E",
            padding: 10,
          }}
          onClick={() => setConsole(!cnsl)}
        >
          <ConsoleIcon size={20} />
        </div>
        <Notifications align="right" />
        <Help align="right" />

        {/*  Divider */}
      </div>
    </header>
  );
}

const InstanceSelector = ({onClick, instanceDropdown}) => (
  <button
    id="searchBar"
    className={`pl-3 flex items-center space-x-2 justify-center bg-slate-100 hover:bg-slate-200 secondaryDark dark:hover:bg-slate-600/80 rounded-md ml-3`}
    aria-controls="search-modal"
  >
    <div className="flex space-x-2"
    onClick={instanceDropdown}>
    <UniqueGrid seedString={SERA_HOSTNAME} />
    <span className="text-xs">{SERA_HOSTNAME}</span>
    </div>
    <div className={"v-divider p-1.5"} onClick={onClick}>
    <PlusIcon />
    </div>
  </button>
)


const UniqueGrid = ({ seedString }) => {
  const gridSize = 16;
  const squareSize = 64 / gridSize; // Each square will be 1x1 within the 16x16 grid

  // Generate a hash from the string to get a unique color
  const hashCode = (str) => {
    return str.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
  };

  const intTo8BitColor = (num) => {
    return `rgb(${(num & 0xFF)}, ${(num >> 8) & 0xFF}, ${(num >> 16) & 0xFF})`;
  };

  // Generate a grid of colors based on the seed string
  const generateColorGrid = () => {
    const colors = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      const color = intTo8BitColor(hashCode(seedString + i));
      colors.push(color);
    }
    return colors;
  };

  const colorGrid = generateColorGrid();

  return (
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      {colorGrid.map((color, index) => {
        const x = (index % gridSize) * squareSize;
        const y = Math.floor(index / gridSize) * squareSize;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={squareSize}
            height={squareSize}
            fill={color}
            rx="3"
            ry="3"
            stroke="black"
            strokeWidth="0.5"
          />
        );
      })}
    </svg>
  );
};
export default Header;
