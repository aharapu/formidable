import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { FormidableLogo } from '../../assets/FormidableLogo';
import {
    BUG_PAGE,
    currentPage,
    FEATURE_PAGE,
    HOME_PAGE,
} from '../../constants';

export function LayoutForm({ form, preview }) {
    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100vw',
        }}>
            <div
                id="banner-container"
                style={{
                    height: '68px',
                    backgroundColor: '#F3F5F6',
                    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    flex: '1 1 100vw',
                }}
            >
                <FormidableLogo
                    style={{ height: '42px', marginLeft: '-24px', marginTop: '4px' }}
                />
            </div>
            <Menu />
            <div
                id="content-container"
                style={{
                    width: '46vw',
                    paddingTop: '48px',
                    paddingBottom: '38vh',
                }}
            >
                {form}
            </div>
            <div
                id="preview-container"
                style={{
                    width: '33vw',
                    minHeight: '550px',
                    position: 'sticky',
                    top: '0px',
                    paddingTop: '24px',
                }}
            >
                {preview}
            </div>
        </div>
    );
}

LayoutForm.propTypes = {
    form : PropTypes.element.isRequired,
    preview: PropTypes.element.isRequired,
};

const Menu = () => {
    const [page, setPage] = useRecoilState(currentPage);

    return (
        <div
            id="menu-container"
            style={{
                flex: '0 0 11vw',
                position: 'sticky',
                top: '0px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography
                onClick={() => setPage(HOME_PAGE)}
                style={{
                    cursor: 'pointer',
                    padding: '16px',
                    backgroundColor: page === HOME_PAGE ? 'rgba(0, 0, 0, 0.04)' : undefined,
                }}
            >
                Back to Home
            </Typography>
            <Typography
                onClick={() => setPage(FEATURE_PAGE)}
                style={{
                    cursor: 'pointer',
                    padding: '16px',
                    backgroundColor: page === FEATURE_PAGE ? 'rgba(0, 0, 0, 0.04)' : undefined,
                }}
            >
                Create a Feature
            </Typography>
            <Typography
                onClick={() => setPage(BUG_PAGE)}
                style={{
                    cursor: 'pointer',
                    padding: '16px',
                    backgroundColor:
                        page === BUG_PAGE ? 'rgba(0, 0, 0, 0.04)' : undefined,
                }}
            >
                Report a Bug
            </Typography>
        </div>
    );
};
