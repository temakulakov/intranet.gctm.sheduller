import React, { useEffect, useRef, useState } from 'react';
import styles from 'styles/Grid.module.scss';
import { useSections } from "../../hooks/useSections";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/slices";
import { setGroups } from "../../store/slices/group";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import TimeLine from "./TimeLine";
import dayjs from "dayjs";
import {useEvents} from "../../hooks/useEvents";
import Popover from "../Popover/Popover";
import RightDrawer from "../Drawer/Drawer";
import {IEvent} from "../../types/app";

const cx = classNames.bind(styles);

const Grid = () => {
    const [scroll, setScroll] = useState(0);
    const date = useSelector((state: RootState) => state.currentDate);
    const { isSuccess, data } = useSections();
    const { isSuccess: eventsSuccess, data: events, refetch } = useEvents(date.from);
    // const { isSuccess, data as events }
    const dispatch = useDispatch();
    const groups = useSelector((state: RootState) => state.groups);
    const gridRef = useRef<HTMLDivElement>(null);
    const [ activeEvent, setActiveEvent ] = useState<IEvent>();

    const [isOpen, setIsOpen] = useState(false);

    const [ content, setContent ] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const currentDate = new Date();

        const startOfWorkDay = new Date();
        startOfWorkDay.setHours(9, 0, 0, 0); // Установка часов и минут

        const minutesSinceStartOfWorkDay = (currentDate.getTime() - startOfWorkDay.getTime()) / (1000 * 60);
        setScroll(dayjs().diff(dayjs().startOf('day'), 'minute') / 60 * 200 - 200);
    }, []);


    useEffect(() => {
        if (isSuccess) {
            dispatch(setGroups(data));
        }
    }, [isSuccess, data, dispatch]);

    useEffect(() => {
        console.log(events);
    }, [events]);

    useEffect(() => {
        refetch();
    }, [date]);


    useEffect(() => {
        if (gridRef.current) {
            gridRef.current.scrollLeft = scroll;
        }
    }, [scroll]);

    const handleWheelScroll = (event: React.WheelEvent<HTMLDivElement>) => {
        setScroll(prev => prev + event.deltaY)
    };

    const [showGroups, setShowGroups] = useState<number[]>([0, 1]);

    const columnJSX = groups.map((group, indexGroup) => (
        <div key={indexGroup} className={cx({
            groupElement: true,
            groupElementActive: showGroups.includes(group.id)
        })}>
            <div style={{ height: !showGroups.includes(group.id) ? `${20 * group.sections.length}px` : `${25}px` }} className={styles.titleGroup} onClick={() => setShowGroups(prevState => prevState.includes(group.id) ? prevState.filter(item => item !== group.id) : [...prevState, group.id])}>
                <h4>{group.title}</h4>
                <ArrowForwardIosRoundedIcon />
            </div>
            {group.sections.map((section, indexSection) => (
                <div
                    key={indexSection}
                    className={cx({
                        sectionElement: true,
                        sectionElementActive: showGroups.includes(group.id)
                    })}
                >
                    <p>{section.title}</p>
                </div>
            ))}
        </div>
    ));

    const gridJSX = groups.map((group, indexGroup) => (
        <motion.div key={indexGroup} className={styles.groupWrapper}
                    animate={{ marginTop: showGroups.includes(group.id) ? '45px' : '0', height: showGroups.includes(group.id) ? 'fit-content' : `${20 * group.sections.length}px` }}
        >
            {group.sections.map((section, indexSection) => (
                <motion.div
                    key={indexSection}
                    className={styles.row}
                    animate={{ height: showGroups.includes(group.id) ? '39px' : '20px'}}
                    onMouseEnter={() => setContent(<h3>{`Создать новое событие в ${section.title}`}</h3>)}
                    onMouseLeave={() => setContent(null)}
                    onClick={() => {
                        setIsOpen(true);
                    }}
                >
                    {
                        events && events.filter(event => event.section === section.id).map((event, indexEvent) => (
                                <motion.div
                                    onClick={() => {
                                        setIsOpen(true);
                                        setActiveEvent(event);
                                    }}
                                    onMouseEnter={() => setContent(<>
                                        <h3>{event.title}</h3>
                                        <p>{event.description}</p>
                                    </>)}
                                    className={styles.eventWrapper}
                                    key={event.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, x: event.from.diff(event.from.startOf('day'), 'minutes') / 60 * 200, height: showGroups.includes(group.id) ? '30px' : '20px', backgroundColor: group.color }}
                                >{`${event.title} | ${event.from.format('hh:mm DD.MM.YYYY')}`}</motion.div>
                        ))
                    }
                </motion.div>
            ))}
        </motion.div>
    ));



    return (
        <>
            <div className={styles.wrapper}>
                {isSuccess && (
                    <>
                        <div className={styles.column}>
                            {columnJSX}
                        </div>
                        <motion.div className={styles.grid} ref={gridRef} onWheel={handleWheelScroll}>
                            <TimeLine/>
                            <div className={styles.rowWrapper}>
                                {gridJSX}
                            </div>
                        </motion.div>
                    </>
                )}
            </div>
            <Popover isView={content}/>
            <RightDrawer isOpen={isOpen} toggleDrawer={setIsOpen} activeEvent={activeEvent} setActiveEvent={setActiveEvent} />
        </>
    );
};

export default Grid;
