import clsx from "clsx";

const StatCard = ({children, className}) => {
    return <div className={clsx(className, "p-5 border")}>{children}</div>
}
export default StatCard
