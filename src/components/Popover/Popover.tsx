import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FollowCursorProps {
    isView: JSX.Element | null;
}

const Popover: React.FC<FollowCursorProps> = ({ isView }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // Обновление позиции без непосредственной анимации
            setPosition({
                x: event.clientX,
                y: event.clientY,
            });
        };

        if (isView) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isView]);

    return isView ? (
        <motion.div
            style={{
                width: 'fit-content',
                height: 'fit-content',
                backgroundColor: 'white',
                borderRadius: '5px',
                padding: '5px',
                position: 'fixed',
                x: position.x + 20, // Центрирование элемента относительно курсора
                y: position.y - 20,
                pointerEvents: 'none', // Элемент не будет взаимодействовать с курсором
                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',

                zIndex: 150,
            }}
            // Анимация следования за курсором с плавностью
        >{isView}</motion.div>
    ) : null;
};

export default Popover;
