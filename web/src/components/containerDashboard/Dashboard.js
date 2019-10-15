import React from "react";
import CpuUsage from "./componentCpuUsage/CpuUsage";
import "./Dashboard.scss";

export class Dashboard extends React.Component {
  render() {
    return <CpuUsage></CpuUsage>;
  }
}
