import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Sidebar.css';

function Sidebar(){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div>
      This is the sidebar
    </div>
	);
}

export default Sidebar;