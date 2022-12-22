import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { getInputAtom } from '../../../../../../recoil/inputs';

export function Input({id}) {
    const [input, setInput] = useRecoilState(getInputAtom(id));

    const handleChange = (value) => {
        setInput((prevInput) => ({
            ...prevInput,
            value,
        }));
    };

    return (
        <>
            <div>Input with id: {input.id}</div>
            <input value={input.value}
                onChange={(e) => handleChange(e.target.value)}
            />
        </>
    );
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
};
