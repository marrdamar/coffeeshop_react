import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { login } from "../../utils/https/auth";
// import { save } from "../../utils/localStorage";

import { useDispatch } from "react-redux";
import { userAction } from "../../redux/slices/auth";

import logoBrand from "../../assets/icon/logo.svg";
import logoGoogle from "../../assets/icon/icon-google.svg";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import ModalMgs from "../../components/ModalMgs";

function Login() {
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isWrong, setIsWrong] = useState(false);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChangeForm = (event) => {
    setForm((form) => {
      return {
        ...form,
        [event.target.name]: event.target.value,
      };
    });
  };

  const loginHandler = (event) => {
    event.preventDefault();
    if (form.email === "" || form.password === "") {
      setMsg("Input Empty !");
      setIsWrong(true);
      return;
    }
    setIsLoading(true);
    dispatch(
      userAction.loginThunk(
        { email: form.email, password: form.password },
        controller
      )
    )
      .then((result) => {
        if (result.payload.message === "Request failed with status code 401") {
          setIsLoading(false);
          setMsg("Email / Password is Invalid !");
          setIsWrong(true);
          setForm({ ...form, password: "" });
        }
        console.log(result);
        if (result.payload && result.payload.token) {
          setIsLoading(false);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));

    // login(form.email, form.password, controller)
    //   .then((res) => {
    //     // console.log(res.data);
    //     dispatch(userAction.authLogin(res.data));
    //     // const key = "coffeeShop-token";
    //     // save(key, res.data.token);
    //     navigate("/", {
    //       replace: true,
    //     });
    //   })
    //   .catch((err) => console.log(err));
  };

  useEffect(() => {
    document.title = "Coffee Shop - Login";
  }, []);

  return (
    <>
      <section className="w-full flex flex-col md:flex-row">
        {/* <!-- JUMBOTRON --> */}
        <div className="hero-auth w-full md:w-1/2 absolute md:static h-full md:h-auto -z-50"></div>
        {/* <!-- RIGHT CONTENT --> */}
        <div className="z-1 w-full max-w-[720px] flex flex-col pt-3 md:pt-14 md:mr-[10%] bg-white bg-opacity-70">
          <div className="flex px-[5%] md:pl-14">
            <div className="navbrand flex items-center mr-auto gap-4">
              <img src={logoBrand} alt="logo-brand" className="w-8" />
              <h1 className="text-2xl font-bold">Coffee Shop</h1>
            </div>
            <Link
              to="/signup"
              className="btn w-28 md:w-36 h-11 bg-primary text-secondary rounded-3xl shadow-2xl shadow-primary"
            >
              Sign Up
            </Link>
          </div>

          <form className="flex flex-col px-[10%] md:px-0 md:mt-[10%] md:ml-[10%] mb-[26%]">
            <h1 className="font-bold text-2xl md:text-4xl text-secondary my-6 md:mt-0 md:mb-14 text-center">
              Login
            </h1>
            <label htmlFor="email" className="font-bold text-xl mb-3">
              Email Address :
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={form.email}
              onChange={onChangeForm}
              placeholder="Enter your email address"
              className="input-auth mb-8"
            />
            <label htmlFor="password" className="font-bold text-xl mb-3">
              Password :
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={onChangeForm}
              placeholder="Enter your password"
              className="input-auth mb-5"
            />
            <Link
              to="/forgotpwd"
              className="mb-14 font-bold text-xl text-secondary"
            >
              Forgot Password?
            </Link>
            <button
              type="submit"
              onClick={loginHandler}
              className="btn h-14 md:h-[75px] text-xl text-secondary bg-primary rounded-2xl shadow-md shadow-primary mb-7"
            >
              Login
            </button>
            <button
              type="button"
              className="btn h-14 md:h-[75px] text-xl bg-white rounded-2xl shadow-2xl gap-3"
            >
              <img src={logoGoogle} alt="" className="w-6 md:w-7" /> Login with
              Google
            </button>
          </form>
        </div>
      </section>
      {/* <!-- RECLAME --> */}
      <div className="max-width w-4/5">
        <section className="relative top-[-60px] md:top-[-115px] w-full flex justify-center">
          <div className="absolute w-full h-32 md:h-56 p-4 md:px-10 flex flex-col md:flex-row justify-between items-center rounded-xl bg-white shadow-xl max-width">
            <div className="">
              <h1 className="text-lg md:text-4xl font-medium max-w-sm">
                Check our promo today!
              </h1>
              <p className="text-xs md:text-base mb-3">
                Lets see the deals and pick yours!
              </p>
            </div>
            <a
              href=""
              className="btn w-full md:w-64 h-16 flex justify-center items-center rounded-2xl bg-primary shadow-md shadow-primary font-bold text-secondary"
            >
              See Promo
            </a>
          </div>
        </section>
      </div>
      <ModalMgs isOpen={isWrong} onClose={() => setIsWrong(false)} msg={msg} />
      {isLoading && (
        <div className="w-screen h-screen flex justify-center items-center fixed z-50 top-0 left-0 bg-slate-800/80">
          <Loader />
        </div>
      )}
      <Footer />
    </>
  );
}

export default Login;
