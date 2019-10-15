import React from "react";
import Badge from "react-bootstrap/Badge";
import { Card } from "primereact/card";
import { SplitButton } from "primereact/splitbutton";

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
    if (images) {
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
  return (
    <Col lg={3} sm={12} md={4}>
      <Card title={image.RepoTags[0]} subTitle="SubTitle">
        <div className="docker-image-details">
          <p>
            Size:<Badge variant="warning">{image.Size / 100000}Mb</Badge>
          </p>
          <p>
            SHA:<Badge variant="info">{image.Id.slice(0, 13)}</Badge>
          </p>
        </div>
        <SplitButton
          label="Image"
          icon="pi pi-options"
          //   onClick={this.save}
          model={items}
        ></SplitButton>
      </Card>
    </Col>
  );
};
