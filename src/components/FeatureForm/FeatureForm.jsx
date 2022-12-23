import { Grid, Paper, Typography } from '@mui/material';

import { FormDelimiterLine } from '../form/FormDelimiterLine';

import { InputWhat } from './components/InputWhat/InputWhat';
import { InputListCriteria } from './components/InputListCriteria/InputListCriteria';
import { TechnicalGuidance } from './components/TechnicalGuidance/TechnicalGuidance';
import { Dependencies } from './components/Dependencies/Dependencies';
import { FeatureFlag } from './components/FeatureFlag/FeatureFlag';
import { ImpactedProjects } from './components/ImpactedProjects/ImpactedProjects';
import { Editions } from './components/Editions/Editions';
import { TestScenariosV3 } from './components/TestScenariosV3/TestScenariosV3';
import { RequiresAutomation } from './components/RequiresAutomation/RequiresAutomation';
import { LIGHT_GRAY } from '../../constants';

// TODO -> when typing while focused on an icon, switch focus to an input and append the key pressed
// TODO -> pressing delete should move focuse to somewhere relevant
// TODO -> when on an input list and pressing enter on an input different than the last one
//         should focus on the next input

// TODO -> multiple inputs on the screen trigger numerous rerenders
//         perhaps use formik to manage state?
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
                <TestScenariosV3 />
                <FormDelimiterLine />
                <RequiresAutomation />
            </Grid>
        </Paper>
    );
}
