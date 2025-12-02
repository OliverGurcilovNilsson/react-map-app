import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CardActions
} from '@mui/material';
import {addItem, removeItem} from "../redux/cartSlice.js";
import {useDispatch, useSelector} from "react-redux";

// The component receives the item data and the cart functions as props
function ProductCard({ item }) {
    const dispatch = useDispatch();
    // 1. Get the cart items from the Redux store
    const cartItems = useSelector((state) => state.cart.items);

    // 2. Determine state using Redux data
    const isInCart = cartItems.some(cartItem => cartItem.id === item.id);

    // 3. Define action functions that use dispatch
    const handleCartAction = () => {
        if (isInCart) {
            dispatch(removeItem(item)); // Dispatch the removeItem action
        } else {
            dispatch(addItem(item));    // Dispatch the addItem action
        }
    };

    const buttonLabel = isInCart ? 'Remove from cart' : 'Add to cart';
    return (
        // 1. Use height: '100%' and Flexbox to fill the Grid item and stack content
        <Card sx={{
            maxWidth: 200,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>

            <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.title}
                sx={{ objectFit: 'contain', p: 1 }}
            />

            {/* 2. Use flexGrow: 1 to make the content area take up all remaining space */}
            <CardContent sx={{ flexGrow: 1 }}>

                {/* 3. Apply CSS to limit the title to 2 lines for fixed height */}
                <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2, // Limit to 2 lines
                        WebkitBoxOrient: 'vertical',
                        // Set a fixed height based on 2 lines (e.g., 1.5em line-height * 2 lines)
                        minHeight: '3.0em'
                    }}
                >
                    {item.title}
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    ${item.price.toFixed(2)}
                </Typography>
            </CardContent>

            {/* CardActions will be pushed to the bottom by flexGrow: 1 */}
            <CardActions sx={{ mt: 'auto' }}>
                <Button
                    variant="contained"
                    color={isInCart ? 'error' : 'primary'}
                    size="small"
                    onClick={handleCartAction}
                    fullWidth
                >
                    {buttonLabel}
                </Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;
