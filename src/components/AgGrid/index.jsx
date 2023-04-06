import React, {
    forwardRef,
    useImperativeHandle,
    useMemo,
    useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import _ from "lodash";
import { selectionColumn } from "./customColumns";

export const AgGrid = forwardRef((props, ref) => {
    const { data, columns, gridOptions, showSelectColumn = true } = props;
    const [gridApi, setGridApi] = useState();
    const [, setColumnApi] = useState();

    useImperativeHandle(
        ref,
        () => ({
            getApi: () => gridApi,
            getRows: (ignoreColumns = []) => {
                const rowData = [];
                gridApi.forEachNode((node) => {
                    rowData.push(_.omit(node.data, ignoreColumns));
                });
                return rowData;
            },
        }),
        [gridApi]
    );

    const columnDefs = useMemo(() => {
        let colDefinitions = [...columns];
        if (showSelectColumn) {
            colDefinitions = [selectionColumn, ...columns];
        }
        return colDefinitions;
    }, [columns, showSelectColumn]);

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
            <div
                className="ag-theme-alpine"
                style={{ height: props.height || 350 }}
            >
                <AgGridReact
                    rowData={data}
                    columnDefs={columnDefs}
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
