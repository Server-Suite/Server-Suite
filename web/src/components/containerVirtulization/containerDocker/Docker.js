import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { get } from "../../../utils/HttpCommand";
import DockerImages from "./componentsDocker/DockerImages";
import { ProgressBar } from "primereact/progressbar";

export default class Docker extends React.Component {
  state = {
    activeIndex: 0,
    images: null,
    containers: null,
    volumes: null,
    networks: null
  };
  componentDidMount() {
    this.getDockerData();
  }
  getDockerData = () => {
    get("/docker/images/json")
      .then(response => {
        this.setState({ images: response });
      })
      .catch(err => {
        console.log(err);
      });
    get("/docker/containers/json")
      .then(response => {
        this.setState({ containers: response });
      })
      .catch(err => {
        console.log(err);
      });
    get("/docker/volumes")
      .then(response => {
        this.setState({ volumes: response });
      })
      .catch(err => {
        console.log(err);
      });
    get("/docker/networks")
      .then(response => {
        this.setState({ networks: response });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <TabView
        activeIndex={this.state.activeIndex}
        onTabChange={e => this.setState({ activeIndex: e.index })}
      >
        <TabPanel header="Images 🖼️">
          {!this.state.images ? (
            <ProgressBar
              mode="indeterminate"
              style={{
                height: "6px",
                borderRadius: "5px"
              }}
            ></ProgressBar>
          ) : null}
          <DockerImages images={this.state.images}></DockerImages>
        </TabPanel>
        <TabPanel header="Containers 📦">
          {!this.state.containers ? (
            <ProgressBar
              mode="indeterminate"
              style={{
                height: "6px",
                borderRadius: "5px"
              }}
            ></ProgressBar>
          ) : (
            JSON.stringify(this.state.containers)
          )}
        </TabPanel>
        <TabPanel header="Volume 💽">
          {!this.state.volumes ? (
            <ProgressBar
              mode="indeterminate"
              style={{
                height: "6px",
                borderRadius: "5px"
              }}
            ></ProgressBar>
          ) : (
            JSON.stringify(this.state.volumes)
          )}
        </TabPanel>
        <TabPanel header="Networks 🌐">
          {!this.state.networks ? (
            <ProgressBar
              mode="indeterminate"
              style={{
                height: "6px",
                borderRadius: "5px"
              }}
            ></ProgressBar>
          ) : (
            JSON.stringify(this.state.networks)
          )}
        </TabPanel>
      </TabView>
    );
  }
}
