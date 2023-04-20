import React from "react";
import { Modal, Button, Form, Input, DatePicker } from "rsuite";

const CreateProject = ({ setOpen, setClose, Operation }) => {
  const Textarea = React.forwardRef((props, ref) => (
    <Input {...props} as="textarea" ref={ref} />
  ));

  return (
    <Modal open={setOpen} onClose={setClose}>
      <Modal.Header>
        <Modal.Title className="text-center uppercase">
          {Operation} Project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="w-full">
          <Form fluid>
            <Form.Group controlId="title">
              <Form.ControlLabel>Title</Form.ControlLabel>
              <Form.Control name="title" />
            </Form.Group>
            <Form.Group controlId="cost">
              <Form.ControlLabel>Cost (Eth)</Form.ControlLabel>
              <Form.Control min={0.01} name="cost" type="number" />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.ControlLabel>Date</Form.ControlLabel>
              <DatePicker className="w-full" format="yyyy-MM-dd HH:mm:ss" />
            </Form.Group>
            <Form.Group controlId="url">
              <Form.ControlLabel>Image Url</Form.ControlLabel>
              <Form.Control name="url" type="text" />
            </Form.Group>
            <Form.Group controlId="textarea">
              <Form.ControlLabel>Textarea</Form.ControlLabel>
              <Form.Control rows={5} name="textarea" accepter={Textarea} />
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={setClose} color="green" appearance="primary">
          {Operation} Project
        </Button>
        <Button onClick={setClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateProject;
