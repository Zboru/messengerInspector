import DarkModeSwitch from "./components/DarkModeSwitch";
import {useTranslation} from "react-i18next";
import LanguageSwitch from "./components/LanguageSwitch";
import GithubLink from "./components/GithubLink";
import PrintPage from "./components/PrintPage";

const Layout = (props) => {
    const {t, i18n} = useTranslation();
    return (
        <div className="h-screen container">
            <div className={'flex sticky top-0 bg-white dark:bg-gray-800 items-center px-5 justify-between md:px-0 pt-2 dark:text-white border-b border-gray-700 pb-2'}>
                <a href="/">{t('title')}</a>
                <div className="flex">
                    <PrintPage/>
                    <GithubLink/>
                    <LanguageSwitch />
                    <DarkModeSwitch/>
                </div>
            </div>
            {props.children}
        </div>
    )
}
export default Layout
