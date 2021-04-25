import React from 'react';
import PrivacyPolicy from './PrivacyPolicy.pdf';
import AboutUs from './AboutUs.pdf';
import Terms from './Terms.pdf';

import {
	Footer,
	FooterLink
} from './FooterElements.js';

function FooterJS () {
    return (
        <>
        		<Footer>
					<FooterLink to= {Terms} target= "_blank">Terms and Conditions</FooterLink>
					<FooterLink to= {PrivacyPolicy} target= "_blank">Privacy policy</FooterLink>
					<FooterLink to= {AboutUs} target= "_blank">About us</FooterLink>
				</Footer>
    </>
	)
}

export default FooterJS;