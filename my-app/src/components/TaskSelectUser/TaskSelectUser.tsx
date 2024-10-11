import React from 'react';
import { observer } from 'mobx-react-lite';
import { UserSelectProps } from '../../types/Task.type';

const UserSelect: React.FC<UserSelectProps> = ({ userIds, onUserChange }) => {
    return (
        <select onChange={(e) => {
            const value = e.target.value ? +e.target.value : null;
            onUserChange(value);
        }}>
            <option value="">All users</option>
            {userIds.map(id => (
                <option key={id} value={id}>
                    User id: {id}
                </option>
            ))}
        </select>
    );
};

export default observer(UserSelect);
