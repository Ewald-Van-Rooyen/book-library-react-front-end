import React, {useContext, useState} from "react";

import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {MODELS, URLS} from "../../utils/constants";
import {GlobalContext} from "../../context/global.state";
import {
    AuthorInterface,
    BookInterface,
    CategoryInterface,
    DialogTypeEnum
} from "../../interfaces/models.interfaces";
import DynamicDialog from "../dialog/dynamic.dialog";
import {useMutation} from "react-query";
import axios from "axios";
import ValidationUtils from "../../utils/ValidationUtils";


const FloatingButtons = () => {

    const {selectedRow, activeModel, removeAuthor, removeCategory, removeBook, token} = useContext(GlobalContext);
    const [isOpen, setIsOpen] = useState(false);
    const [dialogAction, setDialogAction] = useState(DialogTypeEnum.ADD);

    const mutation = useMutation(async (id: string | number) => {
        let activeModelUrl = "";
        // TODO move to method
        switch (activeModel) {
            case MODELS.AUTHOR:
                activeModelUrl = URLS.AUTHOR;
                break;
            case MODELS.BOOK:
                activeModelUrl = URLS.BOOK;
                break;
            case MODELS.CATEGORY:
                activeModelUrl = URLS.CATEGORY;
                break;
            default:
                activeModelUrl = "";
                break;
        }

        const {data} = await axios.delete(`${activeModelUrl}/${id}`, ValidationUtils.generateAuthHeaders(token));
        return data;
    }, {
        onSuccess: () => {
            removeAuthor((selectedRow as AuthorInterface).id);
            switch (activeModel) {
                case MODELS.AUTHOR:
                    removeAuthor((selectedRow as AuthorInterface).id);
                    break;
                case MODELS.BOOK:
                    removeBook((selectedRow as BookInterface).id);
                    break;
                case MODELS.CATEGORY:
                    removeCategory((selectedRow as CategoryInterface).id);
                    break;
                default:
                    break;
            }
        }
    });

    const closeCallback = () => {
        setIsOpen(false);
    };

    const openEditDialog = () => {
        setIsOpen(!!selectedRow);
        setDialogAction(DialogTypeEnum.EDIT)
    };

    const openAddDialog = () => {
        setIsOpen(true);
        setDialogAction(DialogTypeEnum.ADD)
    };

    const deleteContent = (): void => {
        if (selectedRow) {
            // call delete api here
            switch (activeModel) {
                case MODELS.AUTHOR:
                    mutation.mutate((selectedRow as AuthorInterface).id);
                    break;
                case MODELS.BOOK:
                    mutation.mutate((selectedRow as BookInterface).id);
                    break;
                case MODELS.CATEGORY:
                    mutation.mutate((selectedRow as CategoryInterface).id);
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <>
            <Grid container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                  spacing={2}>
                <Grid item>
                    <Fab onClick={openAddDialog} color="primary" aria-label="add">
                        <AddIcon/>
                    </Fab>
                </Grid>
                <Grid item>
                    <Fab onClick={openEditDialog} color="primary" aria-label="edit">
                        <EditIcon/>
                    </Fab>
                </Grid>
                <Grid item>
                    <Fab onClick={deleteContent} color="secondary" aria-label="edit">
                        <DeleteIcon/>
                    </Fab>
                </Grid>
            </Grid>
            <DynamicDialog isOpen={isOpen} cancelCallback={closeCallback} actionType={dialogAction}/>
        </>
    );
};

export default FloatingButtons;

