import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import EventService from "../services/bitrix24/event.service";
import {IEvent} from "../types/app";
import dayjs from "dayjs";
import eventService from "../services/bitrix24/event.service";

export const useEvents = () => {
    const DayJSFormat = "DD.MM.YYYY HH:mm:ss";
    return useQuery({
            queryKey: ['events'],
            queryFn: () => EventService.getRange(),
            select: ({data}): IEvent[] => data.result.map(data => ({
                id: Number(data.ID),
                title: data.NAME,
                description: data.DESCRIPTION,
                from: dayjs(data.DATE_FROM, DayJSFormat),
                to: dayjs(data.DATE_TO, DayJSFormat),
                section: Number(data.SECTION_ID),
                members: data.attendeesEntityList.map(element => Number(element.id)),
            })),
            staleTime: 0.5 * 60 * 1000,
        }
    );
}

export const useUpdateEvent = (event: IEvent) => {
    const queryClient = useQueryClient();
    return useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
        mutationFn: () => {
            return eventService.update(event);
        }});
}

export const useAddEvent = (event: Omit<IEvent, 'id'>) => {
    const queryClient = useQueryClient();
    return useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
        mutationFn: () => {
            return eventService.addEvent(event);
        }});
}
export const useDeleteEvent = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
        mutationFn: () => {
            return eventService.delete(id);
        }});
}