import {useQuery} from "@tanstack/react-query";
import UserService from "../services/bitrix24/user.service";
import {IUser} from "../types/app";

export const useUsers = () => {
    return useQuery({
            queryKey: ['users'],
            queryFn: () => UserService.getAll(),
            select: ({data}): IUser[] => data.result.map(user => ({
                id: Number(user.ID),
                name: `${user.NAME} ${user.LAST_NAME} ${user.SECOND_NAME}`,
                email: user.EMAIL,
                image: user.PERSONAL_PHOTO
            })),
            staleTime: 15 * 60 * 1000,
        }
    );
}