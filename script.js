const setting = document.querySelector('.settings-icon');
const dialog = document.querySelector('dialog');
const cross = document.querySelector('.settings-cross');
const timeOptions = document.querySelector('.time-options');
const fontOptions = document.querySelector('.font-options');
const colorOptions = document.querySelector('.color-options');
const applyButton = document.querySelector('dialog > div > button');
const timer = document.querySelector('.timer-wrapper');
const min = document.querySelector('#min');
const sec = document.querySelector('#sec');

let isSettingOpen = false;
let paused = true;
let time;

const resetTime = () => {
    min.innerHTML = document.querySelector('.time-option.active').getAttribute('data-time').padStart(2,'0');
    paused = true
    document.querySelector('.timer-wrapper-inner small').innerHTML = "Start";
    sec.innerHTML = "00";
    setProgress(100);
}

const setProgress = per => {
    document.querySelector(".timer-wrapper-middle").style.setProperty("--progress", per+"%");
}

const startTimer = () => {
    time = setInterval(() => {
        if (paused) return;
        let minVal = min.innerHTML;
        let secVal = sec.innerHTML;
        if (secVal == 00) {
            secVal = 59;
            minVal--;
        } else {
            secVal--;
        }
        min.innerHTML = String(minVal).padStart(2,'0');
        sec.innerHTML = String(secVal).padStart(2,'0');
        let totalTimeInMin = document.querySelector(".time-option.active").getAttribute("data-time");
        let totalTimeInSec = totalTimeInMin * 60;
        let currentTime = (minVal * 60) + secVal;
        let per = (currentTime / totalTimeInSec) * 100;
        setProgress(per);
    }, 1000);
}

const toggleTimer = (e) => {
    if (paused) {
        startTimer()
        paused = false;
        document.querySelector('.timer-wrapper-inner small').innerHTML = "Pause";
    }
    else {
        paused = true;
        clearInterval(time);
        document.querySelector('.timer-wrapper-inner small').innerHTML = "Resume";
    }
}

const applySettings = () => {
    const color = document.querySelector(".color-option.active").getAttribute("data-color");
    const font = document.querySelector(".font-option.active").getAttribute("data-font");
    document.querySelector(":root").style.setProperty("--accent-default", color);
    document.querySelector(":root").style.setProperty("--font-default", font);
    let pomoDoroLength = document.querySelector("#pomodoro-length").value;
    document.querySelector("#pomodoro").setAttribute("data-time", ""+pomoDoroLength);
    let shortBreakLength = document.querySelector("#short-break-length").value;
    document.querySelector("#short").setAttribute("data-time", ""+shortBreakLength);
    let longBreakLength = document.querySelector("#long-break-length").value;
    document.querySelector("#long").setAttribute("data-time", ""+longBreakLength);
    resetTime()
    dialog.close();
}

const toggleColor = e => {
    let colorOption = document.querySelectorAll('.color-option');
    colorOption.forEach(option => {
        option.classList.remove('active');
    }
    );
    e.target.classList.add('active');
}

const toggleFont = e => {
    let fontOption = document.querySelectorAll('.font-option');
    fontOption.forEach(option => {
        option.classList.remove('active');
    })
    if (e.target.classList.contains('font-option')) {
        e.target.classList.add('active');
    }
}

const toggleTimeMode = e => {
    if(!e.target.classList.contains('time-option')) return
    let timeOption = document.querySelectorAll('.time-option');
    timeOption.forEach(option => {
        option.classList.remove('active');
    })
    if (e.target.classList.contains('time-option')) {
        e.target.classList.add('active');
    }
    resetTime()
}

const toggleSetting = () => {
    if (isSettingOpen) {
        dialog.close();
        isSettingOpen = false;
    } else {
        dialog.setAttribute("open", "true");
        isSettingOpen = true;
    }
}

setting.addEventListener('click', toggleSetting);
cross.addEventListener('click', toggleSetting);
timeOptions.addEventListener('click', toggleTimeMode);
fontOptions.addEventListener('click', toggleFont);
colorOptions.addEventListener('click', toggleColor);
applyButton.addEventListener('click', applySettings);
timer.addEventListener('click', toggleTimer);