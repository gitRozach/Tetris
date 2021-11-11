import { useState } from 'react';
import { createStage } from '../tetrisTools';

export const useStage = () => {
    const [stage, setStage] = useState(createStage());

    return [stage, setStage];
}