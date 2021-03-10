import React from 'react';

import {
    IntroPageContainer,
    IntroPageMain,
    IntroLogoDiv,
    IntroLogoImg,
    IntroH1,
    IntroText,
    NavBtn,
    IntroButton,
    Footer,
    FooterLink
} from './IntroPageElementsJS';

function IntroPageJS () {
    return (
		<>
        <IntroPageContainer>
			<IntroPageMain>
				<IntroLogoDiv>
					<IntroLogoImg src="img/thumb.jpg" alt=""/>
				</IntroLogoDiv>
				<IntroText>
					<IntroH1>Welcome to Name</IntroH1>
					<IntroText>Lorem ipsum dolor sit amet, consectetur, adipisicing elit. Saepe, totam? Nulla, quisquam perspiciatis minima distinctio debitis tenetur ratione, blanditiis fuga!minima distinctio debitis tenetur ratione, blanditiis fuga!</IntroText>
				</IntroText>
				<NavBtn>
					<IntroButton to='/signin' href="">Sign in</IntroButton>
					<IntroButton to='/signup' href="">Join now</IntroButton>
				</NavBtn>
			</IntroPageMain>
		</IntroPageContainer>
		<Footer>
				<FooterLink to='/'>Terms and Conditions</FooterLink>
				<FooterLink to='/'>Privacy Policy</FooterLink>
				<FooterLink to='/'>About us</FooterLink>
		</Footer>
		</>
		)
}

export default IntroPageJS;
