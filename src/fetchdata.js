export async function fetchUserData(axios) {
    try {
        const response = await axios.get('/user');
        if (response.status == 200) {
            return response.data;
        }
        return null;
    }
    catch (err) {
        const reponse = err.response;
        if (reponse.status == 401) {
            return response.status;
        }
        return null;
    }
}

export async function deleteProduct(axios, productId) {
    try {
        const response = await axios.post('/products/delete', { 'productId': productId });
        if (response.status == 200) {
            return true;
        }
        return false;
    }
    catch {
        return false;
    }
}

export async function login(axios, data) {
    try {
        const response = await axios.post('/login', data);
        if (response.status == 200) {
            return response.data
        }
        return null;
    }
    catch (err) {
        const response = err.response;
        if (response.status == 400) {
            return response.status;
        }
        return null;
    }
}

export async function register(axios, data) {
    try {
        const response = await axios.post('/register', data);
        if (response.status == 200) {
            return response.data
        }
        return null;
    }
    catch (err) {
        const response = err.response;
        if (response.status == 400) {
            return response.status;
        }
        return null;
    }
}

export async function addProduct(axios, data) {
    try {
        const response = await axios.post('/products/create', data);
        if (response.status == 201) {
            return response.data;
        }
        return null;
    }
    catch (err) {
        const response = err.response;
        if (response.status == 400) {
            return response.status;
        }
        return null;
    }
}