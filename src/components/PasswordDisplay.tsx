import React, { FC, useState } from 'react';
import '../index.css';
import styled from 'styled-components';

const StyledPasswordDisplay = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: 80px;
background-color: var(--color-charcoal);
padding: 2rem;
box-sizing: border-box;
margin: 2.4rem 0 1.5rem;
`;

const Input = styled.input`
border: none;
outline: none;
background-color: var(--color-charcoal);
color: var(--color-white);
width: 480px;
font-size: var(--text-lg);
`;

interface SVGProps {
    $copied: boolean
}

const SVG = styled.svg<SVGProps>`
width: 22px;
height: 27px;
cursor: copy;

 path {
    fill: ${({$copied}) => $copied ? 'var(--color-white)' : 'var(--color-green)'};
 }
`;

interface PasswordDisplayProps {
    password: string;
}

const PasswordDisplay: FC<PasswordDisplayProps> = ({ password }) => {
    const [copied, setCopied] = useState(false);

    return (
        <StyledPasswordDisplay>
            <Input type='text' placeholder='P4$5W0rD!' readOnly value={password} />
            <SVG $copied={copied} xmlns="http://www.w3.org/2000/svg" onClick={() => password && setCopied(true)}>
                <path d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z" />
            </SVG>
        </StyledPasswordDisplay>
    )
};

export default PasswordDisplay;