import React, { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import OrderProduct from "../../components/forPages/OrderProduct";
import NothingCart from "../../components/forPages/NothingCart";
import { getPromos } from "../../utils/https/promos";
import { counterAction } from "../../redux/slices/counter";
import ModalMsg from "../../components/ModalMgs";
import { addTransactions } from "../../utils/https/transaction";
import ModaltoCart from "../../components/ModalMgs/ModaltoCart";
import { activePromoAction } from "../../redux/slices/activePromo";

function YourCart() {
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const cartState = state.counter;
  const userState = state.user.data;
  // const promoDiscount = state.activePromo;
  const [isLoading, setIsLoading] = useState(userState === null ? true : false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [msg, setMsg] = useState("");
  const [payMethod, setPayMethod] = useState(0);
  const [dataPromo, setDataPromo] = useState([]);  
  console.log(cartState)

  const changePayment = (event) => {
    console.log(event.target.value);
    setPayMethod(event.target.value);
  };
  console.log(dataPromo)
  const submitHandler = async () => {
    if (cartState.shoppingCart.length < 1) {
      setMsg("Nothing Products on Your Cart");
      setIsModalOpen(true);
      return;
    }
    if (payMethod === 0) {
      setMsg("Payment Method Not Selected");
      setIsModalOpen(true);
      return;
    }

    const dataShoppingCart = cartState.shoppingCart.map((item) => {
      const { img, prodName, ...newItem } = item;
      if (img || prodName) console.log("");
      return newItem;
    });

    const data = {
      promo_id: 2,
      deliveries_id: cartState.deliveries_id,
      payment_id: payMethod,
      notes: cartState.notes,
      products: dataShoppingCart,
      sizes_id: cartState.size
    };
    console.log(data);
    setIsLoading(true);
    try {
      const result = await addTransactions(data, controller);
      console.log(result);
      console.log(data)
      setIsLoading(false);
      setIsConfirmed(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    dispatch(counterAction.resetCounter());
  };

  const promoProduct = async () => {
    try {
      const result = await getPromos(controller);
      // console.log(result);
      if (result.status === 200) {
        setIsLoading(false);
        setDataPromo(result.data.data);
      }
      dispatch(activePromoAction.submitPromo());
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    promoProduct();
    document.title = "Coffee Shop - Your Cart";
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  const onCart = cartState.shoppingCart;
  let subtotalOnCart = 0;
  cartState.shoppingCart.forEach((prod) => {
    subtotalOnCart += prod.subtotal;
  });
  const taxFee = subtotalOnCart * 11 / 100;
  let shipping = cartState.deliveries_id == 2 ? 10000 : 0;
  // if (cartState.delivery == 2) shipping = 10000;
  const grandTotal = subtotalOnCart + taxFee + shipping;
  // console.log(cartState);
  // console.log(subtotalOnCart);
  // console.log(taxFee);
  console.log(onCart)
  console.log(grandTotal);
  return (
    <>
      <Header title="yourcart" />

      {isLoading ? (
        <Loader />
      ) : (
        <main className="hero-transaction w-full h-auto flex justify-center mt-14 md:mt-28">
          <div className="w-full md:w-4/5 mx-[5%] md:mx-0 max-width mb-32 flex flex-col items-center">
            <h1 className="font-bold text-2xl md:text-4xl md:self-start text-white drop-shadow-lg my-8 md:my-14">
              Checkout your item now!
            </h1>
            <div className="w-full flex flex-col md:flex-row gap-6 md:gap-20 lg:gap-40">
              <div className="flex w-full flex-col p-5 md:p-11 rounded-2xl bg-white">
                <h2 className="font-bold text-xl md:text-3xl mb-16 self-center">
                  Order Summary
                </h2>

                {cartState.shoppingCart.length < 1 ? (
                  <NothingCart />
                ) : (
                  onCart.map((product) => (
                    <OrderProduct
                      key={product.id}
                      img={product.img}
                      prodName={product.prodName}
                      size={product.size}
                      qty={product.qty}
                      subtotal={product.subtotal}
                    />
                  ))
                )}

                <hr className="border border-grey mb-5" />
                <p className="flex justify-between">
                  {/* SUBTOTAL <span>IDR {cartState.shoppingCart[0].subtotal}</span> */}
                </p>
                <p className="flex justify-between">
                  TAX & FEES <span>IDR {taxFee.toLocaleString("id-ID")}</span>
                </p>
                <p className="flex justify-between">
                  SHIPPING <span>IDR {shipping.toLocaleString("id-ID")}</span>
                </p>
                <h5 className="font-bold text-xl flex justify-between mt-4">
                  TOTAL <span>IDR {grandTotal.toLocaleString("id-ID")}</span>
                </h5>
              </div>

              <div className="flex w-full flex-col">
                <h3 className="font-bold text-2xl text-white drop-shadow-2xl mb-2 md:mb-5">
                  Address details
                </h3>
                <div className="p-5 md:px-11 md:py-9 rounded-2xl bg-white mb-5 md:mb-10">
                  <h4 className="font-bold">
                    Delivery <span className="font-normal">to</span>
                  </h4>
                  <p className="border-t border-b border-grey">
                    {userState.address}
                  </p>
                  <p>{userState.phone}</p>
                </div>

                <h3 className="font-bold text-2xl text-white drop-shadow-2xl mb-2 md:mb-5">
                  Payment method
                </h3>
                <div className="p-5 md:px-11 md:py-9 rounded-2xl bg-white mb-8">
                  <label
                    htmlFor="card"
                    className="flex items-center gap-2 text-xl my-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="payment_id"
                      id="card"
                      value={1}
                      onChange={changePayment}
                    />
                    <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-500">
                      <i className="bi bi-credit-card-2-front-fill text-white"></i>
                    </span>
                    Card
                  </label>
                  <label
                    htmlFor="bank"
                    className="flex items-center gap-2 text-xl cursor-pointer py-2 border-t border-b border-grey"
                  >
                    <input
                      type="radio"
                      name="payment_id"
                      id="bank"
                      value={2}
                      onChange={changePayment}
                    />
                    <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary">
                      <i className="bi bi-bank2 text-white"></i>
                    </span>
                    Bank Account
                  </label>
                  <label
                    htmlFor="cod"
                    className="flex items-center gap-2 text-xl my-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="payment_id"
                      id="cod"
                      value={3}
                      onChange={changePayment}
                    />
                    <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary">
                      <i className="bi bi-truck text-white"></i>
                    </span>
                    Cash on Delivery
                  </label>
                </div>

                <button
                  onClick={submitHandler}
                  className="btn h-20 text-xl text-white bg-secondary rounded-2xl shadow-lg shadow-secondary"
                >
                  Confirm and Pay
                </button>
                <ModalMsg
                  msg={msg}
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                />
                <ModaltoCart
                  msg="Transactions Confirmed..."
                  isOpen={isConfirmed}
                  onClose={handleCloseModal}
                />
              </div>
            </div>
          </div>
        </main>
      )}

      <Footer />
    </>
  );
}

export default YourCart;
