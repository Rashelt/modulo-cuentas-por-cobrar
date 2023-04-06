import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { Table, IconButton, Pagination } from "rsuite";
import { v4 } from "uuid";
import PencilIcon from "@rsuite/icons/legacy/Pencil";
import HistoryIcon from "@rsuite/icons/legacy/History";
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
        showHistory,
    } = props;
    const history = useHistory();
    const [sortColumn, setSortColumn] = React.useState();
    const [sortType, setSortType] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);
    const [data, setData] = React.useState([]);
    const [count, setCount] = React.useState();

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
                {showHistory && (
                    <IconButton
                        appearance="subtle"
                        icon={<HistoryIcon />}
                        onClick={() =>
                            history.push(`${redirectUrl}/history/${rowData.id}`)
                        }
                    />
                )}
                <IconButton appearance="subtle" icon={<TrashIcon />} />
            </Cell>
        );
    };

    useMount(async () => {
        await fetchData();
    });

    const fetchData = async () => {
        const { data, count } = await get(endpoint, {
            params: {
                skip: page,
                take: limit,
            },
        });
        setCount(count);
        if (formatData && typeof formatData === "function") {
            setData(formatData(data));
            return;
        }
        setData(data);
    };

    useImperativeHandle(ref, () => ({
        refresh: fetchData,
    }));

    useEffect(() => {
        fetchData();
    }, [page, limit]);

    const handleChangeLimit = (dataKey) => {
        setPage(1);
        setLimit(dataKey);
    };

    return (
        <div>
            <div style={{ marginBottom: 5 }}>
                <button className="btn btn-light" onClick={() => fetchData()}>
                    <i className="bx bx-refresh bx-spin font-size-16 align-middle me-2"></i>
                    Refresh
                </button>
            </div>
            <Table
                height={300}
                data={data}
                autoHeight
                affixHeader
                id="table"
                bordered
                cellBordered
                sortColumn={sortColumn}
                sortType={sortType}
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
                    total={count}
                    limitOptions={[10, 15]}
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
    showHistory: false
};
