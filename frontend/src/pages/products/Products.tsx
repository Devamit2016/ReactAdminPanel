import { useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import "./products.scss"
import Add from "../../components/add/Add";
import { products } from "../../data";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'img',
        headerName: 'Image',
        width: 100,
        renderCell: (params) => {
            return <img src={params.row.img || "/noavatar.png"} alt="" />
        },
    },
    {
        field: 'title',
        type: "string",
        headerName: 'Title',
        width: 100,
    },
    {
        field: 'color',
        type: "string",
        headerName: 'Color',
        width: 100,
    },
    {
        field: 'price',
        headerName: 'Price',
        type: 'string',
        width: 100,
    },
    {
        field: 'producer',
        type: "string",
        headerName: 'Producer',
        width: 100,
    },

    {
        field: 'createdAt',
        headerName: 'created At',
        type: 'string',
        width: 100,
    },
    {
        field: 'inStock',
        headerName: 'In Stock',
        type: 'boolean',
        width: 100,
    },

];

const Products = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="products">
            <div className="info">
                <h1>Products</h1>
                <button onClick={() => setOpen(true)}>Add new products</button>
            </div>
            <DataTable slug="products" columns={columns} rows={products} />
            {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
        </div>
    )
}

export default Products;
