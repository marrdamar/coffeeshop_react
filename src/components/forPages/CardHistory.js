import React, { useMemo, useState } from "react";
import { deleteTransaction } from "../../utils/https/transaction";

function CardHistory(props) {
  const controller = useMemo(() => new AbortController(), []);
  const [isAction, setIsAction] = useState(false);

  const handleCard = () => {
    
    // if (props.status === 1) {
    //   return props.status(`pending`)
    // }
    setIsAction(true);
  };
  const handleCancel = (event) => {
    event.stopPropagation();
    setIsAction(false);
  };

  const deleteHandle = async () => {
    try {
      console.log(props.transactionId, props.prodId, controller);
      const result = await deleteTransaction(
        props.transactionId,
        props.prodId,
        controller
      );
      // console.log(result);
      if (result.status === 200) {
        console.log("data terhapus");
        props.onDelete();
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(props);
  return (
    <div
      onClick={handleCard}
      className={`${
        isAction ? "bg-white/60" : "bg-white"
      } w-[394px] min-h-[130px] px-5 flex rounded-2xl items-center relative`}
    >
      <div className="w-[75px] h-[75px] rounded-full border mr-4 overflow-hidden">
        <img
          src={props.image}
          alt="image-products"
          className={isAction && "opacity-60"}
        />
      </div>
      <div className="w-2/3">
        <h2 className="font-bold text-2xl">{props.name}</h2>
        
        <p className="text-secondary">
          {props.status}
        </p>
        <p className="text-secondary">
          {props.price.toLocaleString("id-ID")}
          {/* <span className="ml-4">
            ( x{props.qty}{" "}
            {props.size === 1
              ? "Regular "
              : props.size === 2
              ? "Large "
              : "Extra Large "}
            )
          </span> */}
        </p>
        <p className="text-secondary">
          {props.methodDeliv} at {new Date(props.orderAt).toLocaleDateString()}
        </p>
      </div>
      {isAction && (
        <div className="absolute -top-5 -right-5 flex gap-3">
          <button
            onClick={deleteHandle}
            className="btn w-10 h-10 rounded-full bg-secondary"
          >
            <i className="bi bi-trash3 text-white text-lg"></i>
          </button>
          <button
            onClick={handleCancel}
            className="btn w-10 h-10 rounded-full bg-primary"
          >
            <i className="bi bi-x text-secondary text-3xl"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default CardHistory;
