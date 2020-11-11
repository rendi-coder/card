import React from "react";
import "./styles/index.scss";
import { IError } from "../../types";
import { deleteSeparators } from "../../helpers/separator";

const Input: React.FC<{
  name: string;
  label: string;
  value: string;
  errors: IError[];
  maxLength: number;
  onChange: (e: string) => void;
}> = ({ name, label, value, errors, onChange, maxLength }) => {
  return (
    <div className="custom-input">
      <div className="input-wrapper">
        <div className="input-container">
          <input
            id={name}
            autoComplete="off"
            className="input"
            placeholder=" "
            value={value}
            onChange={(e) =>
              onChange(deleteSeparators(e.target.value, maxLength))
            }
          />
          <label htmlFor={name} className="label">
            {label}
          </label>
        </div>
      </div>
      <div className="prompt">
        {errors.length > 0 &&
          errors.map((e, i) => (
            <div key={i} className="error">
              <span>{i + 1}.</span>
              {e.message}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Input;
