// import { styles } from "./NavigationBar";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { get } from "../../utils/HttpCommand";
import logo from "../../logo.png";
import "./NavigationBar.scss";
import { Link } from "react-router-dom";
import { OverlayPanel } from "primereact/overlaypanel";

export class NavigationBar extends React.Component {
  state = {
    ipData: {
      ip: null,
      hostname: null,
      city: null,
      region: null,
      country: null,
      loc: null,
      org: null,
      readme: null
    }
  };
  getIpAddress = () => {
    get("/system/loc")
      .then(response => {
        this.setState({ ipData: response.data });
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    return (
      <React.Fragment>
        <OverlayPanel ref={el => (this.op = el)}>
          <Badge variant="success">IP: {this.state.ipData.ip}</Badge>
          <br />
          <Badge variant="primary">
            Hostname: {this.state.ipData.hostname}
          </Badge>
          <br />
          <Badge variant="warning">Country: {this.state.ipData.country}</Badge>
          <br />
          <Badge variant="info">Location: {this.state.ipData.loc}</Badge>
          <br />
        </OverlayPanel>
        <Row className="nav-list">
          <Col>
            <img src={logo} className="logo" alt="logo"></img>
          </Col>
          <Col lg={12}>
            <Link to="/">
              <i className="pi pi-chart-bar" tooltip="Dashboard"></i>
            </Link>
          </Col>
          <Col lg={12}>
            <Link to="/virt">
              <i className="pi pi-sitemap"></i>
            </Link>
          </Col>
          <Col lg={12}>
            <i className="pi pi-folder-open"></i>
          </Col>
          <Col lg={12}>
            <i
              className="pi pi-globe"
              onClick={e => {
                this.op.toggle(e);
                this.getIpAddress();
              }}
            ></i>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
