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
        <h3 className='disclaimer'>
          For Educational Purposes Only
        </h3>

      </div>
      <div className='landing-footer'>
        <div className='footer-comp-1'>
          <h4>
            Made by Danish Prasla
          </h4>
        </div>
        <div className='tech-icon-container'>

          <img className='tech-icons' src="https://cdn.discordapp.com/attachments/1118303754714886259/1121552752133292133/JavaScript-logo.png" />

          <img className='tech-icons' src="https://cdn.discordapp.com/attachments/1118303754714886259/1121556499269943367/1869px-Python-logo-notext.png" />

          <img className='tech-icons' src="https://cdn.discordapp.com/attachments/1118303754714886259/1121551916028153888/2300px-React-icon.png" />

          <img className='tech-icons' src="https://cdn.discordapp.com/attachments/1118303754714886259/1121552416844824636/redux.png" />

          <img className='tech-icons' src="https://cdn.discordapp.com/attachments/1118303754714886259/1121553145743540284/ICAxwo4DA57SIvgIVTDpUP8EbeCT1qFmXQMAAAAASUVORK5CYII.png" />

          <img className='tech-icons' src="https://cdn.discordapp.com/attachments/1118303754714886259/1121551721282408529/postgresql-icon.png" />

          <img className='tech-icons' src="https://cdn.discordapp.com/attachments/1118303754714886259/1121556896625729686/free-html5-40-1175193.png" />
          <img className='tech-icons' src="https://cdn.discordapp.com/attachments/1118303754714886259/1121557371194458202/css-512.png" />
          <img className='tech-icons' src="https://cdn.discordapp.com/attachments/1118303754714886259/1121557732902834216/aws-icon-2048x2048-274bm1xi.png" />

        </div>
      </div>
    </div>
  )
}

export default LandingPage