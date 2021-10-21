import {useTranslation} from "react-i18next";

const Divider = () => {
    const {t} = useTranslation();
    return (
        <div className="flex flex-col items-center mx-4">
            <div className="border-r-2 h-full mt-2"/>
            <span className="dark:text-white">{t('load_sample_data_divider')}</span>
            <div className="border-r-2 h-full"/>
        </div>
    )
}
export default Divider
