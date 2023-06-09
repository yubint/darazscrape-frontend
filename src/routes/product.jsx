import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import NepaliDate from "nepali-date-converter";
import { useContext } from "react";
import { userContext } from "../usercontext";
import { Box, Stack } from "@mui/system";

export default function Product() {
    const user = useContext(userContext);
    const { productId } = useParams();
    if (!user) {
        return <></>
    }

    let product;
    for (let current_product of user.products) {
        if (current_product.id === Number(productId)) {
            product = current_product;
            break
        }
    }

    // if there is no product matching the given productId
    if (!product) {
        return (
            <>
                <div id="error">
                    Product Not found. The product may have been deleted.
                </div>
            </>
        )
    }

    let graphData = product.prices.map((prices => {
        return { date: new Date(prices.date), price: prices.price }
    }));

    return (
        <>
            <div className="product" id={`product-${product.id}`}>
                <Stack alignItems='center' sx={{ marginTop: '10%' }}>
                    <Box sx={{ margin: '3rem', fontSize: '1.5rem' }}>
                        {product.title}
                    </Box>
                    <ResponsiveContainer width="60%" height={200}>
                        <LineChart data={graphData}>
                            <XAxis dataKey="date" tickFormatter={formatDate} padding={{ right: 10 }} />
                            <YAxis />
                            <Tooltip content={<GraphTooltip />} wrapperStyle={{ outline: 'none' }} />
                            <Line type="monotone" dataKey="price" stroke="#985eff" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </Stack>
            </div>
        </>
    )
}

function formatDate(tickItem) {
    let nepaliFormat = new NepaliDate(tickItem);
    return nepaliFormat.format('MMMM DD')
}

function GraphTooltip({ active, payload, label }) {
    if (active && payload && label) {
        let nepaliFormat = new NepaliDate(label);
        return (
            <>
                <div>Price: {payload[0].payload.price}</div>
                <div>{nepaliFormat.format('ddd, MMMM DD')}</div>
            </>
        )
    }

    return null;
}