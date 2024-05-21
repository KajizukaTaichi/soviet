const timeInput = document.getElementById('timeInput');
const timerDisplay = document.getElementById('timerDisplay');
const alarmSound = document.getElementById('alarmSound');
let timer;

function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

function resetTimer() {
    clearInterval(timer);
    timeInput.style.pointerEvents = 'auto';
    timerDisplay.textContent = 'Timer stopped';
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        let time = parseInt(timeInput.value, 10);
        if (isNaN(time) || time <= 0) {
            timerDisplay.textContent = 'Please enter valid number';
            return;
        }

        timeInput.blur();
        timerDisplay.textContent = `Set time is ${time} second`;
        clearInterval(timer);
        
        timer = setInterval(() => {
            if (time <= 0) {
                stopAlarm();
                alarmSound.play();
                clearInterval(timer);
                timerDisplay.textContent = 'It became the set time！';
            } else {
                time--;
                timeInput.value = time;
            }
        }, 1000);
    } else if (event.code === 'Space') {
        event.preventDefault();
        stopAlarm();
    } else if (event.code === 'Escape') {
        event.preventDefault();
        resetTimer();
    }
});

timerDisplay.addEventListener("click", stopAlarm);
timeInput.addEventListener("click", resetTimer);