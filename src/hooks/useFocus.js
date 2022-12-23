import { useRecoilCallback } from 'recoil';
import { getScenarioAtom } from '../recoil/scenarios';

export function useFocus() {
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
    };
}

export function focusInput(id) {
    const input = document.getElementById(id);
    input.focus();
}
