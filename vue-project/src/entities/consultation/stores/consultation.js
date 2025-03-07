import { defineStore } from "pinia";
import api from "../api/index";
import { format, addDays, isSameDay } from 'date-fns';
export const useConsStore = defineStore("Consultation", {
    state: () => ({
        group_id: null,
        consultations: [],
        startDate: null,
        endDate: null,
        gapStartAndEndDate: [],
    }),
    getters: {
        getConsForDate() {
            return (date) => this.consultations.filter((cons) => cons.start_time.includes(format(date, "yyyy-MM-dd")));
        },

        
    },

    actions: {
        setGapStartAndEndDate(){
            let indexDate = new Date(this.startDate);
            while (!isSameDay(indexDate, this.endDate)){
                this.gapStartAndEndDate.push(new Date(indexDate))
                indexDate = addDays(indexDate, 1);
            }
        },

        setDefaultDate() {
            this.startDate = new Date();
            this.endDate = addDays(new Date(), 7);
        },

        async setConsByUser() {
            if (!this.startDate || !this.endDate) {
                this.setDefaultDate();
                this.setGapStartAndEndDate();
            }
            try {
                this.consultations = await api.getAllCons(this.group_id, this.startDate, this.endDate);
            } catch (error) {
                console.error("Ошибка при загрузке консультаций:", error);
            }
        },
    },
    // persist: true
});
