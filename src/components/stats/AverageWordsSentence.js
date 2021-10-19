import StatCard from "../StatCard";
import {Pie} from "react-chartjs-2";

const AverageWordsSentence = ({conversation}) => {

    const array_average = (array) => array.reduce((a, b) => a + b) / array.length;
    const participants = [...conversation.participants];

    participants.forEach(participant => {
        const participant_name = participant.name;
        const words_in_sentence = [];
        conversation.messages.forEach(message => {
            if (message.sender_name === participant_name && message.content) {
                const words = message.content.split(' ');
                words_in_sentence.push(words.length);
            }
        })
        participant.average_words_per_sentence = array_average(words_in_sentence);
    })

    const data = {
        labels: participants.map(participant => participant.name),
        datasets: [{
            label: '# of Votes',
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
            data: participants.map(p => p.average_words_per_sentence),
            borderWidth: 1,
        }]
    }

    return (
        <StatCard>
            <p>Średnia ilość słów w zdaniu</p>
            <Pie data={data} />
        </StatCard>
    )
}
export default AverageWordsSentence
