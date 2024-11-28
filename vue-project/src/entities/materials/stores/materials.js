import { defineStore } from 'pinia';
import mainJson from '@/shared/documents/main.json';
import {getLabs, setLab, getTheory} from '../api/index'
import { getDisciplines } from '@/entities/student/api';

export const useAllMaterialsStore = defineStore('AllMaterials', {
  state: () => ({
    Labs: [],
    TheoryMaterial: [],
    group_id: 0,
  }),
  getters: {
    getLabById(){
      return (id) => this.Labs.find(lab => lab.id === id)
    },
    getLabDeadlineById() {
      return (id) => {
        const result = mainJson.assignment_deadline.find(ass => ass.assignment_id === id && ass.group_id === this.group_id);
        return result ? result.deadline : null;
      }
    },
    getTheoryForLabById() {
      return (id) => {
        const theoryIds = mainJson.assignment_theory_material.filter(ass => ass.assignment_id === id).map(ass => ass.theory_material_id);
        return theoryIds.map(theoryId => this.getTheoryById(theoryId)).filter(theory => theory !== undefined);
      }
    },
    getTheoryById(){
      return (id) => this.TheoryMaterial.find(the => the.id === id)
    },
    getLabsByDisciplineId(){
      return (id) => id ? this.Labs.filter(lab => lab.discipline_id === id) : this.Labs
    },
    getTheoryByDisciplineId(){
      return (id) => id ? this.TheoryMaterial.filter(the => the.discipline_id === id) : this.TheoryMaterial
    },
    getDisciplinesForLab(){
      return (id) => {
        const discipline = mainJson.disciplines.find(dis => dis.id === (this.Labs.find(lab => lab.id === id).discipline_id))
        return discipline ? discipline.name : null
      }
    }
  },
  actions: {
    setLabsByUser(group_id){
        this.group_id = group_id
        this.Labs = getLabs(this.group_id)
    },
    setTheoryByUser(group_id){
      this.group_id = group_id
      this.TheoryMaterial = getTheory(this.group_id)
    },
    
    async setLabById(id){
        await setLab(id)
        this.setLabsByUser(this.group_id)
    }
  },
  persist: true
});
