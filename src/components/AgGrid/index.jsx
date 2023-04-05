import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { Col } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
import { AgGridReact } from "ag-grid-react";

export const AgGrid = forwardRef((props, ref) => {
    const [gridApi, setGridApi] = useState();
    const [columnApi, setColumnApi] = useState();
    const { data, columns, gridOptions } = props;

    useImperativeHandle(
        ref,
        () => ({
            getApi: () => gridApi,
        }),
        []
    );
    return (
        <div>
            <div style={{ marginBottom: 5 }}>
                <button
                    type="button"
                    className="btn btn-primary  btn-label"
                    onClick={() => {
                        const emptyRow = columns
                            .map((column) => column.field)
                            .reduce((accumulator, value) => {
                                return { ...accumulator, [value]: "" };
                            }, {});
                        gridApi.applyTransaction({
                            add: [{ isNewRow: true, ...emptyRow }],
                        });
                    }}
                >
                    <i className="bx bx-plus label-icon"></i> Agregar fila
                </button>
            </div>
            <div className="ag-theme-alpine" style={{ height: props.height || 350 }}>
                <AgGridReact
                    ref={ref}
                    rowData={data}
                    columnDefs={columns}
                    defaultColDef={{
                        flex: 1,
                    }}
                    onGridReady={(params) => {
                        setGridApi(params.api);
                        setColumnApi(params.columnApi);
                    }}
                    headerHeight={35}
                    rowHeight={35}
                    gridOptions={{
                        animateRows: true,
                        enableCharts: true,
                        ...gridOptions,
                    }}
                />
            </div>
        </div>
    );
});
