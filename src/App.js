import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppContextProvider from "./AppContextProvider";
import MainPage from "./components/MainPage";

function App() {
  return (
    <AppContextProvider>
      <MainPage/>
    </AppContextProvider>
  );
}

export default App;
