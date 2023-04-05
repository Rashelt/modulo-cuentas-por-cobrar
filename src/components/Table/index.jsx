import React, { forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
// import { redirect  } from "react-router-dom";
import { Table, IconButton, Pagination } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { v4 } from "uuid";
import PencilIcon from "@rsuite/icons/legacy/Pencil";
import TrashIcon from "@rsuite/icons/legacy/Trash";
import { get } from "../../helpers/axiosClient";
import { useMount } from "react-use";
import { useHistory } from "react-router-dom";

const { Column, HeaderCell, Cell } = Table;

export const CustomTable = forwardRef((props, ref) => {
    const {
        columns,
        showActions,
        endpoint,
        redirectUrl,
        formatData,
        showEdit,
    } = props;
    const history = useHistory();
    const [sortColumn, setSortColumn] = React.useState();
    const [sortType, setSortType] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);
    const [data, setData] = React.useState([]);

    const ActionCell = ({ rowData, dataKey, ...props }) => {
        return (
            <Cell
                {...props}
                style={{
                    padding: 0,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {showEdit && (
                    <IconButton
                        appearance="subtle"
                        icon={<PencilIcon />}
                        onClick={() =>
                            history.push(`${redirectUrl}/${rowData.id}`)
                        }
                    />
                )}
                <IconButton appearance="subtle" icon={<TrashIcon />} />
                {/* <IconButton appearance="subtle" icon={<PdfIcon />} /> */}
            </Cell>
        );
    };

    useMount(async () => {
        await fetchData();
    });

    const fetchData = async () => {
        const data = await get(endpoint);
        if (formatData && typeof formatData === "function") {
            setData(formatData(data));
            return;
        }
        setData(data);
    };

    useImperativeHandle(ref, () => ({
        refresh: fetchData,
    }));

    const handleChangeLimit = (dataKey) => {
        setPage(1);
        setLimit(dataKey);
    };

    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };

    const tableData = data.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

    return (
        <div>
            <Table
                height={300}
                data={tableData}
                autoHeight
                affixHeader
                id="table"
                bordered
                cellBordered
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                loading={loading}
            >
                {(columns || []).map((column) => {
                    return (
                        <Column
                            width={100}
                            key={v4()}
                            align="center"
                            // resizable
                            flexGrow={1}
                            sortable
                        >
                            <HeaderCell>{column.name}</HeaderCell>
                            <Cell>{(rowData) => rowData[column.field]}</Cell>
                        </Column>
                    );
                })}
                {showActions && (
                    <Column width={120} align="center">
                        <HeaderCell>Actions</HeaderCell>
                        <ActionCell dataKey="id" />
                    </Column>
                )}
            </Table>
            <div style={{ padding: 20 }}>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    maxButtons={5}
                    size="xs"
                    layout={["total", "-", "limit", "|", "pager", "skip"]}
                    total={data.length}
                    limitOptions={[10, 25, 50]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                />
            </div>
        </div>
    );
});

CustomTable.defaultProps = {
    showEdit: true,
};
