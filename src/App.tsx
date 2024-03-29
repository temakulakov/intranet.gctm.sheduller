import React, { useEffect } from 'react';
import styles from "./styles/App.module.scss"; // Убедитесь, что путь указан правильно
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/slices";
import {useSections} from "./hooks/useSections";
import {setGroups} from "./store/slices/group";
import Main from "./components/Main/Main";
import Calendar from "./components/Calendar/Calendar";
import {setPermission} from "./store/slices/permissions";

function App() {

    const isAdminMode = useSelector((state: RootState) => state.permissions);
    const location = useLocation(); // Используем useLocation для получения строки запроса
    const dispatch = useDispatch();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const adminModeParam = searchParams.get('adminMode');
        if (adminModeParam === 'Y') {
            dispatch(setPermission(true));
        }
    }, [location, dispatch]);

    return (
        <div className={styles.root}>
            <Main/>
            <Calendar/>
        </div>
    );
}

export default App;
