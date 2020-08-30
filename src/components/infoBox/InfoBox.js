import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core"
import "./InfoBox.css";
import { prettyPrintStat } from "../../utils";

const InfoBox = ({ title, cases, total, active, isRed, ...props }) => {
    return (
        <Card
            className={`infoBox ${active && "infoBox--selected"}`}

            onClick={props.onClick}>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className="infoBox__cases">{cases ? prettyPrintStat(cases) : cases} </h2>

                <Typography className="infoBox__total" color="textSecondary">
                    {total ? prettyPrintStat(total) : total} Total
            </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;
