import React from "react";
import { useState } from "react";
import "./coinInfo.css";
import { HistoricalChart } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import {
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import { Chart as ChartJS } from 'chart.js/auto'
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import SelectButton from "./SelectButton";

const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();
  const [flag,setflag] = useState(false);
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  useEffect(() => {
    fetchHistoricData();
  }, [days]);
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="coinInfoContainer">
        {!historicData | flag===false ?(
          <CircularProgress
            style={{ color: "#7500ff",zIndex:999 }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    borderColor: "#7500ff",
                    label: `Price (Past ${days} Days) in ${currency}`,
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    raduis: 1,
                  },
                },
              }}
            />

           
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
               {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
