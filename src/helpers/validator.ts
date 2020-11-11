import { IError } from "../types";

const ERRORS_TYPE = {
  cardIsNaN: "card number is NaN",
  validateLengthCardNumber: "validate length and type card number",
  validateFormatDate: "validate format date",
  cardExpired: "is card expired",
  isCorrectCvv: "is correct cvv2",
};

const generateID = () => "_" + Math.random().toString(36).substr(2, 9);

const generatePromptDate = () => {
  const date = new Date();
  return `${date.getMonth() + 2 + "/" + (date.getFullYear() + 2)}`;
};

const ERRORS = {
  [ERRORS_TYPE.cardIsNaN]: {
    id: generateID(),
    message: "card number must be only numbers",
  },
  [ERRORS_TYPE.validateLengthCardNumber]: {
    id: generateID(),
    message: "length must be 16 numbers",
  },
  [ERRORS_TYPE.validateFormatDate]: {
    id: generateID(),
    message: `date example (${generatePromptDate()})`,
  },
  [ERRORS_TYPE.cardExpired]: {
    id: generateID(),
    message: "card is expired",
  },
  [ERRORS_TYPE.isCorrectCvv]: {
    id: generateID(),
    message: "enter cvv2 (three digit code)",
  },
};

const isNum = (value: string | number) =>
  isFinite(value as number) && value.toString().trim().length !== 0;

const validateNumAndLength = (value: string, length: number) =>
  isNum(value) && value.length === length;

const validateDate = (value: string) => {
  const userDate = new Date(+value.slice(2), +value.slice(0, 2) - 1, 1);
  const date = new Date();
  return userDate.getTime() - date.getTime() > 0;
};

const addError = (errors: IError[], type: string, validate: boolean) => {
  if (!validate) errors.push(ERRORS[type]);
};

const validator = {
  checkCardNumber: (value: string) => {
    const errors: IError[] = [];
    addError(errors, ERRORS_TYPE.cardIsNaN, isNum(value));
    addError(
      errors,
      ERRORS_TYPE.validateLengthCardNumber,
      validateNumAndLength(value, 16)
    );
    return errors;
  },

  checkDate: (value: string) => {
    const errors: IError[] = [];
    addError(
      errors,
      ERRORS_TYPE.validateFormatDate,
      validateNumAndLength(value, 6)
    );
    if (
      errors.findIndex(
        (e) => e.id === ERRORS[ERRORS_TYPE.validateFormatDate].id
      ) === -1
    ) {
      addError(errors, ERRORS_TYPE.cardExpired, validateDate(value));
    }
    return errors;
  },

  checkCvv: (value: string) => {
    const errors: IError[] = [];
    addError(errors, ERRORS_TYPE.isCorrectCvv, validateNumAndLength(value, 3));
    return errors;
  },
};

export default validator;
