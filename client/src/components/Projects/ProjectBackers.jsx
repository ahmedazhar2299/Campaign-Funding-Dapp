import React from "react";
import { FaEthereum } from "react-icons/fa";
import Identicons from "react-identicons";
import { useSelector } from "react-redux";

function daysAgo(timeString) {
  const [hours, minutes, seconds] = timeString.split(":");
  const now = new Date();
  const newDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    seconds
  );
  const diff = now.getTime() - newDate.getTime();
  const msInDay = 24 * 60 * 60 * 1000;
  const days = Math.floor(diff / msInDay);

  if (days === 0) {
    return "today";
  } else if (days === 1) {
    return "yesterday";
  } else {
    return `${days} days ago`;
  }
}

const ProjectBackers = () => {
  const { backerList } = useSelector((state) => state.nobietyReducer);
  return (
    <div className="w-full mt-10 shadow-lg max-h-96 overflow-auto">
      <table className="w-full mt-10 shadow-lg ">
        <th className=" flex p-4 text-md font-semibold w-full justify-around border border-t-0 border-b-0">
          <td className="w-[200px] md:w-full">Backer</td>
          <td className="w-[200px] md:w-full">Donations</td>
          <td className="w-[200px] md:w-full">Time</td>
        </th>
        {backerList.map((e, i) => {
          return <BuildersInfo data={e} key={i} />;
        })}
      </table>
    </div>
  );
};

const BuildersInfo = (data) => {
  return (
    <tr className="flex p-3 border w-full text-sm text-center justify-around">
      <td className="flex w-[200px] md:w-full justify-center items-center gap-2">
        {" "}
        <Identicons size={15} string="0x34342" />
        <p>
          {data.data.backer.slice(0, 5) + " ... " + data.data.backer.slice(-6)}
        </p>
      </td>
      <td className="flex w-[200px] md:w-full justify-center items-center gap-2">
        <FaEthereum /> {data.data.donation} ETH
      </td>
      <td className="w-[200px] capitalize md:w-full">
        {daysAgo(data.data.time)}
      </td>
    </tr>
  );
};

export default ProjectBackers;
