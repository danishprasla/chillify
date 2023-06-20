import React from 'react'
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import * as sessionActions from "../../store/session";
import { useDispatch } from 'react-redux';
import './LandingPage.css'

function LandingPage() {

  const dispatch = useDispatch()
  const demoLogin = async (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login("demo@aa.io", "password"))
  }

  return (
    <div className='landing-page-wrapper'>
      <div className='landing-page-container'>
        <div className='logo-wrapper'>
          <img className='landing-page-logo' src='https://cdn.discordapp.com/attachments/1117955975144538132/1118221613834444890/image.png' />
        </div>
        <div className='landing-page-button-wrapper'>

          <div className='login-button'>
            <OpenModalButton
              className='login-button'
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
            />
          </div>
          <div className='login-button'>
            <OpenModalButton
              className='login-button'
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
          </div>
          <button className='login-button' onClick={demoLogin}>
            Demo User Login
          </button>
        </div>

      </div>
      <div className='landing-footer'>
        <div className='footer-comp-1'>
          <h2>
            Danish Prasla
          </h2>
        </div>
        <div className='footer-comp-2'>
          
        </div>
      </div>
    </div>
  )
}

export default LandingPage