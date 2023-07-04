import React, { Component, Fragment } from "react";
import iconSearch from "../../assets/icon/search.svg";
import iconChat from "../../assets/icon/chat.svg";
import { Link } from "react-router-dom";

import { searchContexts } from "../../utils/contexts";
import store from "../../redux/store";

export class Account extends Component {
  constructor() {
    super();
    this.state = {
      toggleSearch: false,
      imageProfile: "",
    };
    this.isInput = React.createRef();
    // console.log(this.state)
  }
  handleToggleSearch(info) {
    if (this.isInput.current.value)
      return this.setState({ toggleSearch: true });
    this.setState({
      toggleSearch: info,
    });
  }
  handleSearching = () => {
    console.log(this.isInput.current.value);
    this.props.searchValue(this.isInput.current.value);
    this.context.updateSearch(this.isInput.current.value);
  };

  componentDidMount() {
    const state = store.getState();
    const profilePicture = state.user.data.profile_image;
    // console.log(profilePicture)
    this.setState({
      imageProfile: profilePicture,
    });
    // console.log(state)
  }
  
  render() {
    // console.log(this.context.searchContexts);
    return (
      <Fragment>
        <div
          onMouseOver={() => this.handleToggleSearch(true)}
          onMouseOut={() => this.handleToggleSearch(false)}
          className={
            this.state.toggleSearch
              ? "nav-search nav-search-active"
              : "nav-search"
          }
        >
          <img
            src={iconSearch}
            alt=""
            className={this.state.toggleSearch ? "w-6" : "w-7"}
            onClick={this.handleSearching}
          />
          <input
            ref={this.isInput}
            placeholder="Search"
            className={this.state.toggleSearch ? "block" : "hidden"}
          />
        </div>
        <div className="relative cursor-pointer">
          <span className="flex w-4 h-4 rounded-full justify-center items-center text-[8px] text-white bg-secondary absolute -top-2 -left-2">
            1
          </span>
          <img src={iconChat} alt="" className="w-7" />
        </div>
        <Link
          to="/profile"
          className="w-8 h-8 rounded-full border overflow-hidden cursor-pointer"
        >
          <img src={this.state.imageProfile} alt="" />
        </Link>
      </Fragment>
    );
  }
}

Account.contextType = searchContexts;

export default Account;
