import React, { Component } from "react";

import withNavigate from "../../utils/wrapper/withNavigate";

export class CardProducts extends Component {
  // constructor(props) {
  //   super();
  //   console.log(props);
  // }

  handleNavigate(to) {
    this.props.navigate(to);
  }
  
  render() {
    console.log(this.props)
    return (
      <div
        onClick={() => this.handleNavigate(`/products/${this.props.id}`)}
        className="w-40 h-52 p-4 pt-0 rounded-3xl shadow-lg relative flex flex-col justify-end items-center cursor-pointer hover:scale-[1.1] hover:ease-in-out"
      >
        <div className="w-32 h-32 top-[-55px] absolute rounded-full overflow-hidden border">
          <img src={this.props.image} alt="" className="object-cover" />
          {/* w-full h-auto -translate-y-6 */}
        </div>
        <h2 className="font-black text-xl text-center mb-1 font-popins">
          {this.props.prodName}
        </h2>
        <h3 className="font-bold text-lg text-secondary font-popins">
          IDR {this.props.prices.toLocaleString("id-ID")}
        </h3>
      </div>
    );
  }
}

export default withNavigate(CardProducts);
