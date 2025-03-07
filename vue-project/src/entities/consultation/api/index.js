import Cons from './Cons.json'

//export const getAllCons = (group_id) => Cons.consultation.filter(cons => cons.group_id === group_id)

export default {



    async getAllCons(group_id, startDate, endDate){
        return new Promise((resolve) => {
            setTimeout(()=>{
                resolve(Cons.consultation)
            }, 500)
        })
    },
}