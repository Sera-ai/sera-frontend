import React, { useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Transition from "../utils/Transition";
import { BuilderIcon, ChatGPTIcon, InventoryIcon } from "../assets/assets.svg";

function ModalSearch({
  id,
  searchId,
  modalOpen,
  setModalOpen,
  onChangeInput,
  searchResults,
  useSeraAISearch,
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

  useEffect(() => {
    modalOpen && searchInput.current.focus();
  }, [modalOpen]);

  const GetResults = () => {
    return searchResults.map((result) => (
      <li>
        <NavLink
          end
          className="searchRes flex items-center p-2 space-x-2 text-slate-800 dark:text-slate-100 hover:text-white rounded group"
          to={
            result.hostname
              ? `/inventory/${result.hostname}`
              : `/builder/${result.host_id.hostname}${
                  result.endpoint
                }/${result.method.toLowerCase()}`
          }
          onClick={() => setModalOpen(!modalOpen)}
        >
          {result.hostname ? <InventoryIcon /> : <BuilderIcon />}

          <span>
            {result.hostname ??
              `${result.method} - ${result.host_id.hostname} ${result.endpoint}`}
          </span>
        </NavLink>
      </li>
    ));
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
          {/* Search form */}
          <form className="border-b border-slate-200 dark:border-slate-700">
            <div className="relative">
              <label htmlFor={searchId} className="sr-only">
                Search
              </label>
              <input
                id={searchId}
                className="w-full dark:text-slate-300  mainDark border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none py-3 pl-10 pr-4"
                type="search"
                placeholder="Search Anything…"
                onChange={(e) => onChangeInput(e.target.value)}
                ref={searchInput}
              />
              <button
                className="absolute inset-0 right-auto group"
                type="submit"
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
              </button>
            </div>
          </form>
          <div className="py-4 px-2">
            {/* Recent searches */}
            <div className="mb-3 last:mb-0">
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase px-2 mb-2">
                Search Results
              </div>
              <ul className="text-sm">
                {searchInput?.current?.value && (
                  <li>
                    <NavLink
                      end
                      className="searchRes flex items-center p-2 space-x-2 text-slate-800 dark:text-slate-100 hover:text-white rounded group"
                      onClick={() => useSeraAISearch(searchInput.current.value)}
                    >
                      <ChatGPTIcon />

                      <span>
                        Send Message to <span class="gradient-text">SeraAI</span>
                      </span>
                    </NavLink>
                  </li>
                )}
                <GetResults />
              </ul>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default ModalSearch;
