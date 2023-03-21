import { convertTimeToDMY, countTimeAgo } from "../../utils/ConvertTime";

function Comment(props) {
  const handleScrollButton = () => {
    props.setIsVisible(true);
    props.messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
    });
    props.setHaveNewComment(false);
  };
  return (
    <div className="comment">
      {props.comment.map((item, index) => (
        <div className="flex items-center py-2 px-2" key={index}>
          <img
            className="w-10 h-10 rounded-full"
            src="https://tecdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
            alt="avatar"
          />
          <div className="flex flex-col mx-2 bg-white p-2 rounded-md">
            <p className="text-sm font-semibold">
              {item.senderInfo.firstname + " " + item.senderInfo.lastname}
            </p>
            <p className="text-sm text-gray-500">{item.comment.content}</p>
            <p className="text-xs text-gray-400 italic">
              {countTimeAgo(item.comment.date).includes(
                "second",
                "minute",
                "hour"
              ) ||
              countTimeAgo(item.comment.date).includes("minute") ||
              countTimeAgo(item.comment.date).includes("hour")
                ? countTimeAgo(item.comment.date)
                : convertTimeToDMY(item.comment.date)}
            </p>
          </div>
        </div>
      ))}
      {props.isGreaterLimit && (
        <div className="flex justify-center gap-4 text-xs text-slate-400">
          <button
            className={`${props.total - props.limit <= 10 && `hidden`}`}
            onClick={() => {
              props.setLimit(props.limit + 10);
            }}
          >
            Read more (+10)
          </button>
          <button
            className={`${props.total <= 10 && `hidden`}`}
            onClick={() => {
              props.setLimit(props.total + props.commentSocket.length);
              props.setIsGreaterLimit(false);
              props.setCommentSocket([]);
            }}
          >
            Read All ({props.total - props.limit})
          </button>
        </div>
      )}
      {props.isLoading && (
        <div className="flex items-center justify-center h-20">
          <div className="w-5 h-5 border-4 border-t-5 border-t-blue-500 border-white rounded-full animate-spin"></div>
        </div>
      )}
      {props.commentSocket &&
        props.commentSocket.map((item, index) => (
          <div className="flex items-center py-2 px-2" key={index}>
            <img
              className="w-10 h-10 rounded-full"
              src="https://tecdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
              alt="avatar"
            />
            <div className="flex flex-col mx-2 bg-white p-2 rounded-md">
              <p className="text-sm font-semibold">
                {item[0].senderInfo[0].firstname +
                  " " +
                  item[0].senderInfo[0].lastname}
              </p>
              <p className="text-sm text-gray-500">{item[0].comment.content}</p>
              <p className="text-xs text-gray-400 italic">
                {countTimeAgo(item[0].comment.date).includes("second") ||
                countTimeAgo(item[0].comment.date).includes("minute") ||
                countTimeAgo(item[0].comment.date).includes("hour")
                  ? countTimeAgo(item[0].comment.date)
                  : convertTimeToDMY(item[0].comment.date)}
              </p>
            </div>
          </div>
        ))}
      {props.isVisible && (
        <div className="sticky bottom-0 h-14 float-right right-2">
          <button onClick={() => handleScrollButton()}>
            {props.haveNewComment ? (
              <svg
                className="w-6 h-6 mr-2 text-blue-500 bg-slate-100 rounded-full"
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
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 mr-2 text-blue-500 bg-slate-100 rounded-full"
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
                  d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </button>
        </div>
      )}
      <div ref={props.messagesEndRef} />
    </div>
  );
}

export default Comment;
