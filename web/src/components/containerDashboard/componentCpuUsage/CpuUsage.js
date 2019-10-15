import React from "react";
import { colors } from "../../../constants/appConstants";
import { get } from "../../../utils/HttpCommand";
import { Chart } from "primereact/chart";
import { ToggleButton } from "primereact/togglebutton";
import { ProgressBar } from "primereact/progressbar";
import { Slider } from "primereact/slider";

import Col from "react-bootstrap/Col";

export default class CpuUsage extends React.Component {
  state = {
    mainDataSet: null,
    isRealTime: false,
    realTimeInterval: true,
    refreshIntervalInSec: null
  };
  componentDidMount() {
    this.get_cpu_per_core();
  }
  onChangeSlider3(e) {
    this.setState({ refreshIntervalInSec: e.value });
  }
  loadRealTimeGraph = event => {
    console.warn(event.value);
    this.setState({
      isRealTime: event.value
    });
    if (!event.value) {
      clearInterval(this.state.realTimeInterval);
    } else {
      this.setState({
        realTimeInterval: setInterval(() => {
          //   console.warn(event.value);
          this.get_cpu_per_core();
        }, 50 * this.state.refreshIntervalInSec)
      });
    }
  };
  get_cpu_per_core = () => {
    get("/system/core")
      .then(data => {
        let dataSet = [];
        data.data.cores.forEach((element, index) => {
          let core = {
            label: element,
            data: data.data.cpu_per_core[element],
            fill: false,
            backgroundColor: colors[index],
            borderColor: colors[index]
          };
          dataSet.push(core);
        });
        this.setState({
          mainDataSet: {
            labels: [...Array(data.data.cpu_per_core["CORE0"].length).keys()],
            datasets: dataSet
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    const options = {
      animation: false
    };
    return (
      <Col>
        {this.state.isRealTime ? (
          <ProgressBar
            mode="indeterminate"
            style={{
              height: "6px",
              borderRadius: "5px"
            }}
          ></ProgressBar>
        ) : null}
        <Chart
          className="cup-per-core"
          type="line"
          data={this.state.mainDataSet}
          height="500px"
          width="1000px"
          options={options}
        />
        <ToggleButton
          checked={this.state.isRealTime}
          onLabel="Stop Real Time"
          tooltip={this.state.isRealTime ? null : "Not recommended"}
          offLabel={`Load Real Time (${this.state.refreshIntervalInSec /
            20}) secs`}
          onChange={e => this.loadRealTimeGraph(e)}
        />
        {!this.state.isRealTime ? (
          <Slider
            value={this.state.refreshIntervalInSec}
            onChange={e => this.onChangeSlider3(e)}
            step={20}
            style={{ width: "14em" }}
          />
        ) : null}
      </Col>
    );
  }
}
