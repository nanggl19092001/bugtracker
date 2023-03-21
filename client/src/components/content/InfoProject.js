import { convertTimeToDMY, countTimeAgo } from "../../utils/ConvertTime";

function InfoProject(props) {
  return (
    <div className="info col-span-1 shadow-md">
      <div className="mx-4 my-2">
        <h2 className="inline text-lg text-text-color font-bold">
          Project Info
        </h2>
        {props.thisProject &&
          props.thisProject.map((item) => (
            <div
              className="grid gird-cols-1 2xl:grid-cols-4 gap-2 my-1"
              key={item.project._id}
            >
              <div className="w-full col-span-1">
                <h2 className="p-1 bg-slate-200 text-blue-500 text-sm font-bold w-fit rounded-md">
                  Deadline
                </h2>
                <p className="text-sm text-red-500 font-semibold">
                  {convertTimeToDMY(item.project.end)}
                </p>
                <p className="text-sm text-red-500 italic">
                  {countTimeAgo(item.project.end)}
                </p>
              </div>
              <div className="2xl:col-span-3 flex flex-col">
                <h2 className="p-1 bg-slate-200 text-blue-500 text-sm font-bold w-fit rounded-md">
                  Description
                </h2>
                <q className="text-sm text-gray-500 italic">
                  {item.project.description}
                </q>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default InfoProject;
