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

export const checkLogin = async () => {
    try {
        const response = await fetch(
            "http://localhost:8000/users/me",
            {
                credentials: "include"
            }
        );
        if (!response.ok) {
            return {
                success: false,
                data: null
            };
        }
        const user = await response.json();
        return {
            success: true,
            data: user
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            data: null
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

export const All_Posts = async (search) => {
    try {
        const response = await fetch(`http://localhost:8000/posts?search=${search}` , {
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

export const My_Posts = async () => {
    try {
        const response = await fetch("http://localhost:8000/me/posts" , {
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
            success : false,
            error
        }
    }
};

export const Edit_Profile = async (payload) => {
    try {
        const response = await fetch("http://localhost:8000/users/me/profile" , {
            method : "PUT",
            credentials : "include",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        return {
            success : response.ok
        }
    } catch (error) {
        console.log(error)
        return {
            success : false
        }
    }
};

export const Edit_Password = async (payload) => {
    try {
        const response = await fetch("http://localhost:8000/users/me/password" , {
            method : "PUT",
            credentials : "include",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        return {success : response.ok}
    } catch (error) {
        return {
            success : false,
            error
        }
    }
};