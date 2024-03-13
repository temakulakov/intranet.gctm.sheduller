import React, {useEffect} from 'react';
import styles from 'styles/Main.module.scss';
import {useSections} from "../../hooks/useSections";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/slices";
import {setGroups} from "../../store/slices/group";
import Header from "./Header";

const Main = () => {
    const { isSuccess, isLoading, data} = useSections();

    const dispatch = useDispatch();
    const groups = useSelector((state: RootState) => state.groups);

    useEffect(() => {
        if (isSuccess) {
            dispatch(setGroups(data));
        }
    }, [data]);

    return <div className={styles.wrapper}>
        <Header/>
    </div>
};

export default Main;