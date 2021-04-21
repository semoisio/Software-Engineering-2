import React from 'react';
import PrivacyPolicy from './PrivacyPolicy.pdf';

import {
	Footer,
	FooterLink
} from './FooterElements.js';

function FooterJS () {
    return (
        <>
        		<Footer>
					<FooterLink to= {PrivacyPolicy} target= "_blank">Terms and Conditions</FooterLink>
					<FooterLink to= {PrivacyPolicy} target= "_blank">Privacy policy</FooterLink>
					<FooterLink to='/'>About us</FooterLink>
				</Footer>
    </>
	)
}

export default FooterJS;