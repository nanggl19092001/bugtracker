import React, { useContext, useEffect, useState } from "react";
import { HomeContext } from "../../Context/HomeContext";
import { useNavigate } from "react-router-dom";
import GetUser from "../../FetchData/GetUser";

function ProjectDetail({ id }) {
  // const socket = io('http://localhost:5000');
  // useEffect(() => {
  //   socket.emit('join-room', id);
  //   socket.on('message', (data) => {
  //     console.log(data);
  //   })
  //   return () => {
  //     socket.removeAllListeners();
  //   }
  // },[id, socket])

  const [comment, setComment] = useState("");
  const { project, SERVER_DOMAIN, token, socket } = useContext(HomeContext);
  const history = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [listChosenUser, setListChosenUser] = useState([]);

  useEffect(() => {
    socket.emit("join-room", id);
    socket.on("message", (data) => {
      console.log(data);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [id, socket]);

  let thisProject = [];
  project && (thisProject = project.filter((project) => project._id === id));
  const { data: users, error } = GetUser(
    `${SERVER_DOMAIN}/user/search?token=${token}&key=${keyword}`
  );
  let listUser = [];
  users &&
    (listUser = users.filter(
      (user) =>
        user._id !== thisProject[0].creator &&
        listChosenUser.find((person) => person._id === user._id) === undefined
    ));
  const handleShowMember = (e) => {
    setKeyword(e.target.value);
  };
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
              project: id,
            }),
          }
        );
        let resJson = await res.json();
        if (resJson.status === 200) {
          console.log(resJson);
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
  };
  return (
    <div className="bg-white rounded-md p-4 m-4">
      {thisProject &&
        thisProject.map((project) => (
          <div key={project._id}>
            <h2 className="text-xl font-bold">{project.name}</h2>
            <p className="text-sm text-gray-500">{project.description}</p>
            <p className="text-sm text-gray-500">{project.deadline}</p>
          </div>
        ))}
      <div>
        <input
          className="w-1/4 p-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500 focus:border-2"
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
        <button
          className="bg-blue-500 text-white rounded-md p-2 ml-2"
          onClick={() => handleAddMember(listChosenUser)}
        >
          Add
        </button>
        {keyword && (
          <div
            className="w-1/4 bg-white rounded-md mt-2 border-2 border-blue-500 shadow-lg
          overflow-y-scroll overflow-x-hidden max-h-[140px]"
          >
            <ul>
              {users &&
                listUser.map((user) => (
                  <li
                    key={user._id}
                    className="p-2 hover:bg-blue-500 hover:text-white cursor-pointer flex flex-row items-center"
                    onClick={() => {
                      handleChooseMember(user);
                    }}
                  >
                    <div className="min-w-20 min-h-20 rounded-full bg-slate-300 "></div>
                    <div className="ml-2">
                      <p>{user.firstname + " " + user.lastname}</p>
                      <p className="">{user.email}</p>
                    </div>
                  </li>
                ))}
              {users && listUser.length === 0 && (
                <li className="p-2 text-center min-h-[80px]">No user found</li>
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
      {!keyword && listChosenUser && (
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
      <button className="btn btn-secondary" onClick={() => history("/")}>
        Back
      </button>
      <div className="flex items-center">
        <textarea
          className="w-1/3 p-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500 focus:border-2 resize-none"
          type="text"
          placeholder="Input comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            e.key === "Enter" && (
              fetch(`${SERVER_DOMAIN}/user/project/comment?token=${token}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  content: comment,
                  type: 0,
                  receiveId: id,
                }),
              })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                setComment("");
              })
              )
          }}
        />
        <button
          className="bg-blue-500 text-white rounded-md p-2 ml-2 hover:opacity-90 hover:shadow-md transition-opacity duration-300 ease-in-out"
          onClick={() => {
            fetch(`${SERVER_DOMAIN}/user/project/comment?token=${token}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                content: comment,
                type: 0,
                receiveId: id,
              }),
            })
              .then((res) => res.json())
              .then((data) => console.log(data));
            }}
        >
          Comment
        </button>
      </div>
    </div>
  );
}

export default ProjectDetail;
