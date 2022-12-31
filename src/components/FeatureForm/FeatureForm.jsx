import { Grid, Paper, Typography } from '@mui/material';

import { LIGHT_GRAY } from '../../constants';

import { FormDelimiterLine } from '../form/FormDelimiterLine';

import {
    Dependencies, Editions, FeatureFlag,
    ImpactedProjects, InputListCriteria, InputWhat,
    RequiresAutomation, TechnicalGuidance, TestScenarios,
} from './components';

// TODO -> when on an input list and pressing enter on an input different than the last one
//         should focus on the next input

export default function FeatureForm() {
    // TODO -> when focused element is close to screen edge, scroll into view
    // TODO -> when last input is focused and empty, and ESC is pressed
    //         delete the input and focus on next element in form

    return (
        <Paper
            style={{
                margin: '0 auto',
                maxWidth: '800px',
                padding: '24px 24px 100px',
                backgroundColor: `${LIGHT_GRAY}08`,
            }}
            elevation={3}
        >
            <Typography variant="h2" paddingBottom="32px">
                Feature Form
            </Typography>
            <Grid container spacing={3}>
                <InputWhat />
                <FormDelimiterLine />
                <InputListCriteria />
                <FormDelimiterLine />
                <TechnicalGuidance />
                <Dependencies />
                <FeatureFlag />
                <ImpactedProjects />
                <FormDelimiterLine />
                <Editions />
                <TestScenarios />
                <FormDelimiterLine />
                <RequiresAutomation />
            </Grid>
        </Paper>
    );
}
