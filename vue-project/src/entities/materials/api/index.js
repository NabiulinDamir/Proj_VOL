import mainJson from '@/shared/documents/main.json'

export const getLabs = (group_id) => mainJson.assignment.filter(lab => lab.group_id === group_id)

export const getTheory = (group_id) => mainJson.theory_material.filter(the => the.group_id === group_id)

export const setLab = async(lab_id) => {
    await setTimeout(()=>{
        mainJson.assignment.find(lab => lab.id === lab_id).title += "hui"
    }, 1000)
}

