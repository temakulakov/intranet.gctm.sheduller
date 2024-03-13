import {Dayjs} from "dayjs";

interface ISection {
    id: number;
    title: string;
    color: string;
    text: string;
}

interface IGroup {
    id: number;
    title: string;
    sections: ISection[];
}

interface IUser {
    id: number;
    name: string;
    email: string;
    image: string;
}

interface IEvent {
    id: number;
    title: string;
    description: string;
    section: number;
    from: Dayjs;
    to: Dayjs;
    members: number[];
}
