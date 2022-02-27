import React, { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import { shortenAddress } from "../../utils/ShortenAddress";
import useFetch from "../../hooks/useFetch";
import './transactions.css'

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionContext);

  const TransactionCard = ({
    addressTo,
    addressFrom,
    timestamp,
    amount,
    keyword,
    message,
  }) => {
    const gifUrl = useFetch({ keyword });
    return (
      <div
        className="crypto__transaction-card">
            <a
              to={`https://roopsten.etherscan.io/address/${addressFrom}`}
              target="_blank"
              rel="noopener noreferrer"
              className="crypto__transaction-to-from"
            >
              <p>
                From: {shortenAddress(addressFrom)}
              </p>
            </a>
            <a
              to={`https://roopsten.etherscan.io/address/${addressTo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="crypto__transaction-to-from"
            >
              <p>
                To: {shortenAddress(addressTo)}
              </p>
            </a>
            <p className="crypto__transaction-card-amount">Amount: {amount} ETH</p>
            {message && (
              <>
                <p className="crypto__transaction-card-message">Message: {message}</p>
              </>
            )}
          <img
            src={gifUrl}
            alt="gif"
            className="crypto__transaction-card-image"
          />
          <p className="crypto__transaction-card-timestamp">
            {timestamp}
          </p>
        </div>
    );
  };
  return (
    <div className="crypto__transaction-details">
        {currentAccount ? (
          <h3 className="crypto__transaction-heading">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="crypto__transaction-heading">
            Connect your account to see the latest transactions
          </h3>
        )}
        <div className="crypto__transaction-container">
          {transactions.reverse().map((transaction, i) => (
            <TransactionCard key={i} {...transaction} />
          ))}
      </div>
    </div>
  );
};

export default Transactions;
