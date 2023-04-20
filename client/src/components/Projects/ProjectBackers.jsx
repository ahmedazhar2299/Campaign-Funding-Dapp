import React from "react";
import { FaEthereum } from "react-icons/fa";
import Identicons from "react-identicons";

const ProjectBackers = () => {
  const backersList = [
    1, 2, 3, 5, 34, 1, 2, 3, 5, 1, 2, 3, 5, 1, 2, 3, 5, 1, 2, 3, 5,
  ];
  return (
    <div className="w-full mt-10 shadow-lg max-h-96 overflow-auto">
      <table className="w-full mt-10 shadow-lg ">
        <th className=" flex p-4 text-md font-semibold w-full justify-around border border-t-0 border-b-0">
          <td className="w-[200px] md:w-full">Backer</td>
          <td className="w-[200px] md:w-full">Donations</td>
          <td className="w-[200px] md:w-full">Refunded</td>
          <td className="w-[200px] md:w-full">Time</td>
        </th>
        {backersList.map((e, i) => {
          return <BuildersInfo e={e} key={i} />;
        })}
      </table>
    </div>
  );
};

const BuildersInfo = (e) => {
  return (
    <tr className="flex p-3 border w-full text-sm text-center justify-around">
      <td className="flex w-[200px] md:w-full justify-center items-center gap-2">
        {" "}
        <Identicons size={15} string="0x34342" />
        <p>0x24d...69a5</p>
      </td>
      <td className="flex w-[200px] md:w-full justify-center items-center gap-2">
        <FaEthereum /> 0.01 ETH
      </td>
      <td className="w-[200px] md:w-full">No</td>
      <td className="w-[200px] md:w-full">11 days ago</td>
    </tr>
  );
};

export default ProjectBackers;
