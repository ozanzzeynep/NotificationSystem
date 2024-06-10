import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import "./DataTable.css";

const DataTable = () => {
  const [notifications, setNotifications] = useState([]);

  const dataStr = localStorage.getItem("user");
  const user = dataStr ? JSON.parse(dataStr) : null;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("Notifications State Updated:", notifications);
  }, [notifications]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/notifications/{id}?id=${user.id}`
      );
      console.log(response.data);
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (rowData: any) => {
    console.log("Tıklanan satırın verileri:", rowData);
    try {
      const id = rowData.id;
      const response = await axios.post(
        `http://localhost:8080/api/notifications/{id}?id=${id}`
      );
      console.log(response);
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "email",
      headerName: "User",
      width: 350,
      headerClassName: "custom-header",
    },
    {
      field: "context",
      headerName: "Context",
      width: 420,
      headerClassName: "custom-header",
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      width: 300,
      headerClassName: "custom-header",
    },
    {
      field: "read",
      headerName: "Read Status",
      width: 300,
      headerClassName: "custom-header",
    },
    

  ];

  const rows = notifications.map((notification: any) => ({
    id: notification.id,
    email: notification.response.email,
    context: notification.context,
    createdDate: notification.createdDate,
    read: notification.read,
  }));

  return (
    <Box
      sx={{
        height: 500,
        width: "95%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowClassName={(params) =>
          params.row.read ? "read-true" : "read-false"
        }
        onRowClick={(params) => handleClick(params.row)}
        sx={{ padding: "1px" }}
      />
    </Box>
  );
};

export default DataTable;
