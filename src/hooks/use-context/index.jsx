import {createContext, useState, useContext} from "react";

const GlobalStateContext = createContext(null);

export const ContextExample = () => {

    const [isToggle, setIsToggle] = useState(false);

    return (
        <GlobalStateContext value={{isToggle, setIsToggle}}>
        <div>
            <h1>Parent component </h1>
            <ChildToggle/>
            <ChildDisplay/>
        </div>
        </GlobalStateContext>
    );
};

const ChildToggle = () => {

    const {setIsToggle} = useContext(GlobalStateContext)
    return (
        <div>
            <button onClick={() => setIsToggle((prev) => !prev)}>Toggle state </button>
        </div>
    )
};

const ChildDisplay = () => {
    const {isToggle} = useContext(GlobalStateContext)
    return (
        <div>
            <p>Current state: {isToggle ? "ON": "OFF"}</p>
        </div>
    );
};


