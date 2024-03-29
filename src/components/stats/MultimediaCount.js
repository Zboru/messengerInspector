import StatCard from "../StatCard";
import {Doughnut} from "react-chartjs-2";
import {useTranslation} from "react-i18next";
import ChartDataLabels from "chartjs-plugin-datalabels";

const MultimediaCount = ({conversation}) => {
    const {t} = useTranslation();
    const participants = [...conversation.participants];
    conversation.messages.forEach(message => {
        if (message.photos && message.photos.length) {
            const participant = participants.find(p => p.name === message.sender_name);
            if (participant.image_count) {
                participant.image_count += message.photos.length;
            } else {
                participant.image_count = 1;
            }
        }
    })

    const data = {
        labels: participants.map(participant => participant.name),
        datasets: [
            {
                data: participants.map(p => p.image_count),
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
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'center',
                offset: 6
            }
        }
    };

    const plugins = [ChartDataLabels]

    return (
        <StatCard>
            <p>{t('media_sent')}</p>
            <Doughnut data={data} options={options} plugins={plugins}/>
        </StatCard>
    )
}
export default MultimediaCount
