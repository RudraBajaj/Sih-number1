import React from "react";
const RoleSelectionPopup = ({ isOpen, onClose, onRoleSelect }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                maxWidth: '400px',
                width: '90%'
            }}>
                <h2>Select Your Role</h2>
                <button onClick={() => onRoleSelect({ id: 'student', name: 'Student' })}>
                    🎒 Student
                </button>
                <br /><br />
                <button onClick={() => onRoleSelect({ id: 'alumni', name: 'Alumni' })}>
                    🎓 Alumni
                </button>
                <br /><br />
                <button onClick={() => onRoleSelect({ id: 'admin', name: 'Admin' })}>
                    ⚡ Admin
                </button>
                <br /><br />
                <button onClick={() => onRoleSelect({ id: 'super-admin', name: 'Super Admin' })}>
                    👑 Super Admin
                </button>
                <br /><br />
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};



export default RoleSelectionPopup;