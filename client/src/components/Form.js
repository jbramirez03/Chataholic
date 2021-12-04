import React from 'react'
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { POST_MESSAGE } from '../utils/mutations';
import { POSTS } from '../utils/queries';
import { MESSAGES_SUBSCRIPTION } from '../utils/subscriptions';

const Form = () => {
    const [message, setMessage] = React.useState('');
    const [newPost] = useMutation(POST_MESSAGE);
    // const { loading, data } = useQuery(POSTS);
    const {
        subscribeToMore,
        loading,
        data: { posts } = {},
    } = useQuery(POSTS);
    const { data: postsData, loading: loadingPosts } = useSubscription(MESSAGES_SUBSCRIPTION);

    React.useEffect(() => {
        console.log('Message Data: ', posts);
    }, [posts]);
    React.useEffect(() => {
        console.log('Subscription Post: ', postsData);
    }, [postsData]);
    React.useEffect(() => {
        console.log('Loading subscription data: ', loadingPosts);
    }, [loadingPosts]);

    const handlePost = async () => {
        await newPost({
            variables: { message: message, author: 'anonymous' }
        })
    };

    const subscribeToChat = React.useCallback(() => {
        subscribeToMore({
            document: MESSAGES_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.newPost;
                return Object.assign({}, prev, {
                    posts: [...prev.posts, newFeedItem],
                });
            },
        });
    }, [subscribeToMore]);

    React.useEffect(() => {
        subscribeToChat();
    }, [subscribeToChat]);

    const onSubmit = (event) => {
        event.preventDefault();
        handlePost();
        console.log(message);
    };

    // React.useEffect(() => {
    //     console.log(loadingPosts);
    // }, [loadingPosts])
    // React.useEffect(() => {
    //     if (!loadingPosts) {
    //         console.log(postsData)
    //     }
    // }, [loadingPosts])

    if (loading) {
        return (
            <div>loading...</div>
        )
    }

    // if (loadingPosts) {
    //     return (
    //         <div>subscriptions loading...</div>
    //     )
    // }

    return (
        <div>
            <form action="submit" onSubmit={onSubmit}>
                <input type="text" placeholder='message' value={message} onChange={e => setMessage(e.target.value)} />
                <button action='submit'>Send</button>
            </form>
            <button onClick={() => console.log(posts)}>Check</button>
            {posts.map((post, i) => {
                return (
                    <div key={i}>{post.message}</div>
                )
            })}
        </div>
    )
}

export default Form
