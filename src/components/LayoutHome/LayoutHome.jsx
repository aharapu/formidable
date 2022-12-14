import React from 'react';
import { Button, Typography, Paper } from '@mui/material';
import { useRecoilState } from 'recoil';

import { FormidableLogo } from '../../assets/FormidableLogo';

import { BUG_PAGE, FEATURE_PAGE } from '../../constants';
import { navigationAtom } from '../../recoil/atoms/navigation';
import PageHeader from '../PageHeader/PageHeader';

export default function LayoutHome() {
    const [, setPage] = useRecoilState(navigationAtom);

    return (
        <>
            <PageHeader />
            <div
                id="options-container"
                style={{
                    height: 'calc(100vh - 120px)',
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <FormidableLogo style={{ padding: '96px 0' }} />
                <Paper
                    style={{
                        width: '472px',
                        minHeight: '200px',
                    }}
                    elevation={3}
                >
                    <Typography
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        variant="h4"
                        style={{ height: '60px', backgroundColor: '#F3F5F6' }}
                    >
                        What do you want to do?
                    </Typography>
                    <div
                        style={{
                            display: 'flex',
                            height: '140px',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: '#172F4D',
                                width: '190px',
                                height: '42px',
                            }}
                            onClick={() => setPage(FEATURE_PAGE)}
                            fullWidth
                        >
                            CREATE A FEATURE
                        </Button>
                        <Button
                            variant="contained"
                            color={'error'}
                            style={{
                                backgroundColor: '#ED6C02',
                                width: '190px',
                                height: '42px',
                            }}
                            onClick={() => setPage(BUG_PAGE)}
                            fullWidth
                        >
                            REPORT A BUG
                        </Button>
                    </div>
                </Paper>
            </div>
        </>
    );
}
