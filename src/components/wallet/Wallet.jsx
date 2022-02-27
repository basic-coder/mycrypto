import React, { useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { TransactionContext } from "../../context/TransactionContext";
import LinearProgress from '@material-ui/core/LinearProgress'
import { shortenAddress } from "../../utils/ShortenAddress";
import './wallet.css'

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    className=""
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
  />
);


const Wallet = () => {

    
  const { connectWallet, currentAccount,formData,sendTransactions, handleChange ,isLoading} = useContext(TransactionContext);
  const handleSubmit = (e) => {

    const {addressTo,message,keyword,amount} = formData;

    e.preventDefault()

    if(!addressTo || !amount || !keyword || !message) return ;

    sendTransactions();
    
  };

  return (
    <div className="crypto__wallet-container">
      <div className="crypto__wallet-left-container">
          <h1 className="crypto__wallet-heading">
            Send Crypto <br /> across the world
          </h1>
          <p className="crypto__wallet-sub-heading">
            Explore the crypto world. Buy and Sell  Ethers easily on
            Krypto
          </p>
          
          {!currentAccount && (
            <button
              type="button"
              className="crypto__wallet-connect-button"
              onClick={connectWallet}
            >
              <p className="crypto__wallet-connect-text">
                Connect Wallet
              </p>
            </button>
          )}

          <div className="crypto__wallet-services-table">
            <div className="crypto__wallet-services">Reliability</div>
            <div className="crypto__wallet-services">Security</div>
            <div className="crypto__wallet-services">Ethereum</div>
            <div className="crypto__wallet-services">Web 3.0</div>
            <div className="crypto__wallet-services">Low Fees</div>
            <div className="crypto__wallet-services">Blockchain</div>
          </div>
        </div>
        <div className="crypto__wallet-right-container">
        <div className="crypto__wallet-form">
          <div className="crypto__wallet-card eth-card ">
              <div className="crypto__wallet-card-icon">
                <div className="crypto__wallet-card-ether-icon">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <div className="crypto__wallet-card-info-icon">
                <BsInfoCircle fontSize={17} color="#FFF" />
              </div>
              </div>
              <div className="crypto__wallet-card-account-details">
                <p className="crypto__wallet-card-account">{shortenAddress(currentAccount)}</p>
                <p className="">
                  Ethereum
                </p>
          </div>
          </div>
          
             <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
            <div className="crypto__wallet-form-send" />
            {isLoading ? (
              <LinearProgress />
            ) : (
              <button
                onClick={handleSubmit}
                className=""
                type="button"
              >
                Send Now
              </button>
            )}
          </div>
        </div>
        </div>
  );
};

export default Wallet;
