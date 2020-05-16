import {IWalls, IWallsTypes} from "../Interface/Iterface";

export const roomAddHandler = (callback: (addRoom: IWalls) => void): void => {
    let add: IWalls = {
        type: "",
        width: "",
        height: ""
    };
    callback(add)
};

export const arrayModifyHandler = (arr: IWallsTypes[], arr2: IWalls[], callback: (data: IWalls[]) => void): void => {
    for (let i: number = 0; i < arr2.length; i++) {
        for (let j: number = 0; j < arr.length; j++) {
            if (arr2[i].type === arr[j].name) {
                arr2[i].conductivityPercent = arr[j].conductivityPercent;
            }
        }
    }
    callback(arr2)
};


const calculatePercent = (len1: any, perc: any) => {
    return len1 * (1 - perc / 100);
};
//start----room
const isAvaliable = (start: any, part1: any, end: any, part2: any, rooms: any) => {
    let height = rooms[0].height;
    let main_len = 0;
    let end_len;
    for (let i = start; i < end; i++) {
        if (i === end) {
            end_len = rooms[end].len;
            main_len += part2 === 0 ? 0 : end_len / 2;
        } else {
            main_len += rooms[i].len; //TELL HAIKO TO CHANGE ROOM TO CORRESPOND ARRAY OF OBJECT
        }
    }
    let cur_dist = Math.ceil(Math.sqrt(height ** 2 + main_len ** 2));
    let cosL = main_len / cur_dist;
    let temp_end = end;
    let temp_rout_dist;
    if (part2 === 1) {
        //@ts-ignore
        temp_rout_dist -= rooms[end].len / cosL;
        if (end !== start) {
            //@ts-ignore
            temp_rout_dist = calculatePercent(temp_rout_dist, rooms([end - 1].perc));
        }
    }
    while (temp_end > start) {
        if (temp_end - 1 === start) {
            if (part1 === 1) {
                //@ts-ignore
                temp_rout_dist -= (rooms[start].len / 2) * cosL;
            } else {
                //@ts-ignore
                temp_rout_dist -= rooms[start].len / cosL;
            }
            break;
        } else {
            temp_end -= 1;
            //@ts-ignore
            temp_rout_dist -= rooms([temp_end].len) / cosL;
            temp_rout_dist = calculatePercent(
                temp_rout_dist,
                rooms[temp_end - 1].perc
            );
        }
    }
    //@ts-ignore
    return temp_rout_dist > end_len;
};
export const algoritm = (arr: any) => {
    let n = arr.length;
    let prev = 0,
        curr = 1,
        part1 = 0,
        part2 = 1;
    let position = [];
    while (true) {
        if (
            prev <= curr &&
            curr < n &&
            isAvaliable(prev, part1, curr, part2, arr)
        ) {
            if (part2 === 1) {
                part2 = 0;
                curr += 1;
            } else {
                part2 += 1;
            }
        } else if (
            prev <= curr &&
            curr === n &&
            isAvaliable(prev, part1, curr, part2, arr)
        ) {
            position.push({
                room: curr,
                place: 0
            });
        } else if (prev <= curr && curr === n) {
            position.push({room: curr, place: 0});
            position.push();
            break;
        } else if (prev <= curr && curr < n) {
            if (part2 === 0) {
                position.push({
                    room: curr - 1,
                    place: 1
                });
                prev = curr - 1;
                part1 = 1;
            } else {
                position.push({
                    room: curr,
                    place: 0
                });
                prev = curr;
                part1 = 0;
            }
        } else {
            position.push({
                room: curr,
                place: part2
            });
            break;
        }
    }
};
