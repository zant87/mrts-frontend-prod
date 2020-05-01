import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import {history} from "@/_helpers";

class CustomToolbar extends React.Component {

    onHandleCreateClick = () => {
        history.push(`${history.location.pathname}/create`);
    };

    onHandleInitClick = () => {
        history.push(`${history.location.pathname}/init`);
    };

    render() {

        return (
            <React.Fragment>
                <Tooltip title={"Создать документ основание"}>
                    <IconButton onClick={this.onHandleCreateClick}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Инициализировать отчеты исполнителей по мероприятиям"}>
                    <IconButton onClick={this.onHandleInitClick}>
                        <NoteAddIcon />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        );
    }

}

export default CustomToolbar;
