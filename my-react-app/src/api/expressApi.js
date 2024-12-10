import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_EXPRESS_MS } = getEnvVariables();

const expressApi = axios.create({
    baseURL: VITE_EXPRESS_MS
});

function cargarToken() {
    const tokenString = localStorage.getItem("token");

    if (tokenString) {
        try {
            const parsedData = JSON.parse(tokenString);

            if (parsedData && parsedData.usuario) {
                const { usuario, token } = parsedData;
                const { id, name, email, password } = usuario;
                /*  setUser({ id, name, email, password });
                 setUserToken(token); */
                return token;
            } else {
                console.warn("El formato de `parsedData` no es el esperado.");
            }
        } catch (error) {
            console.error("Error al analizar el JSON del token", error);
        }
    } else {
        console.warn("out session");
    }
}

expressApi.interceptors.request.use(config => {
    const token = cargarToken();

 
    if (token) {
        config.headers = {
            ...config.headers,
            'Authorization': token
        };
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export default expressApi;