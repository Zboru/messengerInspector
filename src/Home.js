import Dropzone from "./components/Dropzone";
import React from "react";
import utf8 from 'utf8';
import {useState} from "react";
import MessageCount from "./components/stats/MessageCount";
import CreatedAt from "./components/stats/CreatedAt";
import MessagesPerUser from "./components/stats/MessagesPerUser";
import WordsPerUser from "./components/stats/WordsPerUser";
import MostFrequentWords from "./components/stats/MostFrequentWords";
import AverageWordsSentence from "./components/stats/AverageWordsSentence";
import YearOverview from "./components/stats/YearOverview";
import MultimediaCount from "./components/stats/MultimediaCount";
import BestPeriod from "./components/stats/BestPeriod";
import WorstPeriod from "./components/stats/WorstPeriod";
import AverageDayActivity from "./components/stats/AverageDayActivity";
import SearchWordFrequency from "./components/stats/SearchWordFrequency";
import {useTranslation} from "react-i18next";
import Divider from "./components/Divider";
import DataGenerator from "./components/DataGenerator";

const Home = () => {
    const {t} = useTranslation();
    const [conversation, setConversation] = useState({
        participants: [],
        title: "",
        messages: [],
    });

    function initialSetup(results) {
        let messages = [];
        const participantsSet = new Set();
        let title = null;
        results.forEach(result => {
            let data = JSON.parse(result.value);

            // Save participants
            data.participants.forEach(participant => {
                participantsSet.add(participant.name);
            })

            // Save messages
            messages.push(data.messages);

            // Save title
            title = utf8.decode(data.title);
        })

        // Flatten concatenated messages and decode strings
        messages = messages.flat().map(message => {
            if (message.content) {
                return {
                    ...message,
                    sender_name: utf8.decode(message.sender_name),
                    content: utf8.decode(message.content)
                }
            } else {
                return {
                    ...message,
                    sender_name: utf8.decode(message.sender_name),
                }
            }
        })

        // Save decoded participants in object
        const participants = Array.from(participantsSet).map(participant => {
            return {name: utf8.decode(participant), count: 0}
        })

        setConversation({...conversation, title, participants, messages})
    }

    function handleFiles(files) {
        const promises = [];
        files.forEach(file => {
            const promise = new Promise(function (resolve) {
                const reader = new FileReader();
                reader.addEventListener('load', (e) => {
                    resolve(e.target.result)
                });
                reader.readAsText(file);
            })
            promises.push(promise);
        })
        Promise.allSettled(promises).then(results => {
            initialSetup(results)
        })
    }

    return (
        <>
            <div className="flex py-3">
                <Dropzone onChange={handleFiles}/>
                <Divider/>
                <DataGenerator setConversation={setConversation}/>
            </div>
            <div className="stat-grid mt-2 md:grid md:grid-cols-3 gap-2">
                <MessageCount conversation={conversation}/>
                <CreatedAt conversation={conversation}/>
                <MessagesPerUser conversation={conversation}/>
                <WordsPerUser conversation={conversation}/>
                <MostFrequentWords className="col-span-2" conversation={conversation}/>
                <YearOverview className="col-span-2" conversation={conversation}/>
                <AverageWordsSentence conversation={conversation}/>
                <MultimediaCount conversation={conversation}/>
                <AverageDayActivity className="col-span-2" conversation={conversation}/>
                <SearchWordFrequency className="col-span-2" conversation={conversation}/>
                <BestPeriod conversation={conversation}/>
                <WorstPeriod conversation={conversation}/>
            </div>
        </>
    )
}
export default Home
