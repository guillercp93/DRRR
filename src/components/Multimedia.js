import React from 'react';
import { Paper } from '@material-ui/core';

const Multimedia = ({ file }) => (
    <Paper style={{textAlign: "center"}} >
        {
            file.type.match(/(image)+/) ? 
                <img src={file.route} width="30%" height="30%" alt="ima1"/>
            : file.type.match(/(audio)+/) ?
                <audio controls>
                    <source src={file.route} type={file.type} />
                    Your browser does not support the audio element.
                </audio>
            : null
        }
    </Paper>
);

export default Multimedia;