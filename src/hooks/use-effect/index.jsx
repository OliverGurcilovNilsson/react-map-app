import {useEffect, useState} from "react";

export const EffectExample = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response)=>response.json())
            .then((json)=>setData(json));

    }, []);

    return (
        <div>
            <h1> Posts </h1>
            <ul>
                {data.map((item) => (
                    <li>{item.title}</li>
                ))}
            </ul>
        </div>

    );


}
