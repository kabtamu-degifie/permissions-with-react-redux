import React, { useEffect, useState, useRef } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch as fetchPermissions,
  reset as pReset,
} from "../../services/Permission/permission.slice";
import {
  fetch as fetchRoles,
  reset as rReset,
} from "../../services/Role/role.slice";

function Role() {
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  // const veiwAllRef = useRef();
  // const createAllRef = useRef();
  // const updateAllRef = useRef();
  // const removeAllRef = useRef();

  const dispatch = useDispatch();
  const {
    permissions,
    isSuccess: pSuccess,
    isLoading: pLoading,
  } = useSelector((state) => state.permissions);
  const {
    roles,
    isSuccess: rSuccess,
    isLoading: rLoading,
  } = useSelector((state) => state.roles);

  // format: permissions
  const formatPermissions = (perms) => {
    // extract permission name => split name by _ => add to Set => back to Array => return {name, permission}
    return Array.from(
      new Set(perms?.map((perm) => perm.name.split("_")[1]))
    ).map((name) => ({
      name,
      permissions: perms?.filter((perm) => perm.name.includes(name)),
    }));
  };

  // first time effect
  useEffect(() => {
    dispatch(fetchPermissions());
    if (roles && roles.length > 0) {
      setSelectedRoleId(roles[0]._id);
    }
    dispatch(pReset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // dispatcher effect
  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(rReset());
  }, [dispatch]);

  // state effect
  useEffect(() => {
    if (roles && roles.length > 0) {
      setSelectedRole(roles.find((role) => role._id === selectedRoleId));
    }
    dispatch(rReset());
  }, [dispatch, roles, selectedRoleId]);

  // select role
  const selectRoleHandler = (e) => {
    setSelectedRoleId(e.target.value);
  };

  console.log(rLoading);

  return (
    <div className="grid grid-rows-2 gap-2 w-full ml-12 mr-12 border-gray-200 border-2 p-3 rounded-lg">
      {rLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="border-gray-200 border-2 p-3 rounded-lg">
          <div className="flex justify-between">
            <div className="flex justify-start items-center gap-6">
              <div>
                <select
                  onChange={selectRoleHandler}
                  value={selectedRoleId}
                  className="w-auto bg-white border-gray-200 border-2 p-2 pr-4 pl-4 rounded-md"
                >
                  {roles?.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>{selectedRole?.name}</div>
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
      )}

      <div className="border-gray-200 border-2 p-3 rounded-lg">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-center">Module</th>
              <th className="text-start">
                <input
                  type="checkbox"
                  className="h-4 w-4 mr-2 accent-indigo-600"
                  onChange={(e) => {
                    if (selectedRole) {
                      const temp = [...selectedRole.permissions];
                      const filtered = permissions.filter((cp) =>
                        cp.name.includes("view")
                      );
                      for (let f of filtered) {
                        const index = temp.findIndex((fp) => fp._id === f._id);
                        if (index === -1 && e.target.checked) {
                          temp.push(f);
                        } else {
                          temp.splice(index, 1);
                        }
                      }
                      temp.push(...filtered);
                      const role = {
                        ...selectedRole,
                        permissions: temp,
                      };
                      setSelectedRole(role);
                    }
                  }}
                  id="view"
                />
                <label htmlFor="view">View</label>
              </th>
              <th className="text-start">
                <input
                  type="checkbox"
                  className="h-4 w-4 mr-2 accent-indigo-600"
                />
                <label htmlFor="create">Create</label>
              </th>
              <th className="text-start">
                <input
                  type="checkbox"
                  className="h-4 w-4 mr-2 accent-indigo-600"
                />
                <label htmlFor="update">Update</label>
              </th>
              <th className="text-start">
                <input
                  type="checkbox"
                  className="h-4 w-4 mr-2 accent-indigo-600"
                />
                <label htmlFor="remove">Remove</label>
              </th>
            </tr>
          </thead>
          <tbody>
            {pLoading ? (
              <p>Loading...</p>
            ) : (
              formatPermissions(permissions)?.map((perm) => (
                <tr key={perm.name} className="mb-2 mt-2 text-center">
                  <td>{perm.name}</td>
                  {perm.permissions.map((permission) => (
                    <td key={permission._id} className="text-start">
                      <input
                        className="h-4 w-4 accent-indigo-600"
                        type="checkbox"
                        checked={
                          selectedRole?.permissions?.findIndex(
                            (p) => p._id === permission._id
                          ) !== -1
                        }
                        onChange={(e) => {
                          console.log(
                            selectedRole?.permissions?.findIndex(
                              (p) => p._id === permission._id
                            ) !== -1
                          );
                          if (selectedRole) {
                            const clonedPermissions = [
                              ...selectedRole.permissions,
                            ];

                            const index = selectedRole?.permissions?.findIndex(
                              (p) => p._id === permission._id
                            );
                            if (index === -1 && e.target.checked) {
                              clonedPermissions.push(permission);
                            } else {
                              clonedPermissions.splice(index, 1);
                            }
                            const updatedRole = {
                              ...selectedRole,
                              permissions: clonedPermissions,
                            };

                            setSelectedRole(updatedRole);
                          }
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Role;
