import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from '../../assets/logo.svg';
// import '../../styles/index.css';
import './App.css';

import withNavigate from "../../utils/wrapper/withNavigate";

class App extends Component {
  constructor(props) {
    super();
    console.log(props);
    this.state = {
      counter: 0,
      address: "Gresik",
      age: props.age,
      data: [],
    };
    this.controller = new AbortController();
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: this.controller.signal,
    })
      .then((res) => {
        if(!res.ok) throw this.status
        return res.json();
      })
      .then((data) => {
        this.setState({
          data,
        });
      })
      .catch((err) => console.log(err.message));
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevState);
  // }

  componentWillUnmount() {
    // this.controller.abort();
  }

  handleNavigate(to) {
    if(this.state.counter !== 2) {
      return alert("Change Counter First.!");
    }
    this.props.navigate(to);
  }
  
  changeCounter = () => {
    this.setState({
      counter: 2,
    });
  };

  render() {
    if(this.state.data.length === 0) {
      return(
        <div><h1>Loading...</h1></div>
      );
    }
    console.log(this.state.counter);
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          {/* <a
            className="App-link"
            href={this.props.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
          <Link to="/home" className="App-link">Home</Link>
          <p>Counter : {this.state.counter}</p>
          <button onClick={this.changeCounter}>Change Counter</button>
          <button onClick={() => this.handleNavigate("/home")}>Go Home</button>
        </header>
      </div>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const AppWithNavigate = withNavigate(App);
export default AppWithNavigate;
