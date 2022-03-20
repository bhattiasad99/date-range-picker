import React from "react";
import yearsData from "../data/years.json";
import {
  Wrapper,
  Title,
  MonthSelector,
  Month,
  Year,
  Week,
  Days,
  Day,
  StyledButton,
  YearsSelect,
  YearOption,
  ConfigSelectorContainer,
} from "./Calender.style";
import { IconButton } from "@mui/material";
import * as Icons from "./icons";
import DateComp from "./Date";
import sub from "date-fns/sub";
import add from "date-fns/add";
import setDate from "date-fns/setDate";
import compareAsc from "date-fns/compareAsc";
import isLastDayOfMonth from "date-fns/isLastDayOfMonth";
import isFirstDayOfMonth from "date-fns/isFirstDayOfMonth";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getFirstDayOfMonth = (date, month, year) => {
  const dt = new Date(year, month, date);
  return setDate(dt, 1);
};

const Calender = () => {
  const currentDate = new Date();

  //   states
  const [month, setMonth] = React.useState(currentDate.getMonth());
  const [year, setYear] = React.useState(currentDate.getFullYear());
  const [showYears, setShowYears] = React.useState(false);

  const first = getFirstDayOfMonth(currentDate.getDate(), month, year);
  const [selections, setSelections] = React.useState({
    start: currentDate,
    end: null,
  });
  //   handlers
  const prevMonthHandler = (e) => {
    if (month === 0) {
      setYear((prevState) => prevState - 1);
      return setMonth(11);
    }
    setMonth((prevState) => prevState - 1);
  };

  const nextMonthHandler = (e) => {
    if (month === 11) {
      setYear((prevState) => prevState + 1);
      return setMonth(0);
    }
    setMonth((prevState) => prevState + 1);
  };

  const openYearHandler = (e) => {
    setShowYears((prevState) => !prevState);
  };
  const yearsList = yearsData.Sheet1.map((el) => +el["1980"]);
  const clickDateHandler = (e) => {
    const selectedDate = new Date(e.currentTarget.getAttribute("id"));
    let temp = { ...selections };
    if (!selections.end) {
      temp.end = selectedDate;
    } else if (selections.end) {
      temp.start = selectedDate;
      temp.end = null;
    }

    setSelections(temp);
    setMonth(selectedDate.getMonth());
  };

  React.useEffect(() => {
    let temp = { ...selections };
    if (temp.end && temp.start > temp.end) {
      const tempExtra = temp.end;
      temp.end = temp.start;
      temp.start = tempExtra;
      setSelections(temp);
    }
  }, [selections]);
  return (
    <Wrapper>
      <IconButton sx={{ position: "absolute", top: "10px", right: "10px" }}>
        <Icons.Cross />
      </IconButton>
      <Title>select date</Title>
      <MonthSelector>
        <IconButton onClick={prevMonthHandler}>
          <Icons.Left />
        </IconButton>
        <ConfigSelectorContainer
          style={{ cursor: "pointer" }}
          onClick={openYearHandler}
        >
          <Month>{months[month]}</Month>
          <Year>{year}</Year>
          <IconButton sx={{ padding: 0 }}>
            <Icons.Down />
          </IconButton>
          {showYears && (
            <YearsSelect>
              {yearsList.map((year, index) => (
                <YearOption
                  onClick={(e) => setYear(+e.target.innerText)}
                  key={index}
                >
                  {year}
                </YearOption>
              ))}
            </YearsSelect>
          )}
        </ConfigSelectorContainer>
        <IconButton onClick={nextMonthHandler}>
          <Icons.Right />
        </IconButton>
      </MonthSelector>
      <Days>
        <Day>Sun</Day>
        <Day>Mon</Day>
        <Day>Tue</Day>
        <Day>Wed</Day>
        <Day>Thu</Day>
        <Day>Fri</Day>
        <Day>Sat</Day>
      </Days>
      {[...new Array(6)].map((week, weekIndex) => {
        return (
          <Week key={weekIndex}>
            {[...new Array(7)].map((day, dateIndex) => {
              const firstDay = sub(first, {
                days: first.getDay(),
              });
              const dateToRender = add(firstDay, {
                days: dateIndex,
                weeks: weekIndex,
              });

              const isCurrent =
                (selections.start &&
                  dateToRender.getDate() === selections.start.getDate() &&
                  dateToRender.getMonth() === selections.start.getMonth() &&
                  dateToRender.getFullYear() ===
                    selections.start.getFullYear()) ||
                (selections.end &&
                  dateToRender.getDate() === selections.end.getDate() &&
                  dateToRender.getMonth() === selections.end.getMonth() &&
                  dateToRender.getFullYear() === selections.end.getFullYear());
              let rangeType = "";
              if (selections.end) {
                if (
                  (compareAsc(dateToRender, selections.start) === 0 &&
                    dateIndex !== 6) ||
                  (dateIndex === 0 &&
                    compareAsc(dateToRender, selections.start) === 1 &&
                    compareAsc(dateToRender, selections.end) === -1) ||
                  (compareAsc(dateToRender, selections.start) === 1 &&
                    compareAsc(dateToRender, selections.end) === -1 &&
                    isFirstDayOfMonth(dateToRender))
                ) {
                  rangeType = "start";
                }
                if (
                  (compareAsc(dateToRender, selections.end) === 0 &&
                    dateIndex !== 0) ||
                  (dateIndex === 6 &&
                    compareAsc(dateToRender, selections.start) === 1 &&
                    compareAsc(dateToRender, selections.end) === -1)
                ) {
                  rangeType = "end";
                }
                if (
                  compareAsc(dateToRender, selections.start) === 1 &&
                  compareAsc(dateToRender, selections.end) === -1 &&
                  dateIndex !== 0 &&
                  dateIndex !== 6
                ) {
                  rangeType = "middle";
                }
              }
              return (
                <DateComp
                  rangeType={rangeType}
                  isCurrent={isCurrent}
                  id={dateToRender}
                  key={dateIndex}
                  date={dateToRender.getDate()}
                  isActive={dateToRender.getMonth() === month}
                  onClick={clickDateHandler}
                />
              );
            })}
          </Week>
        );
      })}

      <StyledButton variant="contained">Save Date</StyledButton>
    </Wrapper>
  );
};

export default Calender;
