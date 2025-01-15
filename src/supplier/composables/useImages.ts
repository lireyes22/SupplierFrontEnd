import { ref } from "vue";
import type { Callback } from 'element-plus/lib/components/index.js';

export default function useImages() {


    const files = ref<File[]>([]);
    function onSelectedFiles(event: any) {
        files.value = event.files;

    };
    function removeAllFiles(callback: Callback) {
        files.value = [];
        callback;
    }
    function removeFile(filesAct: File[], callback: void) {
        files.value = filesAct;
        console.log(files.value.map(file => file.name));
        callback;
    }

    function onDrop(event: any) {
        const droppedFiles = event.dataTransfer.files;
        onSelectedFiles(droppedFiles);
    }

    function formatFileSize(sizeInBytes: number) {
        const kb = 1024;
        const mb = kb * 1024;

        if (sizeInBytes >= mb) {
            return (sizeInBytes / mb).toFixed(2) + ' MB';
        } else if (sizeInBytes >= kb) {
            return (sizeInBytes / kb).toFixed(2) + ' KB';
        } else {
            return sizeInBytes + ' bytes';
        }
    }

    return {
        files,
        onSelectedFiles,
        onDrop,
        formatFileSize,
        removeAllFiles,
        removeFile
    };
}