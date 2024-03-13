import React from "react";
import './App.css';
import Header from './components/Header';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<signup />} />
          <Route path="/user" element={<Welcome />} />
        </Routes>
      </main>
    </React.Fragment>


  );
}

export default App;
