import mainJson from '@/shared/documents/main.json'

export default {
    getLabs(group_id){
        return mainJson.assignment.filter(lab => lab.group_id === group_id)
    },

    getTheory(group_id){
        return mainJson.theory_material.filter(the => the.group_id === group_id)
    },


    async GetLabsByGroupAndDisciplineId(discipline_id){
        return new Promise((resolve) => {
            setTimeout(()=>{
                resolve(mainJson.assignment.filter(assignment => assignment.discipline_id == discipline_id))
            }, 500)
        })
    },

    async GetTheoryByGroupAndDisciplineId(discipline_id){
        return new Promise((resolve) => {
            setTimeout(()=>{
                resolve(mainJson.theory_material.filter(theory => theory.discipline_id == discipline_id))
            }, 500)    
        })
    },

    GetTheoryIdForLabById(lab_id){
        return mainJson.assignment_theory_material
            .filter(ass => ass.assignment_id === lab_id)
            .map(ass => ass.theory_material_id);
        
    },
    
    async GetDeadlinesByGroupId(){
        return new Promise((resolve) => {
            setTimeout(()=>{
                resolve(mainJson.assignment.map(({ title, id, deadline, discipline_id }) => ({
                    lab_name: title,
                    lab_id: id,
                    date: deadline,
                    discipline_id, // Можно оставить как есть, если имя не меняется
                })))
            }, 500)  
            
            //.filter(dead => dead.date.includes(YearAndMonth))

        })
    }


}