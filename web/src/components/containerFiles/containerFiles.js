import React from "react";
import { Chart } from "primereact/chart";
import { Card } from "primereact/card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col/";
import { get } from "../../utils/HttpCommand";
import { colors } from "../../constants/appConstants";

export class ContainerFiles extends React.Component {
  state = { fsData: null };
  componentDidMount() {
    get("/fs").then(response => {
      this.setState({ fsData: response });
    });
  }
  render() {
    if (this.state.fsData) {
      return (
        <Row>
          {" "}
          {this.state.fsData.data.map((partition, index) => {
            const key = Object.keys(partition)[0];
            const usage = [
              Object.values(partition)[0].percent,
              100 - Object.values(partition)[0].percent
            ];
            return (
              <Col lg={3} key={index}>
                <Card key={index} subTitle={key} style={{ margin: "10px" }}>
                  {" "}
                  <Chart
                    key={index}
                    type="doughnut"
                    options={{
                      animation: false,
                      legend: {
                        display: false
                      }
                    }}
                    data={{
                      labels: [`Used (${usage[0]}%)`, `Free (${usage[1]})%`],
                      datasets: [
                        {
                          data: usage,
                          backgroundColor: [colors[0], colors.slice(-1)[0]],
                          hoverBackgroundColor: [colors[0], colors.slice(-1)[0]]
                        }
                      ]
                    }}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      );
    } else {
      return null;
    }
  }
}
