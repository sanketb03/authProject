import { useState } from "react"
import { Link } from "react-router-dom"



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update loading state
            setIsLoading(false)
        }

    }
    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log In</h3>

            <label>Email address:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            {/* <button>Log in</button> */}
            <button disabled={isLoading}>Log in</button>
            {error && <div className="error">{error}</div>}
            <br /><br />
            <span >Do not have a account? <Link to="/signup" className="link-btn">Sign Up</Link></span>
        </form>
    )
}

export default Login