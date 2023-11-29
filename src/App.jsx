import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';
import './charts/Charts.ChartjsConfig';
import { AppStateProvider } from './provider/Provider.State';


// Import pages
import Dashboard from './pages/Pages.Dashboard';
import Catalog from './pages/Pages.Catalog';
import Issues from './pages/Pages.Issues';
import Ecosystem from './pages/Pages.Ecosystem';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <AppStateProvider>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/issues/*" element={<Issues />} />
        <Route path="/catalog/*" element={<Catalog />} />
        <Route path="/ecosystem/*" element={<Ecosystem />} />
      </Routes>
    </AppStateProvider>
  );
}

export default App;
