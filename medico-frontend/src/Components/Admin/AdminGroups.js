import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { signOut } from "../../Services/auth";
import { decodeToken } from "../../Services/auth";
import { useNavigate } from "react-router-dom";
import { getGroups, getGroupById, deleteGroup } from "../../Services/group";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminGroups(props) {
  const { changeLogin } = props;
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [open, setOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    navigate("/admin");
  };

  const onAddGroup = () => {
    navigate("/admin/Groups/add");
  };

  useEffect(() => {
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    getGroups(email)
      .then((g) => {
        setGroups(g);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleGroup = (g) => {
    getGroupById(g.id)
      .then((r) => {
        setSelectedGroup(r);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteClick = (groupId) => {
    setGroupToDelete(groupId);
    setOpen(true);
  };

  // const handleDeleteConfirm = () => {
  //   deleteGroup(groupToDelete)
  //     .then(() => {
  //       setGroups(groups.filter((group) => group.id !== groupToDelete));
  //       setOpen(false);
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <>
      <div className="flex h-screen bg-cyan-900 text-white">
        <Sidebar changeLogin={logout} />
        <div className="flex-1 ms-14">
          <div>
            <div className="p-2 flex justify-end gap-4">
              <button
                onClick={onAddGroup}
                className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2"
              >
                Add Group
              </button>
            </div>
            <hr />
          </div>
          <div className="flex-1 ms-14 flex">
            <div className="w-2/3 p-8 grid grid-cols-1 gap-6">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="bg-white text-black rounded-lg shadow-md p-6 cursor-pointer flex justify-between items-center"
                  onClick={() => handleGroup(group)}
                >
                  <div>
                    <h2 className="text-xl font-bold mb-2">{group.name}</h2>
                    <p className="text-gray-700">{group.description}</p>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(group.id);
                    }}
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                  ></Button>
                </div>
              ))}
            </div>
            <div className="mt-8 w-full">
              {selectedGroup && (
                <div className="w-2/3 p-8 bg-white text-black rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-4">
                    {selectedGroup.name}
                  </h2>
                  <p className="mb-4">{selectedGroup.description}</p>
                  <h3 className="text-xl font-bold">Buyers:</h3>
                  <ul className="mb-4">
                    {selectedGroup.buyers &&
                      selectedGroup.buyers.map((buyer) => (
                        <li key={buyer.id}>
                          {buyer.firstName} {buyer.lastName} -{" "}
                          {buyer.occupation}{" "}
                          {buyer.degree ? "(" + buyer.degree + ")" : ""} -
                          Taluka: {buyer.taluka.name}
                        </li>
                      ))}
                  </ul>
                  <h3 className="text-xl font-bold">Products:</h3>
                  <ul>
                    {selectedGroup.products &&
                      selectedGroup.products.map((product) => (
                        <li key={product.id}>
                          {product.brandName} ({product.drugName}) - $
                          {product.mrp}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Delete Group</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this group?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {}} color="error">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
