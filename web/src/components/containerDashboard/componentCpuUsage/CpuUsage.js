import React from "react";
import { colors } from "../../../constants/appConstants";
import { get } from "../../../utils/HttpCommand";
import { Chart } from "primereact/chart";
import { ToggleButton } from "primereact/togglebutton";
import { ProgressBar } from "primereact/progressbar";
import { Slider } from "primereact/slider";
import { Dialog } from "primereact/dialog";

import Col from "react-bootstrap/Col";

export default class CpuUsage extends React.Component {
  state = {
    mainDataSet: null,
    isRealTime: false,
    realTimeInterval: true,
    refreshIntervalInSec: null
  };
  componentWillUnmount() {
    var interval_id = window.setInterval("", 9999); // Get a reference to the last
    // interval +1
    for (var i = 1; i < interval_id; i++) window.clearInterval(i);
  }
  componentDidMount() {
    this.get_cpu_per_core();
    setInterval(() => {
      this.get_cpu_per_core();
    }, 1000);
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
    const options2 = {
      animation: false,
      legend: {
        display: false
      }
    };
    return (
      <React.Fragment>
        <Dialog
          header="CPU Utilization 📈"
          visible={this.state.visible}
          modal={true}
          onHide={() => this.setState({ visible: false })}
        >
          <Chart
            className="cup-per-core"
            type="line"
            data={this.state.mainDataSet}
            height="500px"
            width="950px"
            options={options}
          />
        </Dialog>
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
          <div onClick={e => this.setState({ visible: true })}>
            <Chart
              className="cup-per-core"
              type="line"
              data={this.state.mainDataSet}
              height="300px"
              width="300px"
              options={options2}
            />
            {/* <ToggleButton
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
            ) : null} */}
          </div>
        </Col>
      </React.Fragment>
    );
  }
}
