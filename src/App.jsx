import React, { useEffect, useContext, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Starfield from "react-starfield";

import "./css/style.css";
import "./components/charts/Charts.ChartjsConfig";
import { AppContext } from "./provider/Provider.State";
import Console from "./pages/subpages/console/sub.console";

// Import pages
//import Dashboard from "./pages/Pages.Dashboard";
const Inventory = React.lazy(() => import("./pages/Pages.Inventory"));
const Events = React.lazy(() => import("./pages/Pages.Events"));
const Ecosystem = React.lazy(() => import("./pages/Pages.Ecosystem"));
const Editor = React.lazy(() => import("./pages/Pages.Editor"));
const Builder = React.lazy(() => import("./pages/Pages.Builder"));


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

  const location = useLocation();


  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <div className="flex flex-col h-screen p-1 mainDark">
      <div className="flex-grow overflow-y-auto">
        <Suspense fallback={<MemoizedStarField />}>
          <Routes>
            <Route exact path="/" element={<Inventory />} />
            <Route path="inventory/*" element={<Inventory />} />
            <Route path="/events/*" element={<Events />} />
            <Route path="/editor/*" element={<Editor />} />
            <Route path="/ecosystem/*" element={<Ecosystem />} />
            <Route path="/builder/*" element={<Builder />} />
          </Routes>
        </Suspense>
      </div>
      {console[0] && (
        <div
          className="overflow-y-scroll console-scroll"
          style={{ minHeight: 250 }}
        >
          <Console />
        </div>
      )}
    </div>
  );
}

export default App;


