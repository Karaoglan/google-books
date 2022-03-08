import axios from "axios";
import { useState } from "react";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {
        e.preventDefault();
        const response = await axios.post("/api/auth/login", {
            username,
            password,
        });
        console.log(response);
    };

    return (
        <form onSubmit={login}>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button
                disabled={!username || !password}
                type="submit"
                className="btn btn-primary btn-block"
            >
                Submit
            </button>
        </form>
    );
};
