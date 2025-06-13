const BASE_URL = import.meta.env.VITE_API_URL + '/api';

// Helper to get auth header
const getAuthHeader = async (getToken) => {
    const token = await getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Generic API call function with authentication
const apiCall = async (endpoint, options = {}, getToken = null) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            ...(getToken ? await getAuthHeader(getToken) : {})
        };

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...headers,
                ...options.headers
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API call failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Public API endpoints (no auth required)
export const getPublicArtifacts = () => {
    return apiCall('/artifacts', {
        method: 'GET'
    });
};

export const getTopLikedArtifacts = () => {
    return apiCall('/artifacts/top-liked', {
        method: 'GET'
    });
};

export const searchArtifacts = (query) => {
    return apiCall(`/artifacts/search?q=${encodeURIComponent(query)}`, {
        method: 'GET'
    });
};

// Protected API endpoints (auth required)
export const addArtifact = async (artifactData, getToken) => {
    return apiCall('/artifacts', {
        method: 'POST',
        body: JSON.stringify(artifactData)
    }, getToken);
};

export const updateArtifact = async (id, updateData, getToken) => {
    return apiCall(`/artifacts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updateData)
    }, getToken);
};

export const deleteArtifact = async (id, getToken) => {
    return apiCall(`/artifacts/${id}`, {
        method: 'DELETE'
    }, getToken);
};

export const likeArtifact = async (id, getToken) => {
    return apiCall(`/artifacts/${id}/like`, {
        method: 'PATCH'
    }, getToken);
};

export const dislikeArtifact = async (id, getToken) => {
    return apiCall(`/artifacts/${id}/dislike`, {
        method: 'PATCH'
    }, getToken);
};

export const getUserArtifacts = async (getToken) => {
    return apiCall('/artifacts/user/me', {
        method: 'GET'
    }, getToken);
};

export const getLikedArtifacts = async (getToken) => {
    return apiCall('/artifacts/liked/me', {
        method: 'GET'
    }, getToken);
}; 