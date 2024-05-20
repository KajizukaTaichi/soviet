const timeInput = document.getElementById('timeInput');
const timerDisplay = document.getElementById('timerDisplay');
const alarmSound = document.getElementById('alarmSound');
let timer;

function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        let time = parseInt(timeInput.value, 10);
        if (isNaN(time) || time <= 0) {
            timerDisplay.textContent = 'Please enter valid number';
            return;
        }

        timeInput.style.pointerEvents = 'none';
        timerDisplay.textContent = `Set time is ${time} second`;
        clearInterval(timer);
        
        timer = setInterval(() => {
            if (time <= 0) {
                stopAlarm();
                clearInterval(timer);
                alarmSound.play();
                timeInput.style.pointerEvents = 'auto';
                timerDisplay.textContent = 'It became the set time！';
            } else {
                time--;
                timeInput.value = time;
            }
        }, 1000);
    }
});

timerDisplay.addEventListener("click", stopAlarm)