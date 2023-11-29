import React, { useState, useContext } from 'react';
import JsonViewerFull from '../../../partials/issues/Issues.JsonViewerFull';
import { AppContext } from '../../../provider/Provider.State';

function Viewer() {

  const { dummyOas } = useContext(AppContext)

  return (

    <div className="flex w-full h-screen h-full">
      {/* Cards */}
      <JsonViewerFull oas={dummyOas} />
    </div>

  );
}

export default Viewer;