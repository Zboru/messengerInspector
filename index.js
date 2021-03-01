const fs = require('fs');
const utf8 = require('utf8');
const chalk = require('chalk');

const messages_directory = './json/';
const messages_files = [];
const messages_objects = [];
let thread = {
    messages: [],
    messages_per: {
        'year': {},
        'month': {},
        'day': {},
    },
    period_variables: {
        day: null,
        month: null,
        year: null,
    },
    words_count: [],
    dates: {
        set: new Set(),
        array: [],
    },
    title: null,
    participants: [],
    creation_date: null,
    message_count: 0,
};

function init() {
    readDirectory();
    importContent();
    setThreadTitle();
    saveParticipants();
    saveMessages();
    decodeMessages();
    chronologicalSort();
    setCreationDate();
    setMessageCount();
    storeDates();
    convertDates();
    matchMessagesDates();
    storeDatesStatistics();
    countDateStatistics();
    periodStatistics();
    countParticipantMessages()
    participantDateMessages();
    participantAverageWords();
    participantAverageWordLength();
    participantTotalWords();
    mostFrequentWords();
    exportData();
}

init();


/**
 * Read 'json' directory for filenames to further use
 */
function readDirectory() {
    process.stdout.write('\033c');
    infoLogStart("Collecting filenames");
    fs.readdirSync(messages_directory).forEach(file => {
        if (file !== '.gitkeep') messages_files.push(file);
    });
    // If there's no files with messages, stop execution
    if (messages_files.length <= 1) {
        errorLog("\nNo files in messages directory! Execution stopped.");
        hintLog("Check if there's files in 'json' directory, then launch script again.")
        process.exit();
    }
    infoLogFinish("Collecting filenames");
}

/**
 * Import every file from gathered filenames and push it to array
 */
function importContent() {
    messages_files.forEach(file => {
        messages_objects.push(require(messages_directory + file));
    })
    // Sort files by name using natural sort
    messages_files.sort((a, b) => {
        return a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'})
    })
}

/**
 * Save thread title to object
 */
function setThreadTitle() {
    infoLogStart("Setting title");
    thread.title = utf8.decode(messages_objects[0].title);
    infoLogFinish("Setting title");
}

/**
 * Save participants names to object for later identification
 */
function saveParticipants() {
    infoLogStart("Saving participants");
    thread.participants = messages_objects[0].participants
    // Make sure that every name is utf-8 decoded
    thread.participants.forEach(participant => {
        participant.name = utf8.decode(participant.name)
        participant.count = 0;
    })
    infoLogFinish("Saving participants");
}

/**
 * Store all messages from gathered files to one array
 */
function saveMessages() {
    infoLogStart("Storing messages to database");
    messages_objects.forEach(object => {
        thread.messages.push(...object.messages);
    })
    infoLogFinish("Storing messages to database");
}

/**
 * Sort thread messages chronologically
 */
function chronologicalSort() {
    infoLogStart('Sorting messages chronologically')
    thread.messages.sort((a, b) => {
        return parseInt(b.timestamp_ms) - parseInt(a.timestamp_ms);
    })
    infoLogFinish('Sorting messages chronologically')
}

/**
 * Save thread creation date
 */
function setCreationDate() {
    infoLogStart('Setting creation date')
    thread.creation_date = new Date(thread.messages[thread.messages.length - 1].timestamp_ms);
    infoLogFinish('Setting creation date')
}

/**
 * Save thread message count
 */
function setMessageCount() {
    infoLogStart('Counting messages')
    thread.message_count = thread.messages.length;
    infoLogFinish('Counting messages')
}

/**
 * Save unique dates to Set
 */
function storeDates() {
    infoLogStart("Gathering days from messages")
    thread.messages.forEach(message => {
        thread.dates.set.add(new Date(message.timestamp_ms).toJSON().slice(0, 10))
    })
    infoLogFinish("Gathering days from messages")
}

function decodeMessages() {
    infoLogStart("Decoding messages content to readable form")
    thread.messages.forEach((message, index) => {
        const fixedMessage =  {...message};
        fixedMessage.sender_name = utf8.decode(message.sender_name)
        if (message.content) {
            fixedMessage.content = utf8.decode(message.content)
        }
        thread.messages[index] = fixedMessage;
    })
    infoLogFinish("Decoding messages content to readable form")
}

/**
 * Convert saved dates from Set to object with properties
 */
function convertDates() {
    infoLogStart('Creating array with dates and messages')
    let dates_array = Array.from(thread.dates.set);
    dates_array.forEach((date, index) => {
        dates_array[index] = {
            date: date,
            messages: [],
            message_count: 0,
            participants: thread.participants.map(participant => {
                return {
                    'name': participant.name,
                    'count': 0
                }
            })
        }
    })
    thread.dates.array = dates_array;
    infoLogFinish('Creating array with dates and messages')
}

/**
 * Sort every message to its date in thread dates array
 */
function matchMessagesDates() {
    infoLogStart('Synchronize messages with dates')
    thread.messages.forEach(message => {
        const message_date = new Date(message.timestamp_ms).toJSON().slice(0, 10);
        const date_index = thread.dates.array.findIndex(d => d.date === message_date);
        thread.dates.array[date_index].messages.push(message);
    })
    infoLogFinish('Synchronize messages with dates')
}

/**
 * Create days/months/years in thread for message count
 */
function storeDatesStatistics() {
    infoLogStart('Create days/months/years in thread for message count')
    const days = new Set();
    const months = new Set();
    const years = new Set();

    thread.dates.array.forEach(d => {
        years.add(d.date.slice(0, 4));
        months.add(d.date.slice(0, 7));
        days.add(d.date.slice(0, 10));
    })

    Array.from(years).forEach(year => {
        thread.messages_per.year[year] = 0
    })
    Array.from(months).forEach(month => {
        thread.messages_per.month[month] = 0
    })
    Array.from(days).forEach(day => {
        thread.messages_per.day[day] = 0
    })
    infoLogFinish('Create days/months/years in thread for message count')
}

