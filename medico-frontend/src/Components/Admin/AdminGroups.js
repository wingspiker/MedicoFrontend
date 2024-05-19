import React, { useState, useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
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
        setSelectedGroup(g[0]);
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
    <div className="flex h-screen bg-cyan-900 text-white">
      <AdminSidebar changeLogin={logout} />
      <div className="flex-1 ms-14">
        <div>
          <div className="p-5 flex justify-end gap-4">
            <button
              onClick={onAddGroup}
              className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2"
            >
              Add Group
            </button>
          </div>
          <hr />
        </div>
        <div className="flex-1 flex">
          <div className="w-2/3 h-[88vh] overflow-auto no-scrollbar p-8 grid grid-cols-1 gap-6">
            {groups.map((group) => (
              <div
                key={group.id}
                className={`text-black rounded-lg shadow-md p-6 cursor-pointer flex justify-between items-center ${
                  selectedGroup && group.id === selectedGroup.id
                    ? "bg-cyan-500"
                    : "bg-white"
                }`} // This line applies conditional styling
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
              <div className="w-[96%] h-[84vh] overflow-auto p-8 bg-white text-black rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedGroup.name}
                </h2>
                <p className="mb-4">{selectedGroup.description}</p>
                <h3 className="text-xl font-bold">Buyers:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                  {selectedGroup.buyers &&
                    selectedGroup.buyers.map((buyer) => (
                      <div
                        key={buyer.id}
                        className="bg-white rounded-lg shadow-xl p-4 flex flex-col"
                      >
                        <img
                          src="/buyer.png"
                          alt={buyer.firstName}
                          height="32px"
                          className="w-full object-cover mb-4 rounded"
                        />
                        <h2 className="text-lg font-semibold">
                          {buyer.firstName} {buyer.lastName}
                        </h2>
                        <p className="text-gray-600">{buyer.occupation} {buyer.degree ? '('+ buyer.degree+')' : ""}</p>
                        {/* <p className="text-gray-800">
                          Degree: {buyer.degree ? buyer.degree : "N/A"}
                        </p> */}
                        <p className="text-gray-800">
                          Taluka: {buyer.taluka.name}
                        </p>
                      </div>
                    ))}
                </div>
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
  );
}
