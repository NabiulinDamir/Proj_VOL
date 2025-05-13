import mainJson from "@/shared/documents/main.json";

export default {
    async UserLogin(login, password) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const res = mainJson.users.find(user => user.email == login && user.password == password)
                resolve(res); 
            }, 1000);
        });
    },
    
    // async getDisciplinesByGroupId(groupId) {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             const res = mainJson.disciplines.filter((discipline) =>
    //                 mainJson.group_disciplines.some(
    //                     (gd) =>
    //                         gd.group_id === groupId &&
    //                         gd.discipline_id === discipline.id
    //                 )
    //             );
    //             resolve(res); 
    //         }, 500);
    //     });
    // },

    async getDisciplinesByUser(userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const res = mainJson.disciplines
                resolve(res); 
            }, 500);
        });
    },

    async getUsersByGroup(groupId){
        return new Promise((resolve) => {
            setTimeout(() => {
                const res = mainJson.users.filter(user => user.group && user.group.id == groupId)
                resolve(res); 
            }, 500);
        });
    },

    async userAuth(login, password) {

        const response = await fetch('http://localhost:8080/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password }),
        });


        if (response.ok) {
            return response.json()
        }
        else{
            const errorData = await response.json(); 
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        } 
    },

    // async userInfo(token) {

    //     setTimeout(() => {
    //         const res = mainJson.users.filter(user => user.group && user.group.id == groupId)
    //         return await(res); 
    //     }, 500);

    // }


    async userInfo(token) {
        try{
            const response = await fetch('http://localhost:8080/info', {
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
                throw new Error(`Ошибка запроса: ${response.status}`);
            }
        }
        catch(error){
            console.error(`info error ${error.message}`)
        }
            

    },

    async userReg(regData) {

        const response = await fetch(`http://localhost:8080/registration`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : `application/json`
            },
            body: JSON.stringify(regData),
        });
        if (response.ok) {
            return response.json()
        }
        else{
            const errorData = await response.json(); 
            const errorMessage = errorData.message || errorData.error || "Неизвестная ошибка";
            throw (errorMessage)
        } 
    },

};
