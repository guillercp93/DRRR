import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';

const propTypes = {
    baseColor: PropTypes.string,
    activeColor: PropTypes.string
},
    defaultProps = {
        baseColor: 'white',
        activeColor: 'green',
        overlayColor: 'rgba(255,255,255,0.3)'
    };

class FileUploader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            fileSrc: '',
            loaded: false,
            openModal: false,
            message: '',
        }

        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    onDragEnter(e) {
        this.setState({ active: true });
    }

    onDragLeave(e) {
        this.setState({ active: false });
    }

    onDragOver(e) {
        e.preventDefault();
    }

    onDrop(e) {
        e.preventDefault();
        this.setState({ active: false });
        this.onFileChange(e, e.dataTransfer.files[0]);
    }

    onFileChange(e, file) {
        file = file || e.target.files[0];
        const pattern = /(image)?(audio)?(text)?\/+/,
              reader = new FileReader();

        if (!file.type.match(pattern)) {
            this.setState({
                openModal: true,
                message: `The file is not a image, text or audio: ${file.type}`,
            });
            return;
        }
        
        if (file.size >= 1000000) {
            this.setState({
                openModal: true,
                message: `The file is too large to load. Must be less than 1MB`,
            });
            return;
        }

        this.setState({ loaded: false });
        reader.onload = (e) => {
            this.setState({
                fileSrc: reader.result,
                loaded: true,
                openModal: true,
                message: `The file "${file.name}" is ready to be sent.`
            });
            this.props.onChange(file);
        }

        reader.readAsDataURL(file);
    }

    getFileObject() {
        return this.refs.input.files[0];
    }

    getFileString() {
        return this.state.fileSrc;
    }

    render() {
        let state = this.state,
            props = this.props,
            labelClass = `uploader ${state.loaded && 'loaded'}`,
            borderColor = state.active ? props.activeColor : props.baseColor,
            iconColor = state.active
                ? props.activeColor
                : (state.loaded)
                    ? props.overlayColor
                    : props.baseColor;

        return (
            <label
                className={labelClass}
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
                style={{ outlineColor: borderColor }}>
                <Icon style={{ color: iconColor }}>cloud_upload</Icon>
                <input type="file" accept="audio/*,text/*,image/*" onChange={this.onFileChange} ref="input" />
                <Dialog open={this.state.openModal} onClose={() => this.setState({openModal: false})}>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.state.message}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </label>
        );
    }
}

FileUploader.propTypes = propTypes;
FileUploader.defaultProps = defaultProps;

export default FileUploader;
