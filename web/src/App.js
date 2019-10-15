import React from "react";
import "./App.scss";
import { NavigationBar } from "./components/containerNavBar/NavigationBar";
import { Dashboard } from "./components/containerDashboard/Dashboard";
import Virtulization from "./components/containerVirtulization/Virtulization";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HashRouter, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Row className="container-fluid">
        <Col lg={1} md={1} sm={1} className="nav-bar">
          <NavigationBar></NavigationBar>
        </Col>
        <Col lg={11}>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/virt" component={Virtulization} />
        </Col>
      </Row>
    </HashRouter>
  );
}

export default App;
