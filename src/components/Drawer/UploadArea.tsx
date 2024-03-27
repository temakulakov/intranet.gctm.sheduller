import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DragAndDrop: React.FC = () => {
    const [dragOver, setDragOver] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFileUpload(files[0]); // Пример с одним файлом для упрощения
        }
    };

    const processFileUpload = (file: File) => {
        const totalSize = file.size;
        let uploaded = 0;

        // Имитация процесса загрузки
        const interval = setInterval(() => {
            uploaded += totalSize * 0.05; // Имитация загруженного объема
            const newPercentage = Math.min(100, (uploaded / totalSize) * 100);
            setUploadPercentage(newPercentage);

            if (newPercentage >= 100) {
                clearInterval(interval);
            }
        }, 100);
    };

    return (
        <>
            <motion.div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    marginTop: '20px',
                    userSelect: 'none',
                    width: '100%',
                    height: '200px',
                    borderWidth: '2px',
                    borderColor: dragOver ? '#00f' : '#bbb',
                    borderStyle: 'dashed',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    color: '#bbb',
                    transition: 'border-color 0.2s ease-in-out',
                    position: 'relative',
                }}
            >
                {dragOver ? 'Отпустите файлы здесь' : 'Перетащите файлы сюда или кликните для выбора'}
                <motion.div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '5px',
                        backgroundColor: '#00f',
                        width: uploadPercentage + '%',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: uploadPercentage + '%' }}
                />
            </motion.div>
            {uploadPercentage > 0 && (
                <div style={{ marginTop: '10px', fontSize: '16px' }}>
                    Загрузка: {uploadPercentage.toFixed(0)}%
                </div>
            )}
        </>
    );
};

export default DragAndDrop;
