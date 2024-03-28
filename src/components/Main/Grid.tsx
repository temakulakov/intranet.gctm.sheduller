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
import {IEvent, ISection} from "../../types/app";
import calculateSectionTimes from "../../helpres/calculateSectionTimes";

const cx = classNames.bind(styles);

export interface ILoadingSections {
    id: number;
    hours?: number;
    percentes?: number;

}

const Grid = () => {
    const [ allScroll, setAllScroll ] = useState<boolean>(true);
    const [scroll, setScroll] = useState(0);
    const date = useSelector((state: RootState) => state.currentDate);
    const { isSuccess, data } = useSections();
    const { isSuccess: eventsSuccess, data: events, refetch, isFetching } = useEvents(date.from);

    const adminMode = useSelector((state: RootState) => state.permissions);

    const dispatch = useDispatch();
    const groups = useSelector((state: RootState) => state.groups);
    const gridRef = useRef<HTMLDivElement>(null);
    const [ activeEvent, setActiveEvent ] = useState<IEvent>();

    const [isOpen, setIsOpen] = useState(false);
    const [ loadSections, setLoadSections ] = useState<ILoadingSections[]>([]);
    const [ columnShow, setColumnShow ] = useState<boolean>(true);
    const [ content, setContent ] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const currentDate = new Date();

        const startOfWorkDay = new Date();
        startOfWorkDay.setHours(9, 0, 0, 0);

        const minutesSinceStartOfWorkDay = (currentDate.getTime() - startOfWorkDay.getTime()) / (1000 * 60);
        setScroll(dayjs().diff(dayjs().startOf('day'), 'minute') / 60 * 200 - 200);
    }, []);




    useEffect(() => {

        if (isSuccess) {
            dispatch(setGroups(data));
        }

        if (data && events) {
            const newLoads: ILoadingSections[] = loadSections.map(item => {
                const hours = events.reduce((acc, item) => acc + Number(item.to.date(dayjs().date()).diff(item.from.date(dayjs().date()), 'hours')), 0);
                return { hours: hours, id: item.id,  };
            })
            setLoadSections(calculateSectionTimes(events, data));
        }
    }, [isSuccess, data, dispatch, isFetching]);

    useEffect(() => {
        refetch();
        setScroll(dayjs().diff(dayjs().startOf('day'), 'minute') / 60 * 200 - 200);
    }, [date]);


    useEffect(() => {

        if (gridRef.current) {
            gridRef.current.scrollLeft = scroll;
        }
    }, [scroll, gridRef.current ]);


    const handleWheelScroll = (event: React.WheelEvent<HTMLDivElement>) => {
        // event.preventDefault();
        // event.stopPropagation();
        setScroll(prev => prev + event.deltaY);
    };

    const [showGroups, setShowGroups] = useState<number[]>([0, 1]);

    const columnJSX = groups.map((group, indexGroup) => (
        <motion.div key={indexGroup} className={cx({
            groupElement: true,
            groupElementActive: showGroups.includes(group.id)
        })}

        >
            <div style={{ height: !showGroups.includes(group.id) ? `${20 * group.sections.length}px` : `${25}px` }} className={styles.titleGroup} onClick={() => setShowGroups(prevState => prevState.includes(group.id) ? prevState.filter(item => item !== group.id) : [...prevState, group.id])}>
                <h4>{group.title}</h4>
                <ArrowForwardIosRoundedIcon />
            </div>
            {group.sections.map((section, indexSection) => {
                return (
                    <div
                        key={indexSection}
                        className={cx({
                            sectionElement: true,
                            sectionElementActive: showGroups.includes(group.id)
                        })}
                    >
                        <p>{section.title}</p>
                        <div>
                            <p>{`${Number(loadSections.find(item => item.id === section.id)?.hours).toFixed(1)}ч`}</p>
                            <div style={{
                                height: '20px',
                                width: '100px',
                                backgroundColor: '#CBCBCB',
                                overflow: 'hidden',
                                borderRadius: '5px',
                                margin: '0 10px'
                            }}
                                 onMouseLeave={() => setContent(<div></div>)}
                                 onMouseEnter={() => setContent(<div>
                                     <p>{`${Number(loadSections.find(item => item.id === section.id)?.hours).toFixed(1)}ч из 8ч`}</p>
                                 </div>)}
                            >
                                <motion.div animate={{
                                    height: '100%',
                                    width: `${Number(loadSections.find(item => item.id === section.id)?.percentes).toFixed(1)}%`,
                                    backgroundColor: section.color
                                }}></motion.div>
                            </div>
                            <p>{`${Number(loadSections.find(item => item.id === section.id)?.percentes).toFixed(1)}%`}</p>
                        </div>

                    </div>
                )
            })}
        </motion.div>
    ));

    const gridJSX = groups.map((group, indexGroup) => (
        <motion.div key={indexGroup} className={styles.groupWrapper}
                    animate={{
                        marginTop: showGroups.includes(group.id) ? '45px' : '0',
                        height: showGroups.includes(group.id) ? 'fit-content' : `${20 * group.sections.length}px`,
                        minHeight: showGroups.includes(group.id) ? '' : '45px'
                    }}
        >
            {group.sections.map((section, indexSection) => {
                return <motion.div
                    key={indexSection}
                    className={styles.row}
                    animate={{height: showGroups.includes(group.id) ? '39px' : `20px`}}
                    onMouseEnter={() => setContent(adminMode ? <p>{ `Создать новое событие в ${section.title}`}</p> : null)}
                    onMouseLeave={() => setContent(null)}
                    onClick={() => {
                        if (adminMode) {
                            setIsOpen(true);
                            setActiveEvent({
                                id: 0,
                                title: 'Новое событие',
                                description: '',
                                section: section.id,
                                from: dayjs(),
                                to: dayjs().add(1, 'hour'),
                                members: [0]
                            });
                        }

                    }}
                >
                    {
                        events && events.filter(event => event.section === section.id).map((event, indexEvent) => (
                            <motion.div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(true);
                                    setActiveEvent(event);
                                }}
                                onMouseEnter={() => setContent(<div>
                                    <p><b>{event.title}</b></p>
                                    <p>{`${event.from.format('hh:mm')} - ${event.to.format('hh:mm')}`}</p>
                                    <p>{event.description}</p>
                                </div>)}
                                className={styles.eventWrapper}
                                key={event.id}
                                initial={{opacity: 0}}
                                animate={{
                                    opacity: 1,
                                    x: event.from.diff(event.from.startOf('day'), 'minutes') / 60 * 200,
                                    height: showGroups.includes(group.id) ? '39px' : '20px',
                                    backgroundColor: group.color,
                                    width: `${dayjs().hour(event.to.hour()).minute(event.to.minute()).diff(dayjs().hour(event.from.hour()).minute(event.from.minute()), 'minute') / 60 * 200}px`
                                }}
                            >{`${event.title}`}</motion.div>
                        ))
                    }
                </motion.div>
            })}
        </motion.div>
    ));

    useEffect(() => {
        if (allScroll) {
            document.body.style.overflow = 'scroll';
            console.log("body -")
        } else {
            document.body.style.overflow = 'hidden';
            console.log("body +")

        }
    }, [allScroll]);


    return (
        <>
            <div className={styles.wrapper}>
                {isSuccess && (
                    <>
                        <motion.div className={styles.column}
                                    animate={{minWidth: columnShow ? '350px' : '0', opacity: columnShow ? 1 : 0}}>
                            <motion.div
                                style={{
                                    height: '25px',
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setColumnShow(!columnShow)}

                            >{'Скрыть'}</motion.div>

                            {columnJSX}
                            <div className={styles.button}></div>
                        </motion.div>
                        <motion.div className={styles.grid} ref={gridRef} onWheel={handleWheelScroll} tabIndex={0} onMouseLeave={() => setAllScroll(true)} onMouseEnter={() => setAllScroll(false)}>
                            <TimeLine/>
                            <div className={styles.rowWrapper}>
                                {gridJSX}
                            </div>
                        </motion.div>
                    </>
                )}
            </div>
            <Popover isView={content}/>
            <RightDrawer isOpen={isOpen} toggleDrawer={setIsOpen} activeEvent={activeEvent}
                         setActiveEvent={setActiveEvent}/>
        </>
    );
};

export default Grid;
