import React, { useEffect, useContext, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Starfield from "react-starfield";

import "./css/style.css";
import "./components/charts/Charts.ChartjsConfig";
import { AppContext } from "./provider/Provider.State";
import Console from "./pages/subpages/console/sub.console";

//Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "./events/events.socket";

// Import pages
//import Dashboard from "./pages/Pages.Dashboard";
const Inventory = React.lazy(() => import("./pages/Pages.Inventory"));
const Events = React.lazy(() => import("./pages/Pages.Events"));
const Ecosystem = React.lazy(() => import("./pages/Pages.Ecosystem"));
const Editor = React.lazy(() => import("./pages/Pages.Editor"));
const Builder = React.lazy(() => import("./pages/Pages.Builder"));
const Settings = React.lazy(() => import("./pages/Pages.Settings"));

const StarField = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      <Starfield
        starCount={3000}
        starColor={[255, 255, 255]}
        speedFactor={0.01}
        backgroundColor="#191a21"
      />
    </div>
  );
};
//Stop refreshing!
const MemoizedStarField = React.memo(StarField);

function App() {
  const { console } = useContext(AppContext);

  useEffect(() => {
    useSocket();
  }, []);

  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <div className="flex flex-col h-screen p-1 mainDark">
      <div className="flex-grow overflow-y-auto">
          <Routes>
            <Route exact path="/*" element={<React.Suspense fallback={<MemoizedStarField />}><Inventory /></React.Suspense>} />
            <Route path="inventory/*" element={<React.Suspense fallback={<MemoizedStarField />}><Inventory /></React.Suspense>} />
            <Route path="/events/*" element={<React.Suspense fallback={<MemoizedStarField />}><Events /></React.Suspense>} />
            <Route path="/editor/*" element={<React.Suspense fallback={<MemoizedStarField />}><Editor /></React.Suspense>} />
            <Route path="/ecosystem/*" element={<React.Suspense fallback={<MemoizedStarField />}><Ecosystem /></React.Suspense>} />
            <Route path="/builder/*" element={<React.Suspense fallback={<MemoizedStarField />}><Builder /></React.Suspense>} />
            <Route path="/settings/*" element={<React.Suspense fallback={<MemoizedStarField />}><Settings /></React.Suspense>} />
          </Routes>
      </div>
      {console && (
        <div
          className="overflow-y-scroll console-scroll"
          style={{ minHeight: 250 }}
        >
          <Console />
        </div>
      )}
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
