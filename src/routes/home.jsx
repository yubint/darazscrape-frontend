import { useMediaQuery } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Outlet } from "react-router-dom";
import SideBar from "../sidebar";
import { useContext } from "react";
import { AuthorizationContext } from "../authorizationcontext";
import About from "../about";

export default function Home() {
    const matches = useMediaQuery('(max-width:900px)');
    const authorization = useContext(AuthorizationContext);

    if (!authorization) {
        return <About />
    }
    let layout;
    if (matches) {
        layout = (
            <>
                <Grid2 xs={12} md={4}>
                    <SideBar />
                </Grid2>
                <Grid2 xs={12} md={8}>
                    <Outlet />
                </Grid2>
            </>
        )
    }
    else {
        layout = (
            <>
                <Grid2 xs={12} md={8}>
                    <Outlet />
                </Grid2>
                <Grid2 xs={12} md={4}>
                    <SideBar />
                </Grid2>
            </>
        )
    }
    return (
        <Grid2 container>
            {layout}
        </Grid2>
    )
}