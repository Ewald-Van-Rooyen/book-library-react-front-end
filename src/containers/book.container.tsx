import React, {useContext} from "react";
import {BOOK_COLUMNS} from "../utils/setup/table.setup";
import DynamicTable from "../components/table/dynamic.table";
import {RowSelectedParams} from "@material-ui/data-grid";
import {BookInterface} from "../interfaces/models.interfaces";
import {GlobalContext} from "../context/global.state";

const BookContainer = () => {
    const {books, setSelectedRow} = useContext(GlobalContext);

    const onRowSelected = (param: RowSelectedParams) => {
        if (param.isSelected) {
            setSelectedRow(param.data as BookInterface);
        }
    };

    const mappedBooks = books.map((book:BookInterface)=>({...book,author: (book.author?.firstName || ""+book.author?.lastName), category: book.category?.name}));

    return (<>
        <DynamicTable
            columns={BOOK_COLUMNS}
            rows={mappedBooks}
            onRowSelectedCallback={onRowSelected}/>
    </>);
};

export default BookContainer;