/**
 * Count messages by day/month/year
 */
function countDateStatistics() {
    infoLogStart('Count messages by day/month/year')
    thread.messages.forEach(message => {
        const message_year = new Date(message.timestamp_ms).toJSON().slice(0, 4);
        const message_month = new Date(message.timestamp_ms).toJSON().slice(0, 7);
        const message_day = new Date(message.timestamp_ms).toJSON().slice(0, 10);
        thread.messages_per.year[message_year]++;
        thread.messages_per.month[message_month]++;
        thread.messages_per.day[message_day]++;
    })
    infoLogFinish('Count messages by day/month/year')
}

/**
 * Select periods with most and least messages
 */
function periodStatistics() {
    infoLogStart('Select periods with most and least messages')

    function getPeriodVariables(period_object) {
        const dateArray = Object.values(period_object)
        const min = Math.min(...dateArray);
        const max = Math.max(...dateArray);
        const best_period = Object.keys(period_object).find(key => period_object[key] === max);
        const worst_period = Object.keys(period_object).find(key => period_object[key] === min);
        return {
            best: {
                'period': best_period,
                'count': max,
            },
            worst: {
                'period': worst_period,
                'count': min
            }
        }
    }

    thread.period_variables.year = getPeriodVariables(thread.messages_per.year)
    thread.period_variables.month = getPeriodVariables(thread.messages_per.month)
    thread.period_variables.day = getPeriodVariables(thread.messages_per.day)
    infoLogFinish('Select periods with most and least messages')
}

/**
 * Count messages per participant in date
 */
function participantDateMessages() {
    infoLogStart('Count participants messages in every date')
    thread.dates.array.forEach(date => {
        date.messages.forEach(message => {
            const participant = message.sender_name
            const date_participant_index = date.participants.findIndex(p => p.name === participant);
            date.participants[date_participant_index].count++;
        })
    })
    infoLogFinish('Count participants messages in every date')
}

/**
 * Count participant messages in total
 */
function countParticipantMessages() {
    infoLogStart('Count every participant messages')
    thread.messages.forEach(message => {
        const participant = message.sender_name;
        const participant_index = thread.participants.findIndex(p => p.name === participant);
        thread.participants[participant_index].count++;
    })
    infoLogFinish('Count every participant messages')
}

/**
 * Count participant average words in sentence
 */
function participantAverageWords() {
    infoLogStart('Count participants average of words in messages')
    const array_average = (array) => array.reduce((a, b) => a + b) / array.length;
    thread.participants.forEach(participant => {
        const participant_name = participant.name;
        const words_in_sentence = [];
        thread.messages.forEach(message => {
            if (message.sender_name === participant_name && message.content) {
                const words = message.content.split(' ');
                words_in_sentence.push(words.length);
            }
        })
        participant.average_words_per_sentence = array_average(words_in_sentence);
    })
    infoLogFinish('Count participants average of words in messages')
}

/**
 * Count participant average word length
 */
function participantAverageWordLength() {
    infoLogStart('Count participants average of word length')
    const array_average = (array) => array.reduce((a, b) => a + b) / array.length;
    thread.participants.forEach(participant => {
        const participant_name = participant.name;
        const words_length = [];
        thread.messages.forEach(message => {
            if (message.sender_name === participant_name && message.content) {
                const words = message.content.split(' ');
                words.forEach(word => {
                    words_length.push(word.length);
                })
            }
        })
        participant.average_word_length = array_average(words_length);
        infoLogFinish('Count participants average of word length')
    })
}

/**
 * Count participant total used words
 */
function participantTotalWords() {
    infoLogStart('Count participant total used words')
    thread.participants.forEach(participant => {
        const participant_name = participant.name;
        let words_count = 0;
        thread.messages.forEach(message => {
            if (message.sender_name === participant_name && message.content) {
                const words = message.content.split(' ');
                words_count += words.length;
            }
        })
        participant.words_count = words_count;
    })
    infoLogFinish('Count all words used by participant')
}

/**
 * Count most frequent words in thread
 */
function mostFrequentWords() {
    infoLogStart('Count most frequent words in thread')
    function wordFreq(string) {
        var words = string.replace(/[.]/g, '').split(/\s/);
        var freqMap = {};
        words.forEach(function(w) {
            if (!freqMap[w]) {
                freqMap[w] = 0;
            }
            freqMap[w] += 1;
        });
        return freqMap;
    }
    // Create one, extremely long string containing all words from thread
    let thread_string = "";
    thread.messages.forEach(message => {
        if (message.content) {
            thread_string += `${message.content.toLowerCase()} `;
        }
    })
    const words_array = wordFreq(thread_string);
    // Clear empty 'word'
    words_array[''] = null;
    thread.words_count = Object.entries(words_array).sort((a,b) => b[1] - a[1]);
    infoLogFinish('Count most frequent words in thread')
}

/**
 * Export calculated data to .json file
 */
function exportData() {
    infoLogStart("Creating file with calculated data")
    fs.writeFile('export.json', JSON.stringify(thread, null, '\t'), function (err) {
        if (err) return console.log(err);
        infoLogFinish("Creating file with calculated data")
    });
}


function infoLogStart(message) {
    process.stdout.write(`\n\r${chalk.red(message)}`)
}

function infoLogFinish(message) {
    process.stdout.write(`\r${chalk.green(message)}`)
}

function errorLog(message) {
    console.log(chalk.bgRed(message));
}

function hintLog(message) {
    console.log(chalk.black.bgYellow(message))
}

