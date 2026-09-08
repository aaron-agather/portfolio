import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Topbar } from "./components/topbar"
import { Content } from './components/content';
import { BackgroundColorEffect } from './components/background';

function App() {
  return (
    <div className="App" style={{ background: "black", height: "100vh" }}>
      <BackgroundColorEffect />
      <Topbar />
      {/*{/*<Content />*/}
      {/*<Content />*/}
      <Content />

    </div>
  );
}

export default App;
