const timeInput = document.getElementById('timeInput');
const timerDisplay = document.getElementById('timerDisplay');
const alarmSound = document.getElementById('alarmSound');

let timer;

let soundIndex = 0;
const soundList = [
    alarmSound.src,
    "https://upload.wikimedia.org/wikipedia/commons/9/9c/Gimn_Sovetskogo_Soyuza_(1944_Stalinist_lyrics).oga",
    "https://upload.wikimedia.org/wikipedia/commons/1/1c/Gimn_partii_bolshevikov_(Hymn_of_the_Bolshevik_Party).ogg",
    "https://upload.wikimedia.org/wikipedia/commons/c/cb/Soviet_Anthem1955_vocals.ogg",
];


let countType = 0;
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
            
            sendNotification("Set time has arrived!")
            timerDisplay.textContent = 'Set time has arrived!';
        } else {
            time--;
            timeInput.value = time;
        }
    }, 1000);
}

function sendNotification(msg) {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        var notification = new Notification(msg);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                var notification = new Notification(msg);
            }
        });
    }
}

function changeAlarmSound() {   
    if (confirm("Is it okay to change alarm sound?")) {
        if (soundIndex < soundList.length - 1) {
            soundIndex++;
        } else {
            soundIndex = 0;
        }

        alarmSound.src = soundList[soundIndex]
        timerDisplay.textContent = 'Changed alarm sound';
    }
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'Enter' || event.key === 'Enter') {
        event.preventDefault();
        startTimer()
    } else if (event.code === 'Space') {
        event.preventDefault();
        stopAlarm();
    } else if (event.code === 'Escape') {
        if (isCountingDown) {
            event.preventDefault();
            timeInput.focus();
            resetTimer();
        } else {
            timeInput.blur();
        }
    } else if (event.ctrlKey && event.shiftKey && !isCountingDown) {
        countType++;
        event.preventDefault();

        if (countType > 2) {
            countType = 0;
            changeAlarmSound();
        }
    } else if (event.code === "Tab") {
        event.preventDefault();
        if  (!isCountingDown) {
            timeInput.focus();
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