import { useState, useEffect } from "react";
import { useRefresh } from "../data/utils";

export const Countdown = ({ deadline }) => {
  const { fastRefresh } = useRefresh();

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    let diff = (deadline - Date.now()) / 1000;
    setDays(Math.floor(diff / 86400));
    diff %= 86400;
    setHours(Math.floor(diff / 3600));
    diff %= 3600;
    setMinutes(Math.ceil(diff / 60));
  }, [deadline, fastRefresh]);

  const addLeadingZeros = (value) => {
    value = String(value);
    while (value.length < 2) value = "0" + value;
    return value;
  };

  return (
    <div id="countdown" className="text-center">
      <span className="col">
        <span className="col-element">
          <p className="number">{addLeadingZeros(days)}</p>
          <p className="text">{days === 1 ? "Day" : "Days"}</p>
        </span>
      </span>
      <span className="col">
        <span className="col-element">
          <p className="number">{addLeadingZeros(hours)}</p>
          <p className="text">{hours === 1 ? "Hour" : "Hours"}</p>
        </span>
      </span>
      <span className="col">
        <span className="col-element">
          <p className="number">{addLeadingZeros(minutes)}</p>
          <p className="text">{minutes === 1 ? "Minute" : "Minutes"}</p>
        </span>
      </span>
      <p className="until">until launch</p>
    </div>
  );
};
