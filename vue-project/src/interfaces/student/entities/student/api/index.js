import mainJson from '@/shared/documents/main.json'

export const setLab = async(lab_id) => {
    await setTimeout(()=>{
        mainJson.assignment.find(lab => lab.id === lab_id).title
    }, 1000)
}

export const getDisciplines = (groupId) => {
    const res = mainJson.disciplines.filter(discipline => 
        mainJson.group_disciplines.some(gd => 
            gd.group_id === groupId && gd.discipline_id === discipline.id
        )
    );
    return res;
};


