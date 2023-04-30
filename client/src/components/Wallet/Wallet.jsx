import React, { useRef } from "react";
import { Modal, Button, Form } from "rsuite";
const Wallet = ({ setOpen, setClose }) => {
  const depositValue = useRef();
  const withdrawValue = useRef();

  return (
    <Modal size="xs" open={setOpen} onClose={setClose}>
      <Modal.Header>
        <Modal.Title className="text-center uppercase">Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold"> Amount</p>
          <p className="text-red-500 text-lg mb-5 capitalize font-bold">
            5.532 ETH
          </p>
          <div className="w-full gap-4 flex">
            <div className="w-full">
              <Form fluid>
                <Form.Group controlId="title">
                  <Form.ControlLabel>Deposit (Eth)</Form.ControlLabel>
                  <Form.Control
                    inputRef={depositValue}
                    min={1}
                    name="title"
                    type="number"
                  />
                </Form.Group>
                <div className="text-center">
                  <Button color="green" appearance="primary">
                    Deposit
                  </Button>
                </div>
              </Form>
            </div>
            <div className="w-full flex justify-center items-end">
              <Form fluid>
                <Form.Group controlId="title">
                  <Form.ControlLabel>Withdraw (Eth)</Form.ControlLabel>
                  <Form.Control
                    inputRef={withdrawValue}
                    min={1}
                    name="title"
                    type="number"
                  />
                </Form.Group>
                <div className="text-center">
                  <Button color="blue" appearance="primary">
                    Withdraw
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Wallet;
