const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8000";

export const SignupUser = async (username, email, password) => {
    try {
        // No trailing slash — FastAPI redirects POST with body loss on 307/308
        const response = await fetch(`${API_BASE_URL}/users/signup`, {
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
            method : "DELETE",
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
            method : "DELETE",
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

// limit/offset support added for pagination/infinite scroll
// search is URL-encoded to handle spaces and special characters safely
export const All_Posts = async (search = "", limit = 20, offset = 0) => {
    try {
        const params = new URLSearchParams({
            search: search,
            limit: String(limit),
            offset: String(offset)
        });
        const response = await fetch(`${API_BASE_URL}/posts?${params}` , {
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
            error: error.message
        };
    }
};

// limit/offset support added for pagination
export const My_Posts = async (limit = 20, offset = 0) => {
    try {
        const params = new URLSearchParams({
            limit: String(limit),
            offset: String(offset)
        });
        const response = await fetch(`${API_BASE_URL}/me/posts?${params}` , {
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
            error: error.message
        };
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
        });
        const data = await response.json();
        return {
            success : response.ok,
            data
        };
    } catch (error) {
        return {
            success : false,
            error: error.message
        };
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
        });
        // Parse error detail from backend so callers can surface it
        if (!response.ok) {
            let detail = "Could not update profile.";
            try {
                const body = await response.json();
                if (body?.detail) {
                    detail = Array.isArray(body.detail)
                        ? body.detail[0]?.msg || detail
                        : body.detail;
                }
            } catch (_) { /* ignore parse errors */ }
            return { success: false, error: detail };
        }
        return { success: true };
    } catch (error) {
        return {
            success : false,
            error: error.message
        };
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
        });
        // Parse error detail from backend so callers can surface it
        if (!response.ok) {
            let detail = "Could not update password.";
            try {
                const body = await response.json();
                if (body?.detail) {
                    detail = Array.isArray(body.detail)
                        ? body.detail[0]?.msg || detail
                        : body.detail;
                }
            } catch (_) { /* ignore parse errors */ }
            return { success: false, error: detail };
        }
        return { success: true };
    } catch (error) {
        return {
            success : false,
            error: error.message
        };
    }
};

// limit/offset support added for pagination/infinite scroll
export const All_Events = async (search = "" , category = "" , sort = "", limit = 20, offset = 0) => {
    try {
        const params = new URLSearchParams({
            search: search,
            category: category,
            sort: sort,
            limit: String(limit),
            offset: String(offset)
        });
        const response = await fetch(`${API_BASE_URL}/events?${params}` , {
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
            error: error.message
        };
    }
};

export const Save_Events = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${id}/save`, {
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
            error: error.message
        };
    }
};

export const Unsave_Events = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${id}/unsave` , {
            method : "DELETE",
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
            error: error.message
        };
    }
};