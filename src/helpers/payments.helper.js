import { monthsMapping } from "../mappings";




export const generateMonthData = (month = monthsMapping[1].month) => {
  const data = [];
  for (let i = 1; i < 29; i++) {
    // TODO:
    // make a class to name properties correctlly
    data.push({
      date: new Date(getCurrentYear(), month, i),
      comment: getRandomComment(),
      amount: getRandomPayment()
    })
  }
  return data;
};

const getRandomComment = () => {
  const len = commentsBank().length;
  return commentsBank()[getRandomInt(len - 1)];
};

const getRandomPayment = () => {
  const sign = Math.random() < 0.5 ? -1 : 1;
  return sign * getRandomInt(5000);
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getCurrentYear = () => {
  // TODO:
  // Fix this garbage
  return 2018;
};

const commentsBank = () => {
  return [
    "PS4",
    "XBOX One",
    "Payment",
    "Sushi",
    "Food",
    "Stuff",
    "Rent",
    "Utilities",
    "Phone bill",
    "Bill",
    "Speeding Ticket",
    "Ticket",
    "Lesson",
    "Hmmm...",
    "You know what this is...",
    "House M.D. Season 1",
    "Vikings Season 2"
  ]
};
