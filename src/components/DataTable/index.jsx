import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable(props) {
    const { data, columns } = props;

    return (
        <Box sx={{ height: 520, width: "100%" }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                columnHeaderHeight={36}
                rowHeight={36}

                // slots={{ toolbar: GridToolbar }}
            />
        </Box>
    );
}
