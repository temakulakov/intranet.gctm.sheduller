import BitrixService from "./index";
import axios from "axios";
import {IEvent} from "../../types/app";
import {Dayjs} from "dayjs";

class EventService extends BitrixService {

    public DayJSFormat = "DD.MM.YYYY HH:mm:ss";


    async getRange(to: Dayjs) {
        const data = {
            type: "company_calendar",
            ownerId: "",
            from: to.format('DD.MM.YYYY'),
            to: to.format('DD.MM.YYYY'),
        };

        return axios.post<IBitrixResponse<IApiEvent[]>>(`${this.URL}calendar.event.get/`, data);
    }

    async getReportRange(sections: number[], from: Dayjs, to: Dayjs) {

        const data = {
            type: "company_calendar",
            ownerId: "",
            section: sections,
            from: from.format('YYYY-MM-DD'),
            to: to.format('YYYY-MM-DD')
        };


        return axios.post<IBitrixResponse<IApiEvent[]>>(`${this.URL}calendar.event.get/`, data);
    }

    async addEvent(event: Omit<IEvent, 'id'>) {
        const data = {
            type: "company_calendar",
            ownerId: " ",
            name: event.title,
            section: event.section,
            description: event.description,
            attendees: event.members,
            from: event.from?.format(this.DayJSFormat),
            to: event.to?.format(this.DayJSFormat),
        };

        return axios.post(`${this.URL}calendar.event.add/`, data);
    }

    async update(event: IEvent) {
        const data = {
            id: event.id,
            type: "company_calendar",
            ownerId: " ",
            name: event.title,
            section: event.section,
            description: event.description,
            attendees: event.members,
            from: event.from?.format(this.DayJSFormat),
            to: event.to?.format(this.DayJSFormat),
        };

        return axios.post(`${this.URL}calendar.event.update/`, data);
    }
    async delete(id: number) {
        const data = {
            id: id,
            type: "company_calendar",
            ownerId: " ",
        };

        return axios.post(`${this.URL}calendar.event.update/`, data);
    }
};

export default new EventService;