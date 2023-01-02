import React from 'react';
import { useRecoilValue } from 'recoil';

import { LIGHT_GRAY } from '../../../../constants';
import { whatAtom } from '../../../../recoil/atoms/what';
import { PreviewText } from '../PreviewText/PreviewText';

// The role of this component is to isolate state updates
export function What() {
    const what = useRecoilValue(whatAtom);

    if (!what.value) {
        return null;
    }

    return (
        <PreviewText
            title="WHAT"
            content={what.value}
            titleColor={LIGHT_GRAY}
            isErrored={Boolean(what.error)}
        />
    );
}
