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
  const [focusedDate, setFocusedDate] = React.useState(currentDate.getDate());
  const [month, setMonth] = React.useState(currentDate.getMonth());
  const [year, setYear] = React.useState(currentDate.getFullYear());
  const [showYears, setShowYears] = React.useState(false);
  const [selections, setSelections] = React.useState({
    startDate: currentDate,
    endDate: null,
  });
  const first = getFirstDayOfMonth(focusedDate, month, year);

  //   handlers
  const prevMonthHandler = (e) => {
    if (month === 0) {
      return setMonth(11);
    }
    setMonth((prevState) => prevState - 1);
  };

  const nextMonthHandler = (e) => {
    if (month === 11) {
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
    setMonth(selectedDate.getMonth());
  };
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
              return (
                <DateComp
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
      {/* <Week>
        <DateComp date={27} isActive={false} />
        <DateComp date={28} isActive={false} />
        <DateComp date={1} />
        <DateComp date={2} />
        <DateComp date={3} />
        <DateComp date={4} />
        <DateComp date={5} />
      </Week>
      <Week>
        <DateComp date={6} />
        <DateComp date={7} />
        <DateComp date={8} />
        <DateComp date={9} />
        <DateComp date={10} />
        <DateComp date={11} />
        <DateComp date={12} />
      </Week>
      <Week>
        <DateComp date={13} />
        <DateComp date={14} />
        <DateComp date={15} />
        <DateComp date={16} />
        <DateComp date={17} />
        <DateComp date={18} />
        <DateComp date={19} />
      </Week>
      <Week>
        <DateComp
          date={20}
          rangeType="start"
          isCurrent={
            (selections.startDate && 20 === selections.startDate.getDate()) ||
            (selections.endDate && 20 === selections.endDate.getDate())
          }
        />
        <DateComp date={21} rangeType="middle" />
        <DateComp date={22} rangeType="middle" />
        <DateComp date={23} rangeType="middle" />
        <DateComp date={24} rangeType="middle" />
        <DateComp date={25} rangeType="middle" />
        <DateComp date={26} rangeType="end" />
      </Week>
      <Week>
        <DateComp date={27} rangeType="start" />
        <DateComp date={28} rangeType="middle" />
        <DateComp
          date={29}
          rangeType="end"
          isCurrent={
            (selections.startDate && 29 === selections.startDate.getDate()) ||
            (selections.endDate && 29 === selections.endDate.getDate())
          }
        />
        <DateComp date={30} />
        <DateComp date={31} />
        <DateComp isActive={false} date={1} />
        <DateComp isActive={false} date={2} />
      </Week> */}
      <StyledButton variant="contained">Save Date</StyledButton>
    </Wrapper>
  );
};

export default Calender;
