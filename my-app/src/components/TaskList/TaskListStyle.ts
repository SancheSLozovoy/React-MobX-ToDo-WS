import styled from "styled-components";

export const TasksContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 0 auto;
`

export const ListTitle = styled.h1`
    font-size: 42px;
    color: #fff;
    margin-bottom: 20px;
    text-align: center;
`
export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;

    > button {
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 20px;
        border: none;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: rgba(12, 140, 12, 0.8);
        }
    }

    .mark-button:hover {
        background-color: rgb(0, 0, 165);
    }

    .delete-button:hover {
        background-color: rgb(140, 10, 10);
    }
`

export const TasksList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    
    > * {
        margin-bottom: 10px;
    }
`