import React, { useState, useEffect } from "react";
import ReportDetails from "./Sub.Events.Report.Details";
import Header from "../../../components/custom/Custom.Header.Title";

function Report() {
  return (
    <Header title={"Event Reports"}>
      <ReportDetails />
    </Header>
  );
}

export default Report;
