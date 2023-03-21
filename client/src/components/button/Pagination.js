import { Link } from "react-router-dom";

function Pagination(props) {
  return (
    <>
      <div
        className={`flex justify-center pt-4 z-10 ${
          props.total === 0 ? "hidden" : ""
        }`}
      >
        <nav aria-label="Page navigation">
          <ul className="flex list-style-none">
            <li className="page-item">
              <Link
                className={`page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded-full
                       hover:text-gray-800 hover:bg-gray-200 focus:shadow-none ${
                         props.offset <= 0
                           ? "bg-transparent text-gray-400 cursor-not-allowed"
                           : "text-gray-800 bg-transparent"
                       }`}
                to={`#`}
                onClick={() => {
                  if (props.offset > 0) {
                    props.setOffset(props.offset - 5);
                  }
                }}
              >
                Previous
              </Link>
            </li>
            {props.page.map((item) => {
              return (
                <li className="page-item" key={item}>
                  <Link
                    className={`page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded-full 
                               ${
                                 props.offset === (item - 1) * props.limit
                                   ? "bg-blue-600 text-white"
                                   : "text-gray-800 bg-transparent"
                               }`}
                    to={`#`}
                    onClick={() => props.setOffset((item - 1) * props.limit)}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
            <li className="page-item">
              <Link
                className={`page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded-full
                              hover:text-gray-800 hover:bg-gray-200 focus:shadow-none ${
                                props.offset + props.limit >=
                                props.totalPage * props.limit
                                  ? "bg-transparent text-gray-400 cursor-not-allowed"
                                  : "text-gray-800 bg-transparent"
                              }`}
                to={`#`}
                disabled={props.offset === 0}
                onClick={() => {
                  if (
                    props.offset + props.limit <
                    props.totalPage * props.limit
                  ) {
                    props.setOffset(props.offset + 5);
                  }
                }}
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div
        className={`flex justify-end px-4 pb-2 ${
          props.total === 0 ? "hidden" : ""
        }`}
      >
        <span className="text-gray-400">
          Showing {props.offset + 1} to{" "}
          {props.offset + props.limit > props.total
            ? props.total
            : props.offset + props.limit}{" "}
          of {props.total} entries
        </span>
      </div>
    </>
  );
}

export default Pagination;
