import React from "react";
import CpuUsage from "./componentCpuUsage/CpuUsage";
import "./Dashboard.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Card } from "primereact/card";
import NetworkUsage from "./componentNetworkUsage/NetworkUsage";

export class Dashboard extends React.Component {
  render() {
    return (
      <Row>
        <Col lg={4}>
          <Card subTitle="CPU" style={{ margin: "10px" }}>
            <CpuUsage></CpuUsage>
          </Card>
        </Col>
        <Col lg={4}>
          <Card subTitle="NETWORK" style={{ margin: "10px" }}>
            <NetworkUsage></NetworkUsage>
          </Card>
        </Col>
      </Row>
    );
  }
}
