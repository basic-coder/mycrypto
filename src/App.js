import {Navigate, Route, Routes} from 'react-router-dom'
import Home from './pages/home/Home'
import Header from './components/header/Header'
import Contact from './pages/contact/Contact';
import Coins from './pages/coins/Coins';
import WalletPage from './pages/walletPage/WalletPage';
import TransactionPage from './pages/transactionPage/TransactionPage';
import Services from './pages/services/Services';
import Footer from './components/footer/Footer';

function App() {
  //window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <div className="App">
       <Header />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/coins/:id' element={<Coins />} />
          <Route path='/wallet' element={<WalletPage />} />
          <Route path="/transactions" element={<TransactionPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
