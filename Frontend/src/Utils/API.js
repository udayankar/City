const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8000";

export const SignupUser = async (username, email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/signup/`, {
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
        const response = await fetch(`${API_BASE_URL}/users/login`, {
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

export const LogoutUser = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/logout`, {
            method: "POST",
            credentials: "include"
        });
        return {
            success: response.ok
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

export const checkLogin = async () => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/users/me`,
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
        return {
            success: false,
            data: null
        };
    }
};

export const Saved = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/saved` , {
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
        const response = await fetch(`${API_BASE_URL}/posts/${id}/save` , {
            method : "POST",
            credentials : "include"
        });
        const data = await response.json();
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
        const response = await fetch(`${API_BASE_URL}/posts/${id}/unsave` , {
            method : "POST",
            credentials : "include"
        });
        const data = await response.json();
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

export const Like_Posts = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${id}/like` , {
            method : "POST",
            credentials : "include"
        });
        const data = await response.json();
        return {
            success : response.ok,
            data
        };
    } catch (error) {
        return {
            success : false,
            data : null,
            error : error.message
        };
    }
};

export const Unlike_Posts = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${id}/unlike` , {
            method : "POST",
            credentials : "include"
        });
        const data = await response.json();
        return {
            success : response.ok,
            data
        };
    } catch (error) {
        return {
            success : false,
            data : null,
            error : error.message
        };
    }
};

export const All_Posts = async (search) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts?search=${search}` , {
            credentials : "include"
        })
        const data = await response.json()
        return {
            success : response.ok,
            data
        }
    } catch (error) {
        return {
            success : false,
            data : null,
            error: error.message
        }
    }
};

export const My_Posts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/me/posts` , {
            credentials : "include"
        })
        const data = await response.json()
        return {
            success : response.ok,
            data
        }
    } catch (error) {
        return {
            success : false,
            data : null,
            error: error.message
        }
    }
};

export const Add_Post = async (title , content , location) => {
    try {
        const response = await fetch(`${API_BASE_URL}/me/addpost` , {
            method : "POST",
            credentials : "include",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Title : title,
                Content : content,
                Location : location
            })
        })
        const data = await response.json()
        return {
            success : response.ok,
            data
        }
    } catch (error) {
        return {
            success : false,
            error: error.message
        }
    }
};

export const Edit_Profile = async (payload) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/me/profile` , {
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
        return {
            success : false,
            error: error.message
        }
    }
};

export const Edit_Password = async (payload) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/me/password` , {
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
            error: error.message
        }
    }
};

export const All_Events = async (search = "" , category = "" , sort = "") => {
    try {
        const response = await fetch(`${API_BASE_URL}/events?search=${search}&category=${category}&sort=${sort}` , {
            credentials : "include"
        })
        const data = await response.json()
        return {
            success : response.ok,
            data
        }
    } catch (error) {
        return {
            success : false,
            data : null,
            error: error.message
        }
    }
};

export const Save_Events = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${id}/save`, {
            method : "POST",
            credentials : "include"
        });
        const data = await response.json()
        return {
            success : response.ok,
            data
        }
    } catch (error) {
        return {
            success : false,
            error: error.message
        }
    }
};

export const Unsave_Events = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${id}/unsave` , {
            method : "DELETE",
            credentials : "include"
        });
        const data = await response.json()
        return {
            success : response.ok,
            data
        }
    } catch (error) {
        return {
            success : false,
            error: error.message
        }
    }
};