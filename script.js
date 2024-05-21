const timeInput = document.getElementById('timeInput');
const timerDisplay = document.getElementById('timerDisplay');
const alarmSound = document.getElementById('alarmSound');

let timer;

let originalSound = alarmSound.src;
let alternateSound = "https://upload.wikimedia.org/wikipedia/commons/9/9c/Gimn_Sovetskogo_Soyuza_(1944_Stalinist_lyrics).oga";
let countType = 0;

let isAlternateSound = false;
let isCountingDown = false;
let isPlayingSound = false;

function stopAlarm() {
    alarmSound.pause();
    isPlayingSound = false;
    alarmSound.currentTime = 0;
}

function resetTimer() {
    clearInterval(timer);
    isCountingDown = false;
    timeInput.style.pointerEvents = 'auto';
    timerDisplay.textContent = 'Timer stopped';
}

function startTimer() {
    let time = parseInt(timeInput.value, 10);
    if (isNaN(time) || time <= 0) {
        timerDisplay.textContent = 'Please enter valid number';
        return;
    }

    timeInput.blur();
    timerDisplay.textContent = `Set time is ${time} second`;
    isCountingDown = true;
    clearInterval(timer);

    timer = setInterval(() => {
        if (time <= 0) {
            stopAlarm();
            alarmSound.play();
            clearInterval(timer);
            isPlayingSound = true;
            isCountingDown = false;
            timerDisplay.textContent = 'It became the set time！';
        } else {
            time--;
            timeInput.value = time;
        }
    }, 1000);
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'Enter' || event.key === 'Enter') {
        event.preventDefault();
        startTimer()
    } else if (event.code === 'Space') {
        event.preventDefault();
        stopAlarm();
    } else if (event.code === 'Escape' && isCountingDown) {
        event.preventDefault();
        timeInput.focus();
        resetTimer();
    } else if (event.ctrlKey && event.shiftKey) {
        event.preventDefault();
        countType++;

        if (countType > 2) {
            countType = 0;
            if (confirm("Is it okay to change alarm sound?")) {
                isAlternateSound = !isAlternateSound;
                alarmSound.src = isAlternateSound ? alternateSound : originalSound;
                timerDisplay.textContent = 'Changed alarm sound';   
            }
        }
    }
});

timerDisplay.addEventListener("click", () => {
    if (isPlayingSound) {
        stopAlarm();
    } else if (!isCountingDown) {
        startTimer();
    }
});

timeInput.addEventListener("click", () => {
    if (isCountingDown) {
        resetTimer();
    }
});