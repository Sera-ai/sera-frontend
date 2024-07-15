import React, { useState, useEffect } from 'react';
import JsonViewerFull from './partials/Partials.Events.JsonViewer';
import { AppContext } from '../../../provider/Provider.State';
import { eventInventory } from '../../../provider/Provider.Data';
import { useParams } from 'react-router-dom';

function Viewer() {

  const { eventId } = useParams();

  const [eventJSON, setEventJSON] = useState("")

  useEffect(() => {
      const grabEvent = async () => {
        try {
          const eventData = await eventInventory({ id: eventId });
          setEventJSON(JSON.stringify(eventData[0]))
        } catch (e) {
          console.warn(e);
        }
      };
      grabEvent();
  }, []);

  return (

    <div className="flex w-full h-screen h-full">
      {eventJSON && <JsonViewerFull oas={eventJSON} />}
    </div>

  );
}

export default Viewer;