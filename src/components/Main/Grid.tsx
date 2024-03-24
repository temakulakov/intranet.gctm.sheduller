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

const cx = classNames.bind(styles);

const Grid = () => {
    const [scroll, setScroll] = useState(0);
    const { isSuccess, data } = useSections();
    const dispatch = useDispatch();
    const groups = useSelector((state: RootState) => state.groups);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentDate = new Date();

// Устанавливаем начало рабочего дня (в данном случае 9:00 утра)
        const startOfWorkDay = new Date();
        startOfWorkDay.setHours(9, 0, 0, 0); // Установка часов и минут

// Вычисляем разницу между текущим временем и началом рабочего дня в минутах
        const minutesSinceStartOfWorkDay = (currentDate.getTime() - startOfWorkDay.getTime()) / (1000 * 60);
        setScroll(dayjs().diff(dayjs().startOf('day'), 'minute') / 60 * 200 - 200);
    }, []);


    useEffect(() => {
        if (isSuccess) {
            dispatch(setGroups(data));
        }
    }, [isSuccess, data, dispatch]);


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
            <div style={{ height: !showGroups.includes(group.id) ? `${15 * group.sections.length}px` : `${25}px` }} className={styles.titleGroup} onClick={() => setShowGroups(prevState => prevState.includes(group.id) ? prevState.filter(item => item !== group.id) : [...prevState, group.id])}>
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
        <div key={indexGroup} className={cx({})}>
            {group.sections.map((section, indexSection) => (
                <div key={indexSection} className={styles.row}></div>
            ))}
        </div>
    ));



    return (


        <div className={styles.wrapper}>
            {isSuccess && (
                <>
                    <div className={styles.column}>
                        {columnJSX}
                    </div>
                    <motion.div className={styles.grid} ref={gridRef} onWheel={handleWheelScroll} >
                        <TimeLine />
                        <div className={styles.rowWrapper}>
                            {gridJSX}
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    );
};

export default Grid;
