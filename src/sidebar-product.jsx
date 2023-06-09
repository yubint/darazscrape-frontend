import { Card, CardActions, CardContent, CircularProgress, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledProductLink as Link } from "./styled-link";
import { Launch } from "@mui/icons-material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useContext, useState } from "react";
import { userDispatchContext } from "./usercontext";
import { axiosContext } from "./axioscontext";
import { deleteProduct } from "./fetchdata";
import { useNavigate } from "react-router";

export default function SideBarProduct({ product }) {
    const userDispatch = useContext(userDispatchContext);
    const axios = useContext(axiosContext);
    const redirect = useNavigate();

    const [isDeleting, setIsDeleting] = useState(false);

    if (isDeleting) {
        return (
            <Stack alignItems='center' >
                <CircularProgress />
            </Stack>
        )
    }
    async function handleDeleteClick(productId) {
        setIsDeleting(true);
        const isDeleted = await deleteProduct(axios, productId);
        if (isDeleted) {
            userDispatch({
                type: 'delete-product',
                id: productId
            })
        }
        setIsDeleting(false);
        redirect('/');
    }
    return (
        <>
            <Card className="sidebar-product-card" >
                <CardContent>
                    <Link className="sidebar-product" onClick={e => window.scrollTo({ top: 0, behavior: 'smooth' })} to={`/product/${product.id}`}>
                        <Grid2 container>
                            <Grid2 xs={4}>
                                <img width={150} src={product.image_url} alt="Product-image" />
                            </Grid2>
                            <Grid2 xs={8}>

                                <div>{product.title}</div>
                                <div> Rs. {product.prices.at(-1).price}</div>
                            </Grid2>

                        </Grid2>
                    </Link>
                </CardContent>
                <CardActions>
                    <Tooltip title="Delete">
                        <IconButton
                            onClick={async (e) => {
                                await handleDeleteClick(setIsDeleting, userDispatch, axios, product.id);
                            }}>
                            <DeleteIcon />
                        </IconButton>

                    </Tooltip>
                    <Tooltip title="Open in Daraz">
                        <IconButton
                            onClick={(e) => {
                                open(product.url, "_blank");
                            }}>
                            <Launch />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        </>
    );
}
