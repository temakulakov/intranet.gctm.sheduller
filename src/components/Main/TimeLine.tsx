import React from 'react';
import styles from 'styles/TimeLine.module.scss';

const TimeLine = () => {
    const hours = Array.from({ length: 24 }, (_, index) => `${index}:00`);

    return <div className={styles.wrapper}>
            {hours.map((hour, index) => (
                <div key={index} className={styles.element}>
                    {hour}
                </div>
            ))}
    </div>
};

export default TimeLine;