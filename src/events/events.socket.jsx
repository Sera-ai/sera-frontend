import { io } from "socket.io-client";
export const socket = io(
  `wss://${window.location.hostname}:${__BE_ROUTER_PORT__}`,
  { path: "/sera-socket-io" }
);
import { toast } from "react-toastify";

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
    <div className="flex flex-row w-full h-full">
      <div
        className="flex flex-col h-full w-full"
        style={{
          color: "#fff",
          fontSize: 12,
        }}
      >
        <span
          style={{
            fontWeight: "bold",
            color: "#a589e7",
            textTransform: "uppercase",
            fontSize: 8,
          }}
        >
          {eventText(event.event)}
        </span>
        <span>On {camelCaseToCapitalizedSpace(event.type)}</span>
      </div>
      <div className="flex h-full items-center justify-center mt-2 pr-2">
        <div
          style={{
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 1,
            paddingBottom: 1,
            borderRadius: 3,
            borderColor: "#dddddd70",
            borderWidth: 1,
            backgroundColor: "#00000060",
            color: "#fff",
            fontSize: 10,
            whiteSpace: "nowrap",
            cursor: "pointer",
          }}
        >
          View Event
        </div>
      </div>
    </div>
  );
};
