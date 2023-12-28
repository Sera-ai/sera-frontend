import React, { useState, useEffect } from "react";
import ReportDetails from "./Sub.Issues.Report.Details";
import Header from "../../../components/Components.Header.Title";

function Report() {
  return (
    <Header
      title={"Issue Reports"}
      subtitle={
        "Below is an inventory list of any issues that have not been resolved"
      }
    >
      <ReportDetails />
    </Header>
  );
}

export default Report;
