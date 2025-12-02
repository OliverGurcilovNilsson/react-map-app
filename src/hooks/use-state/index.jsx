import {useState} from "react";

export const StateExample = () => {

    const [count, setCount] = useState(0);

    const increaseCount = () => {
        //uses a callback function 
        setCount((prev)=> prev +1)
        console.log(count)


    }


    return (

        <div>
            <p> Count: {count} </p>
            <button onClick={increaseCount}> Increase Counter</button>
        </div>

    );
}

