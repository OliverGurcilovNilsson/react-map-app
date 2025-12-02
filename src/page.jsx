import {useEffect, useState} from "react";
import {Button, Typography, Container, Grid, Box} from '@mui/material';
import ProductCard from "./components/ProductCard.jsx";

import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from './redux/cartSlice';
export function  HomeComponent (){

    const storeApiUrl = "https:/fakestoreapi.com/products";
    const [data, setData] = useState([]);


    //const [cart, setCart] = useState([]);
    //const [total, setTotal] = useState(0);

    // 2. Replace local state with Redux Hooks
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items); // Select the items array
    const total = useSelector((state) => state.cart.total);     // Select the calculated total



   /* const addToCart = (itemToAdd) => {
        console.log("Adding item with id", itemToAdd.id, " and price ", itemToAdd.price, "to cart");
        setCart((prevCart) => [...prevCart, itemToAdd]);
        setTotal((prev) => prev + itemToAdd.price);
    }*/
    // 3. Update local functions to use dispatch
    const addToCart = (itemToAdd) => {
        // Dispatch the action with the item as the payload
        dispatch(addItem(itemToAdd));
    }

  /*  const removeFromCart = (itemToRemove) => {
        const itemIndex = cart.findIndex(item => item.id === itemToRemove.id);
        console.log("Removing index", itemIndex, " from cart");
        //Updates the cart state by creating a brand new array that excludes the item
        //Located at the index (_ = current array element, index = current index of element checked
        setCart(prevCart => prevCart.filter((_, index) => index !== itemIndex));
        setTotal((prev) => prev - itemToRemove.price);
    }*/

    const removeFromCart = (itemToRemove) => {
        dispatch(removeItem(itemToRemove));
    }


    //const [cart, ]

    useEffect(() => {
        fetch(storeApiUrl)
            .then((response)=>response.json())
            .then((json)=>setData(json));
    }, []);

    useEffect( ()=> {
        console.log("Data is: ", data);
    }, [data])





    return(
        <Box
            sx={{
                minHeight: '100vh', // Ensure it covers the whole viewport height
                backgroundColor: 'background.default',
            }}
        >

            <Container
                maxWidth="lg"
                sx={{
                    // Set a top margin to push the content down below the fixed AppBar
                    mt: 8
                }}
            >

                <Typography
                    variant="h5" // 2. Use a visual style like h5
                    component="h2" // 3. Ensure the underlying HTML element is <h2> for SEO/semantics
                    gutterBottom // Optional: Adds a bit of space below
                    // Optional: Use sx prop for custom styling like color
                    sx={{
                        fontWeight: 'bold',
                        color: 'Grey'
                    }}
                >
                    Cart: {cartItems.length} Total: ${total.toFixed(2)}
                </Typography>

                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight:'bold',
                        color: 'grey'
                    }}>
                    Products
                </Typography>

                <Grid container spacing={2} justifyContent="flex-start">
                    {data.map((item) => (
                        // 2. Wrap each card in a Grid item
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                            {/* 3. Pass the item data, the current cart, and the functions as props */}
                            <ProductCard
                                item={item} // 👈 The single product object
                                cart={cartItems} // 👈 The current cart array (to check if item is present)
                                addToCart={addToCart} // 👈 The function to add an item
                                removeFromCart={removeFromCart} // 👈 The function to remove an item
                            />
                        </Grid>
                    ))}
                </Grid>

            </Container>
        </Box>
    );


}
