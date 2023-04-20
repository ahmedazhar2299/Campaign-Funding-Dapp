import { useSelector } from "react-redux";

function Adoptors() {
  const adoptersList = useSelector((state) => {
    return state.adoptReducer.adopters;
  });

  return (
    <div>
      <div className=" text-red-500 font-bold">Adopters List:</div>
      <div>
        {adoptersList.map((list, index) =>
          list !== "0x0000000000000000000000000000000000000000" ? (
            <div key={index}>
              {" "}
              Index = {index} - {list}{" "}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default Adoptors;
