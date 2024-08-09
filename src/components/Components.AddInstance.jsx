import React, { useRef, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Transition from "../utils/Transition";
import { BuilderIcon, InventoryIcon } from "../assets/assets.svg";

function AddInstance({
  id = "sera-add",
  modalOpen,
  setModalOpen,
}) {
  const modalContent = useRef(null);
  const searchInput = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalOpen || modalContent.current.contains(target)) return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  
  const [displayText, setDisplayText] = useState(SERA_CONTAINER_ID);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setIsCopied(true);
        setDisplayText('Copied!');
        setTimeout(() => {
          setIsCopied(false);
        }, 1500); // 1.5 seconds before fading out
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 mainDark bg-opacity-80 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-80"
        leave="transition ease-out duration-100"
        leaveStart="opacity-80"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="mainDark border border-transparent dark:border-slate-700 overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg"
        >
          <div className="p-4 w-full">
            {/* Recent searches */}
            <div className="mb-3 last:mb-0 w-full space-y-5">
              <div className="text-sm">
                Connect a Sera Instance
              </div>
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">
                This Instance's Passkey is:
                <button
                id="searchBar"
                className={`relative py-1 w-full flex items-center space-x-3 bg-slate-100 hover:bg-slate-200 secondaryDark dark:hover:bg-slate-600/80 rounded-md`}
                onClick={() => handleCopyClick(SERA_CONTAINER_ID)}
                aria-controls="search-modal"
                >
                
                
                {/* "Copied!" Text Overlaid */}
                <span
                    className={`text-xs absolute left-0 right-0 pl-2 text-left transition-opacity duration-1000 ${isCopied ? 'opacity-100' : 'opacity-0'} secondaryDark`}
                >
                    {displayText}
                </span>
                {/* Original Container ID Text */}
                <span className={`text-xs`}>{SERA_CONTAINER_ID}</span>
                </button>
              </div>
            
                <div className="space-y-2">
                    <div className="text-sm">
                        Add Another Instance Please Enter:
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">
                            Instance IP or Hostname
                        </div>
                        <input
                        id="searchBar"
                        className={`relative py-1 text-xs  w-full flex items-center space-x-3 bg-slate-100 hover:bg-slate-200 secondaryDark dark:hover:bg-slate-600/80 rounded-md`}
                        placeholder="127.0.0.1"
                        aria-controls="search-modal"
                        >
                        </input>
                    </div>
                    
                    <div>
                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">
                        Instance Passkey
                    </div>
                    <input
                    id="searchBar"
                    className={`relative py-1 text-xs  w-full flex items-center space-x-3 bg-slate-100 hover:bg-slate-200 secondaryDark dark:hover:bg-slate-600/80 rounded-md`}
                    placeholder={SERA_CONTAINER_ID}
                    aria-controls="search-modal"
                    >
                    </input>
                    
                    </div>
                    
                            
                </div>
             
                <div
                    className={`cursor-pointer flex items-center justify-center text-sm`}
                    style={{
                    backgroundColor: "#2B84EC",
                    color: "#fff",
                    padding: "10px 15px",
                    borderRadius: 3,
                    }}
                    onClick={() => alert("Coming soon")}
                >
                    Add Instance
                </div>

            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default AddInstance;
