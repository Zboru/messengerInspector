import StatCard from "../StatCard";
import {useTranslation} from "react-i18next";

const CreatedAt = ({conversation}) => {
    const {t, i18n} = useTranslation();

    function createdAtDate() {
        const messages = conversation.messages.sort((a, b) => a.timestamp_ms - b.timestamp_ms)
        if (messages && messages.length) {
            const date = new Date(messages[0].timestamp_ms);
            console.log(date.toLocaleDateString());
            return date.toLocaleDateString()
        }
    }

    return (
        <StatCard>
            <p>{t('created_at')}</p>
            <p className="flex justify-center items-center text-3xl mt-2 md:mt-0 h-full">{conversation && createdAtDate()}</p>
        </StatCard>
    )
}
export default CreatedAt
