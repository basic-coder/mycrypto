import React from 'react'
import './banner.css'
import {Typography, Container} from '@material-ui/core';
import Carousel from '../carousel/Carousel';

const Banner = () => {
    return (
        <div className='banner'>
            <Container className='bannerContent'>
                <div className="bannerTagline">
                    <Typography variant='h2'>Crypto</Typography>
                    <Typography variant='subtitle2'>All About Crypto</Typography>
                </div>
                <Carousel />
            </Container>  
        </div>
    )
}

export default Banner
