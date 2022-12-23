import React from 'react';
import { useRecoilValue } from 'recoil';

import { LIGHT_GRAY } from '../../../../constants';
import { whatAtom } from '../../../../recoil/what-atom';
import { PreviewText } from '../PreviewText/PreviewText';

// The role of this component is to isolate state updates
export function What() {
    const what = useRecoilValue(whatAtom);

    if (!what) {
        return null;
    }

    return (
        <PreviewText
            title="WHAT"
            content={what}
            titleColor={LIGHT_GRAY}
        />
    );
}
