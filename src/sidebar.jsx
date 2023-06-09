import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import SidebarProduct from "./sidebar-product";
import { useContext } from "react";
import { userContext } from "./usercontext";
import { ContentPasteSearchOutlined } from "@mui/icons-material";

export default function SideBar() {
    const user = useContext(userContext);
    if (user) {
        const products = user.products;
        return (
            <>
                <Grid2
                    container
                    direction='column'
                    rowSpacing={2}
                >

                    {products.map((product) => {
                        return (
                            <Grid2 item key={product.id} >
                                <SidebarProduct product={product} />
                            </Grid2>
                        )
                    })}
                </Grid2>
            </>
        )
    }
    else {
        return (
            <></>
        )
    }
}