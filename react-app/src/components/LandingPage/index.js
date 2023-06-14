import React from 'react'
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import * as sessionActions from "../../store/session";
import { useDispatch } from 'react-redux';

function LandingPage() {

  const dispatch = useDispatch()
  const demoLogin = async (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login("demo@aa.io", "password"))
  }

  return (
    <div>
      <img className='landing-page-logo' src='https://cdn.discordapp.com/attachments/1117955975144538132/1118221613834444890/image.png'/>
      <div>
        <OpenModalButton
          className='login-button'
          buttonText="Log In"
          modalComponent={<LoginFormModal/>}
        />
      </div>
      <div>
        <OpenModalButton
          className='login-button'
          buttonText="Sign Up"
          modalComponent={<SignupFormModal/>}
        />
      </div>
      <button onClick={demoLogin}>
        Demo User Login
      </button>
    </div>
  )
}

export default LandingPage