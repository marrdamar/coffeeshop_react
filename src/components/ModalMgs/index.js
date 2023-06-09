import React from "react";

function ModalMsg({ isOpen, onClose, msg }) {
  const handleClick = (event) => {
    event.stopPropagation();
  };
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed z-50 w-screen h-screen bg-slate-800/90 flex justify-center items-center top-0 left-0"
        >
          <div
            onClick={handleClick}
            className="w-4/5 md:w-1/3 py-10 px-6 flex flex-col rounded-xl bg-white"
          >
            <h1 className="text-4xl py-10 text-center text-secondary font-bold">
              {msg}
            </h1>
            <button
              onClick={onClose}
              className="btn mt-10 bg-primary rounded-md py-3"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalMsg;
