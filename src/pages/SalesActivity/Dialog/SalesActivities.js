import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
} from "@material-ui/core";
import "draft-js/dist/Draft.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import SalesActivityAPI from "../../../api/SalesActivityAPI";
import GenTable from "../../../components/GenTable/GenTable";
import SalesActivitiesDialog from "./SalesActivitiesDialog";
import {useStyles} from "./styles";


SalesActivities.propTypes = {
    customer_id: PropTypes.string.isRequired,
};

const columns = [
    {data: 'id', title: 'ID', width: 40},
    {data: 'subject', title: '主题', width: 60},
    {data: 'actvt_multi01', title: '跟进内容', width: 120},
    {data: 'plan_start_time', title: '计划开始时间', width: 80},
    {data: 'plan_end_time', title: '计划结束时间', width: 80},
    {data: 'start_time', title: '开始时间', width: 80},
    {data: 'end_time', title: '结束时间', width: 80},
]


function SalesActivities(props) {
    const classes = useStyles()

    return (
        <Card className={classes.SalesActivity}>
            <CardHeader title={"销售行动日志"}/>
            <CardContent>
                <Grid style={{height: '500px'}}>
                    <GenTable
                        settings={{
                            columns: columns,
                            rowHeights: 80,
                            readOnly: true,
                        }}
                        api={SalesActivityAPI.get_list_by_customer(props.customer_id)}
                        DetailDialog={SalesActivitiesDialog}
                    />
                </Grid>
            </CardContent>
        </Card>
    );
}

export default SalesActivities;