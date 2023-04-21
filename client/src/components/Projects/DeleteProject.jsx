import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "rsuite";
import { deleteCampaign } from "../../store/nobietySlice";
import { useNavigate } from "react-router-dom";
const DeleteProject = ({ setOpen, setClose, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteCamp = async () => {
    await dispatch(deleteCampaign(title));
    setClose();
    navigate("/");
  };
  return (
    <Modal open={setOpen} onClose={setClose}>
      <Modal.Header>
        <Modal.Title className="text-center uppercase">
          Delete Project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col items-center gap-5">
          <p className="text-lg font-semibold">Are you Sure?</p>
          <p className="text-red-500 capitalize font-bold">
            This is irreversible!
          </p>
          <Button
            block
            onClick={() => {
              deleteCamp();
            }}
            color="red"
            appearance="primary"
          >
            Delete Project
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteProject;
