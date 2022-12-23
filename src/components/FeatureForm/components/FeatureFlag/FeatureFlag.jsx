import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { featureFlagAtom, ORANGE } from '../../../../constants';
import { FormDelimiterLine } from '../../../form/FormDelimiterLine';
import { FormSwitchButton } from '../../../FormSwitchButton/FormSwitchButton';
import { FormTextField } from '../../../FormTextField/FormTextField';
import { LABLES, PLACEHOLDERS } from '../../featureFormConstants';

export function FeatureFlag() {
    const [showInput, setShowInput] = useState(false);

    const [featureFlag, setFeatureFlag] = useRecoilState(featureFlagAtom);

    const cachedFeatureFlag = useRef(featureFlag);

    const handleToggleFlag = () => {
        // cache state in a ref when hiding
        const isHiding = showInput;

        if (isHiding) {
            cachedFeatureFlag.current = featureFlag;
        }

        const flagToSet = isHiding ? '' : cachedFeatureFlag.current;

        setFeatureFlag(flagToSet);
        setShowInput((prev) => !prev);
    };

    return (
        <>
            <FormSwitchButton
                label={LABLES.flagToggle}
                value={showInput}
                onChange={handleToggleFlag}
                checkedColor={ORANGE}
            />
            {
                showInput && (
                    <FormTextField
                        label={LABLES.flagInput}
                        placeholder={PLACEHOLDERS.flagInput}
                        value={featureFlag}
                        onChange={(e) => setFeatureFlag(e.target.value)}
                        showToggle
                        toggleLabel={LABLES.flagToggle}
                        topGap="tiny"
                    />
                )
            }
            <FormDelimiterLine isVisible={showInput} bottomGap={showInput ? 'huge' : 'tiny'} />
        </>
    );
}
