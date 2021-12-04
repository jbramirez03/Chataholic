import React from 'react'
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { POST_MESSAGE } from '../utils/mutations';
import { POSTS } from '../utils/queries';
import { MESSAGES_SUBSCRIPTION } from '../utils/subscriptions';


const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
    }
}

const Form = () => {
    const [message, setMessage] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [newPost] = useMutation(POST_MESSAGE);
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
            variables: { message: message, author: author }
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

    if (loading) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <div>
            <form action="submit" onSubmit={onSubmit}>
                <input type="text" placeholder='message' value={message} onChange={e => setMessage(e.target.value)} />
                <input type="text" placeholder='author' value={author} onChange={e => setAuthor(e.target.value)} />
                <button action='submit'>Send</button>
            </form>
            <div>
                {posts.map((post, i) => {
                    return (
                        <div style={styles.container} key={i}>{post.message} {post.author}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default Form
