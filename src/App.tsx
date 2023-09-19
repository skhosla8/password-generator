import React, {useState}  from 'react';
import './index.css';
import styled from 'styled-components';
import { PasswordDisplay, PasswordConfiguration } from './components';

const StyledApp = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 540px;
height: auto;
`;

const Title = styled.div`
color: var(--color-grey);
font-size: var(--text-md);
`;

function App() {
   const [password, setPassword] = useState('');

  return (
    <StyledApp>
      <Title>Password Generator</Title>
      <PasswordDisplay password={password} />
      <PasswordConfiguration setPassword={setPassword} />
    </StyledApp>
  )
}

export default App;