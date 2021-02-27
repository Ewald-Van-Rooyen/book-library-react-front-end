import React, {useContext} from "react";
import {CATEGORY_COLUMNS} from "../utils/setup/table.setup";
import DynamicTable from "../components/table/dynamic.table";
import {RowSelectedParams} from "@material-ui/data-grid";
import {CategoryInterface} from "../interfaces/models.interfaces";
import {GlobalContext} from "../context/global.state";


const CategoryContainer = () => {
    const {categories, setSelectedRow} = useContext(GlobalContext);

    const onRowSelected = (param: RowSelectedParams) => {
        if (param.isSelected) {
            setSelectedRow(param.data as CategoryInterface);
        }
    };

    return (<>
        <DynamicTable columns={CATEGORY_COLUMNS}
                      rows={categories}
                      onRowSelectedCallback={onRowSelected}/>
    </>);
};

export default CategoryContainer;
