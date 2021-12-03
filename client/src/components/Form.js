import React from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { POST_MESSAGE } from '../utils/mutations';
import { POSTS } from '../utils/queries';

const Form = () => {
    const [message, setMessage] = React.useState('');
    const [newPost] = useMutation(POST_MESSAGE);
    const { loading, data } = useQuery(POSTS);


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

    if (loading) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <div>
            <form action="submit" onSubmit={onSubmit}>
                <input type="text" placeholder='message' value={message} onChange={e => setMessage(e.target.value)} />
                <button action='submit'>Send</button>
            </form>
            <button onClick={() => console.log(data)}>Check</button>
        </div>
    )
}

export default Form
