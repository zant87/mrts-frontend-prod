import React from "react";
import { MDBFooter, MDBRow, MDBContainer } from "mdbreact";

export const Footer = () => {
  return (
    <MDBRow>
        <MDBFooter
            color="white"
            //color="special-color"
            className="fixed-bottom text-center mt-3">
            <p
                className="mb-0 "
                style={{
                    width: "100%",
                    color: "#565656",
                    fontSize: "12px",
                    fontFamily: "Geneva, Arial, Helvetica, sans-serif",
                    padding: "5px",
                }}
            >
          &copy; {new Date().getFullYear()}
          <span> Официальный интернет-ресурс Министерства транспорта Российской Федерации</span> <br />
          <span> Все права на материалы, находящиеся на сайте, охраняются в соответствии с законодательством Российской Федерации</span>
        </p>
      </MDBFooter>
    </MDBRow>
  );
};
