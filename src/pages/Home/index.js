import React, { Component, Fragment } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import viezh from "../../assets/customer/customer-1.png.webp";
import yessica from "../../assets/customer/customer-2.png.webp";
import kim from "../../assets/customer/customer-3.png.webp";
import hzlnut from "../../assets/product/hazelnut-latte.png.webp";
import pinkyprom from "../../assets/product/pink-promise.png.webp";
import chickwings from "../../assets/product/chicken-wings.png.webp";
import logoSearch from "../../assets/icon/search.svg";
import imgTeamWork from "../../assets/team-work.webp";
import imgMaps from "../../assets/maps.svg";
import imgNetflix from "../../assets/partner/netflix.webp";
import imgReddit from "../../assets/partner/reddit.webp";
import imgAmazon from "../../assets/partner/amazon.webp";
import imgDiscord from "../../assets/partner/discord.webp";
import imgSpotify from "../../assets/partner/spotify.webp";
import { Link } from "react-router-dom";

export class Home extends Component {
  constructor(props) {
    super();
    console.log(props);
  }
  componentDidMount() {
    document.title = "Coffee Shop - Home";
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }
  render() {
    return (
      <Fragment>
        <Header title="home" />

        <section className="hero mt-14 md:mt-28 w-full h-auto flex justify-center ">
          <div className="w-4/5 max-width">
            <form
              action=""
              className="h-16 w-auto max-w-xs ml-auto px-8 gap-4 my-5 flex items-center bg-white rounded-[60px]"
            >
              <img src={logoSearch} alt="icon-search" className="w-5" />
              <input
                type="text"
                placeholder="Search"
                className="input-line h-3/4 w-full"
              />
            </form>
            <h1 className="font-bold text-3xl md:text-5xl leading-8 md:leading-[70px] max-w-xl text-white mb-3 md:mb-4">
              Start Your Day with Coffee and Good Meals
            </h1>
            <p className="font-medium md:font-bold text-base md:text-xl leading-7 max-w-xl text-white mb-7 md:mb-8">
              We provide high quality beans, good taste, and healthy meals made
              by love just for you. Start your day with us for a bigger smile!
            </p>
            <Link to="/login">
            <p
              className="btn w-full md:w-60 h-14 rounded-2xl bg-primary text-secondary mb-28 md:mb-56"
            >
              Get Started
            </p>
            </Link>
          </div>
        </section>

        {/* <!-- RECLAME --> */}
        <section className="mt-[-64px] md:mt-[-100px] w-4/5 h-32 md:h-[200px] p-4 md:p-8 flex justify-evenly items-center rounded-xl bg-white shadow-xl max-width">
          <div className="flex flex-col md:flex-row justify-center items-center sm:justify-evenly xl:justify-center xl:gap-9 w-full h-full">
            {/* <!-- STAFF RECLAME --> */}
            <div className="flex w-10 h-10 md:w-14 md:h-14 items-center justify-center rounded-full bg-primary">
              <i className="bi bi-person-fill text-secondary text-2xl"></i>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-xl md:text-2xl">90+</h2>
              <p className="text-sm md:text-base text-greydark">Staff</p>
            </div>
          </div>
          {/* <!-- LOCATION RECLAME --> */}
          <div className="flex flex-col md:flex-row justify-center items-center sm:justify-evenly xl:justify-center xl:gap-9 w-full h-full border-x-2 border-[#EEEFF2]">
            <div className="flex w-10 h-10 md:w-14 md:h-14 items-center justify-center rounded-full bg-primary">
              <i className="bi bi-geo-alt-fill text-secondary text-2xl"></i>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-xl md:text-2xl">30+</h2>
              <p className="text-sm md:text-base text-greydark">Stores</p>
            </div>
          </div>
          {/* <!-- LOVE CUSTOMER RECLAME --> */}
          <div className="flex flex-col md:flex-row justify-center items-center sm:justify-evenly xl:justify-center xl:gap-9 w-full h-full">
            <div className="flex w-10 h-10 md:w-14 md:h-14 items-center justify-center rounded-full bg-primary">
              <i className="bi bi-heart-fill text-secondary text-2xl"></i>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-xl md:text-2xl">800+</h2>
              <p className="text-sm md:text-base text-greydark">Customers</p>
            </div>
          </div>
        </section>

        {/* <!-- WORK CONTENT --> */}
        <section className="flex flex-col items-center w-4/5 max-width my-8 md:my-24">
          <div className="flex flex-col md:flex-row w-full md:gap-[10%]">
            <img src={imgTeamWork} alt="" className="md:w-1/2 h-fit" />
            <div className="flex flex-col md:w-1/2 justify-center">
              <h3 className="font-medium text-2xl md:text-4xl md:leading-[50px]">
                We Provide Good Coffee and Healthy Meals
              </h3>
              <p className="text-sm md:text-base leading-6 md:leading-7 my-4 md:my-6">
                You can explore the menu that we provide with fun and have their
                own taste and make your day better.
              </p>
              <ul className="text-xs md:text-sm leading-6 md:leading-8">
                <li className="flex gap-2 md:gap-4">
                  <img src="./img/icon/checklist.svg" alt="" /> High quality
                  beans
                </li>
                <li className="flex gap-2 md:gap-4">
                  <img src="./img/icon/checklist.svg" alt="" /> Healthy meals,
                  you can request the ingredients
                </li>
                <li className="flex gap-2 md:gap-4">
                  <img src="./img/icon/checklist.svg" alt="" /> Chat with our
                  staff to get better experience for ordering
                </li>
                <li className="flex gap-2 md:gap-4">
                  <img src="./img/icon/checklist.svg" alt="" /> Free member card
                  with a minimum purchase of IDR 200.000.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* <!-- MAIN CONTENT --> */}
        <section className="bg-[#f8f8f885] w-full flex justify-center pt-9">
          <main className="flex flex-col items-center w-4/5 max-width">
            {/* <!-- FAVORITE PEOPLE --> */}
            <h3 className="font-medium text-2xl md:text-4xl md:leading-[50px]">
              Here is People’s Favorite
            </h3>
            <p className="text-greydark text-sm md:text-base leading-6 md:leading-7 my-4 md:my-6">
              Let’s choose and have a bit taste of poeple’s favorite. It might
              be yours too!
            </p>
            {/* <!-- CARD-FAVORITE CONTAINER --> */}
            <article className="flex flex-col md:flex-row gap-12 pt-9 md:pt-20 pb-14 md:pb-28 md:justify-center w-full">
              {/* <!-- CARD-FAV-1 --> */}
              <div className="card-fav w-full md:w-80 md:h-[760px] p-3 md:pt-16 md:pb-12 grid grid-cols-2 gap-3 md:flex md:flex-col md:justify-between items-center border-2 border-grey rounded-xl">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden">
                  <img src={hzlnut} alt="" />
                </div>
                <h4 className="font-medium text-lg text-center">
                  Hazelnut Latte
                </h4>
                <ul className="card-fav-list text-xs sm:text-sm md:flex flex-col gap-6">
                  <li>HazelnutSyrup</li>
                  <li>Wanilla Whipped Cream</li>
                  <li>Ice / Hot</li>
                  <li>Sliced Banana on Top</li>
                </ul>
                <h5 className="font-medium text-lg sm:text-2xl text-center">
                  IDR 25.000
                </h5>
                <a
                  href=""
                  className="w-full sm:w-44 h-11 font-bold text-secondary flex justify-center items-center border rounded-3xl border-primary"
                >
                  Order Now
                </a>
              </div>
              {/* <!-- CARD-FAV-2 --> */}
              <div className="card-fav w-full md:w-80 md:h-[760px] p-3 md:pt-16 md:pb-12 grid grid-cols-2 gap-3 md:flex md:flex-col md:justify-between items-center border-2 border-grey rounded-xl">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden">
                  <img src={pinkyprom} alt="" />
                </div>
                <h4 className="font-medium text-lg text-center">
                  Pink Promise
                </h4>
                <ul className="card-fav-list text-xs sm:text-sm md:flex flex-col gap-6">
                  <li>1 Shot of Coffee</li>
                  <li>Vanilla Whipped Cream</li>
                  <li>Chocolate Biscuits</li>
                  <li>Strawberry Syrup</li>
                  <li>Sliced strawberry on Top</li>
                </ul>
                <h5 className="font-medium text-lg sm:text-2xl text-center">
                  IDR 30.000
                </h5>
                <a
                  href=""
                  className="w-full sm:w-44 h-11 font-bold text-secondary flex justify-center items-center border rounded-3xl border-primary"
                >
                  Order Now
                </a>
              </div>
              {/* <!-- CARD-FAV-3 --> */}
              <div className="card-fav w-full md:w-80 md:h-[760px] p-3 md:pt-16 md:pb-12 grid grid-cols-2 gap-3 md:flex md:flex-col md:justify-between items-center border-2 border-grey rounded-xl">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden">
                  <img src={chickwings} alt="" />
                </div>
                <h4 className="font-medium text-lg text-center">
                  Chicken Wings
                </h4>
                <ul className="card-fav-list text-xs sm:text-sm md:flex flex-col gap-6">
                  <li>Wings</li>
                  <li>Drum Sticks</li>
                  <li>Mayonaise and Lemon</li>
                  <li>Hot Fried</li>
                  <li>Mayonaise and Lemon</li>
                  <li>Buy 1 Get 1 only for Dine in</li>
                </ul>
                <h5 className="font-medium text-lg sm:text-2xl text-center">
                  IDR 40.000
                </h5>
                <a
                  href=""
                  className="w-full sm:w-44 h-11 font-bold text-secondary flex justify-center items-center border rounded-3xl border-primary"
                >
                  Order Now
                </a>
              </div>
              {/* <!-- [END] CARD-FAV CONTAINER --> */}
            </article>

            {/* <!-- STORE LOCATION CONTENT --> */}
            <h3 className="font-medium text-2xl md:text-4xl md:leading-[50px]">
              Visit Our Store in the Spot on the Map Below
            </h3>
            <p className="text-greydark text-sm md:text-base leading-6 md:leading-7 my-4 md:my-6">
              See our store in every city on the spot and spen your good day
              there. See you soon!
            </p>
            <img src={imgMaps} alt="" />
            {/* <!-- [END] STORE LOCATION CONTENT --> */}

            {/* <!-- PARTNER CONTENT --> */}
            <h3 className="font-medium text-2xl md:text-4xl md:leading-[50px]">
              Our Partner
            </h3>
            <div className="w-full flex flex-col md:flex-row sm:grid sm:grid-cols-2 md:flex justify-center justify-items-center items-center mb-12">
              <div className="our-partner-img w-48">
                <img src={imgNetflix} alt="" className="w-full" />
              </div>
              <div className="our-partner-img w-48">
                <img src={imgReddit} alt="" className="w-full" />
              </div>
              <div className="our-partner-img w-48">
                <img src={imgAmazon} alt="" className="w-full" />
              </div>
              <div className="our-partner-img w-48">
                <img src={imgDiscord} alt="" className="w-full" />
              </div>
              <div className="our-partner-img w-48">
                <img src={imgSpotify} alt="" className="w-full" />
              </div>
            </div>
            {/* <!-- [END] PARTNER CONTENT --> */}

            {/* <!-- COMENTARY CUSTOMER CONTENT --> */}
            <h3 className="font-medium text-2xl md:text-4xl md:leading-[50px]">
              Loved by Thousands of Happy Customer
            </h3>
            <p className="text-greydark text-sm md:text-base leading-6 md:leading-7 my-4 md:my-6">
              These are the stories of our customers who have visited us with
              great pleasure.
            </p>
            {/* <!-- COMMENTARY CONTAINER --> */}
            <div className="w-full flex flex-col md:flex-row gap-3 2xl:gap-14 pb-4 overflow-x-scroll xl:overflow-hidden">
              {/* <!-- CARD COMMENT-1 --> */}
              <div className="card-comment flex flex-col p-4 sm:p-7 w-full sm:min-w-[400px] max-h-[230px] border-2 rounded-xl border-grey">
                <div className="flex w-full gap-3 mb-6">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden">
                    <img src={viezh} alt="" />
                  </div>
                  <div className="">
                    <h4 className="font-medium md:text-lg">Viezh Robert</h4>
                    <h5 className="text-xs md:text-sm text-grey">
                      Warsaw, Poland
                    </h5>
                  </div>
                  <div className="ml-auto flex gap-2 items-center">
                    <p className="font-medium">4.5</p>
                    <i className="bi bi-star-fill text-primary"></i>
                  </div>
                </div>
                <p className="text-xs md:text-base">
                  “Wow... I am very happy to spend my whole day here. the Wi-fi
                  is good, and the coffee and meals tho. I like it here!! Very
                  recommended!
                </p>
              </div>
              {/* <!-- CARD COMMENT-2 --> */}
              <div className="card-comment flex flex-col p-4 sm:p-7 w-full sm:min-w-[400px] max-h-[230px] border-2 rounded-xl border-grey">
                <div className="flex w-full gap-3 mb-6">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden">
                    <img src={yessica} alt="" />
                  </div>
                  <div className="">
                    <h4 className="font-medium md:text-lg">Yessica Christy</h4>
                    <h5 className="text-xs md:text-sm text-grey">
                      Shanxi, China
                    </h5>
                  </div>
                  <div className="ml-auto flex gap-2 items-center">
                    <p className="font-medium">4.5</p>
                    <i className="bi bi-star-fill text-primary"></i>
                  </div>
                </div>
                <p className="text-xs md:text-base">
                  “I like it because I like to travel far and still can make my
                  day better just by drinking their Hazelnut Latte
                </p>
              </div>
              {/* <!-- CARD COMMENT-3 --> */}
              <div className="card-comment flex flex-col p-4 sm:p-7 w-full sm:min-w-[400px] max-h-[230px] border-2 rounded-xl border-grey">
                <div className="flex w-full gap-3 mb-6">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden">
                    <img src={kim} alt="" />
                  </div>
                  <div className="">
                    <h4 className="font-medium md:text-lg">Kim Young Jou</h4>
                    <h5 className="text-xs md:text-sm text-grey">
                      Seoul, South Korea
                    </h5>
                  </div>
                  <div className="ml-auto flex gap-2 items-center">
                    <p className="font-medium">4.5</p>
                    <i className="bi bi-star-fill text-primary"></i>
                  </div>
                </div>
                <p className="text-xs md:text-base">
                  “This is very unusual for my taste, I haven’t liked coffee
                  before but their coffee is the best! and yup, you have to
                  order the chicken wings, the best in town!
                </p>
              </div>
            </div>
            {/* <!-- PAGINATION COMMENTS CUSTOMER --> */}
            <div className="w-full flex py-6 mb-32">
              <div className="flex gap-4 mr-auto items-center">
                <span className="page-dot page-dot-active"></span>
                <span className="page-dot"></span>
                <span className="page-dot"></span>
                <span className="page-dot"></span>
              </div>
              <div className="flex gap-4 ml-auto">
                <span className="page-arrow">
                  <i className="bi bi-arrow-left-short text-5xl"></i>
                </span>
                <span className="page-arrow">
                  <i className="bi bi-arrow-right-short text-5xl"></i>
                </span>
              </div>
            </div>
            {/* <!-- [END] COMENTARY CUSTOMER CONTENT --> */}

            {/* <!-- RECLAME CHECK PROMO --> */}
            <section className="relative top-[-115px] w-full flex justify-center">
              <div className="absolute w-full h-32 md:h-56 p-4 md:px-10 flex flex-col md:flex-row justify-between items-center rounded-xl bg-white shadow-xl max-width">
                <div className="">
                  <h1 className="text-lg md:text-4xl font-medium max-w-sm">
                    Check our promo today!
                  </h1>
                  <p className="text-xs md:text-base mb-3">
                    Lets see the deals and pick yours!
                  </p>
                </div>
                <Link to="/products">
                <p
                  className="btn w-full md:w-64 h-16 flex justify-center items-center rounded-2xl bg-primary shadow-md shadow-primary font-bold text-secondary"
                >
                  See Promo
                </p>
                </Link>
              </div>
            </section>
          </main>
        </section>

        <Footer />
      </Fragment>
    );
  }
}

export default Home;
