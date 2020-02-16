async function loadJSON(file) {
    const res = await fetch(file)
    const data = await res.json()
    return data
}

function select(value){
    console.log(value)
}

async function main() {
    const vita = await loadJSON('./messages/inbox/NimbusLin_rkIrHfpWRw/message_1.json')
    const messages = vita.messages.reverse()
    const participants = vita.participants
    participants.forEach(participant => {
        participant.data = []
        participant.count = 0
        participant.total_messages = 0
    })
    var dates = []
    messages.forEach(message => {
        var date = new Date(message.timestamp_ms)
        var date_clean = date.getUTCDate() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear()
        if (dates[dates.length - 1] == date_clean) {
            participants.forEach(participant => {
                if (participant.name == message.sender_name) {
                    participant.count++
                }
            })
        } else {
            dates.push(date.getUTCDate() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear())
            participants.forEach(participant => {
                participant.data.push(participant.count)
                participant.total_messages += participant.count
                participant.count = 0
            })
        }
    });

    const datasets_message_by_date = []
    participants.forEach(participant => {
        participant.data.push(participant.count)
        participant.data.shift()
        participant.count = 0
        let R = Math.floor(Math.random() * 255) + 1
        let G = Math.floor(Math.random() * 255) + 1
        let B = Math.floor(Math.random() * 255) + 1
        datasets_message_by_date.push({
            label: participant.name + ' messages',
            data: participant.data,
            borderWidth: 1,
            backgroundColor: [
                'rgba(' + R + ', ' + G + ', ' + B + ', 0.2)',
            ],
            borderColor: [
                'rgba(' + R + ', ' + G + ', ' + B + ', 1)',
            ],
        })
    })
    const data_message_by_date = {
        labels: dates,
        datasets: datasets_message_by_date
    }

    var parcipants_names = []
    var datasets_data_messages_by_person= []
    var colors_messages_by_person = []
    participants.forEach(participant => {
        datasets_data_messages_by_person.push(participant.total_messages)
        parcipants_names.push(participant.name)
        let R = Math.floor(Math.random() * 255) + 1
        let G = Math.floor(Math.random() * 255) + 1
        let B = Math.floor(Math.random() * 255) + 1
        colors_messages_by_person.push('rgba(' + R + ', ' + G + ', ' + B + ', 0.2)')
    })
    const datasets_messages_by_person= {
        data: datasets_data_messages_by_person,
        borderWidth: 1,
        backgroundColor: colors_messages_by_person
    }

    const data_messages_by_person = {
        labels: parcipants_names,
        datasets: [datasets_messages_by_person]
    }
    var message_by_date = document.getElementById('message_by_date');
    var chart_messages_by_date = new Chart(message_by_date, {
        type: 'line',
        data: data_message_by_date
    });
    var messages_by_person = document.getElementById('messages_by_person');
    var doughnutChart = new Chart(messages_by_person, {
        type: 'doughnut',
        data: data_messages_by_person,
    });
}