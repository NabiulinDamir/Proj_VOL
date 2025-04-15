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


};
