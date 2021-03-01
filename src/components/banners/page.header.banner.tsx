import Typography from "@material-ui/core/Typography";
import React from "react";

interface PageHeaderPropsInterface {
    title: string;
}

const PageHeader = (props: PageHeaderPropsInterface) => {
    return (
        <Typography component="h1" variant="h5">
            {props.title}
        </Typography>
    );
};

export default PageHeader;
