function padZero(value) {
    if (value <= 9) {
        return `0${value}`;
    }

    return value;
}

const clockElements = document.getElementsByClassName('clock');

function updateTime() {
    const time = new Date();
    const formattedTime = `${padZero(time.getHours())}:${padZero(time.getMinutes())}:${padZero(time.getSeconds())}`;

    for (const clock of clockElements) {
        clock.innerHTML = formattedTime;
    }
}


updateTime();
setInterval(() => {
    updateTime();
}, 1000);