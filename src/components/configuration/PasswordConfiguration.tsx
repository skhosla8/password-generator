// Base Imports 
import React, { FC, useState, useRef, Dispatch, SetStateAction } from 'react';
import '../../index.css';
import styled from 'styled-components';
// Components
import Slider from 'react-input-slider';
import PasswordCriteria from './PasswordCriteria';

interface StrengthBarProps {
  strength?: string | null;
};

const StyledPasswordConfiguration = styled.div`
width: 100%;
background-color: var(--color-charcoal);
padding: 2rem;
box-sizing: border-box;
`;

const CharacterLength = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 1.5rem;
   div {
      &:first-child{
        color: var(--color-white);
        font-size: var(--text-body);
        font-weight: 500;
      }

      &:nth-child(2){
        color: var(--color-green);
        font-size: 2rem;
      }
   }
`;

const PasswordStrength = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
padding: 1.5rem 2rem;
box-sizing: border-box;
background-color: var(--color-black);
color: var(--color-grey);
font-size: var(--text-body);
`;

const PasswordStrengthBars = styled.div`
display: flex;
font-size: var(--text-md);
color: var(--color-white);

span {
  margin-right: 0.8rem;
}
`;

const PasswordStrengthBar = styled.div<StrengthBarProps>`
width: 7px;
height: 25px;
border: ${({ strength }) => {
    if (strength === 'TOO WEAK!') {
      return '2px solid var(--color-red)';
    } else if (strength === 'WEAK') {
      return '2px solid var(--color-orange)';
    } else if (strength === 'MEDIUM') {
      return '2px solid var(--color-yellow)';
    } else if (strength === 'STRONG') {
      return '2px solid var(--color-green)';
    } else {
      return '2px solid var(--color-white)';
    }
  }};
margin: 0 0.25rem;
background-color: ${({ strength }) => {
    if (strength === 'TOO WEAK!') {
      return 'var(--color-red)';
    } else if (strength === 'WEAK') {
      return 'var(--color-orange)';
    } else if (strength === 'MEDIUM') {
      return 'var(--color-yellow)';
    } else if (strength === 'STRONG') {
      return 'var(--color-green)';
    } else {
      return 'var(--color-black)';
    }
  }}
`;

const Button = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
background-color: var(--color-green);
border: 2px solid var(--color-green);
padding: 1.1rem 2rem;
box-sizing: border-box;
margin-top: 2rem;
font-size: var(--text-body);
cursor: pointer;

  svg {
    width: 13px;
    height: 12px;
    margin-left: 1rem;
  }

  &:hover {
    background-color: transparent;
    border: 2px solid var(--color-green);
    color: var(--color-green);

    svg {
      path {
        fill: var(--color-green);
      }
    }
  }
`;

interface PasswordConfigurationProps {
  setPassword: Dispatch<SetStateAction<string>>
}
const PasswordConfiguration: FC<PasswordConfigurationProps> = ({ setPassword }) => {
  const [value, setValue] = useState({ x: 0 });
  const [strength, setStrength] = useState('');


  const checkboxRefs = useRef<(HTMLDivElement | null)[]>([]);

  const passwordCriteriaArr = [
    'Include Uppercase Letters',
    'Include Lowercase Letters',
    'Include Numbers',
    'Include Symbols'
  ];

  const generatePassword = () => {
    let str = '';
    let randomCharacter;

    let uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    let numbers = '01234456789';
    let symbols = '!@#$%&';

    let allCharacters = '';

    if (!value.x) return;

    for (let i = 0; i < value.x; i++) {
      if (checkboxRefs.current[0]?.dataset.checked === 'true') {
        allCharacters += uppercaseLetters;
      }

      if (checkboxRefs.current[1]?.dataset.checked === 'true') {
        allCharacters += lowercaseLetters;
      }

      if (checkboxRefs.current[2]?.dataset.checked === 'true') {
        allCharacters += numbers;
      }

      if (checkboxRefs.current[3]?.dataset.checked === 'true') {
        allCharacters += symbols;
      }

      randomCharacter = allCharacters![Math.floor(Math.random() * allCharacters!.length)]!;
      str += randomCharacter;
    }

    setPassword(str);
  };

  return (
    <StyledPasswordConfiguration>
      <CharacterLength>
        <div>Character Length</div>
        <div>{value.x}</div>
      </CharacterLength>

      <Slider
        axis='x'
        xmin={0}
        xmax={20}
        x={value.x}
        xstep={1}
        onChange={({ x }) => setValue({ x: parseFloat(x.toFixed(2)) })}
        styles={{
          track: {
            width: '100%',
            borderRadius: 'none',
            backgroundColor: 'var(--color-black)',
            marginBottom: '2rem'
          },
          active: {
            backgroundColor: 'var(--color-green)',
            borderRadius: 'none'
          },
          thumb: {
            width: 32,
            height: 32,
            '&:hover': {
              backgroundColor: 'var(--color-black)',
              border: '2px solid var(--color-green)'
            },
            '&:active': {
              backgroundColor: 'var(--color-black)',
              border: '2px solid var(--color-green)'
            }

          }
        }}
      />

      <div>
        {
          passwordCriteriaArr?.map((elem: string, i: number) => (
            <PasswordCriteria
              key={i}
              i={i}
              text={elem}
              checked={false}
              setStrength={setStrength}
              checkboxRefs={checkboxRefs}
            />
          ))
        }
      </div>

      <PasswordStrength>
        <div>STRENGTH</div>

        <PasswordStrengthBars>
          {(value.x !== 0) &&
            <span>{strength}</span>
          }
          {(!value.x || !strength) &&
            <>
              <PasswordStrengthBar />
              <PasswordStrengthBar />
              <PasswordStrengthBar />
              <PasswordStrengthBar />

            </>
          }
          {(strength === 'TOO WEAK!' && value.x !== 0) &&
            <>
              <PasswordStrengthBar strength={strength} />
              <PasswordStrengthBar />
              <PasswordStrengthBar />
              <PasswordStrengthBar />
            </>
          }
          {
            (strength === 'WEAK' && value.x !== 0) &&
            <>
              <PasswordStrengthBar strength={strength} />
              <PasswordStrengthBar strength={strength} />
              <PasswordStrengthBar />
              <PasswordStrengthBar />
            </>
          }
          {
            (strength === 'MEDIUM' && value.x !== 0) &&
            <>
              <PasswordStrengthBar strength={strength} />
              <PasswordStrengthBar strength={strength} />
              <PasswordStrengthBar strength={strength} />
              <PasswordStrengthBar />
            </>
          }
          {
            (strength === 'STRONG' && value.x !== 0) &&
            <>
              <PasswordStrengthBar strength={strength} />
              <PasswordStrengthBar strength={strength} />
              <PasswordStrengthBar strength={strength} />
              <PasswordStrengthBar strength={strength} />
            </>
          }
        </PasswordStrengthBars>

      </PasswordStrength>

      <Button onClick={generatePassword}>
        GENERATE

        <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
          <path fill="#24232C" d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z" />
        </svg>
      </Button>
    </StyledPasswordConfiguration>
  )
};

export default PasswordConfiguration;