import { useContext, useRef, useState } from "react";
import { HomeContext } from "../../Context/HomeContext";

function Profile(props) {
  const [isEdit, setIsEdit] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const { SERVER_DOMAIN, token } = useContext(HomeContext);
  const [isChangePw, setIsChangePw] = useState(false);
  const [message, setMessage] = useState("");

  const firstName = useRef("");
  const lastName = useRef("");
  const birthDay = useRef("");
  const phoneNumber = useRef("");
  const address = useRef("");
  const currPassword = useRef("");
  const newPassword = useRef("");
  const confirmPassword = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let res = await fetch(`${SERVER_DOMAIN}/user/profile?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstName.current.value,
          lastname: lastName.current.value,
        }),
      });
      let resJson = await res.json();
      if (resJson.status === 200) {
        setIsEdit(true);
        setMessage(resJson.message);
        props.setReload(!props.reload);
      } else {
        console.log(resJson.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTab = (e) => {
    e.preventDefault();
    setMessage("");
    currPassword.current.value = "";
    newPassword.current.value = "";
    confirmPassword.current.value = "";
    setIsChangePw(!isChangePw);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword.current.value === confirmPassword.current.value) {
      setIsLoading(true);
      try {
        let res = await fetch(`${SERVER_DOMAIN}/user/password?token=${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: currPassword.current.value,
            newPassword: newPassword.current.value,
          }),
        });
        let resJson = await res.json();
        if (resJson.status === 200) {
          setIsEdit(true);
          props.setReload(!props.reload);
          setMessage(resJson.message);
        } else {
          setMessage(resJson.message);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setMessage("Confirm password not match");
    }
  };
  return (
    <div className="fixed z-[1000] top-10 bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      <div
        className="fixed inset-0 transition-opacity"
        onClick={() => {
          props.setProfile(false);
        }}
      >
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full box-border">
        <form className={`${isChangePw === true ? "hidden" : ""}`}>
          <div className="flex flex-row justify-center items-center gap-2">
            <h2 className="text-xl font-bold text-center text-blue-500">
              Profile
            </h2>
            <svg
              className={`${isChangePw && "hidden"} w-5 h-5 text-blue-500 cursor-pointer`}
              onClick={() => setIsEdit(false)}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </div>
          <div className="mb-4 flex justify-center m-4">
            <img
              className="w-20 h-20 rounded-full"
              src="https://tecdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
              alt="avatar"
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                First Name
              </label>
              <input
                defaultValue={props.user.firstname}
                ref={firstName}
                disabled={isEdit}
                type="text"
                id="name"
                className="w-full p-2 border border-gray-400 rounded text-blue-500 focus:outline-none focus:border-blue-500 focus:border-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                Last Name
              </label>
              <input
                defaultValue={props.user.lastname}
                ref={lastName}
                disabled={isEdit}
                type="text"
                id="name"
                className="w-full p-2 text-blue-500 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-2">
            <div className="col-span-1">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                BirthDay
              </label>
              <input
                ref={birthDay}
                disabled={isEdit}
                type="date"
                id="name"
                className="w-full p-2  text-blue-500 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                Email
              </label>
              <input
                defaultValue={props.user.email}
                disabled={true}
                type="email"
                id="name"
                className="w-full text-blue-500 p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Phone Number
            </label>
            <input
              ref={phoneNumber}
              disabled={isEdit}
              type="text"
              id="name"
              className="w-full text-blue-500 p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="time">
              Address
            </label>
            <input
              ref={address}
              disabled={isEdit}
              type="text"
              id="time"
              className="w-full text-blue-500 p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
            />
          </div>
          <div
            className={`flex flex-row justify-start gap-1 ${
              props.user.oauth === true ? `hidden` : ""
            }`}
          >
            <button
              className="hover:scale-105 hover:font-bold duration-200"
              onClick={(e) => {
                handleTab(e);
              }}
            >
              Change Password{" "}
            </button>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>
          </div>
          <div className="flex items-center w-full justify-end mt-4">
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400 disabled:opacity-50"
              disabled={isEdit}
              onClick={handleSubmit}
            >
              {(isLoading && "Saving...") || "Save"}
            </button>
          </div>
        </form>
        <form className={`${isChangePw === true ? "" : "hidden"}`}>
          <div className="flex flex-row justify-center items-center gap-2">
            <h2 className="text-xl font-bold text-center text-blue-500">
              Change Password
            </h2>
          </div>
          <div className="mb-4 flex justify-center m-4">
            <img
              className="w-20 h-20 rounded-full"
              src="https://tecdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
              alt="avatar"
            />
          </div>
          <div className="mb-4">
            <div className="col-span-1">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                Your Current Password
              </label>
              <input
                ref={currPassword}
                type="password"
                id="name"
                className="w-full p-2 border border-gray-400 rounded text-blue-500 focus:outline-none focus:border-blue-500 focus:border-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                New Password
              </label>
              <input
                ref={newPassword}
                type="password"
                id="name"
                className="w-full p-2 text-blue-500 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                Confirm New Password
              </label>
              <input
                ref={confirmPassword}
                type="password"
                id="name"
                className="w-full p-2 text-blue-500 border border-gray-400 rounded focus:outline-none focus:border-blue-500 focus:border-2"
              />
            </div>
          </div>
          <div className="flex items-center w-full justify-end gap-2 mt-4">
            <button
              className="bg-slate-400 text-white p-2 rounded hover:bg-slate-500"
              onClick={(e) => {
                handleTab(e);
              }}
            >
              Back
            </button>
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
              onClick={handleChangePassword}
            >
              {(isLoading && "Saving...") || "Save"}
            </button>
          </div>
        </form>
        {message && (
          <div
            className="bg-red-100 rounded-lg py-5 px-6 my-4 text-base red-yellow-700"
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
