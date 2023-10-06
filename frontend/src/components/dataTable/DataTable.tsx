import { DataGrid, GridColDef, GridRowModel, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToken } from "../../contexts/ContextProvider";
import React from "react";
import { Alert, AlertProps, Snackbar } from "@mui/material";

type Props = {
    columns: GridColDef[];
    rows: Object[];
    slug: string;
};
interface User {
    name: string;
}
const useFakeMutation = () => {
    return React.useCallback(
        (user: Partial<User>) =>
            new Promise<Partial<User>>((resolve, reject) => {
                setTimeout(() => {
                    if (user.name?.trim() === '') {
                        reject(new Error("Error while saving user: name can't be empty."));
                    } else {
                        resolve({ ...user, name: user.name?.toUpperCase() });
                    }
                }, 200);
            }),
        [],
    );
};

const DataTable = (props: Props) => {
    const queryClient = useQueryClient();
    const { baseUrl, token } = useToken();
    const [snackbar, setSnackbar] = React.useState<Pick<
        AlertProps,
        'children' | 'severity'
    > | null>(null);

    const mutation = useMutation({
        mutationFn: (data: any | null) => {
            return fetch(baseUrl + `/${props.slug}/${data.id}`,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + token
                    },
                    method: (data.method === 'put') ? 'PUT' : 'DELETE',
                    body: JSON.stringify(data)
                });
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`all${props.slug}`])
        },
        onError: () => {
            queryClient.invalidateQueries([`all${props.slug}`])
        }
    });
    const mutateRow = useFakeMutation();

    const handleDelete = (id: number, data: any) => {
        data.id = id;
        mutation.mutate(data);
        setSnackbar({ children: 'User successfully deleted', severity: 'warning' });
    }

    const processRowUpdate = React.useCallback(
        async (newRow: GridRowModel) => {
            newRow.method = 'put';
            mutation.mutate(newRow);
            const response = await mutateRow(newRow);
            setSnackbar({ children: 'User successfully saved', severity: 'success' });
            return response;
        },
        [mutateRow],
    );

    const handleProcessRowUpdateError = (error: Error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }

    const handleCloseSnackbar = () => setSnackbar(null);
    const actionColumn: GridColDef = {
        field: "action",
        headerName: "Action",
        width: 100,
        renderCell: (params) => {
            return (
                <div className="action">
                    <Link to={`/${props.slug}/${params.row.id}`}>
                        <img src="/view.svg" alt="" />
                    </Link>
                    <div className="delete" onClick={() => handleDelete(params.row.id, [])}>
                        <img src="/delete.svg" alt="" />
                    </div>
                </div>
            )
        },

    }
    return (
        <div className="dataTable">
            <DataGrid className="dataGrid"
                rows={props.rows}
                columns={[...props.columns, actionColumn]}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'id', sort: 'asc' }],
                    },
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 }
                    }
                }}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
                //can be kept coumn filter column selector and denisty by remoivng it.
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
            />
            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </div>
    )
}

export default DataTable;
