import DarkModeSwitch from "./components/DarkModeSwitch";

const Layout = (props) => {
    return (
        <div className="h-screen container">
            <div className={'flex items-center px-5 justify-between md:px-0 pt-2 dark:text-white border-b border-gray-700 pb-2'}>
                <a href="/">Inspector dla Messenger</a>
                <DarkModeSwitch/>
            </div>
            {props.children}
        </div>
    )
}
export default Layout
