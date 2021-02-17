import React, { useState, useEffect } from 'react';
import './IntroPageElements.css';
import { NavLink } from 'react-router-dom'

function IntroPage () {
    return (
        <div class="container">
		<div class="main">
			<div class="logo">
				<img src="img/thumb.jpg" alt=""/>
			</div>
			<div class="text">
				<h1>Welcome to Name</h1>
				<p>Lorem ipsum dolor sit amet, consectetur, adipisicing elit. Saepe, totam? Nulla, quisquam perspiciatis minima distinctio debitis tenetur ratione, blanditiis fuga!minima distinctio debitis tenetur ratione, blanditiis fuga!</p>
			</div>
			<div class="buttons">
				<NavLink to='/signin' class="btn-sign" href="">Sign in</NavLink>
				<NavLink to='/signup' class="btn-join" href="">Join now</NavLink>
			</div>
		</div>
		<footer class="footer">
				<a href="#">Terms and Conditions</a>
				<a href="#">Privacy Policy</a>
				<a href="#">About us</a>
		</footer>
	</div>
    )
}

export default IntroPage;