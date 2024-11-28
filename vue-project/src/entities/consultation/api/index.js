import Cons from '../api/Cons.json'

export const getAllCons = (group_id) => Cons.consultation.filter(cons => cons.group_id === group_id)



