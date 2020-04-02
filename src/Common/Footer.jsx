import React from "react";
import { MDBFooter, MDBRow, MDBContainer } from "mdbreact";

export const Footer = () => {
  return (
    <MDBRow className="mt-1">
      {/* <MDBFooter color="dark" className="font-small pb-1 mt-0 text-center">
        <MDBContainer fluid style={{ color: "#828282" }}>
          <p className=" mb-0 py-3 text-center">
            &copy; {new Date().getFullYear()} <a href="http://www.geogracom.com"> ООО ГЕОГРАКОМ </a>
          </p>
        </MDBContainer>
      </MDBFooter> */}
      <MDBFooter
        // color='indigo'
        color="special-color"
        className="fixed-bottom"
      >
        <p className="footer-copyright mb-0 py-1 text-center" style={{ color: "#cecece" }}>
          {new Date().getFullYear()} &copy;
          <a style={{ color: "#cecece" }} href="http://www.geogracom.com">
            {" "}
            ООО ГЕОГРАКОМ{" "}
          </a>
        </p>
      </MDBFooter>
    </MDBRow>
  );
};
