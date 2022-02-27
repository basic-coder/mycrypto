import React, { useEffect, useState } from "react";
import { CoinList } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import "./coinsTable.css";
import axios from "axios";
import {
  Container,
  createTheme,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import {Pagination} from '@material-ui/lab'
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../carousel/Carousel";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page,setPage] = useState(1)

  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const { currency, symbol } = CryptoState();
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  const handleSearch = () => {
      
    return coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat",color: "var(--black)" }}
        >
          Crypto Currency Prices by Market Cap
        </Typography>
        <TextField
          label="Search for a Crypto Currency..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          className="crypto__search"
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#7500ff" ,boxShadow: "var(--box-shadow)"}}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "MarketCap"].map((head) => (
                    <TableCell
                      style={{
                        fontWeight: "700",
                        fontFamily: '"poppins",san-sarif',
                        fontSize: "1.5rem",
                        color: "var(--black) !important",
                      }}
                      key={head}
                      align={head === "Coin" ? "center" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch().slice((page -1) *10,(page - 1) *10 + 10).map((row) => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      className="tableRow"
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                          fontFamily: '"poppins",san-sarif',
                          fontSize: "1.5rem",
                          color: "var(--black) !important",
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 22,
                               color: "var(--black)",
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" ,}}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="right" style={{color: "var(--black)",fontSize: 14}}>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                      <TableCell align="right" style={{
                          color: profit > 0 ? "rgb(14,203,129)" : "red", fontWeight : 500,fontSize: 14
                      }}>{profit && "+"} {row.price_change_percentage_24h.toFixed(2)}%

                      </TableCell>

                      <TableCell align="right" style={{color: "var(--black)",fontSize: 14}}>
                        {symbol}{" "}
                        {numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination className="tablePagination" onChange={(_,value) => {
          setPage(value); window.scroll(0,450)
        }} style={{padding: 20, width: "100%", display: "flex" , justifyContent: "center"}}  count={+(handleSearch()?.length / 10).toFixed(0) || 10} />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
