import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetch as fetchPermissions } from "../../services/Permission/permission.slice";
import {
  fetch as fetchRoles,
  reset as rReset,
} from "../../services/Role/role.slice";

function Role() {
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

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
      new Set(perms.map((perm) => perm.name.split("_")[1]))
    ).map((name) => ({
      name,
      permissions: perms.filter((perm) => perm.name.includes(name)),
    }));
  };

  // console.log(formatPermissions(permissions));

  // first time effect
  useEffect(() => {
    dispatch(fetchPermissions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // // dispatcher effect
  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  // state effect
  useEffect(() => {
    if (rSuccess || roles) {
      if (selectedRoleId) {
        setSelectedRole(roles.find((role) => role._id === selectedRoleId));
      } else {
        setSelectedRoleId(roles[0]._id);
      }
      dispatch(rReset());
    }
  }, [dispatch, pSuccess, permissions, rSuccess, roles, selectedRoleId]);

  // select role
  const selectRoleHandler = (e) => {
    setSelectedRoleId(e.target.value);
  };

  // check All
  const checkAllHandler = (e, perms, permType) => {
    const viewPerm = perms.filter((p) => p.name.includes(permType));
    if (e.target.checked) {
      const selectedRolePerms = [...selectedRole.permissions];
      for (let p of viewPerm) {
        const index = selectedRolePerms.findIndex((srp) => srp._id === p._id);
        if (index === -1) {
          selectedRolePerms.push(p);
        }
      }
      setSelectedRole((prev) => ({
        name: prev.name,
        permissions: selectedRolePerms,
      }));
    } else {
      const selectedRolePerms = [...selectedRole.permissions];
      for (let p of viewPerm) {
        const index = selectedRolePerms.findIndex((srp) => srp._id === p._id);
        if (index !== -1) {
          selectedRolePerms.splice(index, 1);
        }
      }
      setSelectedRole((prev) => ({
        name: prev.name,
        permissions: selectedRolePerms,
      }));
    }
  };

  // check Single
  const checkIndividual = (e, permission, perm) => {
    const clonedPermissions = [...selectedRole.permissions];

    const index = clonedPermissions.findIndex((p) => p._id === permission._id);
    const viewName = `view_${perm.name}`;

    if (index === -1 && e.target.checked) {
      clonedPermissions.push(permission);
      if (permission.name !== viewName) {
        // check if view_name is included
        // check in role
        const vIndex = clonedPermissions.findIndex((p) => p.name === viewName);

        if (vIndex === -1) {
          // check in permissions
          const pIndex = perm.permissions.findIndex((p) => p.name === viewName);
          if (pIndex !== 1) {
            clonedPermissions.push(perm.permissions[pIndex]);
          }
        }
      }
    } else {
      if (permission.name === viewName) {
        perm.permissions.forEach((p) => {
          const icp = clonedPermissions.findIndex((cp) => cp._id === p._id);
          if (icp !== -1) {
            clonedPermissions.splice(icp, 1);
          }
        });
      } else {
        clonedPermissions.splice(index, 1);
      }
    }

    setSelectedRole((prv) => ({ ...prv, permissions: clonedPermissions }));
  };

  return (
    <div className="flex flex-col gap-3  w-full ml-12 mr-12 content-start border-gray-200 border-2 p-3 rounded-lg">
      <div className="border-gray-200 border-2 p-3 rounded-lg bg-slate-100 h-16">
        {rLoading || !roles ? (
          <p>Loading...</p>
        ) : (
          <div className="flex justify-between">
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
        )}
      </div>

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
              />
              <label htmlFor="view">View</label>
            </div>
            <div className="table-cell text-left border-collapse border-b-2 border-slate-100">
              <input
                type="checkbox"
                className="h-4 w-4 mr-2 accent-indigo-600"
                onChange={(e) => checkAllHandler(e, permissions, "create")}
                id="create"
              />
              <label htmlFor="create">Create</label>
            </div>
            <div className="table-cell text-left border-collapse border-b-2 border-slate-100">
              <input
                type="checkbox"
                className="h-4 w-4 mr-2 accent-indigo-600"
                onChange={(e) => checkAllHandler(e, permissions, "update")}
                id="update"
              />
              <label htmlFor="update">Update</label>
            </div>
            <div className="table-cell text-left border-collapse border-b-2 border-slate-100">
              <input
                type="checkbox"
                className="h-4 w-4 mr-2 accent-indigo-600"
                onChange={(e) => checkAllHandler(e, permissions, "remove")}
                id="remove"
              />
              <label htmlFor="remove">Remove</label>
            </div>
          </div>
        </div>
        <div className="table-row-group">
          {pLoading || !permissions ? (
            <div className="table-row">Loading..</div>
          ) : (
            formatPermissions(permissions).map((perm) => (
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
                        selectedRole.permissions?.findIndex(
                          (p) => p._id === permission._id
                        ) !== -1
                      }
                      onChange={(e) => checkIndividual(e, permission, perm)}
                    />
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Role;
