const timeInput = document.getElementById('timeInput');
const timerDisplay = document.getElementById('timerDisplay');
const alarmSound = document.getElementById('alarmSound');

let timer;

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        let time = parseInt(timeInput.value, 10);
        if (isNaN(time) || time <= 0) {
            timerDisplay.textContent = '有効な秒数を入力してください';
            return;
        }

        timerDisplay.textContent = `設定時間：${time}秒`;
        clearInterval(timer);

        timer = setInterval(() => {
            if (time <= 0) {
                clearInterval(timer);
                alarmSound.play();
                timerDisplay.textContent = '時間が経ちました！';
            } else {
                time--;
                timeInput.value = time;
            }
        }, 1000);
    }
});

timerDisplay.addEventListener("click", () => {
    alarmSound.pause();
    alarmSound.currentTime = 0;
})