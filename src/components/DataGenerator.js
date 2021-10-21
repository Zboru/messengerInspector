import {useTranslation} from "react-i18next";
import {LoremIpsum} from "lorem-ipsum";
import Chance from 'chance'

const DataGenerator = ({setConversation}) => {
    const {t} = useTranslation();

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    function generateData() {
        const newConversation = {
            participants: [],
            messages: [],
            title: "",
        }
        // Random title
        newConversation.title = "Lorem ipsum"

        // Add participants
        const names = ['Julius Caesar', 'Markus Brutus', 'Romeo Montague', 'Juliet Capulet']
        newConversation.participants = names.map(name => {
            return {name: name}
        })
        for (let i = 0; i < 2500; i++) {
            const random = new Chance();
            const lorem = new LoremIpsum();
            const randomParticipantIndex = random.integer({min:0, max:3});
            const participant = newConversation.participants[randomParticipantIndex];
            const imageFlag = random.bool({likelihood: 10});
            if (imageFlag) {
                const messageContent = [{uri: "https://via.placeholder.com/350x150"}];
                newConversation.messages[i] = {
                    sender_name: participant.name,
                    timestamp_ms: randomDate(new Date(2021, 2, 10), new Date()).getTime(),
                    photos: messageContent,
                    type: "Generic"
                };
            } else {
                const messageContent = lorem.generateSentences(1);
                newConversation.messages[i] = {
                    sender_name: participant.name,
                    timestamp_ms: randomDate(new Date(2021, 2, 10), new Date()).getTime(),
                    content: messageContent,
                    type: "Generic"
                };
            }
        }
        setConversation(newConversation);
    }

    return (
        <div className="mt-2 flex items-center flex-col">
            <p className="dark:text-white">{t('load_sample_data')}</p>
            <button onClick={generateData}
                className="border rounded p-2 mt-2 dark:text-white dark:border-gray-500">{t('load_sample_data_btn')}</button>
        </div>
    )
}
export default DataGenerator
