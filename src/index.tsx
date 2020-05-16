import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./components/Pages/HomePage/Home";
import Wall from "./components/Pages/WallPage/Wall";
import Rooms from "./components/Pages/RoomsPage/RoomsPage";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route path="/walls" component={Wall}></Route>
                    <Route path="/rooms" component={Rooms}></Route>
                    <Route path="/" component={Home}></Route>
                </Switch>
            </App>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
