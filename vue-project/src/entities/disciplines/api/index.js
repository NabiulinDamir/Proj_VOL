import mainJson from "@/shared/documents/main.json";

export default {


    async getDisciplinesByUser(userId){
        return new Promise((resolve) => {
            setTimeout(() => {
                const res = mainJson.disciplines
                resolve(res); 
            }, 500);
        });
    }
};
