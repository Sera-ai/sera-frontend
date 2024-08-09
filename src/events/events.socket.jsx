import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { EventsIcon } from "../assets/assets.svg";
import { AppContext } from "../provider/Provider.State";

const retryInterval = 1000; // 1 second

const notify = (str) => toast(str);

function onConnectSocket() {
  notify("Socket Connected");
  console.log("socket connected");
}

// WebSocket connection function
const connectWebSocket = (setState, socketRef) => {
  const socket = new WebSocket(
    `wss://${true ? `${window.location.hostname}:9876` : `backend.sera:9876`}/sera-socket-io`
  );

  // Wrapper for the emit function to keep the existing API
  socket.wsEmit = (event, data) => {
    const message = JSON.stringify({ type: event, ...data });
    socket.send(message);
  };

  socket.onmessage = (event) => {
    const parsedMessage = JSON.parse(event.data);

    switch (parsedMessage.type) {
      case "connectSuccessful":
        console.log(parsedMessage);
        onConnectSocket();
        break;
      case "eventNotification":
        notify(<EventDesign event={parsedMessage} />, {
          onOpen: (props) => console.log(props),
          onClick: () => alert("hi"),
        });
        break;
      case "onHostDataChanged":
        setState((prevState) => ({
          ...prevState,
          hostInventory: parsedMessage.res,
        }));
        notify("New Host Added");
        break;
      default:
        console.log("Unknown message type:", parsedMessage.type);
        break;
    }
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed. Reconnecting...");
    setTimeout(() => connectWebSocket(setState, socketRef), retryInterval); // Attempt to reconnect after 1 second
  };

  socket.onerror = (error) => {
    console.log("WebSocket error:", error);
  };

  socketRef.current = socket;
};

const useSocket = () => {
  const { setState } = useContext(AppContext);
  const socketRef = useRef(null);

  useEffect(() => {
    connectWebSocket(setState, socketRef);

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [setState]);

  return null; // or any JSX you might need to render
};

export { useSocket };

export const EventDesign = ({ event }) => {
  const eventText = (event) => {
    switch (event.event) {
      case "sera":
        return "New Sera Event";
      case "builder":
        return "New Builder Event";
      default:
        return "New Event";
    }
  };

  const camelCaseToCapitalizedSpace = (str) => {
    let result = "";

    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);

      // If uppercase letter and not the first character
      if (char === char.toUpperCase() && i > 0) {
        result += " ";
      }

      // If first character and it's a letter
      if (i === 0 && /[a-zA-Z]/.test(char)) {
        result += char.toUpperCase();
      } else {
        result += char;
      }
    }

    return result;
  };

  return (
    <div className="dndnode">
      <div
        className="dndnodeicon handleLeft scriptBorder"
        style={{ height: 42 }}
      >
        <EventsIcon secondaryColor="#4799ff" size="24" />
      </div>
      <div className="space-y-1">
        <div className="nodeTitle">{eventText(event)}</div>
        <div className="nodeSubtitle">
          On {camelCaseToCapitalizedSpace(event.type)}
        </div>
      </div>
    </div>
  );
};
