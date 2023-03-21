import { HomeContext } from "../../Context/HomeContext";
import { ProjectContext } from "../../Context/ProjectContext";
import GetUser from "../../FetchData/GetUser";
import React, { useContext, useState } from "react";

function Member(props) {
  const { SERVER_DOMAIN, token, user } = useContext(HomeContext);
  const {projectId, member, reload, setReload} = useContext(ProjectContext);
  const [keyword, setKeyword] = useState("");
  const { data: users, error } = GetUser(
    `${SERVER_DOMAIN}/user/search?token=${token}&key=${keyword}`
  );
  const handleShowMember = (e) => {
    setKeyword(e.target.value);
  };
  const [listChosenUser, setListChosenUser] = useState([]);
  let userShow = [];
  users &&
    (userShow = users.filter(
      (user) =>
        member.find((person) => person._id === user._id) === undefined &&
        listChosenUser.find((person) => person._id === user._id) === undefined
    ));
  const handleChooseMember = (user) => {
    setListChosenUser([...listChosenUser, user]);
  };
  const handleAddMember = async (listChosenUser) => {
    for (let i = 0; i < listChosenUser.length; i++) {
      try {
        let res = await fetch(
          `${SERVER_DOMAIN}/user/project/member?token=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: listChosenUser[i]._id,
              project: props.thisProject[0].project._id,
            }),
          }
        );
        let resJson = await res.json();
        if (resJson.status === 200) {
          setListChosenUser(
            listChosenUser.filter((list) => list.id !== listChosenUser[i].id)
          );
        } else {
          console.log(resJson);
        }
      } catch (err) {
        console.log(err);
      }
    }
    setReload(!reload);
  };
  const handleDelMember = async (idUser) => {
    try {
      let res = await fetch(
        `${SERVER_DOMAIN}/user/project/member?token=${token}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: idUser,
            project_id: projectId,
          }),
        }
      );
      let resJson = await res.json();
      if (resJson.status === 200) {
        setReload(!reload);
      } else {
        console.log(resJson);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="shadow-md">
      <div className="mx-4 my-2">
        <h2 className="text-lg text-text-color font-bold">Member</h2>
        <div
          className="list-member grid grid-cols-1 gap-1 drop-shadow-md
        min-[1000px]:grid-cols-2 min-[1500px]:grid-cols-3"
        >
          {member &&
            member.map((item) => (
              <div
                key={item._id}
                data-te-toggle="tooltip"
                data-te-placement="top"
                data-te-ripple-color="light"
                title={item.email}
                data-te-chip-init
                data-te-ripple-init
                className="w-full [word-wrap: break-word] my-[5px] mr-4 flex h-[42px] cursor-pointer items-center justify-between rounded-[21px] 
           bg-[#eceff1] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-[#181bce] shadow-none 
           transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-slate-200 dark:text-blue-500 dark:font-bold"
              >
                <img
                  className="my-0 mr-[8px] -ml-[12px] h-[40px] w-[40px] rounded-[100%]"
                  src="https://tecdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="Contact Person"
                />
                {item.firstname}
                <span
                  data-te-chip-close
                  className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] 
                      transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-black dark:hover:text-neutral-100"
                >
                  {props.thisProject[0] &&
                   (props.thisProject[0].creator._id === user.id && props.thisProject[0].creator._id !== item._id) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-3 w-3 hover:bg-red-500"
                        onClick={() => {
                          handleDelMember(item._id);
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                </span>
              </div>
            ))}
        </div>
        <div className="relative add-member mt-2 w-full xl:w-3/4">
          <input
            className="p-2 w-full border border-gray-200 rounded 
            focus:outline-none focus:border-blue-500 focus:border-2"
            type="text"
            placeholder="Add member"
            onChange={(e) => {
              e.preventDefault();
              handleShowMember(e);
            }}
            onBlur={(e) => {
              setTimeout(() => {
                setKeyword("");
              }, 200);
              e.target.value = "";
            }}
          />
          {keyword && (
            <div
              className="absolute w-full bg-white rounded-md rounded-t-none shadow-2xl
                overflow-y-scroll overflow-x-hidden max-h-[140px] z-20"
            >
              <ul>
                {users &&
                  userShow.map((user) => (
                    <li
                      key={user._id}
                      onClick={() => {
                        handleChooseMember(user);
                      }}
                      className="p-2 hover:bg-blue-500 hover:text-white cursor-pointer flex flex-row items-center"
                    >
                      <div className="min-w-20 min-h-20 rounded-full bg-slate-300 "></div>
                      <div className="ml-2">
                        <p className="font-semibold text-slate-500">
                          {user.firstname + " " + user.lastname}
                        </p>
                        <p className="italic">{user.email}</p>
                      </div>
                    </li>
                  ))}
                {users && userShow.length === 0 && (
                  <li className="p-2 text-center min-h-[80px]">
                    No user found
                  </li>
                )}
                {error && (
                  <li className="p-2 text-center min-h-[80px]">
                    Something wrong
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        {listChosenUser && (
          <div className="flex w-full flex-wrap justify-start">
            {listChosenUser.map((user) => (
              <div
                key={user._id}
                data-te-chip-init
                data-te-ripple-init
                className="[word-wrap: break-word] my-[5px] mr-4 flex h-[42px] cursor-pointer items-center justify-between rounded-[21px] 
            bg-[#eceff1] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none 
            transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-blue-500 dark:text-neutral-200"
                onClick={() =>
                  setListChosenUser(
                    listChosenUser.filter((person) => person._id !== user._id)
                  )
                }
              >
                <img
                  className="my-0 mr-[8px] -ml-[12px] h-[inherit] w-[inherit] rounded-[100%]"
                  src="https://tecdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="Contact Person"
                />
                {user.firstname}
                <span
                  data-te-chip-close
                  className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] 
              transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-white dark:hover:text-neutral-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-3 w-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        )}
        <button
          className="block bg-blue-500 text-white rounded-md p-2 my-1"
          onClick={() => handleAddMember(listChosenUser)}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Member;
