import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetch as fetchPermissions } from "../../services/Permission/permission.slice";
import {
  fetch as fetchRoles,
  update as updateRole,
} from "../../services/Role/role.slice";

function Role() {
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const dispatch = useDispatch();

  const { permissions, isLoading: pLoading } = useSelector(
    (state) => state.permissions
  );
  const {
    roles,
    isSuccess: rSuccess,
    isLoading: rLoading,
    message: rMessage,
  } = useSelector((state) => state.roles);

  useEffect(() => {
    dispatch(fetchPermissions());
  }, []);

  // did mount effect
  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  // state effect
  useEffect(() => {
    if (rSuccess || roles) {
      if (selectedRoleId) {
        const role = roles.find((role) => role._id === selectedRoleId);
        setSelectedRole(role);
      } else {
        setSelectedRoleId(roles[0]._id);
      }
    }
  }, [roles, rSuccess, selectedRoleId]);

  // Set selected role id
  const selectRoleHandler = (e) => {
    setSelectedRoleId(e.target.value);
    dispatch(fetchRoles());
  };

  // Format: permissions
  const formatPermissions = (perms) => {
    // extract permission name => split name by _ => add to Set => back to Array => return {name, permission}
    return Array.from(
      new Set(perms.map((perm) => perm.name.split("_")[1]))
    ).map((name) => ({
      name,
      permissions: perms.filter((perm) => perm.name.includes(name)),
    }));
  };

  // Select all: for selected type of permission
  const checkAllHandler = (e, perms, permType) => {
    // permType: view, create, update, remove
    const permPerType = perms.filter((p) => p.name.includes(permType));
    const selectedRolePerms = [...selectedRole.permissions];
    if (e.target.checked) {
      for (let p of permPerType) {
        const index = selectedRolePerms.findIndex((srp) => srp._id === p._id);
        if (index === -1) {
          selectedRolePerms.push(p);
          // check view to include
          if (permType !== "view") {
            perms.forEach((p) => {
              if (p.name.includes("view")) {
                const pIndex = selectedRolePerms.findIndex(
                  (sp) => sp._id === p._id
                );
                if (pIndex === -1) {
                  selectedRolePerms.push(p);
                }
              }
            });
          }
        }
      }
    } else {
      for (let p of permPerType) {
        const index = selectedRolePerms.findIndex((srp) => srp._id === p._id);
        if (index !== -1) {
          if (permType === "view") {
            perms.forEach((p) => {
              const pIndex = selectedRolePerms.findIndex(
                (sp) => sp._id === p._id
              );
              if (pIndex !== -1) {
                selectedRolePerms.splice(pIndex, 1);
              }
            });
          } else {
            selectedRolePerms.splice(index, 1);
          }
        }
      }
    }
    setSelectedRole((prev) => ({ ...prev, permissions: selectedRolePerms }));
  };

  // Select one: for single permission
  const checkIndividual = (e, permission, perms) => {
    const selectedRolePerms = [...selectedRole.permissions];

    const index = selectedRolePerms.findIndex((p) => p._id === permission._id);
    const viewName = `view_${perms.name}`;

    if (index === -1 && e.target.checked) {
      selectedRolePerms.push(permission);
      if (permission.name !== viewName) {
        // check if permission is included in role permissions
        const vIndex = selectedRolePerms.findIndex((p) => p.name === viewName);

        if (vIndex === -1) {
          // check in all permissions from db
          const pIndex = perms.permissions.findIndex(
            (p) => p.name === viewName
          );
          if (pIndex !== 1) {
            selectedRolePerms.push(perms.permissions[pIndex]);
          }
        }
      }
    } else {
      if (permission.name === viewName) {
        perms.permissions.forEach((p) => {
          const icp = selectedRolePerms.findIndex((cp) => cp._id === p._id);
          if (icp !== -1) {
            selectedRolePerms.splice(icp, 1);
          }
        });
      } else {
        selectedRolePerms.splice(index, 1);
      }
    }
    setSelectedRole((prv) => ({ ...prv, permissions: selectedRolePerms }));
  };

  // Set select all permissions checkbox status
  const setHeaderCheckboxStatus = (inputRef, permType) => {
    const srp = selectedRole.permissions.filter((sp) =>
      sp.name.includes(permType)
    ).length;
    const dp = permissions.filter((p) => p.name.includes(permType)).length;

    if (srp === dp) {
      inputRef.checked = true;
      inputRef.indeterminate = false;
    } else if (srp > 0) {
      inputRef.indeterminate = true;
    } else {
      inputRef.checked = false;
      inputRef.indeterminate = false;
    }
  };

  const handleRoleUpdate = () => {
    dispatch(
      updateRole({
        id: selectedRoleId,
        role: {
          ...selectedRole,
        },
      })
    );
  };

  return (
    <div className="flex flex-col gap-3  w-full ml-12 mr-12 content-start border-gray-200 border-2 p-3 rounded-lg">
      <div className="border-gray-200 border-2 p-3 rounded-lg bg-slate-100 h-16">
        <div className="flex justify-between">
          {rLoading || !roles ? (
            <div>Loading...</div>
          ) : (
            <div className="flex justify-start items-center gap-6">
              <select
                onChange={selectRoleHandler}
                value={selectedRoleId}
                className="capitalize w-auto bg-white border-gray-200 border-2 p-2 pr-4 pl-4 rounded-md"
              >
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </select>
              <div className="capitalize">{selectedRole.name}</div>
            </div>
          )}

          <div className="flex gap-6">
            <button
              onClick={handleRoleUpdate}
              type="button"
              className="inline-flex items-center  text-white bg-green-500 hover:bg-green-700 p-2 pr-4 pl-4 rounded-md"
            >
              Save Changes
            </button>
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

      {pLoading || !permissions || !selectedRole?.permissions ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="table w-full border-spacing-y-4 p-3 border-2 border-slate-200 rounded-lg">
          <div className="table-header-group ">
            <div className="table-row">
              <div className="table-cell p-2 text-center border-collapse border-b-2 border-slate-100">
                Module
              </div>
              <div className="table-cell text-left border-collapse border-b-2 border-slate-100">
                <input
                  type="checkbox"
                  className="h-4 w-4 mr-2 accent-indigo-600"
                  onChange={(e) => checkAllHandler(e, permissions, "view")}
                  id="view"
                  ref={(input) => {
                    if (input) setHeaderCheckboxStatus(input, "view");
                  }}
                />
                <label htmlFor="view">View</label>
              </div>
              <div className="table-cell text-left border-collapse border-b-2 border-slate-100">
                <input
                  type="checkbox"
                  className="h-4 w-4 mr-2 accent-indigo-600"
                  onChange={(e) => checkAllHandler(e, permissions, "create")}
                  id="create"
                  ref={(input) => {
                    if (input) setHeaderCheckboxStatus(input, "create");
                  }}
                />
                <label htmlFor="create">Create</label>
              </div>
              <div className="table-cell text-left border-collapse border-b-2 border-slate-100">
                <input
                  type="checkbox"
                  className="h-4 w-4 mr-2 accent-indigo-600"
                  onChange={(e) => checkAllHandler(e, permissions, "update")}
                  id="update"
                  ref={(input) => {
                    if (input) setHeaderCheckboxStatus(input, "update");
                  }}
                />
                <label htmlFor="update">Update</label>
              </div>
              <div className="table-cell text-left border-collapse border-b-2 border-slate-100">
                <input
                  type="checkbox"
                  className="h-4 w-4 mr-2 accent-indigo-600"
                  onChange={(e) => checkAllHandler(e, permissions, "remove")}
                  id="remove"
                  ref={(input) => {
                    if (input) setHeaderCheckboxStatus(input, "remove");
                  }}
                />
                <label htmlFor="remove">Remove</label>
              </div>
            </div>
          </div>
          <div className="table-row-group">
            {formatPermissions(permissions).map((perm) => (
              <div key={perm.name} className="table-row">
                <div className="table-cell text-center capitalize p-1 border-collapse border-b-2 border-slate-100">
                  {perm.name}
                </div>
                {perm.permissions.map((permission) => (
                  <div
                    key={permission._id}
                    className="table-cell border-collapse border-b-2 border-slate-100"
                  >
                    <input
                      className="h-4 w-4 accent-indigo-600"
                      type="checkbox"
                      id={permission._id}
                      name={permission._id}
                      checked={
                        selectedRole.permissions.findIndex(
                          (p) => p._id === permission._id
                        ) !== -1
                      }
                      onChange={(e) => checkIndividual(e, permission, perm)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Role;
