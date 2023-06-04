import React, { useEffect, useMemo, useState } from "react";
import CardPromos from "./CardPromos";
import Loader from "../Loader";

import { getPromos } from "../../utils/https/promos";

function PromosSection() {
  const controller = useMemo(() => new AbortController(), []);

  const [dataPromo, setDataPromo] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
  );
}

export default PromosSection;
