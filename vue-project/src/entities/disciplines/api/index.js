import mainJson from "@/shared/documents/main.json";

export default {

    ////////////////////////////////////////////////////////////////////////////////////////////////GET

    async getDisciplinesByStudent(token) {
        const response = await fetch('http://localhost:8080/api/disciplines/my', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return await response.json();
        }
        else {
            const errorData = await response.json();
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        }
    },

    async getDisciplinesByTeacher(token) {
        const response = await fetch('http://localhost:8080/api/disciplines', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return await response.json();
        }
        else {
            const errorData = await response.json();
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        }
    },

    async getGroupsForDiscipline(token, disciplineId) {
        const response = await fetch(`http://localhost:8080/api/disciplines/${disciplineId}/groups`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return await response.json();
        }
        else {
            const errorData = await response.json();
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////POST

    async addDiscipline(token, name, description) {
        // console.log(name, description)
        const response = await fetch('http://localhost:8080/api/disciplines', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': `application/json`
            },
            body: JSON.stringify({ name, description }),
        });
        if (response.ok) {
            return await response.json();
        }
        else {
            const errorData = await response.json();
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        }
    },

    async addGroupForDiscipline(token, disciplineId, groupId) {
        // console.log(`id дисциплины ${disciplineId}\nid группы ${groupId}`)
        const response = await fetch(`http://localhost:8080/api/disciplines/${disciplineId}/groups/${groupId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return
        }
        else {
            const errorData = await response.json();
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////PUT

    async updateDiscipline(token, disciplineId, name, description) {
        // console.log(`id дисциплины ${disciplineId}\nid группы ${groupId}`)
        const response = await fetch(`http://localhost:8080/api/disciplines/${disciplineId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': `application/json`
            },
            body: JSON.stringify({ name, description }),
        });
        if (response.ok) {
            return
        }
        else {
            const errorData = await response.json();
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////DELETE

    async deleteDiscipline(token, disciplineId) {
        const response = await fetch(`http://localhost:8080/api/disciplines/${disciplineId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return
        }
        else {
            const errorData = await response.json();
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        }
    },

    async deleteGroupForDiscipline(token, disciplineId, groupId) {
        const response = await fetch(`http://localhost:8080/api/disciplines/${disciplineId}/groups/${groupId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return 
        }
        else {
            const errorData = await response.json();
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        }
    },




};
