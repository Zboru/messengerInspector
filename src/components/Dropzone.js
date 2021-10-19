import {useDropzone} from "react-dropzone";
import {useCallback} from "react";
import clsx from "clsx";

const zoneStyles = ["border border-dashed border-2 p-5 mt-2"];

const Dropzone = ({onChange}) => {
    const onDrop = useCallback(acceptedFiles => {
        onChange(acceptedFiles)
    }, [])
    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: 'application/JSON'})
    return (
        <div className={clsx(zoneStyles)} {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Upuść swoje pliki tutaj ...</p> :
                    <p>Przenieś swoje pliki tutaj, albo kliknij by wybrać</p>
            }
            {acceptedFiles.length ?
                <p>Załadowano {acceptedFiles.length} plików</p> :
                null
            }
        </div>
    );
}
export default Dropzone
