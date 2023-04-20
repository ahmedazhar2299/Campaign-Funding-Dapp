import React from "react";
import { Modal, Button } from "rsuite";
const DeleteProject = ({ setOpen, setClose }) => {
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
          <Button block onClick={setClose} color="red" appearance="primary">
            Delete Project
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteProject;
