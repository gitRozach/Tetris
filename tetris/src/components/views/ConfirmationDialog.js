import Button from '../controls/Button';
import TextOutput from '../controls/TextOutput'
import { COLOR_FADE } from '../../constants/settingsConstants';

const ConfirmationDialog = (confirmationText, onConfirmedCallback, onRejectedCallback) => {
    return <div key={`confirmation-${confirmationText}-container`} style={{width: '100%', height: '100%'}}>
        <div style={{display: 'flex',  flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', rowGap: '4rem'}}>
            <TextOutput text={confirmationText} animationColor={COLOR_FADE} />
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', columnGap: '2rem'}}>
                <Button fontFamily="Exo 2" fontWeight="bold" fontSize="1.5em" width="10rem" height="3.3rem" callback={onConfirmedCallback} borderRadius={'5rem'}>Yes</Button>
                <Button fontFamily="Exo 2" fontWeight="bold" fontSize="1.5em" width="10rem" height="3.3rem" callback={onRejectedCallback} borderRadius={'5rem'}>No</Button>
            </div>
        </div>
    </div>
}

export default ConfirmationDialog;