import React, { useMemo, useState } from "react";
import Loader from "../Loader";
import { editPassword } from "../../utils/https/auth";

function ChangePwd({ isOpen, onClose }) {
  const controller = useMemo(() => new AbortController(), []);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleForm = (event) => {
    setForm((form) => {
      return { ...form, [event.target.name]: event.target.value };
    });
  };

  const handleSave = async () => {
    // event.preventDefault();
    setIsLoading(true);
    try {
      const result = await editPassword(form, controller);
      console.log(result);
      setIsLoading(false);
      setForm({ oldPassword: "", newPassword: "" });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
  };

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
                  Change Password
                </h1>
                <label htmlFor="old-pwd">Old Password :</label>
                <input
                  type="password"
                  id="old-pwd"
                  name="oldPassword"
                  value={form.oldPassword}
                  onChange={handleForm}
                  placeholder="*input your old password..."
                  className="px-3 py-4 mb-5 border-b-2 border-secondary"
                />
                <label htmlFor="new-pwd">New Password :</label>
                <input
                  type="password"
                  id="new-pwd"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleForm}
                  placeholder="*input your new password..."
                  className="px-3 py-4 mb-8 border-b-2 border-secondary focus:border-none"
                />
                <button
                  type="submit"
                  onClick={handleSave}
                  className="btn py-4 bg-secondary rounded-lg text-white hover:text-primary"
                >
                  Save Change
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ChangePwd;
