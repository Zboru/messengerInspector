import Dropzone from "./components/Dropzone";
import React from "react";
import utf8 from 'utf8';
import {useState} from "react";
import MessageCount from "./components/stats/MessageCount";
import CreatedAt from "./components/stats/CreatedAt";
import MessagesPerUser from "./components/stats/MessagesPerUser";
import WordsPerUser from "./components/stats/WordsPerUser";

const Home = () => {
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
            <Dropzone onChange={handleFiles}/>
            <div className="mt-2 grid grid-cols-3 gap-2">
                <MessageCount conversation={conversation}/>
                <CreatedAt conversation={conversation}/>
                <MessagesPerUser conversation={conversation}/>
                <WordsPerUser conversation={conversation}/>
            </div>
        </>
    )
}
export default Home
