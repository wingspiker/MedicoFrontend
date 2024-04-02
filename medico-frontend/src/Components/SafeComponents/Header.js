import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function Header(props) {
    const {changeLogin} = props;
    const  navigate = useNavigate();
    const  logoutService = () => {
        changeLogin(false)
        navigate('/')
    }
  return (
    <div>
      <header className="flex justify-between items-center w-full px-8 py-4 absolute top-0">
        <h1 className="text-3xl font-bold">Medico</h1>
        <div>
          <button onClick={logoutService} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Logout</button>
        </div>
      </header>
    </div>
  )
}
