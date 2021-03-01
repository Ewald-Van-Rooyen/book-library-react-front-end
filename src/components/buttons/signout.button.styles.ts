import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
    fab: {
        position: "absolute",
        top: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

export default useStyles;
