import React from "react";
import { Modal, Button, Form } from "rsuite";
const BackProject = ({ setOpen, setClose }) => {
  return (
    <Modal open={setOpen} onClose={setClose}>
      <Modal.Header>
        <Modal.Title className="text-center uppercase">
          Back Project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-col gap-5">
        <Form fluid>
          <Form.Group controlId="title">
            <Form.ControlLabel>Amount (Eth)</Form.ControlLabel>
            <Form.Control min={0.01} name="title" type="number" />
          </Form.Group>
        </Form>
        <Button block onClick={setClose} color="green" appearance="primary">
          Back Project
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default BackProject;
