import {ILoadingSections} from "../components/Main/Grid";
import {IEvent, ISection} from "../types/app";
import dayjs from "dayjs";
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);

export default function calculateSectionTimes(events: IEvent[], sections: ISection[]): ILoadingSections[] {
    const loadingSections: ILoadingSections[] = [];
    const workStart = dayjs().hour(9).minute(30);
    const workEnd = dayjs().hour(18).minute(30);
    const difference = workEnd.diff(workStart, 'hours');
    sections.forEach(section => {
        const currentEvents = events.filter((event: IEvent) => event.section === section.id);
        const hours = currentEvents.reduce((acc, item) => {
            const start = dayjs.max(item.from.date(dayjs().date()), workStart);
            const end = dayjs.min(item.to.date(dayjs().date()), workEnd);
            if (end && start && (end.isBefore(workStart) || start.isAfter(workEnd))) {
                return 0;
            }

                // Рассчитываем разницу между началом и окончанием в часах
                const hours = end?.diff(start, 'hour', true); // Используем 'true', чтобы получить дробное количество часов

            return acc + Number(hours);
        }, 0);
        loadingSections.push({ id: section.id, hours: hours, percentes: hours / (difference / 100) });
    });
    return loadingSections;
}