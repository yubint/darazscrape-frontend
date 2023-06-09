import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { HeadingLink, StyledLink } from "../styled-link";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AuthorizationChangeContext, AuthorizationContext } from "../authorizationcontext";
import { userDispatchContext } from "../usercontext";

export default function Root() {

    const authorization = useContext(AuthorizationContext);
    const setAuthorization = useContext(AuthorizationChangeContext);
    const userDispatch = useContext(userDispatchContext);

    // setting elements based on whether the user is authorized or not 
    let login_logout;
    if (authorization != null) {
        login_logout = <>
            <Grid2 xs={1} sm={1} lg={1}>
                <StyledLink to="profile" >Profile</StyledLink>
            </Grid2>
            <Grid2 xs={1} sm={1} lg={1}>
                <StyledLink onClick={e => logoutHandler(setAuthorization, userDispatch)}>Logout</StyledLink>
            </Grid2>
        </>
    }
    else {
        login_logout = <>
            <Grid2 xs={1} sm={1} lg={1}>
                <StyledLink to="login" >Login</StyledLink>
            </Grid2>
            <Grid2 xs={1} sm={1} lg={1}>
                <StyledLink to="register" >Register</StyledLink>
            </Grid2>
        </>
    }

    return (
        <Grid2
            container
            direction="column"
            rowSpacing={4}

        >
            <Grid2 item xs={12} sm={12} lg={12} >
                <Grid2 container >
                    <Grid2 xs={10} sm={10} lg={10} textAlign="center" >
                        <HeadingLink to="/"
                            sx={{
                                textDecoration: 'none',
                                fontSize: '1.6rem',
                                color: 'white',
                            }}
                        >DarazScrape</HeadingLink>
                    </Grid2>
                    {login_logout}
                </Grid2>
            </Grid2>
            <Grid2 item xs={12} sm={12} lg={12}>
                <Outlet />
            </Grid2>
        </Grid2>
    )
}


function logoutHandler(setAuthorization, userDispatch) {
    localStorage.setItem("Authorization", null);
    localStorage.setItem("User", null);
    localStorage.setItem("lastFetchTime", null);
    setAuthorization(null);
    userDispatch({
        type: "logout"
    });
}