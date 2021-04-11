import React from 'react';

import {
	IntroPageContainer,
	IntroPageMain,
	IntroLogoDiv,
	IntroLogoImg,
	IntroH1,
	IntroText,
	NavBtn,
	IntroButton
} from './IntroPageElementsJS';

import { Footer, FooterLink } from '../footer/FooterElements';
import PrivacyPolicy from '../footer/PrivacyPolicy.pdf';


function IntroPageJS() {
	return (
		<>
			<IntroPageContainer>
				<IntroPageMain>
					<IntroLogoDiv>
						<IntroLogoImg src="img/thumb.jpg" alt="" />
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
				<Footer>
					<FooterLink to= {PrivacyPolicy} target= "_blank">Terms and Conditions</FooterLink>
					<FooterLink to= {PrivacyPolicy} target= "_blank">Privacy policy</FooterLink>
					<FooterLink to= {PrivacyPolicy} target= "_blank">About us</FooterLink>
				</Footer>
			</IntroPageContainer>

		</>
	)
}

export default IntroPageJS;
