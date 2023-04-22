import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form } from "rsuite";
import { backACampaign, getCampaignDetail } from "../../store/nobietySlice";
import { useNavigate } from "react-router-dom";
const BackProject = ({ setOpen, setClose, title }) => {
  const donation = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const donateCampgain = () => {
    if (
      donation.current.value !== "" &&
      parseFloat(donation.current.value) >= 1
    ) {
      dispatch(
        backACampaign({
          title: title,
          donation: donation.current.value,
        })
      );
      dispatch(getCampaignDetail(title));
      navigate("/");
    }
  };
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
            <Form.Control
              inputRef={donation}
              min={1}
              name="title"
              type="number"
            />
          </Form.Group>
        </Form>
        <Button
          block
          onClick={donateCampgain}
          color="blue"
          appearance="primary"
        >
          Back Project
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default BackProject;
