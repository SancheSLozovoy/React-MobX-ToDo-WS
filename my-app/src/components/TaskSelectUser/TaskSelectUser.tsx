import React from 'react';
import { UserSelectProps } from '../../types/Task.type';

const UserSelect: React.FC<UserSelectProps> = ({ userIds, onUserChange }) => {
    return (
        <select onChange={(e) => {
            const value = e.target.value ? +e.target.value : null;
            onUserChange(value);
        }}>
            {userIds.map(id => (
                <option key={id} value={id}>
                    User id: {id}
                </option>
            ))}
        </select>
    );
};

export default UserSelect;
