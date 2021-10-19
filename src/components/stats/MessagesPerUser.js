import {Pie} from 'react-chartjs-2';
import StatCard from "../StatCard";
import {useTranslation} from "react-i18next";

const MessagesPerUser = ({conversation}) => {
    const {t, i18n} = useTranslation();
    const participants = conversation.participants;

    function participantMessageCount(participant) {
        return conversation.messages.filter(message => message.sender_name === participant).length
    }

    const data = {
        labels: participants.map(participant => participant.name),
        datasets: [{
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            data: participants.map(participant => participantMessageCount(participant.name)),
            borderWidth: 1,
        }]
    }

    return (
        <StatCard>
            <p>{t('messages_per_user')}</p>
            <Pie data={data}/>
        </StatCard>
    )
}
export default MessagesPerUser
