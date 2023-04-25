import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useEffect, useState } from 'react'

const Home = () => {
  const { logout } = useLogout()
  const [data, setData] = useState()
  const user = JSON.parse(localStorage.getItem('user'))
  const handleClick = () => {
    logout()
  }

  useEffect(() => {
    const fetchDatas = async () => {
      const response = await fetch('http://localhost:4000/api/getdata', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      })
      const json = await response.json()
      if (response.ok) {
        setData(json)
      }
    }
    // if (user) {
    fetchDatas()
    // }
  })

  const handelDelete = async (email) => {
    console.log(email)
    await fetch('http://localhost:4000/api/deleteData', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
  }

  return (
    <div>
      <header>
        <div className="container">

          <nav>
            {user && (
              <>
                <div className='header'>
                  <span>{user.email}</span>
                  <button onClick={handleClick}>Log out</button>

                </div>
                <div className='header'>
                  <Link to="/add">Add New</Link>
                </div>
              </>
            )}

          </nav>
        </div>
      </header>



      <table className='main-table'>
        <thead>
          <th>Email</th>
          <th>Action</th>
        </thead>
        {data && data.map((d) => (
          <>
            <tr>
              <td>{d.email}</td>
              <td><button onClick={() => handelDelete(d.email)}>delete</button></td>
            </tr>
          </>
        ))}
      </table>
    </div>
  )
}

export default Home