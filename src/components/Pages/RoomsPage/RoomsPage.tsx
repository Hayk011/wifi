import * as React from "react";
import {Link} from "react-router-dom"

interface IInput {
    rooms: string
}

const Rooms = () => {
    const [input, setInput] = React.useState<IInput>({rooms: ""});

    const inputsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput({...input, [event.target.name]: event.target.value});
    };
    return (
        <div className="page-wrapper">
            <div className="blue-bannr"></div>
            <input type="number" name="rooms" placeholder="Rooms count" value={input.rooms}
                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => inputsHandler(event)}/>
            <button><Link to={`/walls?rooms=${input.rooms}`}>Save </Link> </button>
        </div>
    )
};
export default Rooms