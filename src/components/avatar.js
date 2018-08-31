import React from 'react';

const Avatar = (props) => {
    const style = {};
    if (props.onClick) {
        style.cursor = 'pointer';
    }
    if (props.color) {
        style.backgroundColor = props.color;
    }
    
    return (
        <figure className="Avatar" onClick={props.onClick} style={style}>
            <img src={props.src} alt={props.alt} width={props.width} height={props.height} />
        </figure>
    );
};

export default Avatar;