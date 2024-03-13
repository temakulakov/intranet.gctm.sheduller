import React, { useEffect } from 'react';
import { useEvents } from "./hooks/useEvents";
import styles from "./styles/App.module.scss"; // Убедитесь, что путь указан правильно
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/slices";
import permissions, { setPermission } from "./store/slices/permissions";

function App() {
    const dispatch = useDispatch();
    const isAdminMode = useSelector((state: RootState) => state.permissions);
    const location = useLocation(); // Используем useLocation для получения строки запроса

    useEffect(() => {
        // Исправленное использование URLSearchParams для анализа строки запроса
        const searchParams = new URLSearchParams(location.search);
        const adminModeParam = searchParams.get('adminMode');
        dispatch(setPermission(adminModeParam === 'Y'));
    }, [location, dispatch]);

    return (
        <div className={styles.root}>
            {String(isAdminMode)}
        </div>
    );
}

export default App;
