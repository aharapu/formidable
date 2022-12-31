import { useRecoilCallback } from 'recoil';
import { getScenarioAtom } from '../recoil/scenarios';

export function useFocus() {
    const focusScenarioName = useRecoilCallback(
        ({ snapshot }) =>
            (scenarioId) => {
                const scenario = snapshot.getLoadable(getScenarioAtom(scenarioId)).contents;
                console.log('scenario.nameInputId', scenario.nameInputId);
                focusInput(scenario.nameInputId);
            },
        [],
    );

    const focusScenarioInput = useRecoilCallback(
        ({ snapshot }) =>
            ({ scenarioId, sectionType, index }) => {
                const scenario = snapshot.getLoadable(getScenarioAtom(scenarioId)).contents;
                const section = scenario[sectionType];
                const inputId = section[index];
                focusInput(inputId);
            },
        [],
    );

    return {
        focusScenarioInput,
        focusScenarioName,
    };
}

export function focusInput(id) {
    const input = document.getElementById(id);

    if (!input) {
        console.warn('Input not found', id);
        return;
    }

    const end = input.value.length;
    input.setSelectionRange(end, end);
    input.focus();
}
