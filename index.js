const fs = require('fs');
const utf8 = require('utf8');

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
    dates: null,
    title: null,
    participants: [],
    creation_date: null,
    message_count: 0,
};
// Read messages directory for filenames
fs.readdirSync(messages_directory).forEach(file => {
    messages_files.push(file);
});

// For every file, import object and push it to array
messages_files.forEach(file => {
    let obj = require(messages_directory + file);
    messages_objects.push(obj);
})

// Sort files by name using natural sort
messages_files.sort((a, b) => {
    return a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'})
})

// Set thread title
console.info('\t Setting title')
thread.title = utf8.decode(messages_objects[0].title);

// Set participants
thread.participants = messages_objects[0].participants

// Make sure that every name is utf-8 decoded
console.info('\t Saving participants')
thread.participants.forEach(participant => {
    participant.name = utf8.decode(participant.name)
    participant.count = 0;
})

// Load all messages into one array
console.info('\t Loading messages')
messages_objects.forEach(object => {
    thread.messages.push(...object.messages);
})

// Sort messages chronologically
console.info('\t Sorting messages')
thread.messages.sort((a, b) => {
    return parseInt(b.timestamp_ms) - parseInt(a.timestamp_ms);
})

// Set thread creation date
console.info('\t Setting creation date')
thread.creation_date = new Date(thread.messages[thread.messages.length - 1].timestamp_ms);

// Set messages count
console.info('\t Counting messages')
thread.message_count = thread.messages.length;

// Store dates in YYYY-MM-DD from messages
const dates = new Set();
console.info('\t Gathering days from messages')
thread.messages.forEach(message => {
    dates.add(new Date(message.timestamp_ms).toJSON().slice(0,10))
})

// Convert thread dates to object with date and messages array
console.info('\t Creating array with dates and messages')
let dates_array = Array.from(dates);
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
thread.dates = dates_array;

// Add messages to according date
console.info('\t Synchronize messages with dates')
thread.messages.forEach(message => {
    const message_date = new Date(message.timestamp_ms).toJSON().slice(0,10);
    const date_index = thread.dates.findIndex(d => d.date === message_date);
    thread.dates[date_index].messages.push(message);
})

// Create days/months/years in thread for message count
console.info('\t Create days/months/years for counting')
const years = new Set();
const months = new Set();
const days = new Set();

thread.dates.forEach(date => {
    date.messages.forEach(message => {
        const year = new Date(message.timestamp_ms).toJSON().slice(0,4);
        const month = new Date(message.timestamp_ms).toJSON().slice(0,7);
        const day = new Date(message.timestamp_ms).toJSON().slice(0,10);
        years.add(year);
        months.add(month);
        days.add(day);
    })
})

const years_array = Array.from(years)
const months_array = Array.from(months)
const days_array = Array.from(days)

years_array.forEach(year => {
    thread.messages_per.year[year] = 0
})

months_array.forEach(month => {
    thread.messages_per.month[month] = 0
})

days_array.forEach(day => {
    thread.messages_per.day[day] = 0
})

// Count messages per day/month/year
console.info('\t Count messages by day/month/year')
thread.dates.forEach(date => {
    date.messages.forEach(message => {
        const message_year = new Date(message.timestamp_ms).toJSON().slice(0,4);
        const message_month = new Date(message.timestamp_ms).toJSON().slice(0,7);
        const message_day = new Date(message.timestamp_ms).toJSON().slice(0,10);

        thread.messages_per.year[message_year]++;
        thread.messages_per.month[message_month]++;
        thread.messages_per.day[message_day]++;
    })
})

// Get day/month/year with most and least messages
console.info('\t Select periods with most and least messages')
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

// Count messages per participant in date
console.info('\t Count participants messages in every date')
thread.dates.forEach(date => {
    date.messages.forEach(message => {
        const participant = utf8.decode(message.sender_name);
        const date_participant_index = date.participants.findIndex(p => p.name === participant);
        date.participants[date_participant_index].count++;
    })
})

// Count participant messages in total
console.info('\t Count all participants messages')
thread.messages.forEach(message => {
        const participant = utf8.decode(message.sender_name);
        const participant_index = thread.participants.findIndex(p => p.name === participant);
    thread.participants[participant_index].count++;
})

// Count participant average words in sentence
console.info('\t Count participants average of words in sentence')
const array_average = (array) => array.reduce((a, b) => a + b) / array.length;
thread.participants.forEach(participant => {
    const participant_name = participant.name;
    const words_in_sentence = [];
    thread.messages.forEach(message => {
        if (utf8.decode(message.sender_name) === participant_name && message.content) {
            const words = message.content.split(' ');
            words_in_sentence.push(words.length);
        }
    })
    participant.average_words_per_sentence = array_average(words_in_sentence);
})

// Count participant average words in sentence
console.info('\t Count participants average of word length')
thread.participants.forEach(participant => {
    const participant_name = participant.name;
    const words_length = [];
    thread.messages.forEach(message => {
        if (utf8.decode(message.sender_name) === participant_name && message.content) {
            const words = message.content.split(' ');
            words.forEach(word => {
                words_length.push(word.length);
            })
        }
    })
    participant.average_word_length = array_average(words_length);
})

// Count participant total used words
console.info('\t Count participant total used words')
thread.participants.forEach(participant => {
    const participant_name = participant.name;
    let words_count = 0;
    thread.messages.forEach(message => {
        if (utf8.decode(message.sender_name) === participant_name && message.content) {
            const words = message.content.split(' ');
            words_count += words.length;
        }
    })
    participant.words_count = words_count;
})

// Count most frequent words in thread
console.info('\t Count most frequent words in thread')
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

let thread_string = "";
thread.messages.forEach(message => {
    if (message.content && utf8.decode(message.content) !== '') {
        thread_string += `${utf8.decode(message.content).toLowerCase()} `;
    }
})
const words_array = wordFreq(thread_string);
words_array[''] = 0;
thread.words_count = Object.entries(words_array).sort((a,b) => b[1] - a[1]);

// Count usage of "xd"
console.info('\t Count "xd" usage')
const xd_regexp = new RegExp(/^[xX].+[dD]$|^[xX][dD]$/gm);
const xd_array = []
thread_string.split(" ").forEach(word => {
    if (word.match(xd_regexp)) {
        xd_array.push(word);
    }
})
const xd_freq = wordFreq(xd_array.join(" "))
const xd_sorted = Object.entries(xd_freq).sort((a,b) => b[1] - a[1]);
// Count usage of "rura"
console.info('\t Count "rura" usage')
const rura_regexp = new RegExp(/^r[ur]+a+$/gm);
const rura_array = []
thread_string.split(" ").forEach(word => {
    if (word.match(rura_regexp)) {
        rura_array.push(word);
    }
})
const rura_freq = wordFreq(rura_array.join(" "))
const rura_sorted = Object.entries(rura_freq).sort((a,b) => b[1] - a[1]);
console.table(xd_sorted.slice(0,30))


// TODO: Add function for word search



// console.log(thread.dates);
// Save to .json
// thread.messages = [];
// thread.dates = [];
// thread.messages_per = [];
// fs.writeFile('export.json', JSON.stringify(thread, null, '\t'), function (err) {
//     if (err) return console.log(err);
//     console.log('\t Created file with calculated data');
// });