import { useRecoilState } from 'recoil';
import { v4 as createId } from 'uuid';
import { Paper, Grid } from '@mui/material';

import {
    bugSummary,
    bugEnv, bugSteps, bugExpectedResult, bugActualResult, bugReproducible, bugIncludeScreenshots,
} from '../../constants';

import { InputList } from '../InputList';
import { FormTextField } from '../FormTextField';
import { FormCheckbox } from '../FormCheckbox';
import { LABLES, PLACEHOLDERS } from './bugFormConstants';

export default function BugForm() {
    const [summary, setSummary] = useRecoilState(bugSummary);
    const [env, setEnv] = useRecoilState(bugEnv);
    const [steps, setSteps] = useRecoilState(bugSteps);
    const [expectedResult, setExpectedResult] = useRecoilState(bugExpectedResult);
    const [actualResult, setActualResult] = useRecoilState(bugActualResult);
    const [reproducible, setReproducible] = useRecoilState(bugReproducible);
    const [includeScreenshots, setIncludeScreenshots] = useRecoilState(bugIncludeScreenshots);

    // TODO -> get DRY?
    const handleAddStep= (step) => {
        setSteps((prev) => [...prev, { id: createId(), value: step }]);
    };

    const handleDelStep = (stepId) => {
        setSteps((prevSteps) => prevSteps.filter((st) => st.id !== stepId));
    };

    const handleToggleFlag = (isVisible) => {
        if (!isVisible) {
            setReproducible('');
        }
    // TODO -> else restore previous state ("keep in ref")
    };

    const handleIncludeScreenshotsChange = (include) => {
        setIncludeScreenshots(include);
    };

    return (
        <Paper
            style={{ margin: '0 auto', maxWidth: '800px', padding: '20px' }}
            elevation={3}
        >
            <Grid container spacing={3}>
                <FormTextField
                    label={LABLES.summary}
                    placeholder={PLACEHOLDERS.summary}
                    multiline
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                />
                <FormTextField
                    label={LABLES.environmentAccounts}
                    placeholder={PLACEHOLDERS.environmentAccounts}
                    multiline
                    value={env}
                    onChange={(e) => setEnv(e.target.value)}
                />
                <InputList
                    textFieldLabel={LABLES.steps}
                    textFieldPlaceholder={PLACEHOLDERS.steps}
                    items={steps}
                    // TODO -> use an array and provide pseudorandom placeholders
                    // TODO -> if this is a function, it will auto switch to new random placeholder
                    onAdd={handleAddStep}
                    onDelete={handleDelStep}
                />
                <FormTextField
                    label={LABLES.expectedResult}
                    placeholder={PLACEHOLDERS.expectedResult}
                    multiline
                    value={expectedResult}
                    onChange={(e) => setExpectedResult(e.target.value)}
                />
                <FormTextField
                    label={LABLES.actualResult}
                    placeholder={PLACEHOLDERS.actualResult}
                    multiline
                    value={actualResult}
                    onChange={(e) => setActualResult(e.target.value)}
                />
                <FormTextField
                    label={LABLES.reproducible}
                    placeholder={PLACEHOLDERS.reproducible}
                    value={reproducible}
                    onChange={(e) => setReproducible(e.target.value)}
                    showToggle
                    toggleLabel={LABLES.reproducible}
                    onToggleChange={handleToggleFlag}
                />
                <FormCheckbox
                    label={LABLES.includeScreenshots}
                    value={includeScreenshots}
                    onChange={handleIncludeScreenshotsChange}
                />
            </Grid>
        </Paper>
    );
}
