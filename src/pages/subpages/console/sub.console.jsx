import React, { Component, useContext } from "react";
import Terminal from "react-console-emulator";
import { toast } from "react-toastify";
import { EventDesign } from "../../../events/events.socket";
import { AppContext } from "../../../provider/Provider.State";
import { getSeraAISearch } from "../../../provider/Provider.Data";

function Console() {
  const { hostInventory, setState } = useContext(AppContext);

  const commands = {
    echo: {
      description: "Echo a passed string.",
      usage: "echo <string>",
      fn: (...args) => args.join(" "),
    },
    resetHost: {
      description: "Reset the Host to be empty.",
      usage: "resetHost",
      fn: function () {
        setState((prevState) => ({
          ...prevState,
          hostInventory: [],
        }));
        return "emptied";
      },
    },
    toast: {
      description: "toast",
      usage: "toast",
      fn: function () {
        const notify = () =>
          toast(
            <EventDesign event={{ event: "sera", type: "seraTestEvent" }} />
          );
        notify();
        return "sent";
      },
    },
    ai: {
      description: "ai <string>",
      usage: "ai",
      fn: async function (...args) {
        const res = await getSeraAISearch({
          searchTerm: args.join(" "),
          debug: true,
        });
        return JSON.stringify(res);
      },
    },
  };

  return (
    <Terminal
      commands={commands}
      welcomeMessage={""}
      style={{ backgroundColor: "#0c0d0e" }}
      promptLabel={"user@Sera:~$"}
    />
  );
}
export default Console;
