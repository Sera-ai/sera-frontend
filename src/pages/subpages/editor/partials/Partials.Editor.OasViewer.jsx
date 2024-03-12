import React, { useState, useCallback } from 'react';
import JsonViewerFull from '../../issues/partials/Partials.Issues.JsonViewerFull';

const EditorViewer = ({ oas }) => {
    return (<div className='mainDark flex h-full w-full catSplit'>
        <JsonViewerFull oas={oas} />
    </div>)
}

export default EditorViewer