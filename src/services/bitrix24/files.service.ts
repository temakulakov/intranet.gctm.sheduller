import BitrixService from "./index";
import axios from "axios";
import {ISection} from "../../types/app";

class FilesService extends BitrixService {
// TODO: Перепроверить
    async getToken() {

        const data = {

        }

        return axios.post<IBitrixResponse<IApiSection[]>>(`${this.URL}disk.folder.uploadfile/`, data);
    }
};

export default new FilesService;