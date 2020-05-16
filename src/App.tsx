import React from 'react';
import './App.css';
import Header from "./components/Header/Header";

interface IProps {
  children: React.ReactNode
}

function App(props: IProps) {
  return (
      <>
        <Header/>
        {props.children}
        </>
  );
}

export default App;
