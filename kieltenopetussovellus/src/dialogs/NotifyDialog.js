import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
    DialogContainer,
    TitleContainer,
    DialogTitle,
    MessageContainer,
    DialogMessage,
    ButtonContainer,
    DialogButton
} from './DialogElements';

/*
props should contain title and message, for example

dialogprops = {
        title: "Title",
        message: "Message.",
    }
NotifyDialog(dialogprops);
*/

const ConfirmDialog = (props) => {
    const ui = ({ onClose }) => {

        const clickOk = () => {
            onClose()
        }

        return (
            <DialogContainer>
                <TitleContainer>
                    <DialogTitle>{props.title}</DialogTitle>
                </TitleContainer>
                <MessageContainer>
                    <DialogMessage>{props.message}</DialogMessage>
                </MessageContainer>
                <ButtonContainer>
                    <DialogButton onClick={() => clickOk()}>Ok</DialogButton>
                </ButtonContainer>
            </DialogContainer>
        )
    }

    return confirmAlert({
        customUI: ui
    })
}

export default ConfirmDialog;