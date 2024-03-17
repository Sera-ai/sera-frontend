import React, { useState, useCallback } from 'react';
import JsonViewerFull from '../../events/partials/Partials.Events.JsonViewerFull';

const EditorViewer = ({ oas }) => {
    return (<div className='mainDark flex h-full w-full catSplit'>
        <JsonViewerFull oas={oas} />
    </div>)
}

export default EditorViewer