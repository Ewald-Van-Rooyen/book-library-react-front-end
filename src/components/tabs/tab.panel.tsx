import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React from "react";

interface TabPanelPropsInterface {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const TabPanel = (props: TabPanelPropsInterface) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

export default TabPanel;