let startTime, interval, running = false, lapCount = 0, difference = 0;
const timeDisplay = document.getElementById('time');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsDiv = document.getElementById('laps');

startStopBtn.onclick = () => {
    if (running) {
        clearInterval(interval);
        startStopBtn.textContent = 'Start';
        lapBtn.disabled = true;
    } else {
        startTime = Date.now() - difference;
        interval = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Stop';
        lapBtn.disabled = false;
    }
    running = !running;
    resetBtn.disabled = !running;
};

resetBtn.onclick = () => {
    clearInterval(interval);
    running = false;
    startStopBtn.textContent = 'Start';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    difference = 0;
    timeDisplay.textContent = '00:00:00.000';
    lapsDiv.innerHTML = '';
};

lapBtn.onclick = () => {
    lapCount++;
    const lapTime = timeDisplay.textContent;
    lapsDiv.innerHTML += `<div>Lap ${lapCount}: ${lapTime}</div>`;
};

function updateTime() {
    difference = Date.now() - startTime;
    let ms = difference % 1000, sec = Math.floor(difference / 1000) % 60,
        min = Math.floor(difference / 60000) % 60, hrs = Math.floor(difference / 3600000);

    timeDisplay.textContent = `${pad(hrs)}:${pad(min)}:${pad(sec)}.${pad(ms, 3)}`;
}

function pad(num, size = 2) {
    return num.toString().padStart(size, '0');
}
