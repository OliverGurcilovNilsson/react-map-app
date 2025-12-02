import {useReducer, useState} from "react";

const reducer = (state, action) => {
    switch (action.type){
        case "increment":
            return { count: state.count + 1};
        case "decrement":
            return { count: state.count - 1};
    }


};
export const ReducerExample = () => {

    const [state, dispatch] = useReducer(reducer, {count : 0});

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({type: "increment"})}>+</button>
            <button onClick={() => dispatch({type: "decrement"})}>-</button>
        </div>
    );
};
