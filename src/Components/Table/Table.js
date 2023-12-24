import React, { useState } from "react";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Modal, Fade, Backdrop, Box } from "@mui/material";
import Styles from "./Table.module.css";

const Table = ({
  membersData,
  onDelete,
  selectMember,
  checked
}) => {
  const [memberData, setMemberData] = useState({
    username: membersData.name,
    email: membersData.email,
    role: membersData.role,
  });

  const handleChange = (event) => {
    setMemberData((data) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <tr
      className={checked ? Styles.checkbox : Styles.TableRow}
      key={membersData.id}
    >
      <td>
        <input
          className={Styles.input}
          name="checkbox"
          type="checkbox"
          defaultChecked={checked}
          onClick={selectMember}
        />
      </td>
      <td>{memberData.username}</td>
      <td>{memberData.email}</td>
      <td>{memberData.role}</td>
      <td>
        <BorderColorTwoToneIcon className='edit' onClick={handleOpen} />
        <DeleteTwoToneIcon className="delete" onClick={onDelete} />
      </td>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              p: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              className={Styles.editMember}
              name="username"
              value={memberData.username}
              onChange={handleChange}
            />
            <input
              className={Styles.editMember}
              name="email"
              value={memberData.email}
              onChange={handleChange}
            />
            <input
              className={Styles.editMember}
              name="role"
              value={memberData.role}
              onChange={handleChange}
            />
            <button className={Styles.save} onClick={handleClose}>
              Update
            </button>
          </Box>
        </Fade>
      </Modal>
    </tr>
  );
};

export default Table;
