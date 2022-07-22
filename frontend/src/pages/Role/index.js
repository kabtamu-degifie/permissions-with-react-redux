import React, { useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetch } from "../../services/Permission/permission.slice";

function Role() {
  const dispatch = useDispatch();
  const { permissions } = useSelector((state) => state.permissions);

  useEffect(() => {
    dispatch(fetch());
  }, [dispatch]);

  console.log(permissions);

  return (
    <div className="grid grid-rows-2 gap-2 w-full ml-12 mr-12 border-gray-200 border-2 p-3 rounded-lg">
      <div className="border-gray-200 border-2 p-3 rounded-lg">
        <div className="flex justify-between">
          <div className="flex justify-start items-center gap-6">
            <div>
              <select className="w-auto bg-white border-gray-200 border-2 p-2 pr-4 pl-4 rounded-md">
                <option>Admin</option>
                <option>User</option>
              </select>
            </div>
            <div>Admin</div>
          </div>
          <div>
            <button
              type="button"
              className="inline-flex items-center  text-white bg-indigo-600 hover:bg-indigo-700 p-2 pr-4 pl-4 rounded-md"
            >
              <MdAdd className="mr-2" />
              Add Role
            </button>
          </div>
        </div>
      </div>
      <div className="border-gray-200 border-2 p-3 rounded-lg">
        <table className="w-full">
          <thead>
            <tr>
              <th>Module</th>
              <th>View</th>
              <th>Create</th>
              <th>Update</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr className="mb-2 mt-2">
              <td className="text-center">Role</td>
              <td className="text-center">
                <input
                  className="h-4 w-4 accent-indigo-600"
                  type="checkbox"
                  name=""
                  id=""
                />
              </td>
              <td className="text-center">
                <input
                  className="h-4 w-4 accent-indigo-600"
                  type="checkbox"
                  name=""
                  id=""
                />
              </td>
              <td className="text-center">
                <input
                  className="h-4 w-4 accent-indigo-600"
                  type="checkbox"
                  name=""
                  id=""
                />
              </td>
              <td className="text-center">
                <input
                  className="h-4 w-4 accent-indigo-600"
                  type="checkbox"
                  name=""
                  id=""
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Role;
