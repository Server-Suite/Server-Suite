import React from "react";
import { Chart } from "primereact/chart";
import { Dialog } from "primereact/dialog";
import { get } from "../../../utils/HttpCommand";
import { colors } from "../../../constants/appConstants";

export default class NetworkUsage extends React.Component {
  state = { mainDataSet: null, up: null, down: null };
  getNetworkData = () => {
    get("/network/speed").then(response => {
      this.setState({
        mainDataSet: {
          labels: [...Array(response.data.up.length).keys()],
          datasets: [
            {
              label: "Upload (Kb)",
              data: response.data.up,
              fill: false,
              backgroundColor: colors[7],
              borderColor: colors[7]
            },
            {
              label: "Download (Kb)",
              data: response.data.down,
              fill: false,
              backgroundColor: colors[0],
              borderColor: colors[0]
            }
          ]
        }
      });
      this.setState({ up: response.data.up, down: response.data.down });
    });
  };
  componentDidMount() {
    this.getNetworkData();
    setInterval(() => {
      this.getNetworkData();
    }, 1000);
  }
  render() {
    const options = {
      animation: false
    };
    return (
      <React.Fragment>
        <Dialog
          header="Network Utilization 📈"
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
        <div onClick={e => this.setState({ visible: true })}>
          <Chart
            className="cup-per-core"
            type="line"
            data={this.state.mainDataSet}
            height="300px"
            width="300px"
            options={options}
          />
        </div>
      </React.Fragment>
    );
  }
}
