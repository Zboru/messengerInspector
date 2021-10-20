import clsx from "clsx";

const StatCard = ({children, className}) => {
    return <div className={clsx(className, "p-5 border dark:text-white dark:border-gray-500")}>{children}</div>
}
export default StatCard
