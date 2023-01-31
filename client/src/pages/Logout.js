import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate()
    localStorage.removeItem('token')
    localStorage.clear()

    useEffect(() => {
        navigate('/login')
    })

    return ( 
       null
     );
}

export default Logout;