import React, { Component, Fragment } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
// import MenuLink from './menuLink';

import withSearchParams from "../../utils/wrapper/withParams";
import withNavigate from "../../utils/wrapper/withNavigate";

import CardProducts from "../../components/products/CardProducts";
// import axios from "axios";
import { getProducts } from "../../utils/https/products";
import Loader from "../../components/Loader";
import DataNotFound from "../../components/DataNotFound";
import PromosSection from "../../components/products/PromosSection";

export class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCategoryActive: false,
      category: "",
      isLoading: true,
      isNotFound: true,
      data: [],
      meta: "",
    };
    this.controller = new AbortController();
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
  }

  handleToggleMenu() {
    this.setState({ toggleCategoryActive: !this.state.toggleCategoryActive });
  }

  handleCategory = (params) => {
    if (params === 0) {
      this.props.setSearchParams({});
      this.setState({
        category: "",
      });
      return;
    }
    this.props.setSearchParams({
      category: params,
    });
    this.setState({
      category: params,
    });
  };

  handlePage = (params) => {
    const urlParams = params.replace("/products?", "");
    const queryParams = new URLSearchParams(urlParams);
    // console.log(Object.fromEntries(queryParams));
    this.props.setSearchParams(Object.fromEntries(queryParams));
  };

  handleShorting = (event) => {
    const selected = event.target.value;
    // console.log(selected);
    // console.log(Object.fromEntries(this.props.searchParams));
    this.props.setSearchParams({
      // category: this.state.category,
      // order: selected,
      // search: this.props.searchValue || "",
      ...Object.fromEntries(this.props.searchParams),
      order: selected,
    });
  };

  componentDidMount() {
    document.title = "Coffee Shop - Products";
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const prevParams = Object.fromEntries(prevProps.searchParams);
    const newParams = Object.fromEntries(this.props.searchParams);
    if (JSON.stringify(prevParams) !== JSON.stringify(newParams)) {
      this.setState({ isLoading: true });
      this.fetchData();
    }
  }

  fetchData() {
    getProducts(this.props.searchParams, this.controller)
      .then((res) => {
        this.setState({
          isLoading: false,
          isNotFound: false,
          data: res.data.data,
          meta: res.data.meta,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          this.setState({
            isLoading: false,
            isNotFound: true,
          });
        }
        console.log(err.message);
      });
  }

  handleSearch = (value) => {
    this.props.setSearchParams({
      category: this.state.category,
      search: value,
    });
  };

  render() {
    // console.log(this.state.srcPar);
    // console.log(this.state.meta.next);
    console.log(this.state.data)
    const shorter = Object.fromEntries(this.props.searchParams);

    return (
      <Fragment>
        <Header title="products" searchValue={this.handleSearch} />

        <main className="flex flex-col md:flex-row-reverse w-full mt-14 md:mt-28">
          {/* <!-- MENU PRODUCTS --> */}
          <div className="relative w-full md:w-[65%] flex flex-col px md:pl-10 pb-10 md:mr-[5%] lg:mr-[10%]">
            <span onClick={this.handleToggleMenu} className="toggle-menu">
              Products Category
              <i className="bi bi-caret-down-fill text-2xl"></i>
            </span>
            <ul
              className={
                this.state.toggleCategoryActive
                  ? "nav-menu static"
                  : "nav-menu top-[-100%]"
              }
            >
              <li
                onClick={() => this.handleCategory(0)}
                className={
                  this.state.category === "" ? "navlink menu-active" : "navlink"
                }
              >
                Favorite Product
              </li>
              <li
                onClick={() => this.handleCategory(1)}
                className={
                  this.state.category === 1 ? "navlink menu-active" : "navlink"
                }
              >
                Coffee
              </li>
              <li
                onClick={() => this.handleCategory(2)}
                className={
                  this.state.category === 2 ? "navlink menu-active" : "navlink"
                }
              >
                Non Coffee
              </li>
              <li
                onClick={() => this.handleCategory(3)}
                className={
                  this.state.category === 3 ? "navlink menu-active" : "navlink"
                }
              >
                Foods
              </li>
              <li
                onClick={() => this.handleCategory(4)}
                className={
                  this.state.category === 4 ? "navlink menu-active" : "navlink"
                }
              >
                Add-on
              </li>
            </ul>

            {this.state.isLoading ? (
              ""
            ) : this.state.isNotFound ? (
              ""
            ) : (
              <div className="ml-[5%] my-5">
                <label htmlFor="short">Sort By :</label>
                <select
                  onChange={this.handleShorting}
                  name="short"
                  id="short"
                  defaultValue="default"
                >
                  <option
                    value="default"
                    disabled
                    selected={!shorter.order && true}
                  >
                    - - - - -
                  </option>
                  <option
                    value="cheapest"
                    selected={shorter.order === "cheapest" && true}
                  >
                    Cheapest
                  </option>
                  <option
                    value="priciest"
                    selected={shorter.order === "priciest" && true}
                  >
                    Priciest
                  </option>
                </select>
              </div>
            )}

            <div
              className={`w-full ${
                this.state.isLoading
                  ? "flex"
                  : this.state.isNotFound
                  ? "flex"
                  : "grid"
              } grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-y-[90px] pt-20 px-[5%] sm:px-[10%] md:px-0`}
            >
              {/* <div className="w-full flex flex-wrap gap-[90px] pt-20 ml-[5%] sm:ml-[10%] md:px-0"> */}
              {this.state.isLoading ? (
                <Loader />
              ) : this.state.isNotFound ? (
                <DataNotFound />
              ) : (
                this.state.data.map((product) => (
                  <CardProducts
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    prodName={product.names}
                    prices={product.prices}
                  />
                  // <CardProducts key={product.id} image={`http://localhost:8080${product.image}`} prodName={product.prod_name} price={product.price} />
                ))
              )}
            </div>
            {this.state.isLoading ? (
              ""
            ) : this.state.isNotFound ? (
              ""
            ) : (
              <div className="mx-[30%] mt-10 text-xl font-bold flex gap-10">
                <button
                  onClick={() => this.handlePage(this.state.meta.prev)}
                  className={`text-base w-16 hover:text-primary text-white btn p-2 rounded-lg bg-secondary ${
                    this.state.meta.prev === null && "hidden"
                  }`}
                >
                  Prev
                </button>
                <button
                  onClick={() => this.handlePage(this.state.meta.next)}
                  className={`text-base w-16 hover:text-primary text-white btn p-2 rounded-lg bg-secondary ml-auto ${
                    this.state.meta.next === null && "hidden"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* <!-- PROMO SIDE --> */}
          <div className="md:w-[35%] md:min-w-[400px] border-t md:border-t-0 md:border-r border-grey flex flex-col items-center">
            <PromosSection />
          </div>
        </main>

        <Footer />
      </Fragment>
    );
  }
}

export default withNavigate(withSearchParams(Products));
