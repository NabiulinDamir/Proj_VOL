import mainJson from "@/shared/documents/main.json";

export default {

    async getGroupsByUser(userId){
        return new Promise((resolve) => {
            setTimeout(() => {
                const res = mainJson.groups
                resolve(res); 
            }, 500);
        });
    },


    async getAllGroups(token) {

        const response = await fetch('http://localhost:8080/api/groups', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return await response.json(); 
        }
        else{
            const errorData = await response.json(); 
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        } 
    },


    async getMyGroup(token) {
        const response = await fetch('http://localhost:8080/api/groups/group', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            
            return await response.json(); 
        }
        else{
            const errorData = await response.json(); 
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        }
        
    },


    async getUsersByGroup(token, group_id) {

        const response = await fetch(`http://localhost:8080/api/groups/${group_id}/students`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return await response.json(); 
        }
        else{
            const errorData = await response.json(); 
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        } 
    },


    async getUsers(token) {

        const response = await fetch(`http://localhost:8080/api/groups/group`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return await response.json(); 
        }
        else{

            const errorData = await response.json(); 
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        } 
    },

    async getUsersWithoutGroup(token) {
        const response = await fetch(`http://localhost:8080/api/groups/users/unassigned`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return await response.json(); 
        }
        else{
            const errorData = await response.json(); 
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        } 
    },


    async createGroup(token, name) {

        const response = await fetch(`http://localhost:8080/api/groups`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type' : `application/json`
            },
            body: JSON.stringify({ name }),
        });
        if (response.ok) {
            return await response.json(); 
        }
        else{
            const errorData = await response.json(); 
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        } 
    },


    async updateGroup(token, groupId, newName) {

        const response = await fetch(`http://localhost:8080/api/groups/${groupId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type' : `application/json`
            },
            body: JSON.stringify({ name: newName }),
        });
        if (response.ok) {
            return await response.json(); 
        }
        else{
            const errorData = await response.json(); 
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        } 
    },

    async deleteGroup(token, groupId) {
        const response = await fetch(`http://localhost:8080/api/groups/${groupId}`, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return
        }
        else{
            const errorData = await response.json(); 
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        } 
    },

    async addUserForGroup(token, groupId, userId) {
        const response = await fetch(`http://localhost:8080/api/groups/${groupId}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return
        }
        else{
            const errorData = await response.json(); 
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        } 
    },

    async deleteUserFromGroup(token, groupId, userId) {
        const response = await fetch(`http://localhost:8080/api/groups/${groupId}/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return
        }
        else{
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
        else{
            const errorData = await response.json(); 
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        } 
    },
};
