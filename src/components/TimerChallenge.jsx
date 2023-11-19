import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}){
    const timer = useRef();
    const dialog = useRef();
    
    const [ remainingTime, setRemainingTime ] = useState(targetTime * 1000);
    const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;


    if(remainingTime <= 0) {
        //restarting the game
        clearInterval(timer.current);
        dialog.current.open();
    }

    function resetHandler(){
        setRemainingTime(targetTime * 1000)
    }

    function handleStart(){
        //set interval runs every 10 milliseconds, therefore, setRemainingTime will be targetTime minus 10 which was arbitraty chosen
        timer.current = setInterval(()=>{
            setRemainingTime(prev => {
                return prev - 10;
            })
        },10);
    }

    function handleStop(){
        dialog.current.open();
        clearInterval(timer.current);
    }
    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} remainingTime={remainingTime} onReset={resetHandler}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Timer is running...' : 'Timer is inactive'}
                </p>
            </section>
        </>
        
    )
}