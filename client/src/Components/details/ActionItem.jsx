import { useState } from 'react';

import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material'; 
import { useNavigate } from 'react-router-dom'; 
import { payUsingPaytm } from '../../service/api';
import { post } from '../../utils/paytm';

import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('lg')]: {
        padding: '20px 40px'
    }
}));

const Image = styled('img')({
    width: '95%',
    padding: '15px'
});

const StyledButton = styled(Button)(({ theme }) => ({
    width: '48%',
    borderRadius: 2,
    height: 50,  
    [theme.breakpoints.down('lg')]: {
        widht: '46%'
    },
    [theme.breakpoints.down('sm')]: {
        widht: '48%'
    }
})); 

const ActionItem = ({ product }) => {   

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = product;
    const [quantity, setQuantity] = useState(1);
    
    const buyNow = async () => {
        let response = await payUsingPaytm({ amount: 500, email: 'anuragupadhyay319@gmail.com'});
        let information = {
            action: 'https://securegw-stage.paytm.in/order/process',
            params: response    
        }
        post(information);
    }

    const addItemToCart = () => {
        dispatch(addToCart(id, quantity));
        navigate('/cart');
    }
    return (
        <LeftContainer>
            <Box style={{ padding: '15px 20px', border: '1px solid #f0f0f0', marginBottom: 10 }}> 
                <Image src={product.detailUrl} alt="product" />  
            </Box>
            <StyledButton onClick={() => addItemToCart()} style={{ marginRight: 10, background: '#ff9f00' }} variant="contained"><Cart />Add to Cart</StyledButton>
            <StyledButton onClick={() => buyNow()} style={{ background: '#fb641b' }} variant="contained"><Flash /> Buy Now</StyledButton>
        </LeftContainer>
    )
}

export default ActionItem;