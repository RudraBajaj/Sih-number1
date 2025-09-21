import React, { useState } from "react";

const Settings = () => {
    // State for create user form
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userRole, setUserRole] = useState("user");
    const [createStatus, setCreateStatus] = useState("");

    // State for change password
    const [currentPwd, setCurrentPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [pwdStatus, setPwdStatus] = useState("");

    // Dummy handlers for demonstration
    const handleCreateUser = (e) => {
        e.preventDefault();
        if (userEmail && userPassword) {
            setCreateStatus(`User ${userEmail} created successfully!`);
            setUserEmail("");
            setUserPassword("");
            setUserRole("user");
        } else {
            setCreateStatus("Please fill all fields.");
        }
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (currentPwd && newPwd) {
            setPwdStatus("Password changed successfully!");
            setCurrentPwd("");
            setNewPwd("");
        } else {
            setPwdStatus("Fill out both fields.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded shadow-lg flex flex-col gap-10">
            {/* Create User Section */}
            <section>
                <h2 className="text-xl font-semibold mb-3">Create New User</h2>
                <form onSubmit={handleCreateUser} className="flex flex-col gap-3">
                    <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Email"
                        className="border px-3 py-2 rounded"
                        required
                    />
                    <input
                        type="password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder="Password"
                        className="border px-3 py-2 rounded"
                        required
                    />
                    <select
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                        className="border px-3 py-2 rounded"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Create User
                    </button>
                    {createStatus && (
                        <div className="text-green-600 mt-2">{createStatus}</div>
                    )}
                </form>
            </section>

            {/* Change Password Section */}
            <section>
                <h2 className="text-xl font-semibold mb-3">Change Password</h2>
                <form onSubmit={handleChangePassword} className="flex flex-col gap-3">
                    <input
                        type="password"
                        value={currentPwd}
                        onChange={(e) => setCurrentPwd(e.target.value)}
                        placeholder="Current Password"
                        className="border px-3 py-2 rounded"
                        required
                    />
                    <input
                        type="password"
                        value={newPwd}
                        onChange={(e) => setNewPwd(e.target.value)}
                        placeholder="New Password"
                        className="border px-3 py-2 rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        Change Password
                    </button>
                    {pwdStatus && <div className="text-green-600 mt-2">{pwdStatus}</div>}
                </form>
            </section>
        </div>
    );
};

export default Settings;
