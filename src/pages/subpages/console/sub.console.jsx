import React, { Component } from "react";
import Terminal from "react-console-emulator";
import { toast } from "react-toastify";

const commands = {
  echo: {
    description: "Echo a passed string.",
    usage: "echo <string>",
    fn: (...args) => args.join(" "),
  },
  toast: {
    description: "toast",
    usage: "toast <string>",
    fn: function (...args) {
      const data2 = args.join(" ");
      console.log(data2);
      const notify = () => toast(data2);
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
