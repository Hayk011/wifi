import * as React from "react";
import {IWalls, IWallsTypes} from "../../Interface/Iterface";

import "./Modal.css";
import {ChangeEvent, CSSProperties} from "react";
import {animated} from 'react-spring'

interface IProps {
    state: IWalls;
    index: number;
    setInput: (e: any) => void;
    toggle: (e: any) => void;
    animation: CSSProperties;
    wallsType: IWallsTypes[];
    setWallName: (e: any) => void;
    wallName: string,
    walls: IWalls[];
    setWalls: (e: any) => void;
    active: number,
    ids: number[]
}


const Modal = (props: IProps) => {
    const inputsHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        props.setInput({...props.state, [event.target.name]: event.target.value});
    };
    const selectHndler = (event: ChangeEvent<HTMLSelectElement>): void => {
        props.setWallName(event.target.value);
    };
    const savehandler = (): void => {
        let newWalls: IWalls[] = [...props.walls];
        newWalls.forEach((item: IWalls, i: number) => {
            if (i === props.active) {
                item.type = props.wallName;
                item.width = props.state.width;
                item.height = props.state.height;
            }
            item.height = props.state.height
        });
        props.setWalls([...newWalls]);
        props.setInput({
            ...props.state,
            type: "",
            width: ""
        });
        props.toggle(false);


    };
    return (
        <animated.div style={props.animation} className="modal">
            <select value={props.wallName} onChange={(event: ChangeEvent<HTMLSelectElement>) => selectHndler(event)}>
                {props.wallsType.map((type: IWallsTypes, index: number) => (
                    <option key={index} value={type.name}>{type.name}</option>
                ))}
            </select>
            <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputsHandler(event)} placeholder="width"
                   type="text" value={props.state.width} name="width"/>
            <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputsHandler(event)} placeholder="height"
                   type="text" value={props.state.height} name="height"/>
            <div>
                <button onClick={savehandler}>Save</button>
                <button onClick={() => props.toggle(false)}>Chancel</button>
            </div>
        </animated.div>
    )
};

export default Modal;