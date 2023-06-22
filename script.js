const milisecondsElement = document.querySelector('.miliseconds')
const secondsElement = document.querySelector('.seconds')
const minutesElement = document.querySelector('.minutes')
const hoursElement = document.querySelector('.hours')
const btnStartTimer = document.querySelector('.btn_start')
const btnStopTimer = document.querySelector('.btn_stop')
const btnClearTimer = document.querySelector('.btn_clear')
const timerRecordElement = document.querySelector('.timer-record')
let hours = 0
let minutes = 0
let seconds = 0
let totalHours = 0
let totalMinutes = 0
let totalSeconds = 0
let totalMiliseconds = 0
let miliseconds = 0
let start = null
let counterTimer = 0
const timerRecord = []

function startTimer(){

    milisecondsElement.textContent = miliseconds
    if(!start){
        start = setInterval(()=>{
            hours = minutes === 60 ? hours + 1 : hours
            minutes = seconds === 60 ? minutes + 1 : minutes === 60 ? 0 : minutes
            seconds = miliseconds === 100 ? seconds + 1 : seconds === 60 ? 0 : seconds
            miliseconds = miliseconds === 100 ? 1 : miliseconds + 1
            milisecondsElement.textContent = miliseconds.toString().padStart(2,'0')
            secondsElement.textContent = seconds.toString().padStart(2,'0')
            minutesElement.textContent = minutes.toString().padStart(2,'0')
            hoursElement.textContent = hours.toString().padStart(2,'0')
        },10)
    }
}

function stopTimer(){
    totalHours = totalHours + hours
    totalMinutes = totalMinutes + minutes
    totalSeconds = totalSeconds + seconds
    totalMiliseconds = totalMiliseconds + miliseconds
    totalHours = totalMinutes === 60 ? totalHours + 1 : totalHours
    totalMinutes = totalSeconds === 60 ? totalMinutes + 1 : totalMinutes === 60 ? 0 : totalMinutes
    totalSeconds = totalMiliseconds === 100 ? totalSeconds + 1 : totalSeconds === 60 ? 0 : totalSeconds
    clearInterval(start)
    start = null
    timerRecord.push({
        actualTimer: `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`,
        totalTimer: `${totalHours.toString().padStart(2,'0')}:${totalMinutes.toString().padStart(2,'0')}:${totalSeconds.toString().padStart(2,'0')}`
    })
    hours = 0
    minutes = 0
    seconds = 0
    miliseconds = 0
    updateTimeRecord()
}

function updateTimeRecord(){
        const record = document.createElement('tr')
        counterTimer++
        const indexTimerRecord = timerRecord.length
        record.innerHTML = `
            <td>Nº ${counterTimer}</td>
            <td>${timerRecord[indexTimerRecord - 1].actualTimer}</td>
            <td>${timerRecord[indexTimerRecord - 1].totalTimer}</td>
        `
        timerRecordElement.appendChild(record)
}

function clearTimer(){
    clearInterval(start)
    totalHours = 0
    totalMinutes = 0
    totalSeconds = 0
    totalMiliseconds = 0
    counterTimer = 0
    timerRecord.splice(0,timerRecord.length)
    timerRecordElement.innerHTML = ''
    secondsElement.textContent = totalSeconds.toString().padStart(2,'0')
    minutesElement.textContent = totalMinutes.toString().padStart(2,'0')
    hoursElement.textContent = totalHours.toString().padStart(2,'0')
}

btnStartTimer.addEventListener('click',startTimer)
btnStopTimer.addEventListener('click',stopTimer)
btnClearTimer.addEventListener('click',clearTimer)