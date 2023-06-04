import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./styles/index.css";
import router from "./router";
// import App from './pages/Home';
// import reportWebVitals from './reportWebVitals';

import { searchContexts as SearchContexts } from "./utils/contexts";
import store, { persistor } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
function Run({ isStrict, children }) {
  if (isStrict) return <React.StrictMode>{children}</React.StrictMode>;
  return children;
}

function App() {
  const [searchContexts, setSearchContx] = useState("");
  const updateSearch = (value) => {
    setSearchContx(value);
  };
  return (
    <Run isStrict={false}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <App name="Afif" age={20} href={"https://reactjs.org"} /> */}
          <SearchContexts.Provider value={{ searchContexts, updateSearch }}>
            <RouterProvider router={router} />
          </SearchContexts.Provider>
        </PersistGate>
      </Provider>
    </Run>
  );
}

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
