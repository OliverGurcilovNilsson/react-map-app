import {useState} from "react";

export function DisemVowel() {

    const [word, setWord] = useState('');

    const [disemvoweledWord, setDisemvoweledWord] = useState('');


    // Function to handle changes in the text input
    const handleChange = (event) => {
        // Updates the 'word' state on every keystroke
        setWord(event.target.value);

        // Clear the result when the input changes
        setDisemvoweledWord('');
    };


    // Function to handle form submission
    const handleSubmit = (event) => {
        // Prevents the browser from performing a full page reload (standard form behavior)
        event.preventDefault();

        // Apply the disemvowel logic and update the result state
        const result = disemvowel(word);
        setDisemvoweledWord(result);
    };

    const disemvowel = (str) => {
        // Best practice: Use a Regular Expression with the global (g) and ignore-case (i) flags
        // [aeiou] matches any vowel.
        // The g flag ensures ALL matches are replaced, not just the first one.
        // The i flag ensures both 'a' and 'A' are matched.
        return str.replace(/[aeiou]/gi, '');
    };


    return (
        <div>
            <h2>Disemvoweler</h2>

            {/* 1. Use the onSubmit handler on the <form> element */}
            <form onSubmit={handleSubmit}>
                <label>
                    Enter a word to disemvowel:
                    <input
                        type="text"
                        // The 'value' prop links the input field to React state,
                        // making it a controlled component.
                        value={word}
                        // The 'onChange' prop calls the handler function
                        onChange={handleChange}
                        // 'name' is often preferred over 'word' for standard HTML/React practice
                        name="wordInput"
                    />
                </label>

                {/* Use type="submit" to trigger the form's onSubmit event */}
                <input type="submit" value="Disemvowel"/>
            </form>

            <hr/>

            {/* 2. Display the result */}
            {disemvoweledWord && (
                <div>
                    <h3>Result:</h3>
                    <p>Original: <strong>{word}</strong></p>
                    <p>Disemvoweled: <strong>{disemvoweledWord}</strong></p>
                </div>
            )}
        </div>
    );

}
