import axios from "axios";
import BitrixService from "./index";

class DiskService extends BitrixService {
    public async uploadFile(folderId: string, file: File) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify({
            FOLDER_ID: 225,
            NAME: file.name,
        }));

        return axios.post(`${this.URL}disk.folder.uploadfile/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
};

export default new DiskService;