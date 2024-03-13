import BitrixService from "./index";
import axios from "axios";
import {ISection} from "../../types/app";

class SectionsService extends BitrixService {

    async getAll() {

        const data = {
            ownerId: "",
            type: "company_calendar"
        }

        return axios.post<IBitrixResponse<IApiSection[]>>(`${this.URL}calendar.section.get/`, data);
    }

    async add(section: Partial<ISection>) {

        const data = {
            ownerId: " ",
            type: "company_calendar",
            name: section.title,
            color: section.color,
            text_color: section.color,
        }

        return axios.post(`${this.URL}calendar.section.add/`, data);
    }

    async update(section: Partial<ISection>) {

        const data = {
            ownerId: " ",
            type: "company_calendar",
            id: section.id,
            name: section.title,
            color: section.color,
            text_color: section.color,
        }

        return axios.post(`${this.URL}calendar.section.update/`, data);
    }

    async delete(id: number) {

        const data = {
            ownerId: " ",
            type: "company_calendar",
            id: id
        } ;

        return axios.post(`${this.URL}calendar.section.update/`, data);
    }
};

export default new SectionsService;