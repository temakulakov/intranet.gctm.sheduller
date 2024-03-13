import React from 'react';
import styles from 'styles/Header.module.scss';
import {Month, WeekDay} from "types/consts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/slices";
import {Button} from "@mui/material";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import AssessmentOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import {decrementDay, incrementDay, setDate} from "../../store/slices/date";
import dayjs from "dayjs";


const Header = () => {
    const date = useSelector((state: RootState) => state.currentDate.from);

    const dispatch = useDispatch();

    const Buttons: Array<React.ReactElement> = [
        <Button
            key={0}
            color="secondary"
            variant="outlined"
            endIcon={<AssessmentOutlinedIcon/>}
            className={styles.report}
        >{"Отчет"}</Button>,
        <Button key={1} onClick={() => dispatch(decrementDay())}><KeyboardArrowLeftRoundedIcon/></Button>,
        <Button key={2} onClick={() => dispatch(setDate({from: dayjs()}))}>{"Сегодня"}</Button>,
        <Button key={3} onClick={() => dispatch(incrementDay())}><KeyboardArrowLeftRoundedIcon style={{rotate: '180deg'}}/></Button>,
    ];
    return <div className={styles.container}>
        <h2>{date.date()} {Month[date.month()]} {date.year()} {WeekDay[date.day()]}</h2>
        <div className={styles.buttonGroup}>
            {Buttons}
        </div>
    </div>
};

export default Header;