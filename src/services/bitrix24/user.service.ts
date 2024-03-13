import BitrixService from "./index";
import axios from "axios";

class UserService extends BitrixService {

    async getAll() {

        let allUsers: IApiUser[] = [];
        let next = 0;
        let total = 0;
        do {
            const data = {
                start: next,
                filter: {
                    USER_TYPE: "employee"
                }
            }
            const response = await axios.post<IBitrixResponsePagination<IApiUser[]>>(`${this.URL}user.get/`, data);
            const {result, next: nextPage, total: totalUsers} = response.data;
            allUsers = allUsers.concat(result);
            next = nextPage;
            total = totalUsers;
        } while (allUsers.length < total);
        return { data: {result: allUsers } };
    }
};

export default new UserService;