export const SignupUser = async (username, email, password) => {
    try {
        const response = await fetch("http://localhost:8000/signup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Username: username,
                Email: email,
                Password: password
            })
        });
        const data = await response.json();
        console.log(data)
        return {
            success: response.ok,
            data
        };
    } catch (error) {
        return {
            success: false,
            data: {
                detail: "Unable to connect to the server."
            }
        };
    }
};

export const LoginUser = async (email, password) => {
    try {
        const response = await fetch("http://localhost:8000/users/login", {
            method: "POST",
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Email: email,
                Password: password
            })
        });
        const data = await response.json();
        console.log(data)
        return {
            success: response.ok,
            data
        };
    } catch (error) {
        return {
            success: false,
            data: {
                detail: "Unable to connect to the server."
            }
        };
    }
};