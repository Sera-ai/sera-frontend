import React, { Component } from "react";
import Terminal from "react-console-emulator";
import { toast } from "react-toastify";
import { EventDesign } from "../../../events/events.socket";

const commands = {
  echo: {
    description: "Echo a passed string.",
    usage: "echo <string>",
    fn: (...args) => args.join(" "),
  },
  toast: {
    description: "toast",
    usage: "toast",
    fn: function () {
      const notify = () => toast(<EventDesign event={{event: "sera", type: "seraTestEvent"}} />);
      notify();
      return "sent";
    },
  },
};

export default class MyTerminal extends Component {
  render() {
    return (
      <Terminal
        commands={commands}
        welcomeMessage={""}
        style={{ backgroundColor: "#0c0d0e" }}
        promptLabel={"user@Sera:~$"}
      />
    );
  }
}
