import React from 'react'
import { useState } from 'react'
import {useParams} from 'react-router-dom'
import {CryptoState} from '../../CryptoContext'
import {Typography} from '@material-ui/core'
import './coins.css'
import axios from 'axios'
import {SingleCoin} from '../../config/api'
import { useEffect } from 'react'
import CoinInfo from '../../components/coinInfo/CoinInfo'
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import {numberWithCommas} from '../../components/carousel/Carousel'
import LinearProgress from '@material-ui/core/LinearProgress'

const Coins = () => {
    const [coin, setCoin] = useState()
    const {currency, symbol} = CryptoState()
    const {id} = useParams()
    const htmlFrom = (htmlString) => {
        const cleanHtmlString = DOMPurify.sanitize(htmlString,
          { USE_PROFILES: { html: true } });
        const html = parse(cleanHtmlString);
        return html;
    }
    const fetchCoin = async() =>{
        const {data} = await axios.get(SingleCoin(id))
        setCoin(data)
    }

    useEffect(()=>{
        fetchCoin();
    })

    if (!coin) return <LinearProgress style={{backgroundColor: "#7500ff"}} />


    return (
        <div className='coinContainer'>
            <div className="coinSidebar">
                <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom: 20}} />
                <Typography variant='h3' className="coinHeading">
                    {coin?.name}
                </Typography> 
                <Typography variant="subtitle1" className="coinDescription">
                    {htmlFrom(coin?.description.en.split(". ")[0])}
                </Typography>  
                <div className="marketData">
                    <span style={{display: "flex"}}>
                        <Typography variant="h5" className="heading">
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" style={{fontfamily: "Montserrat"}}>
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>

                    <span style={{display: "flex"}}>
                        <Typography variant="h5" className="heading">
                            Current Price:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" style={{fontfamily: "Montserrat"}}>
                            {symbol}{" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
            <Typography variant="h5" className="heading">
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
                </div>
            </div>
            <CoinInfo coin={coin} />
        </div>
    )
}

export default Coins
