import React, {useEffect, useState} from 'react';
import './App.css';
import {AppHeader} from "./components/app-header/app-header";
import {Main} from "./components/main/main";

function App() {

  return (
    <div className="App">
      <AppHeader/>
        <Main/>
    </div>
  );
}

export default App;
