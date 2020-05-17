import { IWalls, IWallsTypes } from "../Interface/Iterface";

export const roomAddHandler = (callback: (addRoom: IWalls) => void): void => {
  let add: IWalls = {
    type: "",
    width: "",
    height: "",
  };
  callback(add);
};

export const getRuts = (callback: (data: any) => void): void => {
  fetch("http://localhost:8080/api/routers")
    .then((info) => info.json())
    .then((data) => callback(data))
    .catch((e: Error) => console.log(e));
};
export const getWalls = (callback: (data: any) => void): void => {
  fetch("http://localhost:8080/api/walls")
    .then((info) => info.json())
    .then((data) => callback(data))
    .catch((e: Error) => console.log(e));
};

export const arrayModifyHandler = (
  arr: IWallsTypes[],
  arr2: IWalls[],
  callback: (data: IWalls[]) => void
): void => {
  for (let i: number = 0; i < arr2.length; i++) {
    for (let j: number = 0; j < arr.length; j++) {
      if (arr2[i].type === arr[j].name) {
        arr2[i].conductivityPercent = arr[j].conductivityPercent;
      }
    }
  }
  callback(arr2);
};

const calculatePercent = (len1: any, perc: any) => {
  return len1 * (1 - perc / 100);
};
//start----room
const isAvaliable = (
  start: any,
  part1: any,
  end: any,
  part2: any,
  rooms: any
) => {
  let height = +rooms[0].height;
  let main_len = 0;
  for (let i = start; i <= end; i++) {
    if (i === end) {
      if (end !== rooms.length) {
        let end_len = +rooms[end].width;
        main_len += part2 === 0 ? 0 : end_len / 2;
      }
    } else if (i === start) {
      let start_len = +rooms[start].width;
      main_len += part1 === 0 ? start_len : start_len / 2;
    } else {
      main_len += +rooms[i].width; //TELL HAIKO TO CHANGE ROOM TO CORRESPOND ARRAY OF OBJECT
    }
  }
  let cur_dist = Math.ceil(Math.sqrt(height ** 2 + main_len ** 2));
  let cosL = main_len / cur_dist;
  let temp_end = end;
  let temp_rout_dist = 40;
  if (part2 === 1) {
    //@ts-ignore
    temp_rout_dist -= +rooms[end].width / (2 * cosL);
    if (end !== start) {
      //@ts-ignore
      temp_rout_dist = calculatePercent(
        temp_rout_dist,
        rooms[end - 1].conductivityPercent
      );
    }
  }
  while (temp_end > start) {
    if (temp_end - 1 === start) {
      if (part1 === 1) {
        //@ts-ignore
        temp_rout_dist -= +rooms[start].width / (2 * cosL);
      } else {
        //@ts-ignore
        temp_rout_dist -= +rooms[start].width / cosL;
      }
      break;
    } else {
      temp_end -= 1;
      //@ts-ignore
      temp_rout_dist -= +rooms[temp_end].width / cosL;
      temp_rout_dist = calculatePercent(
        temp_rout_dist,
        rooms[temp_end - 1].conductivityPercent
      );
    }
  }
  //@ts-ignore
  return temp_rout_dist >= 0;
};
export const algoritm = (arr: any) => {
  let n = arr.length;
  let prev = 0,
    curr = 1,
    part1 = 0,
    part2 = 1;
  let position = [];
  while (true) {
    let isAv = isAvaliable(prev, part1, curr, part2, arr);
    if (curr < n && isAv) {
      if (part2 === 1) {
        part2 = 0;
        curr += 1;
      } else {
        part2 += 1;
      }
    } else if (curr === n && isAv) {
      position.push({
        room: curr,
        place: 0,
      });
      break;
    } else if (curr === n) {
      position.push({ room: curr - 1, place: 1 });
      position.push({ room: curr, place: 0 });
      break;
    } else if (curr < n) {
      if (part2 === 0) {
        position.push({
          room: curr - 1,
          place: 1,
        });
        prev = curr - 1;
        part1 = 1;
      } else {
        position.push({
          room: curr,
          place: 0,
        });
        prev = curr;
        part1 = 0;
      }
    } else {
      break;
    }
  }
};
