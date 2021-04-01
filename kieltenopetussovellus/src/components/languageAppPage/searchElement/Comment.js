import React, { useState, useEffect } from 'react';
import { CommentContainer, InfoText } from "./ListenElements"


const Comment = (props) => {
    if (props.username && props.comment) {
    return (
        <CommentContainer>
            <InfoText>{props.username}:</InfoText>
            <InfoText>"{props.comment}"</InfoText>
        </CommentContainer>
    )
    }
    else {
        return (
            <CommentContainer><InfoText>No comments have been made</InfoText></CommentContainer>
        )
    }
}

export default Comment;