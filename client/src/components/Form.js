import React from 'react'

const Form = () => {
    const [message, setMessage] = React.useState('');
    return (
        <div>
            <form action="submit">
                <input type="text" placeholder='message' value={message} onChange={e => setMessage(e.target.value)} />
                <button action='submit'>Send</button>
            </form>
        </div>
    )
}

export default Form
