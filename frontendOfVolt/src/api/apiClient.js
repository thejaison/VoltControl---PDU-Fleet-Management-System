const BASE_URL = "http://localhost:8080";

async function apiRequest(path, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if(token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers,
    });

    if(response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInEmpId");
        localStorage.removeItem("loggedInRole");
        localStorage.removeItem("loggedInUsername");
        localStorage.removeItem("loggedInEmail");
        window.location.href = "/login";
        return null;
    }

    return response;
}

export default apiRequest;