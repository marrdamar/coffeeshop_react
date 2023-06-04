import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logoBrand from "../../assets/icon/logo.svg";

export class Footer extends Component {
  render() {
    return (

  <footer className="flex flex-col w-full pt-36 pb-10 md:pb-24 items-center bg-backaccent">
    <div className="flex flex-col md:flex-row  w-4/5 max-width">
      <div className="flex flex-col">
        <Link to="/" className="btn navbrand flex items-center mr-auto gap-4">
          <img src={logoBrand} alt="logo-brand" className="w-8" />
          <h1 className="text-2xl font-bold">Coffee Shop</h1>
        </Link>
        <p className="max-w-sm mr-[8%] font-medium leading-5 md:leading-8 pt-5 pb-6">Coffee Shop is a store that sells some good meals, and especially coffee. We provide high quality beans</p>
        <div className=" flex gap-[10%] mb-10 md:gap-6 justify-center md:justify-start">
          <a href="#" className="btn flex w-9 h-9 rounded-full justify-center items-center bg-primary drop-shadow-lg"><i className="bi bi-facebook text-xl text-secondary"></i></a>
          <a href="#" className="btn flex w-9 h-9 rounded-full justify-center items-center bg-primary drop-shadow-lg"><i className="bi bi-twitter text-xl text-secondary"></i></a>
          <a href="#" className="btn flex w-9 h-9 rounded-full justify-center items-center bg-primary drop-shadow-lg"><i className="bi bi-instagram text-xl text-secondary"></i></a>
        </div>
      </div>
      {/* <!-- SIDE FOOTER --> */}
      <div className="flex md:gap-28 md:ml-auto justify-between">
        <div className="">
          <p className="font-medium text-lg mb-7">Product</p>
          <ul className="flex flex-col gap-1.5 text-greydark leading-8">
            <li>Download</li>
            <li>Pricing</li>
            <li>Location</li>
            <li>Countries</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="">
          <p className="font-medium text-lg mb-7 text-end md:text-start">Product</p>
          <ul className="flex flex-col gap-1.5 text-greydark leading-8 text-end md:text-start">
            <li>Coffe Shop ?</li>
            <li>FAQ</li>
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      {/* <!-- [END] SIDE FOOTER --> */}
    </div>
    {/* <!-- COPYRIGHT --> */}
    <p className="text-center md:text-left my-4 text-[#AFB5C0] w-4/5 max-width">©2020CoffeeStore</p>
  </footer>

    );
  }
}

export default Footer;