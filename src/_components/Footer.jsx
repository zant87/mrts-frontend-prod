import React from "react";
import { MDBFooter } from "mdbreact";

export const Footer = () => {
    return (
        <MDBFooter color='indigo' className='fixed-bottom'>
            <p className='footer-copyright mb-0 py-3 text-center'>
                {new Date().getFullYear()} &copy;
                <a href='http://www.geogracom.com'> ООО ГЕОГРАКОМ </a>
            </p>
        </MDBFooter>
    )
};
