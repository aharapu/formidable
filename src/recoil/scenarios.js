import { atom, useRecoilCallback } from 'recoil';
import { v4 as createId } from 'uuid';
import { SECTION_TYPE } from '../state-utils/scenarios';
import { KEYS } from './constants';
import { addInput, inputAtoms } from './inputs';

const scenarioAtoms = {};

export const testScenariosAtom = atom({
    key: KEYS.scenario.atom.testScenarios,
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
    const addScenario = useRecoilCallback(({ snapshot, set }) => async () => {
        console.log('in add scenario');
        const id = createId();

        if (scenarioAtoms[id]) {
            throw new Error(`Scenario with id ${id} already exists`);
        }

        scenarioAtoms[id] = atom({
            key: KEYS.scenario.atom.prefix + id,
            default: {
                id: createId(),
                name: 'scenario with id ' + id,
                [SECTION_TYPE.GIVEN]: [addInput()],
                [SECTION_TYPE.WHEN]: [addInput()],
                [SECTION_TYPE.THEN]: [addInput()],
            },
        });
        const testScenarios = snapshot.getLoadable(testScenariosAtom).contents;
        console.log('testScenarios', testScenarios);

        set(testScenariosAtom, [...testScenarios, id]);
    });

    const removeScenario = useRecoilCallback(({ snapshot, set }) => async (scenarioId) => {
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

    const addScenarioInput = useRecoilCallback(({ snapshot, set }) => async ({ scenarioId, sectionType, position }) => {
        const scenarioAtom = scenarioAtoms[scenarioId];

        if (!scenarioAtom) {
            throw new Error(`Scenario with id ${scenarioId} does not exist`);
        }

        if (!Object.values(SECTION_TYPE).includes(sectionType)) {
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
    });

    const removeScenarioInput = useRecoilCallback(
        ({ snapshot, set }) =>
            async ({ scenarioId, sectionType, inputId }) => {
                const scenarioAtom = scenarioAtoms[scenarioId];

                if (!scenarioAtom) {
                    throw new Error(`Scenario with id ${scenarioId} does not exist`);
                }

                if (!Object.values(SECTION_TYPE).includes(sectionType)) {
                    throw new Error(`Invalid section type ${sectionType}`);
                }

                if (!inputAtoms[inputId]) {
                    throw new Error(`Input with id ${inputId} does not exist`);
                }

                const scenario = snapshot.getLoadable(scenarioAtom).contents;

                const inputIds = [sectionType].filter((id) => id !== inputId);

                set(scenarioAtom, { ...scenario, [sectionType]: inputIds });
                delete inputAtoms[inputId];
            },
    );

    return { addScenario, removeScenario, addScenarioInput, removeScenarioInput };
}
