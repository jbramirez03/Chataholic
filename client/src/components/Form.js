import React from 'react'
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { POST_MESSAGE } from '../utils/mutations';
import { POSTS } from '../utils/queries';
import { MESSAGES_SUBSCRIPTION } from '../utils/subscriptions';

const Form = () => {
    const [message, setMessage] = React.useState('');
    const [newPost] = useMutation(POST_MESSAGE);
    const { loading, data } = useQuery(POSTS);
    const { data: postsData, loading: loadingPosts } = useSubscription(MESSAGES_SUBSCRIPTION);



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

    React.useEffect(() => {
        console.log(postsData)
    }, [postsData])

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
