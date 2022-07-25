import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { hasPermission } from "../../libs/local-storage";
import { fetch as fetchPermissions } from "../../services/Permission/permission.slice";
import {
  fetch as fetchRoles,
  update as updateRole,
} from "../../services/Role/role.slice";

function Role() {
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const dispatch = useDispatch();

  const { permissions, isLoading: permissionLoading } = useSelector(
    (state) => state.permissions
  );
  const {
    roles,
    isSuccess: roleSuccess,
    isLoading: roleLoading,
  } = useSelector((state) => state.roles);
  // did mount effect
  useEffect(() => {
    dispatch(fetchPermissions());
  }, []);

  // dispatch + did mount effect
  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  // state + did mount effect
  useEffect(() => {
    if (roleSuccess || roles) {
      if (selectedRoleId) {
        const role = roles.find((role) => role._id === selectedRoleId);
        setSelectedRole(role);
      } else {
        setSelectedRoleId(roles[0]._id);
      }
    }
  }, [roles, roleSuccess, selectedRoleId]);

  // Set selected role id
  const selectRoleHandler = (e) => {
    setSelectedRoleId(e.target.value);
    dispatch(fetchRoles());
  };

  // Group: permissions
  const groupPermissions = () => {
    // extract permission name => split name by _ => add to Set => back to Array => return {name, permission}
    return Array.from(
      new Set(permissions.map((perm) => perm.name.split("_")[1]))
    ).map((name) => ({
      name,
      permissions: permissions.filter((perm) => perm.name.includes(name)),
    }));
  };

  // Select all: for selected type of permission
  const checkAllHandler = (event, cell) => {
    // cell: view, create, update, remove
    const permPerType = permissions.filter((p) => p.name.includes(cell));
    const selectedRolePerms = [...selectedRole.permissions];
    if (event.target.checked) {
      for (let p of permPerType) {
        const index = selectedRolePerms.findIndex((srp) => srp._id === p._id);
        if (index === -1) {
          selectedRolePerms.push(p);
          // check view to include
          if (cell !== "view") {
            permissions.forEach((p) => {
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
          if (cell === "view") {
            permissions.forEach((p) => {
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
  const checkIndividual = (event, permission, group) => {
    const selectedRolePerms = [...selectedRole.permissions];

    const index = selectedRolePerms.findIndex((p) => p._id === permission._id);
    const viewName = `view_${group.name}`;

    if (index === -1 && event.target.checked) {
      selectedRolePerms.push(permission);
      if (permission.name !== viewName) {
        // check if permission is included in role permissions
        const vIndex = selectedRolePerms.findIndex((p) => p.name === viewName);

        if (vIndex === -1) {
          // check in all permissions from db
          const pIndex = group.permissions.findIndex(
            (p) => p.name === viewName
          );
          if (pIndex !== 1) {
            selectedRolePerms.push(group.permissions[pIndex]);
          }
        }
      }
    } else {
      if (permission.name === viewName) {
        group.permissions.forEach((p) => {
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

  // Check that the permission is included in selected role
  const roleHasPermission = (permissionId) => {
    return (
      selectedRole.permissions.findIndex((p) => p._id === permissionId) !== -1
    );
  };

  if (!roles && !roleLoading) {
    return (
      <div className="flex flex-col gap-y-3 items-center border-gray-100 border-2 p-3 w-full  ml-12 mr-12 rounded-lg">
        <div className=" max-w-full px-6 py-3 rounded-lg bg-slate-200">
          No role added yet.
        </div>
        <div>
          <button className="btn-success">Add Role</button>
        </div>
      </div>
    );
  }

  let rolesSection = null;
  if (roleLoading || !roles) {
    rolesSection = <div>Loading...</div>;
  } else {
    rolesSection = (
      <div className="flex justify-start items-center gap-6">
        <select
          onChange={selectRoleHandler}
          value={selectedRoleId}
          className="role-selector"
        >
          {roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select>
        <div className="capitalize">{selectedRole.name}</div>
      </div>
    );
  }

  const headerCells = ["view", "create", "update", "remove"];

  let permissionsSection = null;
  if (permissionLoading || roleLoading || !permissions || !selectedRole) {
    permissionsSection = <div className="text-center">Loading...</div>;
  } else {
    permissionsSection = (
      <div className="table w-full border-spacing-y-4 p-3 border-2 border-slate-200 rounded-lg">
        <div className="table-header-group">
          <div className="table-row">
            <div className="table-cell-center">Module</div>
            {headerCells.map((cell) => {
              return (
                <div key={cell} className="table-cell-left">
                  <input
                    disabled={
                      roleLoading ||
                      permissionLoading ||
                      !hasPermission("update_role")
                    }
                    type="checkbox"
                    className="h-4 w-4 mr-2 accent-indigo-600"
                    onChange={(e) => checkAllHandler(e, cell)}
                    id={cell}
                    ref={(input) => {
                      if (input) setHeaderCheckboxStatus(input, cell);
                    }}
                  />
                  <label className="capitalize" htmlFor={cell}>
                    {cell}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="table-row-group">
          {groupPermissions().map((group) => (
            <div key={group.name} className="table-row">
              <div className="table-cell-center">{group.name}</div>
              {group.permissions.map((permission) => (
                <div
                  key={permission._id}
                  className="table-cell border-collapse border-b-2 border-slate-100"
                >
                  <input
                    className="h-4 w-4 accent-indigo-600"
                    type="checkbox"
                    id={permission._id}
                    name={permission._id}
                    disabled={roleLoading || !hasPermission("update_role")}
                    checked={roleHasPermission(permission._id)}
                    onChange={(e) => checkIndividual(e, permission, group)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3  w-full ml-12 mr-12 content-start border-gray-200 border-2 p-3 rounded-lg">
      <div className="border-gray-200 border-2 p-3 rounded-lg bg-slate-100 h-16">
        <div className="flex justify-between">
          {rolesSection}
          <div className="flex gap-6">
            {hasPermission("update_role") ? (
              <button
                disabled={roleLoading}
                onClick={handleRoleUpdate}
                type="button"
                className="btn-success-outline"
              >
                Save Changes
              </button>
            ) : null}
            {hasPermission("create_role") ? (
              <button
                disabled={roleLoading}
                type="button"
                className="btn-success"
              >
                <MdAdd className="mr-2" />
                Add Role
              </button>
            ) : null}
          </div>
        </div>
      </div>
      {permissionsSection}
    </div>
  );
}

export default Role;
