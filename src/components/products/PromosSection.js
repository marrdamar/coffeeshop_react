import React, { useEffect, useMemo, useState } from "react";
import CardPromos from "./CardPromos";
import Loader from "../Loader";

import { getPromos } from "../../utils/https/promos";

function PromosSection() {
  const controller = useMemo(() => new AbortController(), []);

  const [dataPromo, setDataPromo] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(dataPromo)
  const fetchData = async () => {
    try {
      const result = await getPromos(controller);
      // console.log(result);
      if (result.status === 200) {
        setIsLoading(false);
        setDataPromo(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(dataPromo);

  return (
    <>
      <h1 className="text-2xl font-bold text-secondary mt-7">Promo for you</h1>
      <p className="text-xs max-w-[240px] text-center my-11">
        Coupons will be updated every weeks. Check them out!
      </p>
      {/* <!-- CARD PROMO --> */}
      <div className="flex relative justify-center">
        {isLoading ? (
          <Loader />
        ) : (
          dataPromo.map((promo) => (
            <CardPromos
              key={promo.id}
              id={promo.id}
              prodId={promo.product_id}
              prodName={promo.title}
              img={promo.image}
              code={promo.coupon_code}
              discount={promo.discount}
              desc={promo.coupon_desc}
              expired={promo.coupon_expired}
            />
          ))
        )}
      </div>
      <button className="btn w-[284px] h-16 text-white bg-secondary rounded-2xl mt-10 font-popins">
        Apply Coupon
      </button>
      <div className="mt-28">
        <h5 className="text-sm font-bold">Terms and Condition</h5>
        <ol className="text-sm list-decimal list-inside">
          <li>You can only apply 1 coupon per day</li>
          <li>It only for dine in</li>
          <li>Buy 1 get 1 only for new user</li>
          <li>Should make member card to apply coupon</li>
        </ol>
      </div>
    </>
    // <>
    //  <main className="flex flex-col lg:flex-row font-rubik font-extrabold text-txtPrimary">
    //             <section className="w-full md:w-[400px] xl:w-[440px] flex items-center lg:items-start justify-center text-center py-7 px-5 border-[0.5px] border-solid border-b-[#797171]">
    //                 <div className="flex flex-col justify-center items-center">
    //                     <h2 className="pb-6 text-2xl text-secondary">Promo for you</h2>
    //                     <p className="pb-6 text-xs font-normal text-black">Coupons will be updated every weeks. Check them out!</p>

    //                     {promos.data?.filter((d, i, arr) => arr[i] === arr[showPromo]).map((data, i) => {
    //                         return (
    //                             <div className={`mb-7 text-black w-[284px] h-[472px] rounded-[20px] text-center relative ${showPromo % 2 === 0 ? 'bg-primary' : 'bg-secondary text-white'
    //                                 }`} key={i}>
    //                                 <div className="flex flex-col justify-around h-2/3 p-[10%]">
    //                                     <div className="w-[120px] h-[120px] rounded-full overflow-hidden mx-auto relative">
    //                                         <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={data.pict_url} alt="menu" />
    //                                     </div>
    //                                     <h3 className="font-extrabold text-xl ">{data.name}<br />{Math.floor(data.discount * 100)}% OFF</h3>
    //                                     <p className="font-normal text-sm" >{data.description}</p>
    //                                 </div>
    //                                 <div className="border-dashed border-t-[1px] border-black h-1/3 flex flex-col justify-around">
    //                                     <p className="text-base font-normal">COUPON CODE</p>
    //                                     <p className="font-bold text-4xl">{data.coupon_code}</p>
    //                                     <p className="font-normal text-sm">Valid until October 10th 2020</p>
    //                                 </div>
    //                                 <div className="absolute flex justify-between w-full top-1/2 bottom-1/2">
    //                                     <button type="button" className={`w-10 h-10 bg-gray-600/70 rounded-md text-xl opacity-20 hover:opacity-100 ${showPromo === 0 ? 'invisible' : 'visible'}`} onClick={() => setShowPromo((prev) => prev - 1)}>&#60;</button>
    //                                     <button type="button" className={`w-10 h-10 bg-gray-600/70 rounded-md text-xl opacity-20 hover:opacity-100 ${showPromo === promos.data?.length - 1 ? 'invisible' : 'visible'}`} onClick={() => setShowPromo((prev) => prev + 1)}>&#62;</button>
    //                                 </div>
    //                             </div>
    //                         )
    //                     })}

    //                     <button className="bg-secondary text-white py-5 px-20 border-none rounded-[20px] font-bold text-base" onClick={insertPromo}>Apply Coupon</button>
    //                     <div className="font-rubik text-sm font-normal text-left pt-28">
    //                         <p className="font-bold text-sm pb-1">Terms and Condition</p>
    //                         <ol className="p-0 ">
    //                             <li>You can only apply 1 coupon per day</li>
    //                             <li>It only for dine in</li>
    //                             <li>Buy 1 get 1 only for new user</li>
    //                             <li>Should make member card to apply coupon</li>
    //                         </ol>
    //                     </div>
    //                 </div>
    // </section>
    // </main>
    // </>
  );
}

export default PromosSection;
