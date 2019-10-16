import React from "react";
import { ProgressBar } from "primereact/progressbar";

export default class ProgressBarFor extends React.Component {
  render() {
    const { object } = this.props;
    if (typeof object == "object" && object != null) {
      return null;
    } else {
      return (
        <ProgressBar
          mode="indeterminate"
          style={{
            height: "6px",
            borderRadius: "5px"
          }}
        ></ProgressBar>
      );
    }
  }
}
