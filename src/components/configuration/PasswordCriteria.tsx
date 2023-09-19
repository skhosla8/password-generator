import React, { FC, useState, useEffect, Dispatch, MutableRefObject, SetStateAction } from 'react';
import '../../index.css';
import styled from 'styled-components';
import iconCheck from '../../assets/icon-check.svg';

const StyledPasswordCriteria = styled.div`
display: flex;
align-items: center;
margin-bottom: 1.4rem;

 div {
    color: var(--color-white);
    font-size: var(--text-body);
 }
`;

const Checkbox = styled.div<CheckboxProps>`
display: flex;
justify-content: center;
align-items: center;
width: 17px;
height: 17px;
background-color: ${({ checked }) => checked ? 'var(--color-green)' : 'var(--color-black)'};
margin-right: 1.5rem;
border: ${({ checked }) => checked ? '2px solid var(--color-green)' : '2px solid var(--color-white)'};
cursor: pointer;

 &:hover {
    border: 2px solid var(--color-green);
 }
`;

interface CheckboxProps {
    checked: boolean;
}

interface PasswordCriteriaProps extends CheckboxProps {
    i: number,
    text: string;
    setStrength: Dispatch<SetStateAction<string>>;
    checkboxRefs: MutableRefObject<(HTMLDivElement | null)[]>
}

const PasswordCriteria: FC<PasswordCriteriaProps> = ({ i, text, checked, setStrength, checkboxRefs }) => {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        let arr = [];
        let count = 0;

        for (const ref of checkboxRefs.current) {
            arr.push(ref?.dataset.checked)
        }

        if (arr.length) {
            for (const elem of arr) {
                if (elem === 'true') {
                    count += 1;
                }
            }
        }

        if (count === 1) {
            setStrength('TOO WEAK!');
        } else if (count === 2) {
            setStrength('WEAK');
        } else if (count === 3) {
            setStrength('MEDIUM');
        } else if (count === 4) {
            setStrength('STRONG');
        } else {
            setStrength('');
        }

    }, [isChecked, checkboxRefs, setStrength]);

    return (
        <StyledPasswordCriteria>
            <Checkbox ref={(element) => { checkboxRefs.current[i] = element }} data-checked={isChecked} checked={isChecked} onClick={() => setIsChecked(!isChecked)}>
                {
                    isChecked &&
                    <img src={iconCheck} alt='checkbox-icon' />
                }
            </Checkbox>
            <div>{text}</div>
        </StyledPasswordCriteria>
    )
}

export default PasswordCriteria; 