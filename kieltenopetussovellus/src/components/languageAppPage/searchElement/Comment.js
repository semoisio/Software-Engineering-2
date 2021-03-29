import React, { useState, useEffect } from 'react';
import { CommentContainer, InfoText } from "./ListenElements"


const Comment = (props) => {
    useEffect(() => {
        console.log(props);
    }, [])
    return (
        <CommentContainer>
            <InfoText>{props.username}:</InfoText>
            <InfoText>{props.comment}</InfoText>
        </CommentContainer>
    )
}

export default Comment;