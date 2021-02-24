import React, {useContext} from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import TabUtils from "./tab.utils";
import TabPanel from "./tab.panel";
import AuthorContainer from "../../containers/author.container";
import CategoryContainer from "../../containers/category.container";
import BookContainer from "../../containers/book.container";

import {GlobalContext} from "../../context/global.state";

const tabUtils = new TabUtils();

const TabsController = () => {
    const {activeModel, setActiveModel} = useContext(GlobalContext);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setActiveModel(newValue);
    };

    return (<>
            <AppBar position="static">
                {/* I could make this more dynamic */}
                <Tabs value={activeModel} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Authors" {...tabUtils.a11yProps(0)} />
                    <Tab label="Categories" {...tabUtils.a11yProps(1)} />
                    <Tab label="Books" {...tabUtils.a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={activeModel} index={0}>
                <AuthorContainer/>
            </TabPanel>
            <TabPanel value={activeModel} index={1}>
                <CategoryContainer/>
            </TabPanel>
            <TabPanel value={activeModel} index={2}>
                <BookContainer/>
            </TabPanel>
        </>
    )
};

export default TabsController;