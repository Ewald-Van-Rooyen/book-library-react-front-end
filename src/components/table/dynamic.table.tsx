import React from "react";
import {ColDef, DataGrid, RowSelectedParams} from "@material-ui/data-grid";

export interface DynamicTablePropsInterface {
    columns: Array<ColDef>;
    rows: Array<object>;
    onRowSelectedCallback: (param: RowSelectedParams) => void;
}

const DynamicTable = (props: DynamicTablePropsInterface) => {

    return (
        <div style={{height: 400, width: "100%"}}>
            <DataGrid
                rows={props.rows}
                columns={props.columns}
                pageSize={5}
                onRowSelected={props.onRowSelectedCallback}/>
        </div>
    );
};

export default DynamicTable;
