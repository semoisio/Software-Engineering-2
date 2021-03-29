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
props should contain title, message and clickOk method, for example

dialogprops = {
        title: "Title",
        message: "Message.",
        clickOk: () => {
            console.log(clickedOk)
        }
    }
ConfirmDialog(dialogprops);
*/

const ConfirmDialog = (props) => {
        const ui = ({ onClose }) => {

            const clickOk = () => {
                props.clickOk();
                onClose()
            }

            const clickCancel = () => {
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
                        <DialogButton onClick={() => clickCancel()}>Cancel</DialogButton>
                    </ButtonContainer>
                </DialogContainer>
            )
        }

        return confirmAlert({
            customUI: ui
        })
    }

export default ConfirmDialog;