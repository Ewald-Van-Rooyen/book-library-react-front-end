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
import ValidationUtils from "../../utils/validation.utils";
import {Tooltip} from "@material-ui/core";
import ErrorMessage from "../ui/error.message";

const FloatingButtons = () => {

    const {selectedRow, activeModel, removeAuthor, removeCategory, removeBook, token, activeUser} = useContext(GlobalContext);
    const [isOpen, setIsOpen] = useState(false);
    const [dialogAction, setDialogAction] = useState(DialogTypeEnum.ADD);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

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

        const {data} = await axios.delete(`${activeModelUrl}/${id}`, ValidationUtils.generateAuthHeaders(token, activeUser));
        return data;
    }, {
        onSuccess: () => {
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

            setShowErrorMessage(false);
        },
        onError: (error) => {
            setShowErrorMessage(true);
        }
    });

    const closeCallback = () => {
        setIsOpen(false);
    };

    const openEditDialog = () => {
        setIsOpen(!!selectedRow);
        setDialogAction(DialogTypeEnum.EDIT);
    };

    const openAddDialog = () => {
        setIsOpen(true);
        setDialogAction(DialogTypeEnum.ADD);
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
                    <Tooltip title="Add" aria-label="add">
                        <Fab onClick={openAddDialog} color="primary" aria-label="add">
                            <AddIcon/>
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Tooltip title="Edit" aria-label="edit">
                        <Fab onClick={openEditDialog} color="primary" aria-label="edit">
                            <EditIcon/>
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Tooltip title="Delete" aria-label="delete">
                        <Fab onClick={deleteContent} color="secondary" aria-label="edit">
                            <DeleteIcon/>
                        </Fab>
                    </Tooltip>
                </Grid>
            </Grid>
            <DynamicDialog isOpen={isOpen} cancelCallback={closeCallback} actionType={dialogAction}/>
            {showErrorMessage && <ErrorMessage message={"Delete action could not be completed"}/>}
        </>
    );
};

export default FloatingButtons;

