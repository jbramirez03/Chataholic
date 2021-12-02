import React from 'react'
import { useMutation } from '@apollo/client';
import { POST_MESSAGE } from '../utils/mutations';

const Form = () => {
    const [message, setMessage] = React.useState('');
    const [newPost] = useMutation(POST_MESSAGE);

    const handlePost = async () => {
        await newPost({
            variables: { message: message, author: 'anonymous' }
        })
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handlePost();
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
