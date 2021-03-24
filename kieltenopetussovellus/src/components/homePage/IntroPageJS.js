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
					<IntroH1>Welcome to LingoRec</IntroH1>
					<IntroText>Improve your language skills by listening and recording short audio clips in LingoRec! You can listen, record and share new content every day. We welcome all learners from beginner to expert to join the flow and start practising today. </IntroText>
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
