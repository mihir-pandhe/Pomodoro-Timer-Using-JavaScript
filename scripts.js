let timer;
let isRunning = false;
let timeLeft = 25 * 60;
let isWorkTime = true;

function startStopTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        document.getElementById('startStopBtn').textContent = 'Start';
    } else {
        isRunning = true;
        document.getElementById('startStopBtn').textContent = 'Stop';

        timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                isRunning = false;
                isWorkTime = !isWorkTime;
                timeLeft = isWorkTime ? getWorkDuration() * 60 : getBreakDuration() * 60;
                alert(isWorkTime ? "Work time!" : "Break time!");
                startStopTimer();
                return;
            }
            timeLeft--;
            updateDisplay();
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isWorkTime = true;
    timeLeft = getWorkDuration() * 60;
    updateDisplay();
    document.getElementById('startStopBtn').textContent = 'Start';
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function getWorkDuration() {
    return parseInt(document.getElementById('workDuration').value) || 25;
}

function getBreakDuration() {
    return parseInt(document.getElementById('breakDuration').value) || 5;
}

document.getElementById('startStopBtn').addEventListener('click', startStopTimer);
