import StatCard from "../StatCard";
import {useTranslation} from "react-i18next";

const MessageCount = ({conversation}) => {
    const {t, i18n} = useTranslation();
    return (
        <StatCard>
            <p>{t('message_count')}</p>
            <div className="flex h-full justify-center items-center">
                <p className="text-3xl">{conversation.messages.length || ""}</p>
            </div>
        </StatCard>
    )
}
export default MessageCount
