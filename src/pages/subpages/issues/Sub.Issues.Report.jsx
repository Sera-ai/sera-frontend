import React, { useState, useEffect } from "react";
import ReportDetails from "./Sub.Issues.Report.Details";
import Header from "../../../components/custom/Custom.Header.Title";

function Report() {
  return (
    <Header title={"Issue Reports"}>
      <ReportDetails />
    </Header>
  );
}

export default Report;
