import expressApi from "../api/expressApi";

export const createTask = async (taskBody) => {
    try {
        if (taskBody) {
            const resCreate = await expressApi.post('/Boars', taskBody);
            console.log("RESPUESTA MICROSERVICIO", resCreate.data);
            return resCreate.data;
        }
    } catch (error) {
        return error;
    }
}

export const getTask = async () => {
    try {
            const resData = await expressApi.get('/Boars');
            return resData.data;
    } catch (error) {
        return error;
    }
}

export const putTask = async (id,taskBody) => {
    try {
        if (taskBody) {
            console.log(id,taskBody)
            const resCreate = await expressApi.put(`/Boars/${id}`, taskBody);
            return resCreate.data;
        }
    } catch (error) {
        return error;
    }
}

// Exportando las funciones en un objeto
export default {
    createTask,
    getTask,
    putTask
};



