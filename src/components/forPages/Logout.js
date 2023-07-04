import React, { useState, useMemo } from 'react';
import { useDispatch } from "react-redux";
// import { Modal, Button } from 'react-bootstrap';
import { authLogout } from '../../utils/https/auth';
import { userAction } from "../../redux/slices/auth";
import { counterAction } from "../../redux/slices/counter";
import { useNavigate } from "react-router-dom";
import Loader from '../Loader';

function LogoutModal({isOpen, onClose}) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     showModal: false,
  //   };
  // }

  const controller = useMemo(() => new AbortController());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  const handleLogout = async () => {
    // setIsLoading(true);
    try {
      const result = await authLogout(controller);
      if (result.status === 200) {
        console.log(result);
        dispatch(userAction.authLogout());
        dispatch(counterAction.resetCounter());
        setIsLoading(false);
        // setShowModal(true);
        onClose();
        navigate("/", { replace: true });
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
  };
  // handleLogout = () => {
  //   this.props.logout();
  //   this.setState({ showModal: false });
  // };


  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed z-50 w-screen h-screen bg-slate-800/80 flex justify-center items-center top-0 left-0"
        >
          <div
            onClick={handleClick}
            className="w-4/5 md:w-1/2 p-5 flex flex-col rounded-xl bg-white"
          >
            {" "}
            {isLoading ? (
              <Loader />
            ) : (
              <>
              
              <h1 className="text-2xl font-bold text-center mb-5">
                  Are you sure want to logout?
                </h1>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="items-center h-14 rounded-2xl text-secondary bg-white flex justify-between px-10"
                >
                  Yes
                  <i className="bi bi-caret-right-fill text-secondary"></i>
                </button>
                
                <button
                  type="button"
                  onClick={onClose}
                  className="items-center h-14 rounded-2xl text-secondary bg-white flex justify-between px-10"
                >
                  No
                  <i className="bi bi-caret-right-fill text-secondary"></i>
                </button>

                {/* <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to logout?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleLogout}>Logout</Button>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </Modal.Footer>
      </Modal> */}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}


export default LogoutModal;