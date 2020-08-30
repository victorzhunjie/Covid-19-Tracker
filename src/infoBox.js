import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core"
import "./infoBox.css";
import CountUp from 'react-countup'

function InfoBox({ title, cases, total, active, isRed, ...props }) {
    return (
        <Card 
        className={`infoBox ${active && "infoBox--selected"}`}
        
        onClick={props.onClick}>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className="infoBox__cases">{cases} </h2>
                {/* <CountUp start={0} end={cases} duration={2.5} separator="," /> */}

                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
            </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
