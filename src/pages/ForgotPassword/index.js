import React, { useEffect, useMemo, useState } from "react";
import Footer from "../../components/Footer";
import { forgot, setPassbyForgot } from "../../utils/https/auth";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const controller = useMemo(() => new AbortController(), []);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [form, setForm] = useState({
    otp_code: "",
    password: "",
  });

  const onChange = (event) => {
    setEmail(event.target.value);
  };

  const emailSubmitHandler = (event) => {
    setIsLoading(true);
    event.preventDefault();
    console.log(email);
    forgot(email, controller)
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);
        setTimeLeft(120);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    document.title = "Coffee Shop - Forgot Password";
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    if (timeLeft === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const inputOtpCode = (event) => {
    setForm((form) => {
      return { ...form, [event.target.name]: event.target.value };
    });
  };
  const otpSubmitHandler = (event) => {
    setIsLoading(true);
    event.preventDefault();
    console.log(form);
    setPassbyForgot(email, form.otp_code, form.password, controller)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        setTimeLeft(0);
        navigate("/login")
      })
      .catch((err) => console.log(err));
  };
  console.log(email)
  return (
    <>
      <section className="hero-forgot w-full min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-white text-2xl md:text-6xl font-bold">
          Forgot your password?
        </h1>
        <p className="text-white text-sm md:text-base font-bold">
          Dont worry, we got your back!
        </p>
        <form className="w-full px-[5%] md:px-0 md:w-4/5 max-width flex flex-col items-center">
          {timeLeft === 0 ? (
            <div className="w-full flex flex-col md:flex-row gap-9 my-8 md:my-28">
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your email address to get link"
                className="input-auth w-full md:h-32 text-base md:text-2xl"
              />
              <button
                type="submit"
                onClick={emailSubmitHandler}
                className="btn min-w-[260px] h-14 md:h-auto rounded-2xl md:text-3xl bg-primary text-secondary"
              >
                Send
              </button>
            </div>
          ) : (
            ""
          )}
          <p className="text-white font-bold md:text-2xl text-center drop-shadow-2xl">
            Click here if you didn’t receive any link <br></br> in 2 minutes
          </p>
          <button
            type="button"
            onClick={emailSubmitHandler}
            className="btn text-white bg-secondary h-14 md:h-32 w-full md:w-[554px] md:text-2xl rounded-2xl my-8"
          >
            Resend Link
          </button>
        </form>
        {timeLeft === 0 ? (
          ""
        ) : (
          <form className="w-full px-[5%] md:px-0 md:w-4/5 max-width flex flex-col items-center">
            <p className="count-down text-white text-3xl font-bold">
              {`${minutes}:${seconds}`}
            </p>
            <div className="w-full flex flex-col md:flex-row gap-9 my-8 md:my-12">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="otp"
                  className="font-bold text-white
                "
                >
                  OTP Code :
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp_code"
                  onChange={inputOtpCode}
                  placeholder="Enter your OTP code..."
                  className="input-auth w-full md:h-14 text-base md:text-2xl"
                />
                <label
                  htmlFor="password"
                  className="mt-4 font-bold text-white
                "
                >
                  New Password :
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={inputOtpCode}
                  placeholder="Enter your New Password..."
                  className="input-auth w-full md:h-14 text-base md:text-2xl"
                />
              </div>
              <button
                type="submit"
                onClick={otpSubmitHandler}
                className="btn min-w-[260px] h-14 md:h-auto rounded-2xl md:text-3xl bg-primary text-secondary"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </section>
      {isLoading && (
        <div className="w-screen h-screen flex justify-center items-center fixed z-50 top-0 left-0 bg-slate-800/80">
          <Loader />
        </div>
      )}
      <Footer />
    </>
  );
}

export default ForgotPassword;
