import * as React from "react";
import { useTransition } from "react-spring";
import queryString from "querystring";
import "../../../font/style.css";
import "./Wall.css";
import Modal from "../../Modal/Modal";
import { roomAddHandler, arrayModifyHandler } from "../../../Helper/Helper";
import { IWalls, IWallsTypes } from "../../../Interface/Iterface";
import { algoritm, getRuts, getWalls } from "../../../Helper/Helper";

const Wall = ({ location }: any) => {
  const [walls, setWalls] = React.useState<IWalls[]>([]);
  const [wallsType, setWallsType] = React.useState<IWallsTypes[]>([
    {
      id: "5ebc2a1d7119ed0817f8609e",
      name: "Окно(стекло)",
      conductivityPercent: 70.0,
    },
    {
      id: "5ebc2a1d7119ed0817f8609f",
      name: "Окно с железным покрытием",
      conductivityPercent: 50.0,
    },
    {
      id: "5ebc2a1d7119ed0817f860a0",
      name: "Окно с железным покрытием",
      conductivityPercent: 50.0,
    },
    {
      id: "5ebc2a1d7119ed0817f860a1",
      name: "Деревянная стена",
      conductivityPercent: 30.0,
    },
    {
      id: "5ebc2a1d7119ed0817f860a2",
      name: "Стена 15.2 см(межкомнатная)",
      conductivityPercent: 15.0,
    },
    {
      id: "5ebc2a1d7119ed0817f860a3",
      name: "Стена 30.5 см(главная)",
      conductivityPercent: 10.0,
    },
    {
      id: "5ebc2a1d7119ed0817f860a4",
      name: "Твердый железобетон",
      conductivityPercent: 10.0,
    },
  ]);
  const [wallName, setWallName] = React.useState<string>("");
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [active, setactive] = React.useState<number>(0);
  const [isRedy, setIsRedy] = React.useState<string>("");
  const [input, setInput] = React.useState<IWalls>({
    type: "",
    height: "",
    width: "",
  });
  let container: IWalls[] = [];
  React.useEffect(() => {
    const path: string = location.search;
    const userDetal = path.slice(1);
    const roomObj = queryString.parse(userDetal);
    for (let i: number = 0; i < +roomObj.rooms; i++) {
      let wall: IWalls = {
        type: "",
        height: "",
        width: "",
      };
      container.push(wall);
    }
    setWalls([...container]);
  }, []);

  React.useEffect(() => {
    let check: string = "";
    walls.length > 0 &&
      walls.map((item: IWalls) => {
        if (item.type && item.width) {
          check += "+";
          setIsRedy(check);
        }
      });
  }, [toggle]);
  const addWallHandler = (): void => {
    roomAddHandler((roomAdd: IWalls) => {
      setWalls([...walls, roomAdd]);
    });
  };
  const openModalHandler = (index: number): void => {
    setToggle(true);
    setactive(index);
  };
  const wallDeleteHandler = (index: number): void => {
    const filtered = walls.filter((_: IWalls, i: number) => i !== index);
    setWalls([...filtered]);
  };
  const sendHandler = () => {
    arrayModifyHandler(wallsType, walls, (data: IWalls[]) => {
      setWalls([...data]);
      algoritm(walls);
    });
  };
  const transaction = useTransition(toggle, null, {
    from: { opacity: 0, transform: "translate3d(0,-50px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-50px,0)" },
  });
  console.log(walls);
  let ids: number[] = [];
  return (
    <div className="page-wrapper">
      <div className="blue-bannr"></div>
      <div onClick={addWallHandler} className="add-item">
        <i className="icon-folder-plus"></i>
      </div>
      {walls.length > 0 ? (
        <ul className="wall-item-container">
          {walls.map((item: IWalls, index: number) => (
            <li className="wall-item" key={index}>
              {index + 1}
              <div>
                <i
                  onClick={() => openModalHandler(index)}
                  className="icon-pencil pen"
                ></i>
                <i
                  onClick={() => wallDeleteHandler(index)}
                  className="icon-bin bin"
                ></i>
                {item.type && item.width && item.height ? (
                  <i className="icon-checkmark check"></i>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Yoy must add wall</p>
      )}
      {isRedy.split("").length === walls.length && walls.length >= 3 ? (
        <button onClick={sendHandler}>Send</button>
      ) : null}
      <div>
        {transaction.map(
          ({ item, key, props: animation }) =>
            item && (
              <Modal
                key={key}
                state={input}
                index={1}
                setInput={setInput}
                toggle={setToggle}
                animation={animation}
                wallsType={wallsType}
                wallName={wallName}
                setWallName={setWallName}
                walls={walls}
                setWalls={setWalls}
                active={active}
                ids={ids}
              />
            )
        )}
      </div>
    </div>
  );
};
export default Wall;
