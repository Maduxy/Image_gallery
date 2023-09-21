import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #007bff; /* Change the color as needed */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function LoadingIndicator() {
  return (
    <Spinner />
  );
}
export default LoadingIndicator;