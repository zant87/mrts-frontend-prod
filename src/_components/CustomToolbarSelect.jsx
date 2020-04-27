import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from "@material-ui/core/styles";
import {MDBIcon, MDBTooltip} from "mdbreact";
import {history} from "@/_helpers";

const defaultToolbarSelectStyles = {
    iconButton: {
    },
    iconContainer: {
        marginRight: "24px",
    },
    inverseIcon: {
        transform: "rotate(90deg)",
    },
};

class CustomToolbarSelect extends React.Component {

    handleClickInverseSelection = () => {
        const nextSelectedRows = this.props.displayData.reduce((nextSelectedRows, _, index) => {
            if (!this.props.selectedRows.data.find(selectedRow => selectedRow.index === index)) {
                nextSelectedRows.push(index);
            }

            return nextSelectedRows;
        }, []);

        this.props.setSelectedRows(nextSelectedRows);
    };

    handleClickDeselectAll = () => {
        this.props.setSelectedRows([]);
    };

    handleClickBlockSelected = () => {
        const rowIndex = this.props.selectedRows.data.map(row => row.dataIndex);
        const rowId = this.props.displayData[rowIndex].data[0];
        console.log(`Посылаем в форму редактирования URL: ${history.location.pathname}/${rowId}`);
        console.log(this.props.displayData[rowIndex].data);
        history.push(`${history.location.pathname}/${rowId}`, this.props.displayData[rowIndex].data);
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.iconContainer}>
                <Tooltip title={"Редактировать"}>
                    <IconButton className={classes.iconButton} onClick={this.handleClickBlockSelected}>
                        <EditIcon className={classes.icon} />
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default withStyles(defaultToolbarSelectStyles, { name: "CustomToolbarSelect" })(CustomToolbarSelect);
