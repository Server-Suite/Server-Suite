import React from "react";
import { Panel } from "primereact/panel";
import Docker from "./containerDocker/Docker";
import "./Virtulization.scss";

export default class Virtulization extends React.Component {
  render() {
    return (
      <Panel header="🐋 Docker" className="panel" toggleable={true}>
        <Docker></Docker>
      </Panel>
    );
  }
}
