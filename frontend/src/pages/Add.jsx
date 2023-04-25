import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/addnew', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // update loading state
            setIsLoading(false)
            navigate("/");

        }
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Add New</h3>

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

            <button disabled={isLoading}>Add</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default Signup
