import {useEffect, useRef, useState} from "react";

export const RefExample = () => {
    //allows us to make a direct reference to an html element
    const inputRef = useRef();
    const [count, setCount] = useState(0);
    const previousCount = useRef(0);


    useEffect(() => {

        previousCount.current = count;

    }, [count]);


    /*const onClick = () => {
        console.log(inputRef.current.value = "Emma");

    }*/
    return (
        <>
            <p>Count: {count}</p>
            <p>Previous Count: {previousCount.current} </p>
            <button onClick={() => setCount((prev) => prev + 1)}> Increment</button>
        </>

    )
};
