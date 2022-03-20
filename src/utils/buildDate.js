// const startDate = new Date("2017-10-01"); //YYYY-MM-DD
// const endDate = new Date("2022-03-20"); //YYYY-MM-DD

const getDateArray = function (start, end) {
  let arr = [];
  let dt = new Date(start);
  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
};

export default getDateArray;
