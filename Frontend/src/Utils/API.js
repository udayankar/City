const SignupUser = async (username , email , password) => {
    const response = await fetch("http://127.0.0.1:8000/signup/" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Username: username,
            Email: email,
            Password: password
        })
    })
    const data = await response.json();
    console.log(data)
    return {
        success: response.ok,
        data
    };
}

export default SignupUser;