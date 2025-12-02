import React, { useState, useRef } from "react";

export function SearchFilter () {



    const fruits = [
        "aprictot",
        "banana",
        "cherry"
    ]

    // 1. STATE COUNTER: Manipulated via useState (Forces Re-render)
    const [renderCount, setRenderCount] = useState(0);

    // 2. REF COUNTER: Manipulated via useRef (Does NOT Force Re-render)
    const nonRenderCount = useRef(0);



    // --- Handlers ---
    // This handler updates the state counter, which triggers a re-render.
    const handleStateIncrement = () => {
        setRenderCount(prevCount => prevCount + 1);
    };

    // This handler directly updates the ref counter.
    // It changes the value in memory, but the component doesn't know to redraw.
    const handleRefIncrement = () => {
        nonRenderCount.current = nonRenderCount.current + 1;

        // Log the change: The console shows the new value immediately,
        // but the UI won't reflect it until a separate state change occurs.
        console.log(`Ref Counter (in memory): ${nonRenderCount.current}`);
    };




    return (
        /*<div>
            <input type="text" placeholder="Search here... " onChange={handleInputChange}/>

            {fruitsDataFiltered.map((fruit) => {
                return <p key={fruit}>{fruit}</p>;

            })}
        </div>*/

        <div style={{display: 'flex', gap: '40px'}}>
            {/* ----------------- STATE COUNTER ----------------- */}
            <div>
                <h3>1. useState Counter</h3>
                <p style={{color: 'green', fontWeight: 'bold', fontSize: '1.2em'}}>
                    Value: {renderCount}
                </p>
                <button onClick={handleStateIncrement}>
                    Increment State (Forces UI Update)
                </button>
            </div>

            {/* ----------------- REF COUNTER ----------------- */}
            <div>
                <h3>2. useRef Counter</h3>
                {/* We read the value from .current */}
                <p style={{color: 'red', fontWeight: 'bold', fontSize: '1.2em'}}>
                    Value: needs useState to force UI update
                </p>
                <button onClick={handleRefIncrement}>
                    Increment Ref (No UI Update)
                </button>
            </div>
        </div>
    )
}
