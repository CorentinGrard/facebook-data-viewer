export {
    processData
}

let participants = []
let datasetNbMsgPerDay = []
let datasetNbUsedWords = []
let datasetNbUsedEmoji = []
// let nbMessagesTotal
// let startDate
// let lastDate


function processData(array_data) {
    // Clear the global variables
    participants = []
    datasetNbMsgPerDay = []
    datasetNbUsedWords = []
    datasetNbUsedEmoji = []

    array_data.forEach(data => {
        const messages = data.messages.reverse()
        participants = data.participants

        // Extracting and process data from the messages
        messages.forEach(message => {
            nbMsgPerDay(message)
            loopWordsInMessage(message)
        });

        // Organising datasetNbMsgPerDay in chronological order

        // Extracting data from the created dataset

    });
    // Returning values
    return {
        participants: participants,
        datasetNbMsgPerDay: datasetNbMsgPerDay,
        datasetNbUsedWords: datasetNbUsedWords,
        datasetNbUsedEmoji: datasetNbUsedEmoji,
    }
}

function nbMsgPerDay(message) {
    // The goal is to create a array like : 
    // datasetNbMsgPerDay = [{
    //     date: "",
    //     participants: [{
    //         name: Paul,
    //         nbMsg: 50
    //     }]
    // }]
    let dateMessage = new Date(message.timestamp_ms)
    let day = new Date(dateMessage.getUTCFullYear(), dateMessage.getUTCMonth(), dateMessage.getUTCDate())
    const day_found = datasetNbMsgPerDay.find(element => element.date.getTime() == day.getTime())
    // If the day doesnt exist let's create it
    if (typeof (day_found) === "undefined") {
        datasetNbMsgPerDay.push({
            date: day,
            participants: [{
                name: message.sender_name,
                nbMsg: 1
            }]
        })
    } else {
        // If the participant doesn't exist let's add it
        const participant_found = day_found.participants.find(participant => participant.name == message.sender_name)
        if (typeof (participant_found) === 'undefined') {
            day_found.participants.push({
                name: message.sender_name,
                nbMsg: 1
            })
        } else {
            // Increase the number of cumulated messages
            participant_found.nbMsg++
        }
    }
}

function loopWordsInMessage(message) {
    if (typeof (message.content) !== 'undefined') {
        const words = message.content.split(' ')
        words.forEach(word => {
            // If the word is an emoji
            // TODO : find better regex
            const regexEmoji = RegExp(/[\uD800-\uDBFF]|[\u2702-\u27B0]|[\uF680-\uF6C0]|[\u24C2-\uF251]/g)
            if (regexEmoji.test(word)) {
                nbEmojiUsed(word);
            } else {
                nbWordsUsed(word);
            }
        });
    }
}

function nbWordsUsed(word) {
    let filteredWord = word.toLowerCase()
    let found = datasetNbUsedWords.find(element => element.word == filteredWord)
    if (typeof (found) === "undefined") {
        datasetNbUsedWords.push({
            word: filteredWord,
            occurences: 1
        })
    } else {
        found.occurences++
    }
}

function nbEmojiUsed(emoji) {
    let found = datasetNbUsedEmoji.find(element => element.emoji == emoji)
    if (typeof (found) === "undefined") {
        datasetNbUsedEmoji.push({
            emoji: emoji,
            occurences: 1
        })
    } else {
        found.occurences++
    }
}

// var dates = []
// messages.forEach(message => {
//     var date = new Date(message.timestamp_ms)
//     var date_clean = date.getUTCDate() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear()
//     if (dates[dates.length - 1] == date_clean) {
//         participants.forEach(participant => {
//             if (participant.name == message.sender_name) {
//                 participant.count++
//             }
//         })
//     } else {
//         dates.push(date.getUTCDate() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear())
//         participants.forEach(participant => {
//             participant.data.push(participant.count)
//             participant.total_messages += participant.count
//             participant.count = 0
//         })
//     }
// });

// const datasets_message_by_date = []
// participants.forEach(participant => {
//     participant.data.push(participant.count)
//     participant.data.shift()
//     participant.count = 0
//     let R = Math.floor(Math.random() * 255) + 1
//     let G = Math.floor(Math.random() * 255) + 1
//     let B = Math.floor(Math.random() * 255) + 1
//     datasets_message_by_date.push({
//         label: participant.name + ' messages',
//         data: participant.data,
//         borderWidth: 1,
//         backgroundColor: [
//             'rgba(' + R + ', ' + G + ', ' + B + ', 0.2)',
//         ],
//         borderColor: [
//             'rgba(' + R + ', ' + G + ', ' + B + ', 1)',
//         ],
//     })
// })
// const data_message_by_date = {
//     labels: dates,
//     datasets: datasets_message_by_date
// }

// var parcipants_names = []
// var datasets_data_messages_by_person= []
// var colors_messages_by_person = []
// participants.forEach(participant => {
//     datasets_data_messages_by_person.push(participant.total_messages)
//     parcipants_names.push(participant.name)
//     let R = Math.floor(Math.random() * 255) + 1
//     let G = Math.floor(Math.random() * 255) + 1
//     let B = Math.floor(Math.random() * 255) + 1
//     colors_messages_by_person.push('rgba(' + R + ', ' + G + ', ' + B + ', 0.2)')
// })
// const datasets_messages_by_person= {
//     data: datasets_data_messages_by_person,
//     borderWidth: 1,
//     backgroundColor: colors_messages_by_person
// }

// const data_messages_by_person = {
//     labels: parcipants_names,
//     datasets: [datasets_messages_by_person]
// }
// var message_by_date = document.getElementById('message_by_date');
// var chart_messages_by_date = new Chart(message_by_date, {
//     type: 'line',
//     data: data_message_by_date
// });
// var messages_by_person = document.getElementById('messages_by_person');
// var doughnutChart = new Chart(messages_by_person, {
//     type: 'doughnut',
//     data: data_messages_by_person,
// });