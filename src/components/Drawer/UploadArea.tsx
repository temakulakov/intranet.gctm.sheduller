import React from 'react';
import styles from 'styles/UploadArea.module.scss';
import {useUploadFile} from "../../hooks/useUpload";

const UploadArea = () => {
    const { mutate: uploadFile, isSuccess, isError } = useUploadFile();

        // Пример использования:
        // uploadFile({ folderId: "12345", file: selectedFile });

    return <div className={styles.root}>

    </div>
};

export default UploadArea;