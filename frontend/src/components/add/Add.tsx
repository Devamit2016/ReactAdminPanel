import { GridColDef } from "@mui/x-data-grid";
import "./add.scss"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToken } from "../../contexts/ContextProvider";
import React from "react";
import { AlertProps } from "@mui/material";


type Props = {
    slug: string;
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    snackbar?: string;
}

const Add = (props: Props) => {
    const [snackbar, setSnackbar] = React.useState<Pick<
        AlertProps,
        'children' | 'severity'
    > | null>(null);

    const queryClient = useQueryClient();
    const { baseUrl, token } = useToken();
    const mutation = useMutation({
        mutationFn: (formData: any) => {
            return fetch(baseUrl + `/${props.slug}s`,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + token
                    },
                    method: "post",
                    body: JSON.stringify(formData)
                });

        },
        onSuccess: () => {
            queryClient.invalidateQueries([`all${props.slug}s`])
        }
    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: Record<string, string> = {};
        Array.prototype.forEach.call(e.currentTarget.elements, (element: HTMLInputElement) => {
            if (element.name) {
                formData[element.name] = element.value;
            }
        })
        mutation.mutate(formData)
        props.setOpen(false)
        setSnackbar({ children: `${props.slug}` + 'successfully deleted', severity: 'success' });

    };
    return (
        <div className="add">
            <div className="modal">
                <span className="close" onClick={() => props.setOpen(false)}>×</span>
                <h1>Add New {props.slug}</h1>
                <form onSubmit={handleSubmit}>
                    {
                        props.columns
                            .filter(item => item.field !== "id" && item.field !== "img")
                            .map(column => (
                                <div className="item" key={column.field}>
                                    <label>{column.headerName}</label>
                                    <input type={column.type} placeholder={column.field} name={column.field} />
                                </div>
                            ))
                    }
                    <button>Send</button>
                </form>
            </div>
        </div>
    );
};
export default Add;
