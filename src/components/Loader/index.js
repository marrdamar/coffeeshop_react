import React, { Component } from "react";

export class Loader extends Component {
  render() {
    return (
      <div className="w-full top-0 left-0 min-h-[30vh] flex justify-center items-center">
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
        </div>
        {/* <h1 className="font-bold text-4xl">...Loading...</h1> */}
      </div>
    );
  }
}

export default Loader;
