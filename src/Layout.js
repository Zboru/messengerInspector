import DarkModeSwitch from "./components/DarkModeSwitch";
import {useTranslation} from "react-i18next";
import LanguageSwitch from "./components/LanguageSwitch";

const Layout = (props) => {
    const {t, i18n} = useTranslation();
    return (
        <div className="h-screen container">
            <div className={'flex items-center px-5 justify-between md:px-0 pt-2 dark:text-white border-b border-gray-700 pb-2'}>
                <a href="/">{t('title')}</a>
                <div className="flex">
                    <LanguageSwitch />
                    <DarkModeSwitch/>
                </div>
            </div>
            {props.children}
        </div>
    )
}
export default Layout
