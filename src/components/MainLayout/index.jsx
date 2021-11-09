import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import './MainLayout.scss'

const MainLayout = (props) => {
	const history = useHistory()
	const onLogout = () => {
		localStorage.clear()
		history.push('/')
	}

	return (
		<div className="main-layout-container">
			<Header onLogout={onLogout}/>
			<Sidebar />
			<div className="main-layout-content">
				{props.children}
			</div>
		</div>
	)
}

export default MainLayout