import * as React from "react";
import {NavLink} from "react-router-dom"
import "./Header.css";

interface IheadersNames {
    id: number;
    name: string;
    path: string;
}


const headersNames: IheadersNames[] = [
    {
        id: 1,
        name: "Home",
        path: "/"
    },
    {
        id: 2,
        name: "Rooms",
        path: "/rooms"
    },
    {
        id: 3,
        name: "Walls",
        path: "/walls"
    }
];

const Header = () => {
    return (
        <header>
            <ul>
                {headersNames.map((menu: IheadersNames) => (
                    <li className="router-item" key={menu.id}>
                        <NavLink to={menu.path}>{menu.name}</NavLink>
                    </li>
                ))}
            </ul>
        </header>
    )
};
export default Header