import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
// import imgUserDefault from "../../assets/user-default.png";
import { getUser, updateDataUser } from "../../utils/https/auth";
import { userAction } from "../../redux/slices/auth";
// import { counterAction } from "../../redux/slices/counter";
// import { useNavigate } from "react-router-dom";
// import ChangePwd from "../../components/forPages/ChangePwd";
// import { Modal, Button } from 'react-bootstrap';
import LogoutModal from "../../components/forPages/Logout";

function Profile() {
  const controller = useMemo(() => new AbortController());
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const state = useSelector((state) => state.user);
  // const token = useSelector((state) => state.user.token);
  // const id = useSelector((state) => state.user.id)

  const [dataUser, setDataUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState();
  const [profPict, setProfPict] = useState("");
console.log(dataUser)
  const fetchDataUser = async () => {
    try {
      const result = await getUser(controller);
      setDataUser(result.data.data);
      setIsLoading(false);
      // console.log(result.data.email)
      console.log(result)
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(state)
  // console.log(token)
  const handleForm = (event) => {
    if (event.target.name === "profile_image") {
      console.log(event.target.files);
      setDataUser((dataUser) => {
        return { ...dataUser, [event.target.name]: event.target.files[0] };
      });
      setProfPict(event.target.files[0]);
      console.log(setProfPict(event.target.files[0]))
    } else {
      setDataUser((dataUser) => {
        return { ...dataUser, [event.target.name]: event.target.value };
      });
      setForm((form) => {
        return { ...form, [event.target.name]: event.target.value };
      });
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await updateDataUser(profPict, form, controller);
      console.log(result)
      if (result.status === 200) {
        if (form.address) {
          dispatch(userAction.updateAddress(form.address));
        }
        if (form.phone_number) {
          dispatch(userAction.updatePhone(form.phone_number));
        }
        if (profPict !== "")
        dispatch(userAction.updateImage(result.data.data[0].profile_image));
        console.log(result)
      }
      setIsLoading(false);
      // console.log(userAction.updateImage(result.data.data[0].image));
    } catch (error) {
      console.log(error);
    }
  };
  

  // const handleLogout = async () => {
  //   setIsLoading(true);
  //   try {
  //     const result = await authLogout(controller);
  //     if (result.status === 200) {
  //       console.log(result);
  //       dispatch(userAction.authLogout());
  //       dispatch(counterAction.resetCounter());
  //       setIsLoading(false);
  //       setIsModalOpen(true)
  //       navigate("/", { replace: true });
  //       localStorage.clear();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleModalLogout = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    document.title = "Coffee Shop - Profile";
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    fetchDataUser(state.data.id);
  }, []);

  // console.log(dataUser.birth_date);
  // new Date(dataUser.birth_date)
  //                             .toISOString()
  //                             .slice(0, 10) || ""

  // console.log(new Date(dataUser.birth_date).toISOString());
  // console.log(fetchDataUser(state.data.id))
  console.log(dataUser)
  return (
    <>
      <Header />
      <main className="hero-profile w-full h-auto flex justify-center mt-14 md:mt-28">
        <div className="w-full px-[5%] md:px-0 md:w-4/5 max-width flex flex-col">
          <h1 className="font-medium text-4xl text-white py-10">
            User Profile
          </h1>
          {isLoading ? (
            <Loader />
          ) : (
            <form action="">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-80 h-[380px] flex flex-col justify-between items-center rounded-2xl border overflow-hidden bg-white">
                  <span className="w-32 h-32 mt-8 relative">
                    <input
                      type="file"
                      id="file-img"
                      name="profile_image"
                      onChange={handleForm}
                      className="hidden"
                    />
                    <label
                      htmlFor="file-img"
                      className="btn w-8 h-8 flex justify-center items-center rounded-full bg-secondary cursor-pointer absolute bottom-0 right-2"
                    >
                      <i className="bi bi-pencil text-white"></i>
                    </label>
                    <img
                      src={
                        profPict === ""
                          ? dataUser.profile_image
                          : URL.createObjectURL(profPict)
                      }
                      alt="image"
                      className="w-full h-full text-center rounded-full border-2 overflow-hidden"
                    />
                  </span>
                  <h2 className="font-bold text-xl">{dataUser.display_name}</h2>
                  <h3 className="text-sm text-greydark">{dataUser.email}</h3>
                  <p className="text-center">Has been ordered 15 products</p>
                  <hr className="w-full h-4 bg-secondary" />
                </div>

                <div className="w-full flex flex-col justify-between rounded-2xl border overflow-hidden bg-white">
                  <div className="flex justify-between items-center pl-8 pr-5 mt-4">
                    <h2 className="font-bold text-2xl text-greydark">
                      Contacts
                    </h2>
                    <button className="btn w-12 h-12 flex justify-center items-center rounded-full bg-secondary cursor-pointer">
                      <i className="bi bi-pencil text-xl text-white"></i>
                    </button>
                  </div>
                  <div className="flex flex-col md:grid grid-cols-2 gap-9 ml-8 mr-14">
                    <div className="input flex flex-col">
                      <label
                        htmlFor="email"
                        className="font-medium text-xl text-grey"
                      >
                        Email Adress :
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={dataUser.email}
                        onChange={handleForm}
                        placeholder="*set your email..."
                        className="h-14"
                      />
                    </div>
                    <div className="input flex flex-col">
                      <label
                        htmlFor="phone_number"
                        className="font-medium text-xl text-grey"
                      >
                        Mobile Number :
                      </label>
                      <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={dataUser.phone_number}
                        onChange={handleForm}
                        placeholder="*set your phone number..."
                        className="h-14"
                      />
                    </div>
                    <div className="input flex flex-col mb-5 md:mb-0">
                      <label
                        htmlFor="address"
                        className="font-medium text-xl text-grey"
                      >
                        Delivery Address :
                      </label>
                      <textarea
                        id="address"
                        rows="2"
                        name="address"
                        value={dataUser.address || ""}
                        onChange={handleForm}
                        placeholder="*set your address..."
                      >
                        {dataUser.address}
                      </textarea>
                    </div>
                  </div>
                  <hr className="w-full h-4 bg-secondary" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-8 my-10">
                <div className="w-full min-h-[420px] flex flex-col justify-between rounded-2xl border overflow-hidden bg-white">
                  <div className="flex justify-between items-center pl-8 pr-5 mt-4">
                    <h2 className="font-bold text-2xl text-greydark">
                      Details
                    </h2>
                    <button className="btn w-12 h-12 flex justify-center items-center rounded-full bg-secondary cursor-pointer">
                      <i className="bi bi-pencil text-xl text-white"></i>
                    </button>
                  </div>
                  <div className="flex flex-col md:flex-row ml-8 mr-14 gap-9 w-fulll">
                    <div className="flex flex-1 gap-9 flex-col">
                      <div className="input flex flex-col">
                        <label
                          htmlFor="displayName"
                          className="font-medium text-xl text-grey"
                        >
                          Display Name :
                        </label>
                        <input
                          type="text"
                          id="displayName"
                          name="display_name"
                          value={dataUser.display_name}
                          onChange={handleForm}
                          placeholder="*set your display name..."
                          className="h-14"
                        />
                      </div>
                      <div className="input flex flex-col">
                        <label
                          htmlFor="firstName"
                          className="font-medium text-xl text-grey"
                        >
                          First Name :
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="first_name"
                          value={dataUser.first_name || ""}
                          onChange={handleForm}
                          placeholder="*set your first name..."
                          className="h-14"
                        />
                      </div>
                      <div className="input flex flex-col">
                        <label
                          htmlFor="lastName"
                          className="font-medium text-xl text-grey"
                        >
                          Last Name :
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="last_name"
                          value={dataUser.last_name || ""}
                          onChange={handleForm}
                          placeholder="*set your last name..."
                          className="h-14"
                        />
                      </div>
                    </div>
                    <div className="flex flex-1 gap-9 flex-col">
                      <div className="input flex flex-col">
                        <label
                          htmlFor="birthDate"
                          className="font-medium text-xl text-grey"
                        >
                          DD/MM/YY
                        </label>
                        <input
                          type="date"
                          id="birthDate"
                          name="birth_date"
                          // value="1992-06-08"
                          value={
                            new Date(dataUser.birth_date)
                              .toISOString()
                              .slice(0, 10) || ""
                            // new Date(dataUser.birth_date).toLocaleDateString(
                            //   "id-ID"
                            // )
                          }
                          onChange={handleForm}
                          className="h-14"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="input-data-radio flex gap-2">
                          <input
                            type="radio"
                            name="genders"
                            id="male"
                            value="male"
                            onChange={handleForm}
                            checked={dataUser.genders === "male"}
                            className="hidden"
                          />
                          <span></span>
                          <label
                            htmlFor="male"
                            className="font-medium text-xl text-grey cursor-pointer"
                          >
                            Male
                          </label>
                        </div>
                        <div className="input-data-radio flex gap-2 mb-5 md:mb-0">
                          <input
                            type="radio"
                            name="genders"
                            id="female"
                            value="female"
                            onChange={handleForm}
                            checked={dataUser.genders === "female"}
                            className="hidden"
                          />
                          <span></span>
                          <label
                            htmlFor="female"
                            className="font-medium text-xl text-grey cursor-pointer"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="w-full h-4 bg-secondary" />
                </div>

                <div className="flex w-full min-w-[300px] md:max-w-sm flex-col gap-3 justify-between pb-6">
                  <h3 className="font-bold text-xl text-center text-white">
                    Do you want to save the change?
                  </h3>
                  <div className="flex flex-col gap-5 mb-10 md:mb-0">
                    <button
                      type="submit"
                      onClick={handleSave}
                      className="btn h-14 rounded-2xl text-white bg-secondary"
                    >
                      Save Change
                    </button>
                    <button className="btn h-14 rounded-2xl text-secondary bg-primary">
                      Cancel
                    </button>
                  </div>
                  <div className="flex flex-col gap-5">
                  <button
                      type="button"
                      onClick={handleModalLogout}
                      className="btn h-14 rounded-2xl text-secondary bg-white flex justify-between px-10"
                    >
                      Log out
                      <i className="bi bi-caret-right-fill text-secondary"></i>
                    </button>
                    <LogoutModal
                    isOpen = {isModalOpen}
                    onClose = {handleCloseModal}
                    />
                    {/* <button
                      type="button"
                      onClick={setIsModalOpen(true)}
                      className="btn h-14 rounded-2xl text-secondary bg-white flex justify-between px-10"
                    >
                      Log out
                      <i className="bi bi-caret-right-fill text-secondary"></i>
                    </button>
                    <Modal
                    show={isModalOpen}
                    onHide={handleCloseModal}
                    dialogClassName="my-modal"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Logout</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Are you sure want to logout?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={handleLogout}>Logout</Button>
                        <Button onClick={handleCloseModal}>Cancel</Button>
                      </Modal.Footer>
                    </Modal> */}
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
