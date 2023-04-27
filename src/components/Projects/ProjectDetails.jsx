import React, { useState } from "react";
import Identicons from "react-identicons";
import { FaEthereum } from "react-icons/fa";
import ProjectBackers from "./ProjectBackers";
import CreateProject from "./CreateProject";
import DeleteProject from "./DeleteProject";
import BackProject from "./BackProject";

const ProjectDetails = () => {
  const [openProject, setOpenProject] = useState({
    update: false,
    delete: false,
    back: false,
  });

  return (
    <div className="mt-24 lg:mx-40 md:mx-16 mx-10 ">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex justify-center items-center">
          <div className=" overflow-hidden rounded-lg md:w-full w-56 h-56 ">
            <img
              className="w-full h-full object-cover"
              src="https://storage.googleapis.com/afs-prod/media/197afa901c1e4170913edd14ec1801f0/400.jpeg"
              alt=""
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="font-bold text-lg">Flood</p>
          <p className="text-xs text-slate-400">Expired</p>
          <div className="flex justify-between w-full">
            <div className="flex text-sm gap-2 items-center">
              <Identicons size={15} string="0x34342" />
              <p>0x24d...69a5</p>
            </div>
            <p className="text-sm font-bold text-red-500">Expired</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea
              dicta, exercitationem est eius commodi assumenda tenetur. Veniam,
              accusantium adipisci impedit non id earum porro ab dolorum quod
              explicabo corporis molestias. Voluptatem at sint eaque eos qui eum
              veritatis temporibus illo cum ex asperiores eius ab, sed, nostrum
              et consequuntur velit similique ad quae officiis voluptates vitae
              rem sapiente deserunt! Accusamus! Similique, deserunt. Est, iste
              maxime quasi nostrum voluptatum, nobis quas nesciunt accusantium
              temporibus asperiores, eaque corporis repellendus nihil obcaecati
              esse aperiam. Quam ipsam quaerat eius sint quisquam deserunt quas
              reprehenderit. Quidem, nisi. Eos magnam aliquam sunt animi quia
              unde recusandae aliquid quis dolore velit minima eveniet ut,
              quidem perferendis praesentium architecto delectus, aut eum,
              corrupti aperiam. Quas autem quia doloribus. Iure quisquam
              repellendus perferendis quis eaque ab dolor quo harum! Ut amet
              autem, illo eligendi id temporibus aliquid ullam ipsum nam
              similique hic pariatur tempore, architecto blanditiis in, debitis
              minima. Facere perferendis corporis labore fuga ut ducimus beatae.
              Distinctio deserunt id repellat fugit nobis nulla, deleniti
              recusandae voluptate hic necessitatibus officia doloribus tenetur
              ducimus, suscipit in placeat laudantium excepturi voluptatem.
              Iusto consectetur aliquam cumque modi doloremque quibusdam,
              delectus velit culpa reiciendis voluptate fugit hic, nesciunt
              voluptates facere rerum, nisi quis ipsa eos cum aspernatur harum
              laudantium repellat rem expedita? Possimus. Autem laudantium quos
              accusantium consequatur laboriosam ratione omnis fugiat reiciendis
              dolores, doloremque ipsa libero minima earum eos quidem unde nulla
              necessitatibus vitae, veritatis recusandae atque sit fugit.
              Quaerat, reiciendis corporis! Praesentium aliquam corrupti qui,
              laudantium facilis neque vitae cupiditate fugit, nam suscipit sint
              corporis quisquam ullam possimus molestias quo et tenetur deserunt
              dolorum eveniet! Maiores earum sit facere similique odio!
              Explicabo asperiores quaerat voluptatum totam sint eaque,
              laudantium ullam nulla aspernatur soluta earum nemo est mollitia
              possimus nostrum accusantium facilis quos consequatur minima quod
              architecto, officia voluptatibus commodi dignissimos! Autem? Nemo
              ab maiores praesentium. Voluptate veniam molestiae exercitationem!
              Explicabo incidunt, ratione porro doloremque delectus eaque facere
              corporis nisi mollitia quos iusto molestias suscipit quibusdam
              repudiandae sequi dicta aliquid, earum eos. Omnis deleniti tempore
              quas a iusto quae illo, rerum vero corrupti rem, deserunt natus
              porro facilis, alias praesentium eum aspernatur! Quae molestias
              qui culpa modi asperiores voluptates minima architecto doloremque!
            </p>
          </div>
          <div className="w-full mt-5">
            <div className="w-full bg-slate-300">
              <div className="w-6/12 border-2 border-green-500 "></div>
            </div>
            <div className="flex text-sm font-bold justify-between">
              <p>0.01 ETH Raised</p>
              <p className="flex items-center">
                <FaEthereum /> 2 ETH
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 w-full whitespace-nowrap flex gap-2 justify-center">
        <button
          onClick={() =>
            setOpenProject((e) => {
              return { ...e, back: true };
            })
          }
          className="px-4 py-2 bg-primary hover:bg-secondary text-xs text-white uppercase rounded-full"
        >
          Back Campaign
        </button>
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
        <CreateProject
          Operation={"Update"}
          setOpen={openProject.update}
          setClose={() =>
            setOpenProject((e) => {
              return { ...e, update: false };
            })
          }
        />
        <DeleteProject
          setOpen={openProject.delete}
          setClose={() =>
            setOpenProject((e) => {
              return { ...e, delete: false };
            })
          }
        />
        <BackProject
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
