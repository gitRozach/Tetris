import VerticalBox from '../container/VerticalBox';
import HorizontalBox from '../container/HorizontalBox';
import Button from '../controls/Button';
import TextOutput from '../controls/TextOutput';

const ConfirmationDialog = (confirmationText, onConfirmedCallback, onRejectedCallback) => {
    return <div>
        <VerticalBox>
            <TextOutput color="rgb(255, 255, 255)">{confirmationText}</TextOutput>
            <HorizontalBox>
                <Button callback={onConfirmedCallback}>Yes</Button>
                <Button callback={onRejectedCallback}>No</Button>
            </HorizontalBox>
        </VerticalBox>
    </div>
}

export default ConfirmationDialog;