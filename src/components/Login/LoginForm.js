import React from 'react'

export default function LoginForm() {
    return (
        <div>
            <form>
            <input placeholder='user name' type='text' />
            <input placeholder='password' type='text' />
            <button>Login</button>
            <a href="#">Forgot Password</a> | <a href='#'>Create Account</a>
            </form>
        </div>
    )
}
