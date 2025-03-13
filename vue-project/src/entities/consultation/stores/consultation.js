import { defineStore } from "pinia";
import api from "../api/index";
import { format, addDays, subDays, isSameDay, isAfter, isBefore } from 'date-fns';
export const useConsStore = defineStore("Consultation", {
    state: () => ({
        group_id: null,
        consultations: [],
        startDate: null,
        endDate: null,
        Dates: [],
    }),
    getters: {
        getConsForDate() {
            return (date) => this.consultations.filter((cons) => cons.start_time.includes(format(date, "yyyy-MM-dd")));
        },

        // IsStartOrEndDate(){
        //     return (date) => isSameDay(this.startDate, date)
        // }

        getIncludesDateInDates(){
            return (date) => this.Dates.some(d => isSameDay(d, date)) && (!isSameDay(date, this.startDate)) && (!isSameDay(date, this.endDate));
        },

        getIsStartDate(){
            return (date) => (isSameDay(date, this.startDate));
        },

        getIsEndDate(){
            return (date) => (isSameDay(date, this.endDate));
        } 
        
    },  

    actions: {
        setDates(){
            if(isBefore(this.startDate, this.endDate))
            {
                this.Dates = []
                let indexDate = new Date(this.startDate);
                while (!isSameDay(indexDate, this.endDate)){
                    this.Dates.push(new Date(indexDate))
                    indexDate = addDays(indexDate, 1);
                }
                this.Dates.push(indexDate)
            }

        },

        async setDefaultDates(){
            this.startDate = new Date()
            this.endDate = addDays(this.startDate, 6)
            this.setDates()
            await this.setConsByUser()
        },
        async subtractStartDate(){
            this.startDate = subDays(this.startDate, 1)
            this.setDates()
            await this.setConsByUser()
        },
        async appendStartDate(){
            if(isBefore(addDays(this.startDate, 1), this.endDate)){
                this.startDate = addDays(this.startDate, 1)
                this.setDates()
                await this.setConsByUser()
            }
        },        

        async subtractEndtDate(){
            if(isBefore(this.startDate, subDays(this.endDate, 1))){
                this.endDate = subDays(this.endDate, 1)
                this.setDates()
                await this.setConsByUser()
            }
        },
        async appendEndtDate(){
            this.endDate = addDays(this.endDate, 1)
            this.setDates()
            await this.setConsByUser()
        },


        async setConsByUser() {
            if (!this.startDate || !this.endDate) {
                await this.setDefaultDates();
            }
            else{
                try {
                    this.consultations = await api.getAllCons(this.group_id, this.startDate, this.endDate);
                } catch (error) {
                    console.error("Ошибка при загрузке консультаций:", error);
                }
            }
        },
    },
    // persist: true
});
