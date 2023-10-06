import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss"
import React, { useState } from "react";
import Add from "../../components/add/Add";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "../../contexts/ContextProvider";
import { Alert, AlertProps, Snackbar } from "@mui/material";

const initialColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
        field: 'img',
        headerName: 'Avatar',
        width: 100,
        renderCell: (params) => {
            return <img src={params.row.img || "/noavatar.png"} alt="" />
        },
    },
    {
        field: 'name',
        type: "string",
        headerName: 'Username',
        width: 150,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        type: 'string',
        width: 200,
        editable: true,
    },
    {
        field: 'created_at',
        headerName: 'created At',
        type: 'string',
        width: 150,
    },
    {
        field: 'verified',
        headerName: 'Status',
        type: 'boolean',
        width: 100,
    },

];
const passwordColumn: GridColDef = {
    field: 'password',
    headerName: 'Password',
    type: 'password',
    width: 100,
};

const confirmPasswordColumn: GridColDef = {
    field: 'password_confirmation',
    headerName: 'Confirm Password',
    type: 'password',
    width: 150,
};






const Users = () => {
    const [snackbar, setSnackbar] = React.useState<Pick<
        AlertProps,
        'children' | 'severity'
    > | null>(null);
    const handleCloseSnackbar = () => setSnackbar(null);
    const [open, setOpen] = useState(false);
    const { baseUrl, token } = useToken();
    const { isLoading, data } = useQuery({
        queryKey: ['allusers'],

        queryFn: () =>
            fetch(baseUrl + '/users', {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token
                },
            }).then(
                (res) => res.json(),

            ),

    })

    const modalColumns = open
        ? initialColumns.filter(column => column.field !== 'created_at' && column.field !== 'verified')
        : initialColumns;

    if (open) {
        modalColumns.push(passwordColumn, confirmPasswordColumn);
    }


    return (
        <div className="users">
            <div className="info">
                <h1>Users</h1>
                <button onClick={() => setOpen(true)}>Add new user</button>
            </div>
            {isLoading ? ("Loading ..") : (<DataTable slug="users" columns={initialColumns} rows={data} />)}
            {open && <Add slug="user" columns={modalColumns} setOpen={setOpen} />}
            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </div>
    )
}
export default Users;
