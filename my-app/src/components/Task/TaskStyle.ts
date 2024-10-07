import styled from "styled-components";

export const TaskContainer = styled.div`
    font-size: 16px;
    max-width: 750px;
    background-color: #f5f5f5;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e0e0e0;
    }
`;

export const TaskContent = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;

export const TaskTitle = styled.span<{ completed: boolean }>`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-right: auto;
    ${({ completed }) => completed && `
        color: rgb(12, 140, 12);
    `}
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 15px;
`;

export const Button = styled.button`
    padding: 8px 12px;
    background-color: #ff6b6b;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: #ff4c4c;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    }
`;

export const ChangeButton = styled(Button)`
    background-color: #727272;

    &:hover {
        background-color: #333;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;

    > * { 
        margin-right: 10px;
    }
`;