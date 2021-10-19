import StatCard from "../StatCard";
import {useTranslation} from "react-i18next";

const CreatedAt = ({conversation}) => {
    const {t, i18n} = useTranslation();
    function createdAtDate() {
        if (conversation && conversation.messages[0]) {
            const date = new Date(conversation.messages[0].timestamp_ms);
            console.log(date.toLocaleDateString());
            return date.toLocaleDateString()
        }
    }
    return (
        <StatCard>
            <p>{t('created_at')}</p>
            <p className="flex justify-center items-center text-3xl h-full">{conversation && createdAtDate()}</p>
        </StatCard>
    )
}
export default CreatedAt
