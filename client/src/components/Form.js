import React from 'react'

const Form = () => {
    return (
        <div>
            <form action="submit">
                <input type="text" placeholder='message' />
                <button action='submit'>Send</button>
            </form>
        </div>
    )
}

export default Form
