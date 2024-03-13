import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import SectionsService from "../services/bitrix24/sections.service";
import {ISection} from "../types/app";
import sectionsService from "../services/bitrix24/sections.service";

export const useSections = () => {
    return useQuery({
            queryKey: ['sections'],
            queryFn: () => SectionsService.getAll(),
            select: ({data}): ISection[] => data.result.map(section => ({
                id: Number(section.ID),
                title: section.NAME,
                color: section.COLOR,
                text: section.TEXT_COLOR
            })),
            staleTime: 5 * 60 * 1000,
        }
    );
}


export const useAdd = (section: Partial<ISection>) => {
    const queryClient = useQueryClient();
    return useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sections'] });
        },
        mutationFn: () => {
            return sectionsService.update(section);
        }});
}

export const useUpdate = (section: ISection) => {
    const queryClient = useQueryClient();
    return useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sections'] });
        },
        mutationFn: () => {
            return sectionsService.update(section);
        }});
}

export const useDelete = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sections'] });
        },
        mutationFn: () => {
            return sectionsService.delete(id);
        }});
}