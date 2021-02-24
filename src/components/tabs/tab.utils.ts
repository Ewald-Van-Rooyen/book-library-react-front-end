class TabUtils {

    /**
     * Create the element attributes required by browsers
     * @param index
     */
    a11yProps(index: number | string) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

}

export default TabUtils;

