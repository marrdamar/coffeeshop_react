import React, { useState, useMemo } from 'react';
// import { useDispatch } from "react-redux";
// import { userAction } from "../../redux/slices/auth";
// import { counterAction } from "../../redux/slices/counter";
// import { useNavigate } from "react-router-dom";
// import Loader from '../Loader';
import { addProduct } from '../../utils/https/products';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProduct() {

  const controller = useMemo(() => new AbortController());
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [names, setNames] = useState('');
  const [categories, setCategories] = useState('');
  const [prices, setPrices] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [imageShow, setImageShow] = useState('');
  //   console.log(date);
  // const [isLoading, setIsLoading] = useState(false);
  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  const handleProduct = async () => {
    // setIsLoading([true);
    const payload = {
      names: names,
      categories_id: categories,
      prices: prices,
      desc_product: desc,
      image: image[0],
    }


    try {
      const result = await addProduct(controller, payload, image);
      console.log(result);
      setShowModal(false);
      toast.success("Produk Berhasil Ditambahkan!", {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setNames(null);
      setCategories(null);
      setDesc(null);
      setImage(null);
      setImageShow(null);
      setPrices(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = (e) => {
    console.log(e.target.files);
    setImage(e.target.files)
    setImageShow(URL.createObjectURL(e.target.files[0]));
  }
  const handleModalProduct = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={handleModalProduct} className="btn w-[284px] flex gap-10 h-16 text-white bg-green rounded-2xl mt-10 mb-10 font-popins">
        Add Products
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
              <label htmlFor="names">Names :</label>
              <input
                type="text"
                id="names"
                name="names"
                value={names}
                onChange={(e) => setNames(e.target.value)}

                placeholder="*Input Names Product, ex : Americano Discount"
                className="px-3 py-4 mb-5 border-b-2 border-secondary"
              />
              <label htmlFor="categories">Category (percentage) :</label>
              <input
                type="number"
                id="categories"
                name="categories"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                placeholder="*Just Input Number, ex: 20"
                className="px-3 py-4 mb-8 border-b-2 border-secondary focus:border-none"
              />
              <label htmlFor="prices">Prices :</label>
              <input
                type="number"
                id="prices"
                name="prices"
                value={prices}
                onChange={(e) => setPrices(e.target.value)}
                placeholder="*Input Description of Promo, ex: Buy This Coffee and get 10% OFF"
                className="px-3 py-4 mb-8 border-b-2 border-secondary focus:border-none"
              />
              <label htmlFor="desc">Description :</label>
              <input
                type="text"
                id="desc"
                name="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="*Input Code for Coupon Promo (5 digit), ex: DM4RW"
                className="px-3 py-4 mb-8 border-b-2 border-secondary focus:border-none"
              />
              <input
                type="file"
                id="file-img"
                name="image"
                onChange={handleImage}
                className="hidden"
              />
              <label
                htmlFor="file-img"
                className="btn w-8 h-8 flex justify-center items-center rounded-full bg-secondary cursor-pointer absolute mt-[34vw] ml-[160px]"
              >
                <i className="bi bi-pencil text-white"></i>
              </label>
              <img
                src={
                  // profPict === ""
                  //   ? dataUser.profile_image
                  //   : URL.createObjectURL(profPict)
                  imageShow
                }
                alt="image"
                className="w-[200px] h-[200px] text-center rounded-full border-2 overflow-hidden"
              />

              <button
                type="button"
                onClick={handleProduct}
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


export default AddProduct;