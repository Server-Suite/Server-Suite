import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { get } from "../../../utils/HttpCommand";
import DockerImages from "./componentsDocker/DockerImages";
import dockerFailed from "../../../assets/img/docker-error.png";
import { Growl } from "primereact/growl";
import ProgressBarFor from "../../_sharedComponents/ProgressBarFor";

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
        this.growl
          ? this.growl.show({
              severity: "warn",
              summary: "Can't connent to Docker",
              detail: <img alt="PrimeReact" src={dockerFailed} width="100px" />
            })
          : console.log(err);
        this.setState({ images: "Error while getting data" });
      });
    get("/docker/containers/json")
      .then(response => {
        this.setState({ containers: response });
      })
      .catch(err => {
        this.setState({ containers: "Error while getting data" });
        console.log(err);
      });
    get("/docker/volumes")
      .then(response => {
        this.setState({ volumes: response });
      })
      .catch(err => {
        this.setState({ volumes: "Error while getting data" });
        console.log(err);
      });
    get("/docker/networks")
      .then(response => {
        this.setState({ networks: response });
      })
      .catch(err => {
        this.setState({ networks: "Error while getting data" });
        console.log(err);
      });
  };
  render() {
    return (
      <React.Fragment>
        <TabView
          activeIndex={this.state.activeIndex}
          onTabChange={e => this.setState({ activeIndex: e.index })}
        >
          <TabPanel header="Images 🖼️">
            {!this.state.images ? (
              <ProgressBarFor object={this.state.images}></ProgressBarFor>
            ) : (
              JSON.stringify(this.state.images)
            )}
            <DockerImages images={this.state.images}></DockerImages>
          </TabPanel>
          <TabPanel header="Containers 📦">
            {!this.state.containers ? (
              <ProgressBarFor object={this.state.containers}></ProgressBarFor>
            ) : (
              JSON.stringify(this.state.containers)
            )}
          </TabPanel>
          <TabPanel header="Volume 💽">
            {!this.state.volumes ? (
              <ProgressBarFor object={this.state.volumes}></ProgressBarFor>
            ) : (
              JSON.stringify(this.state.volumes)
            )}
          </TabPanel>
          <TabPanel header="Networks 🌐">
            {!this.state.networks ? (
              <ProgressBarFor object={this.state.networks}></ProgressBarFor>
            ) : (
              JSON.stringify(this.state.networks)
            )}
          </TabPanel>
        </TabView>
        <Growl ref={el => (this.growl = el)} />
      </React.Fragment>
    );
  }
}
