import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days.map((day) => {
    if (props.day === day.name) {
      return <DayListItem key={day.id} name={day.name} spots={day.spots} setDay={props.setDay} selected={true} />
    } else {
      return <DayListItem key={day.id} name={day.name} spots={day.spots} setDay={props.setDay} selected={false} />
    }

  });

  return (
    <ul> {days} </ul>
  );
}