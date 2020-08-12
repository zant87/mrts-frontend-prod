import React, {Component} from "react";
import {
    MDBSideNavNav,
    MDBSideNavItem,
    MDBSideNavLink
} from "mdbreact";
import {sideNavLinks} from "./sideNavLinks";

export default class SideNav extends Component {

    render() {

        let links = null;
        if (this.props.layout) {

            links = (
                <MDBSideNavNav>
                    {
                        sideNavLinks.filter(link => link.layout === this.props.layout)
                            .map(filtered => {
                                return <MDBSideNavItem key={filtered.link}>
                                    <MDBSideNavItem>
                                        <MDBSideNavLink to={filtered.link}>
                                            {filtered.text}
                                        </MDBSideNavLink>
                                    </MDBSideNavItem>
                                </MDBSideNavItem>
                            })
                    }
                </MDBSideNavNav>
            )
        }

        return (
            <React.Fragment>
                {links}
            </React.Fragment>
        )
    }
}
