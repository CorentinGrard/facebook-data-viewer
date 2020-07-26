export {
    processData
}

let participants = []
let datasetNbMsgPerDay = []
let datasetNbUsedWords = []
let datasetNbUsedEmoji = []
let nbTotalMsg = 0
let startDate = 0
let lastDate = 0
let msgPerDay = 0


function processData(array_data) {
    // Clear the global variables
    participants = []
    datasetNbMsgPerDay = []
    datasetNbUsedWords = []
    datasetNbUsedEmoji = []

    let dataNbMsgPerDay = {
        labels: [],
        datasets: []
    }

    array_data.forEach(data => {
        const messages = data.messages
        participants = data.participants

        // Extracting and process data from the messages
        messages.forEach(message => {
            nbMsgPerDay(message)
            loopWordsInMessage(message)
            nbTotalMsg++;
        });
    });

    // Sorting word/emoji list
    datasetNbUsedWords.sort((a, b) => b[1] - a[1])
    const wordMax = datasetNbUsedWords[0][1]
    datasetNbUsedWords = datasetNbUsedWords.map(element => [element[0], Math.round((element[1] / wordMax) * 1000)])
    datasetNbUsedEmoji.sort((a, b) => b[1] - a[1])
    const emojiMax = datasetNbUsedEmoji[0][1]
    datasetNbUsedEmoji = datasetNbUsedEmoji.map(element => [element[0], Math.round((element[1] / emojiMax) * 1000)])


    // Sorting datasetNbMsgPerDay in chronological order
    datasetNbMsgPerDay.sort((a, b) => b.date - a.date).reverse()
    startDate = datasetNbMsgPerDay[0].date
    lastDate = datasetNbMsgPerDay[datasetNbMsgPerDay.length - 1].date
    // Extracting data from the created dataset
    datasetNbMsgPerDay.forEach(day => {
        let date = day.date
        dataNbMsgPerDay.labels.push(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear())
        day.participants.forEach(participant => {
            let dataset = dataNbMsgPerDay.datasets.find(dataset => dataset.label == participant.name)
            if (typeof (dataset) === "undefined") {
                let R = Math.floor(Math.random() * 255)
                let G = Math.floor(Math.random() * 255)
                let B = Math.floor(Math.random() * 255)
                dataset = {
                    label: participant.name,
                    data: [],
                    backgroundColor: "rgba(" + R + ", " + G + ", " + B + ", 0.3)",
                    borderColor: "rgba(" + R + ", " + G + ", " + B + ", 1)",
                }
                dataNbMsgPerDay.datasets.push(dataset)
            }
            dataset.data.push(participant.nbMsg)

        })
    });

    let duration = Math.floor((lastDate - startDate) / 1000 / 60 / 60 / 24)
    msgPerDay = Math.round(nbTotalMsg / duration)

    // Returning values
    return {
        participants: participants,
        dataNbMsgPerDay: dataNbMsgPerDay,
        datasetNbUsedWords: datasetNbUsedWords,
        datasetNbUsedEmoji: datasetNbUsedEmoji,
        duration: duration,
        nbTotalMsg: nbTotalMsg,
        msgPerDay: msgPerDay
    }
}

function nbMsgPerDay(message) {
    let participantsMsg = []
    participants.forEach(participant => {
        participantsMsg.push({
            name: participant.name,
            nbMsg: 0
        })
    });

    let dateMessage = new Date(message.timestamp_ms)
    let day = new Date(dateMessage.getUTCFullYear(), dateMessage.getUTCMonth(), dateMessage.getUTCDate())
    const day_found = datasetNbMsgPerDay.find(element => element.date.getTime() == day.getTime())
    // If the day doesnt exist let's create it
    if (typeof (day_found) === "undefined") {
        let participant = participantsMsg.find((participant) =>
            participant.name == message.sender_name
        )
        participant.nbMsg++
        datasetNbMsgPerDay.push({
            date: day,
            participants: participantsMsg
        })
    } else {
        const participant_found = day_found.participants.find(participant => participant.name == message.sender_name)
        // Increase the number of cumulated messages
        participant_found.nbMsg++
    }
}

function loopWordsInMessage(message) {
    if (typeof (message.content) !== 'undefined') {
        const words = message.content.split(' ')
        words.forEach(word => {
            // If the word is an emoji
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
    let filteredWord = word.toLowerCase().replace(RegExp(/[!"#$%&()*+,\-./;<=>?@[\\\]^_`{|}~]/g), '')
    if (filteredWord != "") {
        let found = datasetNbUsedWords.find(element => element[0] == filteredWord)
        if (typeof (found) === "undefined") {
            datasetNbUsedWords.push([filteredWord, 1])
        } else {
            found[1]++
        }
    }
}

function nbEmojiUsed(emoji) {
    let found = datasetNbUsedEmoji.find(element => element[0] == emoji)
    if (typeof (found) === "undefined") {
        datasetNbUsedEmoji.push([emoji, 1])
    } else {
        found[1]++
    }
}