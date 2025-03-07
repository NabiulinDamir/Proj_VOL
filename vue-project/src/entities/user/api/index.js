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
    
    async getDisciplinesByGroupId(groupId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const res = mainJson.disciplines.filter((discipline) =>
                    mainJson.group_disciplines.some(
                        (gd) =>
                            gd.group_id === groupId &&
                            gd.discipline_id === discipline.id
                    )
                );
                resolve(res); 
            }, 500);
        });
    },


    async getGroupUsersByGroup(groupId){
        return new Promise((resolve) => {
            setTimeout(() => {
                const res = mainJson.users.filter(user => user.group && user.group.id == groupId)
                resolve(res); 
            }, 500);
        });
    }
};
