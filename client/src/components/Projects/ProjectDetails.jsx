import React, { useEffect, useState } from "react";
import Identicons from "react-identicons";
import { FaEthereum } from "react-icons/fa";
import ProjectBackers from "./ProjectBackers";
import CreateProject from "./CreateProject";
import DeleteProject from "./DeleteProject";
import BackProject from "./BackProject";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCampaignDetail } from "../../store/nobietySlice";

const ProjectDetails = () => {
  const [openProject, setOpenProject] = useState({
    update: false,
    delete: false,
    back: false,
  });
  const location = useLocation();
  const dispatch = useDispatch();

  const title = location.pathname.split("/")[2].replaceAll("%20", " ");
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getCampaignDetail(title));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, title]);

  const { campaignDetail } = useSelector((state) => state.nobietyReducer);

  if (!campaignDetail) {
    return <div>Loading...</div>;
  }

  const progressBarWidth =
    (parseInt(campaignDetail.raisedAmount) / parseInt(campaignDetail.amount)) *
    100;

  const auth = JSON.parse(localStorage.getItem("auth"));

  return (
    <div className="mt-24 lg:mx-40 md:mx-16 mx-10 ">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex justify-center items-center">
          <div className=" overflow-hidden rounded-lg md:w-full w-56 h-56 ">
            <img
              className=" w-full h-full object-cover"
              src={campaignDetail.url}
              alt=""
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="font-bold text-lg">{campaignDetail.title}</p>

          <p className="text-xs text-slate-400">{campaignDetail.status}</p>
          <div className="flex justify-between w-full">
            <div className="flex text-sm gap-2 items-center">
              <Identicons size={15} string="0x34342" />
              <p>
                {campaignDetail.owner.slice(0, 5) +
                  " ... " +
                  campaignDetail.owner.slice(-6)}
              </p>
            </div>
            <p
              className={`text-sm font-bold ${
                campaignDetail.status === "Expired"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {campaignDetail.status}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">
              {campaignDetail.description}
            </p>
          </div>
          <div className="w-full mt-5">
            <div className="w-full bg-slate-300">
              <div
                style={{
                  width: progressBarWidth + "%",
                }}
                className="border-2 border-green-600"
              ></div>
            </div>
            <div className="flex text-sm font-bold justify-between">
              <p>{campaignDetail.raisedAmount} ETH Raised</p>
              <p className="flex items-center">
                <FaEthereum /> {campaignDetail.amount} ETH
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 w-full whitespace-nowrap flex gap-2 justify-start">
        {auth.addresses
          .toLowerCase()
          .localeCompare(campaignDetail.owner.toLowerCase()) === 0 ? (
          <>
            <button
              onClick={() =>
                setOpenProject((e) => {
                  return { ...e, update: true };
                })
              }
              className="px-4 py-2 bg-stone-500 hover:bg-stone-700 text-xs text-white uppercase rounded-full"
            >
              Edit
            </button>
            <button
              onClick={() =>
                setOpenProject((e) => {
                  return { ...e, delete: true };
                })
              }
              className="px-4 py-2 bg-red-500 hover:bg-red-700 text-xs text-white uppercase rounded-full"
            >
              Delete
            </button>
          </>
        ) : (
          <button
            onClick={() =>
              setOpenProject((e) => {
                return { ...e, back: true };
              })
            }
            disabled={
              campaignDetail.status === "Raised" ||
              campaignDetail.status === "Expired"
                ? true
                : false
            }
            className="px-4 py-2 bg-green-500 hover:bg-green-700 text-xs text-white uppercase rounded-full"
          >
            Back Project
          </button>
        )}

        <CreateProject
          Operation={"Update"}
          oldTitle={campaignDetail.title}
          setOpen={openProject.update}
          setClose={() =>
            setOpenProject((e) => {
              return { ...e, update: false };
            })
          }
        />
        <DeleteProject
          setOpen={openProject.delete}
          title={campaignDetail.title}
          setClose={() =>
            setOpenProject((e) => {
              return { ...e, delete: false };
            })
          }
        />
        <BackProject
          title={campaignDetail.title}
          setOpen={openProject.back}
          setClose={() =>
            setOpenProject((e) => {
              return { ...e, back: false };
            })
          }
        />
      </div>
      <div>
        <ProjectBackers />
      </div>
    </div>
  );
};

export default ProjectDetails;
