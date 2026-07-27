export const SignupUser = async (username, email, password) => {
    try {
        const response = await fetch("http://localhost:8000/users/signup/", {
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
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
            method : "POST",
            credentials : "include",
            headers : {
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

export const Saved = async () => {
    try {
        const response = await fetch("http://localhost:8000/saved" , {
            credentials : "include"
        });
        const data = await response.json();
        return {
            success: response.ok,
            data
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            error: error.message,
        };
    }
};

export const Save_Posts = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/posts/${id}/save` , {
            method : "POST",
            credentials : "include"
        });
        const data = response.json()
        return {
            success : response.ok,
            data
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            error: error.message,
        };
    }
};

export const Unsave_Posts = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/posts/${id}/unsave` , {
            method : "POST",
            credentials : "include"
        });
        const data = response.json()
        return {
            success : response.ok,
            data
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            error: error.message,
        };
    }
};

export const All_Posts = async () => {
    try {
        const response = await fetch("http://localhost:8000/posts" , {
            credentials : "include"
        })
        const data = await response.json()
        return {
            success : response.ok,
            data
        }
    } catch (error) {
        console.log(error)
        return {
            success : false
        }
    }
};
