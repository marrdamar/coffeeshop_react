import React from "react";

function OrderProduct(props) {
  // console.log(props);
  return (
    <div className="flex mb-5 gap-3 items-center">
      <span className="w-20 h-24 rounded-3xl border overflow-hidden">
        <img
          src={props.img}
          alt="image-products"
          className="h-full object-cover"
        />
      </span>
      <div className="mr-auto">
        <h3>{props.prodName}</h3>
        <p>x{props.qty}</p>
        <p>
          {props.size === 1
            ? "Regular"
            : props.size === 2
            ? "Large"
            : "Extra Large"}
        </p>
      </div>
      <h4>IDR {props.subtotal}</h4>
    </div>
  );
}

export default OrderProduct;
