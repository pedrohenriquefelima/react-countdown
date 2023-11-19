import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({targetTime, remainingTime, onReset}, ref){

    const dialog = useRef();

    const lostGame = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    //can be used to define properties and methods that should be accessible from outside this component
    //the second parameter for this component is a method that returns an object will exposes all properties and functions
    useImperativeHandle(ref, ()=>{
        return {
            open() { dialog.current.showModal(); }
        };
    });

    //mainly for accessibility the createPortal accepts a second parameter that will tell where this JS should be teleproted
    return createPortal(<dialog ref={dialog} className="result-modal" onClose={onReset}>
        {lostGame &&<h2>You Lost</h2>}
        {!lostGame &&<h2>You Won - Score: {score} </h2>}
        <p>The target time was <strong>{targetTime} seconds.</strong></p>
        <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>, document.getElementById('modal'))
});

export default ResultModal;