import { CircularProgress, IconButton, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import { useContext, useRef, useState } from "react";
import { axiosContext } from "../axioscontext";
import { userDispatchContext } from "../usercontext";
import { addProduct } from "../fetchdata";
import { useNavigate } from "react-router";

export default function AddProduct() {
    const formRef = useRef(null);
    const textFieldRef = useRef(null);
    const axios = useContext(axiosContext);
    const userDispatch = useContext(userDispatchContext);
    const redirect = useNavigate();

    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(false);

    if (isAdding) {
        return (
            <Stack alignItems='center'>
                <CircularProgress />
            </Stack>
        )
    }

    async function handleSubmit(e) {
        setError(false);
        e.preventDefault();
        setIsAdding(true);
        const data = new FormData(e.currentTarget);
        const newProduct = await addProduct(axios, data);
        if (newProduct == 400) {
            setError(true);
        }
        else if (newProduct) {
            userDispatch({
                type: 'add-product',
                product: newProduct,
            })
            redirect(`/product/${newProduct.id}`)
        }
        setIsAdding(false);
    }
    return (
        <>
            <Stack id='add-product-form' alignContent='center' alignItems='center' sx={{ marginTop: '10%' }} component='form' onSubmit={handleSubmit} ref={formRef}>
                <TextField
                    name='url'
                    error={error}
                    variant="standard"
                    placeholder={error ? 'Invalid Link' : 'Input Product Link Here'}
                    sx={{
                        width: '60%'
                    }}
                    InputProps={{
                        endAdornment: <IconButton onClick={e => { formRef.current.requestSubmit(); }}><AddIcon /></IconButton>
                    }}
                    autoComplete="off"
                    type="url"
                    ref={textFieldRef}
                >
                </TextField>
            </Stack>
        </>
    )
}