import React from 'react';

const Countdown = ()=>{
    const startTimer = (duration, display)=>{
        let timer = duration, minutes, seconds
        setInterval(()=>{
            minutes = parseInt(timer/60,10)
            seconds = parseInt(timer%60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if(--timer < 0){
                timer = duration
            }



        }, 1000)
    }
    const start = (e)=>{
        const time = 10 * 60
        let display = document.getElementById("time")
        startTimer(time, display)
    }

    return(
        <div className = "countdown">
            <h3>
                Meeting end in
            </h3>
            <div className = "countdown_set">
                <span id = "time">10</span> minutes
            </div>
            <button onClick={e=>start(e)}>Start Meeting</button>
        </div>
    )
}


export default Countdown