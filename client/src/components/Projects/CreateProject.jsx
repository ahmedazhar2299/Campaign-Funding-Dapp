import React, { useRef, useState } from "react";
import { Modal, Button, Form, Input, DatePicker } from "rsuite";
import {
  dateValidate,
  strValidate,
  urlValidate,
} from "../../helpers/formValidator";
import { useDispatch } from "react-redux";

import {
  addNewCampaign,
  getAllCampaigns,
  updateCampaign,
} from "../../store/nobietySlice";
import { useNavigate } from "react-router-dom";

const CreateProject = ({ setOpen, setClose, Operation, oldTitle }) => {
  const Textarea = React.forwardRef((props, ref) => (
    <Input {...props} as="textarea" ref={ref} />
  ));

  const title = useRef();
  const cost = useRef();
  const [date, setDate] = useState(null);
  const imageUrl = useRef();
  const description = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createNewCampaign = (event) => {
    const Date = date;
    const Title = title.current.value;
    const ImageUrl = imageUrl.current.value;
    const Description = description.current.value;
    const Amount = cost.current.value;

    if (
      strValidate(Title) &&
      urlValidate(ImageUrl) &&
      strValidate(Description) &&
      dateValidate(Date)
    ) {
      if (Operation === "Add") {
        dispatch(
          addNewCampaign({
            title: Title,
            amount: Amount,
            date: Date,
            url: ImageUrl,
            description: Description,
          })
        );
      } else {
        dispatch(
          updateCampaign({
            oldTitle: oldTitle,
            title: Title,
            amount: Amount,
            date: Date,
            url: ImageUrl,
            description: Description,
          })
        );
        navigate("/");
      }
      dispatch(getAllCampaigns());
      setClose();
    } else {
      !strValidate(Title) && title.current.setCustomValidity("Invalid Title!");
      !urlValidate(ImageUrl) &&
        imageUrl.current.setCustomValidity("Invalid Url!");
      !strValidate(Description) &&
        description.current.setCustomValidity("Invalid Description!");
      !dateValidate(Date) && alert("Invalid Date");
    }
  };

  return (
    <Modal open={setOpen} onClose={setClose}>
      <Modal.Header>
        <Modal.Title className="text-center uppercase">
          {Operation} Project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="w-full">
          <Form onSubmit={(e) => createNewCampaign(e)} fluid>
            <Form.Group controlId="title">
              <Form.ControlLabel>Title</Form.ControlLabel>
              <Form.Control minLength={5} name="title" inputRef={title} />
            </Form.Group>
            <Form.Group controlId="cost">
              <Form.ControlLabel>Cost (Eth)</Form.ControlLabel>
              <Form.Control
                onChange={(value, event) => {
                  if (event.target.value < 0.01) {
                    event.target.value = 0.01;
                  } else if (event.target.value > 99999) {
                    event.target.value = 99999;
                  }
                }}
                name="cost"
                type="number"
                inputRef={cost}
              />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.ControlLabel>Date</Form.ControlLabel>
              <DatePicker
                className="w-full"
                format="yyyy-MM-dd HH:mm:ss"
                onChange={(e) => setDate(e)}
              />
            </Form.Group>
            <Form.Group controlId="url">
              <Form.ControlLabel>Image Url</Form.ControlLabel>
              <Form.Control inputRef={imageUrl} name="url" type="text" />
            </Form.Group>
            <Form.Group controlId="textarea">
              <Form.ControlLabel>Textarea</Form.ControlLabel>
              <Form.Control
                inputRef={description}
                rows={5}
                name="textarea"
                accepter={Textarea}
              />
            </Form.Group>
            <div className="flex flex-grow justify-end gap-4">
              <Button
                type="submit"
                onClick={() => {
                  createNewCampaign();
                }}
                color="green"
                appearance="primary"
              >
                {Operation} Project
              </Button>
              <Button onClick={setClose} appearance="subtle">
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateProject;
