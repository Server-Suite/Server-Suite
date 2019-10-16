import React from "react";
import Badge from "react-bootstrap/Badge";
import { Card } from "primereact/card";
import { TieredMenu } from "primereact/tieredmenu";
import { Button } from "primereact/button";

import "./DockerImages.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
export default class DockerImages extends React.Component {
  state = {
    items: [
      {
        label: "Pull",
        icon: "pi pi-refresh",
        command: e => {
          console.log(e);
        }
      },
      {
        label: "Delete",
        icon: "pi pi-times",
        command: e => {
          console.log(e);
        }
      }
    ]
  };
  render() {
    const { images } = this.props;
    if (typeof images === "object" && images !== null) {
      return (
        <Row>
          {" "}
          {images.data.map((image, index) => {
            return (
              <Image image={image} items={this.state.items} key={index}></Image>
            );
          })}
        </Row>
      );
    }
    return "";
  }
}
const Image = ({ image, items }) => {
  let menu = null;
  return (
    <Col lg={3} sm={12} md={4}>
      <TieredMenu model={items} popup={true} ref={el => (menu = el)} />
      <Card title={image.RepoTags[0]} subTitle="SubTitle">
        <div className="docker-image-details">
          <p>
            Size:<Badge variant="warning">{image.Size / 100000}Mb</Badge>
          </p>
          <p>
            SHA:<Badge variant="info">{image.Id.slice(0, 13)}</Badge>
          </p>
        </div>
        <Button
          label="Show"
          icon="pi pi-bars"
          onClick={event => menu.toggle(event)}
        />

        {/* <SplitButton
          label="Image"
          icon="pi pi-options"
          model={items}
        ></SplitButton> */}
      </Card>
    </Col>
  );
};
