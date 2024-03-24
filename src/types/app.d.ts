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
    color: string;
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

interface IReport {
    id: number;
    color: string;
    title: string;
    sections: IReportSection[];
};

interface IReportSection {
    id: number;
    title: string;
    eventsPath: number;
    eventsCount: number;
    eventsTime: number;
}
