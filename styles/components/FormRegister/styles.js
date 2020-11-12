import styled from 'styled-components';

export const Container = styled.div`
  background: '#7159c1'; 
  width: 100%; 
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  color: #fff;
`;

export const FormItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  & + div {
    margin: 20px 0px;
  }

  > label {
    font-size: 18px;
    color: #fff;
  }
`;

export const ButtonSubmit = styled.button``;

export const Loading = styled.div``;