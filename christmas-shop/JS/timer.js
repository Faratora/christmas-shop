function Timer() {
    const counterElement = [
        document.getElementById("cta-days"),
        document.getElementById("cta-hours"),
        document.getElementById("cta-minutes"),
        document.getElementById("cta-seconds"),
    ];
updateTimer(counterElement);

    setInterval(() => {
        updateTimer(counterElement);
    }, 1000);
}

function updateTimer(counterElement) {
    const now = new Date();
    
    let targetDate = new Date(
        Date.UTC(now.getUTCFullYear(), 11, 31, 23, 59, 59)
    );
    
      if (now > targetDate) {
        targetDate = new Date(
            Date.UTC(now.getUTCFullYear() + 1, 11, 31, 23, 59, 59)
        );
    }
    
    const nowUTC = Date.now();
    const timeDiff = targetDate - nowUTC;
    
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor(
        (timeDiff % (1000 * 60)) / 1000
    );
    
    counterElement[0].innerHTML = days;
    counterElement[1].innerHTML = hours;
    counterElement[2].innerHTML = minutes;
    counterElement[3].innerHTML = seconds;
}

Timer();