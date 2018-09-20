import React from 'react';
import {
    Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Zoom,
    Typography, Card, CardActions, IconButton, Icon, LinearProgress
} from '@material-ui/core';

class Multimedia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            onPlay: false,
            currentTime: 0,
        };
        this.handleClose = this.handleClose.bind(this);
        this.playSound = this.playSound.bind(this);
        this.toggleOnPlay = this.toggleOnPlay.bind(this);
    }

    componentDidMount() {
        const player = document.getElementById(this.props.id);
        if (player) {
            this.setState({
                player
            });
        }
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }

    toggleOnPlay(statusPlayer) {
        this.setState({
            onPlay: statusPlayer,
        });
    }

    playSound() {
        const {player} = this.state;
        if (player.paused || player.ended) {
            player.play();
        } else {
            player.pause();
        }
    }

    render() {
        return (
            <Paper style={{ textAlign: "center" }} >
                {
                    this.props.file.type.match(/(image)+/) ?
                        <img src={this.props.file.route} width="30%"
                            onClick={() => this.setState({ open: true })}
                            height="30%" alt={this.props.file.name} />
                        : this.props.file.type.match(/(audio)+/) ?
                            <Card>
                                <audio controls id={this.props.id}
                                    onPlay={() => this.toggleOnPlay(true)}
                                    onPause={() => this.toggleOnPlay(false)}
                                    onTimeUpdate={() => this.setState({
                                        currentTime: (this.state.player.currentTime/this.state.player.duration)*100
                                    })}>
                                    <source src={this.props.file.route} type={this.props.file.type} />
                                    Your browser does not support the audio element.
                                </audio>
                                <CardActions>
                                    <IconButton aria-label="Play/pause" onClick={this.playSound}>
                                        <Icon>
                                            {!this.state.onPlay ? 
                                                'play_circle_filled': 
                                                'pause_circle_filled'}
                                        </Icon>
                                    </IconButton>
                                </CardActions>
                                <LinearProgress color="primary" variant="determinate" 
                                                value={this.state.currentTime} />
                            </Card>
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
                            <img src={this.props.file.route} width="100%" height="100%" alt="img1" />
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