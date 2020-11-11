import React, { useState } from "react";
import Input from "./components/Input";
import validator from "./helpers/validator";
import "./App.scss";
import { IError } from "./types";
import { separateValue } from "./helpers/separator";
import { correctDate, checkOnChangeDate } from "./helpers/date";
import masterCard from "./mc_vrt_pos.svg";

function App() {
  const [cardnumber, setNumberCard] = useState<string>("");
  const [cardNumberErrors, setNumberCardErrors] = useState<IError[]>([]);
  const [date, setDate] = useState<string>("");
  const [prevValueDate, setPrevValueDate] = useState<string>("");
  const [dateErrors, setDateErrors] = useState<IError[]>([]);
  const [cvv, setCvv] = useState<string>("");
  const [cvvErrors, setCvvErrors] = useState<IError[]>([]);

  const onChangeNumberCardHandler = (value: string) => {
    setNumberCardErrors(validator.checkCardNumber(value));
    setNumberCard(separateValue(value, 4, 16, " ", 16));
  };

  const onChangeDateHandler = (value: string) => {
    const correctValue = correctDate(value);
    if (checkOnChangeDate(value, prevValueDate)) {
      setDateErrors(validator.checkDate(correctValue));
      setDate(separateValue(correctValue, 2, 6, " / ", 3));
      setPrevValueDate(correctValue);
    }
  };

  const onChangeCvvHandler = (value: string) => {
    if (isFinite(+value)) {
      setCvvErrors(validator.checkCvv(value));
      setCvv(value);
    }
  };

  return (
    <div className="App">
      <div className="form">
        <div className="header-card">
          <img src={masterCard} alt="logo" />
        </div>
        <div className="card-number">
          <Input
            name="card-number"
            label={"Номер карты"}
            value={cardnumber}
            errors={cardNumberErrors}
            onChange={onChangeNumberCardHandler}
            maxLength={16}
          />
        </div>
        <div className="verification">
          <div className="item">
            <Input
              name="date"
              label={"ММ/ГГГГ"}
              value={date}
              errors={dateErrors}
              onChange={onChangeDateHandler}
              maxLength={6}
            />
          </div>
          <div className="item">
            <Input
              name="cvv"
              label={"CVV2"}
              value={cvv}
              errors={cvvErrors}
              onChange={onChangeCvvHandler}
              maxLength={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
