import React from 'react';
import { Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Zoom, Typography } from '@material-ui/core';

class Multimedia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }

    render() {
        return (
            <Paper style={{ textAlign: "center" }} >
                {
                    this.props.file.type.match(/(image)+/) ?
                        <img src={this.props.file.route} width="30%"
                            onClick={() => this.setState({open: true})}
                            height="30%" alt={this.props.file.name} />
                    : this.props.file.type.match(/(audio)+/) ?
                        <audio controls>
                            <source src={this.props.file.route} type={this.props.file.type} />
                            Your browser does not support the audio element.
                        </audio>
                    : null
                }
                <Dialog open={this.state.open} onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-image" maxWidth="md"
                    TransitionComponent={Zoom}>
                    <DialogTitle id="responsive-dialog-image">
                        <Typography noWrap={true} variant="headline" align="left">
                            {this.props.text}
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <figure>
                            <img src={this.props.file.route} width="100%" height="100%"/>
                        </figure>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        );
    }
}

export default Multimedia;