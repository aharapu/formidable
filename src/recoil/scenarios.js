import { atom, useRecoilCallback, selector } from 'recoil';
import { v4 as createId } from 'uuid';
import { RECOIL_KEY, SCENARIO_SECTION } from './constants';
import { addInput, inputAtoms } from './atoms/inputs';

const scenarioAtoms = {};

export const testScenariosAtom = atom({
    key: RECOIL_KEY.scenario.atom.testScenarios,
    default: [],
});

export const getScenarioAtom = (scenarioId) => {
    const scenarioAtom = scenarioAtoms[scenarioId];

    if (!scenarioAtom) {
        throw new Error(`Scenario with id ${scenarioId} does not exist`);
    }

    return scenarioAtom;
};

export function useScenarios() {
    const addScenario = useRecoilCallback(({ snapshot, set }) => () => {
        const id = createId();

        if (scenarioAtoms[id]) {
            throw new Error(`Scenario with id ${id} already exists`);
        }

        const newScenario = {
            id,
            nameInputId: addInput(),
            [SCENARIO_SECTION.GIVEN]: [addInput()],
            [SCENARIO_SECTION.WHEN]: [addInput()],
            [SCENARIO_SECTION.THEN]: [addInput()],
        };

        scenarioAtoms[id] = atom({
            key: RECOIL_KEY.scenario.atom.prefix + id,
            default: newScenario,
        });

        const testScenarios = snapshot.getLoadable(testScenariosAtom).contents;

        set(testScenariosAtom, [...testScenarios, id]);
        return id;
    });

    const removeScenario = useRecoilCallback(({ snapshot, set }) => (scenarioId) => {
        const scenarioAtom = scenarioAtoms[scenarioId];

        if (!scenarioAtom) {
            throw new Error(`Scenario with id ${scenarioId} does not exist`);
        }

        const testScenarios = snapshot.getLoadable(testScenariosAtom).contents;

        set(
            testScenariosAtom,
            testScenarios.filter((id) => id !== scenarioId),
        );

        delete scenarioAtoms[scenarioId];
    });

    const addScenarioInput = useRecoilCallback(({ snapshot, set }) => ({ scenarioId, sectionType, position }) => {
        const scenarioAtom = scenarioAtoms[scenarioId];

        if (!scenarioAtom) {
            throw new Error(`Scenario with id ${scenarioId} does not exist`);
        }

        if (!Object.values(SCENARIO_SECTION).includes(sectionType)) {
            throw new Error(`Invalid section type ${sectionType}`);
        }

        const scenario = snapshot.getLoadable(scenarioAtom).contents;

        const inputId = addInput();

        const inputIds = [...scenario[sectionType]];

        if (position === undefined) {
            position = inputIds.length;
        }

        inputIds.splice(position, 0, inputId);

        set(scenarioAtom, { ...scenario, [sectionType]: inputIds });

        return inputId;
    });

    const removeScenarioInput = useRecoilCallback(({ snapshot, set }) => ({ scenarioId, sectionType, inputId }) => {
        const scenarioAtom = scenarioAtoms[scenarioId];

        if (!scenarioAtom) {
            throw new Error(`Scenario with id ${scenarioId} does not exist`);
        }

        if (!Object.values(SCENARIO_SECTION).includes(sectionType)) {
            throw new Error(`Invalid section type ${sectionType}`);
        }

        if (!inputAtoms[inputId]) {
            throw new Error(`Input with id ${inputId} does not exist`);
        }

        const scenario = snapshot.getLoadable(scenarioAtom).contents;

        const inputIds = scenario[sectionType].filter((id) => id !== inputId);

        set(scenarioAtom, { ...scenario, [sectionType]: inputIds });
        delete inputAtoms[inputId];
    });

    return { addScenario, removeScenario, addScenarioInput, removeScenarioInput };
}

export const testScenariosSelector = selector({
    key: RECOIL_KEY.scenario.selector.testScenarios,
    get: ({ get }) => {
        const testScenarios = get(testScenariosAtom);

        return testScenarios
            .map((id) => get(getScenarioAtom(id)))
            .map((scenario) => ({
                ...scenario,
                name: get(inputAtoms[scenario.nameInputId]),
                [SCENARIO_SECTION.GIVEN]: scenario[SCENARIO_SECTION.GIVEN].map((id) => get(inputAtoms[id])),
                [SCENARIO_SECTION.WHEN]: scenario[SCENARIO_SECTION.WHEN].map((id) => get(inputAtoms[id])),
                [SCENARIO_SECTION.THEN]: scenario[SCENARIO_SECTION.THEN].map((id) => get(inputAtoms[id])),
            }));
    },
});
