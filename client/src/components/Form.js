import React from 'react'
import { useMutation } from '@apollo/client';

const Form = () => {
    const [message, setMessage] = React.useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(message);
    };

    return (
        <div>
            <form action="submit" onSubmit={onSubmit}>
                <input type="text" placeholder='message' value={message} onChange={e => setMessage(e.target.value)} />
                <button action='submit'>Send</button>
            </form>
        </div>
    )
}

export default Form
