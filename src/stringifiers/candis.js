import { Transform } from "stream";

export const COLUMNS = [
  "bookingDate",
  "valueDate",
  "contactName",
  "amount",
  "currency",
  "purpose",
  "txFee"
];

export const TITLES = [
  "booking date",
  "value date",
  "contact name",
  "amount",
  "currency",
  "purpose",
  "transaction fee"
];

function pad(num, size) {
  let s = num + "";
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}

function stringifyDate({ day, month, year }) {
  return `${pad(day, 2)}.${pad(month, 2)}.${pad(year % 100, 2)}`;
}

export const stringifiers = {
  bookingDate: stringifyDate,
  valueDate: stringifyDate,
  contactName: name => JSON.stringify(name || "Transferwise Generic")
};

export class StringifyCandisCsv extends Transform {
  constructor({ separator = ";" } = {}, props) {
    super({
      ...props,
      readableObjectMode: false,
      writableObjectMode: true
    });
    this.separator = separator;
    this.hasHeader = false;
  }

  pushHeader() {
    if (!this.hasHeader) {
      this.hasHeader = true;
      this.push(TITLES.map(JSON.stringify).join(this.separator) + "\n");
    }
  }

  pushValues(data) {
    this.push(
      COLUMNS.reduce((row, column) => {
        const { [column]: stringify = JSON.stringify } = stringifiers;
        const { [column]: value } = data;
        row.push(stringify(value) || value);
        return row;
      }, []).join(this.separator) + "\n"
    );
  }

  _transform(data, encoding, callback) {
    this.pushHeader();
    this.pushValues(data);
    callback();
  }

  _final(callback) {
    this.pushHeader();
    callback();
  }
}
