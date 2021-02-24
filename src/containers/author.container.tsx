import React, {useContext} from "react";
import {AUTHOR_COLUMNS} from "../utils/setup/table.setup";
import DynamicTable from "../components/table/dynamic.table";
import {RowSelectedParams} from "@material-ui/data-grid";
import {AuthorInterface} from "../interfaces/models.interfaces";
import {GlobalContext} from "../context/global.state";

const AuthorContainer = () => {
    const {authors, setSelectedRow} = useContext(GlobalContext);

    const onRowSelected = (param: RowSelectedParams) => {
        if (param.isSelected) {
            setSelectedRow(param.data as AuthorInterface);
        }
    };

    return (<>
        <DynamicTable
            columns={AUTHOR_COLUMNS}
            rows={authors}
            onRowSelectedCallback={onRowSelected}
        />
    </>);
};

export default AuthorContainer;