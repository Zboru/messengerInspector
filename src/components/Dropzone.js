import {useDropzone} from "react-dropzone";
import {useCallback} from "react";
import clsx from "clsx";
import {useTranslation} from "react-i18next";

const zoneStyles = ["border border-dashed border-2 w-[415px] flex flex-col justify-center dark:border-gray-500 dark:text-white p-5 mt-2"];

const Dropzone = ({onChange}) => {
    const {t, i18n} = useTranslation();
    const onDrop = useCallback(acceptedFiles => {
        onChange(acceptedFiles)
    }, [])
    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: 'application/JSON'})
    return (
        <div className={clsx(zoneStyles)} {...getRootProps()}>
            <input {...getInputProps()} />
            {acceptedFiles.length ?
                <p>{t('dropzoneFiles', {count: acceptedFiles.length})}</p> :
                isDragActive ? <p>{t('dropzone_drag_prompt')}</p> : <p>{t('dropzone_prompt')}</p>
            }
        </div>
    );
}
export default Dropzone
