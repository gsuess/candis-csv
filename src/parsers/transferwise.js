import csv from "csv-parser";
const INPUT_DATE_FORMAT = /^(\d\d)-(\d\d)-((?:19|20)\d\d)$/;

const DATE_COLUMNS = ["Date"];

const NUMERIC_COLUMNS = [
  "Amount",
  "Running Balance",
  "Exchange Rate",
  "Total fees"
];

const CONTACT_COLUMNS = ["Payer Name", "Payee Name", "Merchant"];

export function parseDate(value) {
  const match = value.match(INPUT_DATE_FORMAT);

  if (!match) {
    return null;
  }

  const [, day, month, year] = match;
  return {
    day: parseInt(day),
    month: parseInt(month),
    year: parseInt(year)
  };
}

export function parser(options = {}) {
  return csv({
    mapValues({ header, value }) {
      if (DATE_COLUMNS.includes(header)) {
        return parseDate(value);
      }

      if (NUMERIC_COLUMNS.includes(header)) {
        return parseFloat(value);
      }

      return value;
    },
    skipComments: true,
    ...options
  });
}

export function toCandis({
  Date,
  Amount: amount,
  Currency: currency,
  "Payment Reference": paymentRef,
  Description,
  "Total fees": txFee,
  ...dataRow
}) {
  return {
    bookingDate: Date,
    valueDate: Date,
    contactName: CONTACT_COLUMNS.reduce(
      (contactName, column) => contactName || dataRow[column],
      ""
    ),
    amount,
    currency,
    purpose: `${Description} ${paymentRef}`,
    txFee
  };
}
