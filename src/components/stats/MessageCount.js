import StatCard from "../StatCard";
import {useTranslation} from "react-i18next";

const MessageCount = ({conversation}) => {
    const {t, i18n} = useTranslation();
    return (
        <StatCard>
            <p>{t('message_count')}</p>
            <div className="flex flex-col h-full justify-center items-center">
                <p className="text-3xl mt-2 md:mt-0">{conversation.messages.length || ""}</p>
                {conversation.messages.length > 0 && <p className="text-3xl">{t('period_messages_abbr')}</p>}
            </div>
        </StatCard>
    )
}
export default MessageCount
