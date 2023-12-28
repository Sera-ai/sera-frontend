import React, { useEffect, useContext } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';
import './charts/Charts.ChartjsConfig';
import { AppContext } from './provider/Provider.State';


// Import pages
import Dashboard from './pages/Pages.Dashboard';
import Inventory from './pages/Pages.Inventory';
import Issues from './pages/Pages.Issues';
import Ecosystem from './pages/Pages.Ecosystem';
import Console from './pages/subpages/console/sub.console';
import Editor from './pages/Pages.Editor';
import Builder from './pages/Pages.Builder';


function App() {
  const { console } = useContext(AppContext)

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <div className="flex flex-col h-screen p-1 mainDark">
      <div className="flex-grow overflow-y-auto">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/issues/*" element={<Issues />} />
          <Route path="inventory/*" element={<Inventory />} />
          <Route path="/editor/*" element={<Editor />} />
          <Route path="/ecosystem/*" element={<Ecosystem />} />
          <Route path="/builder/*" element={<Builder />} />
        </Routes>
      </div>
      {console && (
        <div className="overflow-y-scroll console-scroll" style={{ minHeight: 250 }}>
          <Console />
        </div>
      )}

    </div>
  );
}

export default App;
