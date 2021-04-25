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

import FooterJS from '../footer/Footer';


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
						<IntroText>Improve your language skills by listening and recording short audio clips in LingoRec! Practise understanding different dialects, test how you fared by making a quiz and find new friends by commenting and rating other users recordings. <br></br><br></br>We welcome all learners from beginners to experts to join the flow and start practising your skills today. </IntroText>
					</IntroText>
					<NavBtn>
						<IntroButton to='/signin' href="">Sign in</IntroButton>
						<IntroButton to='/signup' href="">Join now</IntroButton>
					</NavBtn>
				</IntroPageMain>
				<FooterJS />
			</IntroPageContainer>

		</>
	)
}

export default IntroPageJS;
