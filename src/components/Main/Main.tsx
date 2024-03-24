import React from 'react';
import styles from 'styles/Main.module.scss';
import Header from "./Header";
import TimeLine from "./TimeLine";
import Grid from "./Grid";

const Main = () => {
    return <div className={styles.wrapper}>
        <Header/>
        <Grid/>
    </div>
};

export default Main;