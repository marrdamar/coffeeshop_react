import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { get } from "../localStorage";
import store from "../../redux/store";

function PrivateRoute({ children, ...restProps }) {
  const navigate = useNavigate();
  useEffect(() => {
    // const token = get("coffeeShop-token");
    const storeToken = store.getState();
    const token = storeToken.user.token;
    if (!token) {
      navigate("/login", {
        replace: true,
      });
    }
  }, []);
  // return <>{children}</>;
  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { ...restProps });
      })}
    </>
  );
}

export default PrivateRoute;
