import React, {useContext} from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import {GlobalContext} from "../../context/global.state";
import {MODELS} from "../../utils/constants";
import AuthorForm from "../forms/author.form";
import {AuthorInterface, BookInterface, CategoryInterface, DialogTypeEnum} from "../../interfaces/models.interfaces";

interface DynamicDialogPropsInterface {
    isOpen: boolean;
    cancelCallback: () => void;
    actionType: DialogTypeEnum;
}

const generateModelForm = (activeModel: MODELS, closeModalCallback: () => void, selectedRow: null | AuthorInterface | CategoryInterface | BookInterface, actionType: DialogTypeEnum): React.ReactNode => {

    switch (activeModel) {
        case MODELS.AUTHOR:
            return <AuthorForm initialValues={actionType === DialogTypeEnum.EDIT ? selectedRow as AuthorInterface : null}
                               closeModalCallback={closeModalCallback}/>;
        case MODELS.BOOK:
            return null;
        case MODELS.CATEGORY:
            return null;
        default:
            return null;
    }
};

const DynamicDialog = (props: DynamicDialogPropsInterface) => {
    const {activeModel, selectedRow} = useContext(GlobalContext);

    return (<>
        <Dialog
            open={props.isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                {generateModelForm(activeModel, props.cancelCallback, selectedRow, props.actionType)}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.cancelCallback} color="primary" autoFocus>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    </>);
};

export default DynamicDialog;