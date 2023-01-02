import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

import { PIXEL_SIZES } from '../../common/size-constants';
import { getPixelsFromSize } from '../../common/size-utils';

import { DelimiterLine } from '../DelimiterLine';

export function FormDelimiterLine({ topGap = 'large', bottomGap = 'tiny', isVisible = true }) {
    const paddingTop = getPixelsFromSize(topGap);
    const paddingBottom = getPixelsFromSize(bottomGap);

    return (
        <Grid item xs={12} style={{ paddingTop, paddingBottom }} >
            {isVisible && <DelimiterLine />}
        </Grid>
    );
}

FormDelimiterLine.propTypes = {
    topGap: PropTypes.oneOf(PIXEL_SIZES),
    bottomGap: PropTypes.oneOf(PIXEL_SIZES),
    isVisible: PropTypes.bool,
};
