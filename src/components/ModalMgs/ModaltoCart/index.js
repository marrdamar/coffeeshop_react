import React, { useEffect } from "react";

function ModaltoCart({ isOpen, onClose, msg }) {
  // const [isShow, setIsShow] = useState(isOpen);
  useEffect(() => {
    setTimeout(() => {
      onClose();
      // setIsShow(!isOpen);
    }, 5000);
  });

  return (
    <>
      {isOpen && (
        <div className="fixed top-[20%] left-[25%] md:left-[35%] z-[5] w-1/2 md:w-[30%] mt-auto flex bg-secondary/80 rounded-md p-5 md:text-2xl justify-between text-primary shadow-lg shadow-secondary/80">
          {msg}
          <i className="bi bi-info-circle"></i>
        </div>
      )}
    </>
  );
}

export default ModaltoCart;
