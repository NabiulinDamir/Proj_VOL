import mainJson from '@/shared/documents/main.json'

export default {
    getLabs(group_id){
        return mainJson.assignment.filter(lab => lab.group_id === group_id)
    },

    getTheory(group_id){
        return mainJson.theory_material.filter(the => the.group_id === group_id)
    },

    async setLab(lab_id){
        setTimeout(()=>{
            return mainJson.assignment.find(lab => lab.id === lab_id).title += "hui"
        }, 1000)
    },

    async GetLabsByGroupAndDisciplineId(group_id, discipline_id){
        return new Promise((resolve) => {
            setTimeout(()=>{
                resolve(mainJson.assignment.filter(assignment => assignment.group_id === group_id && assignment.discipline_id == discipline_id))
            }, 500)
        })
    },

    async GetTheoryByGroupAndDisciplineId(group_id, discipline_id){
        return new Promise((resolve) => {
            setTimeout(()=>{
                resolve(mainJson.theory_material.filter(theory => theory.group_id === group_id && theory.discipline_id == discipline_id))
            }, 500)    
        })
    },

    GetTheoryIdForLabById(lab_id){
        return mainJson.assignment_theory_material.filter(ass => ass.assignment_id === lab_id).map(ass => ass.theory_material_id);
        
    },
    
    async GetDeadlinesByGroupId(group_id, YearAndMonth){
        return new Promise((resolve) => {
            setTimeout(()=>{
                resolve(mainJson.deadlines.filter(dead => dead.date.includes(YearAndMonth)))
            }, 500)  

        })
    }
}