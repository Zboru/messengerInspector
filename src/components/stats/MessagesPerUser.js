import {Pie} from 'react-chartjs-2';

const MessagesPerUser = ({conversation}) => {

    const participants = conversation.participants;

    function participantMessageCount(participant) {
        return conversation.messages.filter(message => message.sender_name === participant).length
    }

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
            data: participants.map(participant => participantMessageCount(participant.name)),
            borderWidth: 1,
        }]
    }

    return (
        <div className="p-5 border">
            <p>Wiadomości na użytkownika</p>
            <Pie data={data}/>
        </div>
    )
}
export default MessagesPerUser
