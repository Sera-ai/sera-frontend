import { io } from "socket.io-client";
export const socket = io(
  `wss://${window.location.hostname}:${__BE_ROUTER_PORT__}`,
  { path: "/sera-socket-io" }
);
import { toast } from "react-toastify";
import {
  EventsIcon,
} from "../assets/assets.svg";

export const useSocket = () => {
  const notify = (str) => toast(str);

  function onConnectSocket() {
    notify("Socket Connected");
    console.log("socket connected");
  }

  socket.on("connectSuccessful", onConnectSocket);
  socket.on("eventNotification", (event) => {
    notify(<EventDesign event={event} />, {
      onOpen: (props) => console.log(props),
      onClick: () => alert("hi"),
    });
  });
};

export const EventDesign = ({ event }) => {
  const eventText = (event) => {
    switch (event) {
      case "sera":
        return "New Sera Event";
      case "builder":
        return "New Builder Event";
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
      <div className=" space-y-1">
        <div className="nodeTitle">{eventText(event.event)}</div>
        <div className="nodeSubtitle">
          On {camelCaseToCapitalizedSpace(event.type)}
        </div>
      </div>
    </div>
  );
};
