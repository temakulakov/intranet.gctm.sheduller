import { useMutation, useQueryClient } from '@tanstack/react-query';
import DiskService from "../services/bitrix24/disk.service";
const diskService = DiskService; // Создаем экземпляр сервиса

export const useUploadFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        onSuccess: () => {
            // Здесь можно инвалидировать кэш или выполнить другие действия после успешной загрузки файла
            queryClient.invalidateQueries({ queryKey: ['files'] });
        },
        mutationFn: (data: { folderId: string, file: File }) => {
            return diskService.uploadFile(data.folderId, data.file);
        },
    });
}
