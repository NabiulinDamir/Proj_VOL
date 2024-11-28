import mainJson from '@/shared/documents/main.json'
export const getDisciplines = () => mainJson.disciplines


export const setLab = async(lab_id) => {
    await setTimeout(()=>{
        mainJson.assignment.find(lab => lab.id === lab_id).title += "hui"
    }, 1000)
}

