import React from "react";
import { MDBFooter, MDBRow, MDBContainer } from "mdbreact";

export const Footer = () => {
  return (
    <MDBRow
      className="mt-0"
      style={{
        position: "fixed",
        bottom: "0px",
        width: "100%",
        backgroundColor: "transparent",
      }}
    >
      {/* <MDBFooter color="dark" className="font-small pb-1 mt-0 text-center">
        <MDBContainer fluid style={{ color: "#828282" }}>
          <p className=" mb-0 py-3 text-center">
            &copy; {new Date().getFullYear()} <a href="http://www.geogracom.com"> ООО ГЕОГРАКОМ </a>
          </p>
        </MDBContainer>
      </MDBFooter> */}
      <MDBFooter
        //color="special-color"
        //className="fixed-bottom"
        style={{
          textAlign: "center",
          width: "100%",
          borderTop: "1px solid #cecece",
          backgroundColor: "transparent",
        }}
      >
        <p
          className="mb-0 "
          style={{
            /*width: "100%",*/
            color: "#565656",
            fontSize: "11px",
            fontFamily: "Geneva, Arial, Helvetica, sans-serif",
            padding: "5px",
            backgroundColor: "#fff",
          }}
        >
          &copy; {new Date().getFullYear()}
          <span>
            {" "}
            Официальный интернет-ресурс Министерства транспорта Российской
            Федерации
          </span>{" "}
          <br />
          <span>
            {" "}
            Все права на материалы, находящиеся на сайте, охраняются в
            соответствии с законодательством Российской Федерации
          </span>
        </p>
      </MDBFooter>
    </MDBRow>
  );
};
