import React, { useState, useMemo } from 'react';
// import { useDispatch } from "react-redux";
// import { userAction } from "../../redux/slices/auth";
// import { counterAction } from "../../redux/slices/counter";
// import { useNavigate } from "react-router-dom";
// import Loader from '../Loader';
import { addPromos } from '../../utils/https/promos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCoupon() {

  const controller = useMemo(() => new AbortController());
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [title,setTitle] = useState('');
  const [discount,setDiscount] = useState('');
  const [desc,setDesc] = useState('');
  const [code,setCode] = useState('');
  const [productId,setProductId] = useState('');
  const [date,setDate] = useState('');
  // console.log(date);
  // const [isLoading, setIsLoading] = useState(false);
  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  const handlePromo = async () => {
    // setIsLoading([true);
    const payload = {
      coupon_desc : desc,
      coupon_code : code,
      coupon_expired : date,
      discount : discount,
      product_id : productId,
      title : title
    }
    try {
      const result = await addPromos(controller, payload);
      console.log(result);
      setShowModal(false);
      toast.success("Promo Berhasil Ditambahkan!", {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTitle(null);
      setDiscount(null);
      setDesc(null);
      setCode(null);
      setProductId(null);
      setDate(null);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleModalPromo = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <button onClick={handleModalPromo} className="btn w-[284px] flex gap-10 h-16 text-white bg-green rounded-2xl mt-10 font-popins">
      Add Coupon
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>

    </button>
      {showModal && (
              <>

                <div className="fixed z-50 w-screen h-screen bg-slate-800/80 flex justify-center items-center top-0 left-0 overflow-auto">
                  <div
                    // onClick={handleClick}
                    className="w-4/5 md:w-1/2 p-5 flex flex-col rounded-xl bg-white pt-[15vw] px-[2vw]"
                  >
                    <label htmlFor="old-pwd">Title :</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}

                      placeholder="*Input Title Promo, ex : Americano Discount"
                      className="px-3 py-4 mb-5 border-b-2 border-secondary"
                    />
                    <label htmlFor="discount">Discount (percentage) :</label>
                    <input
                      type="number"
                      id="discount"
                      name="discount"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      placeholder="*Just Input Number, ex: 20"
                      className="px-3 py-4 mb-8 border-b-2 border-secondary focus:border-none"
                    />
                    <label htmlFor="description">Description :</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      placeholder="*Input Description of Promo, ex: Buy This Coffee and get 10% OFF"
                      className="px-3 py-4 mb-8 border-b-2 border-secondary focus:border-none"
                    />
                    <label htmlFor="code">Code :</label>
                    <input
                      type="text"
                      id="code"
                      name="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="*Input Code for Coupon Promo (5 digit), ex: DM4RW"
                      className="px-3 py-4 mb-8 border-b-2 border-secondary focus:border-none"
                    />
                    <label htmlFor="product_id">Product Id :</label>
                    <input
                      type="text"
                      id="product_id"
                      name="product_id"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                      placeholder="product id"
                      className="px-3 py-4 mb-8 border-b-2 border-secondary focus:border-none"
                    />
                    <label
                      htmlFor="birthDate"
                      className="font-medium text-xl"
                    >
                      Expired Date Promo
                    </label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birth_date"
                      value={date}
                      // value={
                      //   new Date(date.birth_date)
                      //     .toISOString()
                      //     .slice(0, 10) || ""
                      //   // new Date(dataUser.birth_date).toLocaleDateString(
                      //   //   "id-ID"
                      //   // )
                      // }
                      onChange={(e) => setDate(e.target.value)}
                      className="h-14"
                    />
                    <br></br>
                    <button
                      type="button"
                      onClick={handlePromo}
                      className="items-center h-14 rounded-2xl text-secondary bg-white flex justify-between px-10"
                    >
                      Confirm
                      <i className="bi bi-caret-right-fill text-secondary"></i>
                    </button>

                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="items-center h-14 rounded-2xl text-secondary bg-white flex justify-between px-10"
                    >
                      Cancel
                      <i className="bi bi-caret-right-fill text-secondary"></i>
                    </button>
                  </div>
                </div>
              </>
            )}
            <ToastContainer />
    </>
  );
}


export default AddCoupon;