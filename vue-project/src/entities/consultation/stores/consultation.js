import { defineStore } from "pinia";
import api from "../api/index";
import { format, addDays, subDays, isSameDay, isAfter, isBefore,} from "date-fns";

import { useCurrentUserStore } from "@/entities/user/stores/user";
import { useGroupStore } from "@/entities/groups/stores/groupStore";
import { useDisciplinesStore } from "@/entities/disciplines/stores/disciplines";

export const useConsStore = defineStore("Consultation", {
    state: () => ({

        consultations: [],
        startDate: null,
        endDate: null,
        
        Dates: [],
        group_id: null,
        uploadRequest: false,

        navigateCons: null,
    }),

    getters: {

        userToken: () => {
            const userStore = useCurrentUserStore();
            return userStore.token?.id ?? null;
        },

        async allGroups() {
            const groupStore = useGroupStore();
            return await groupStore.getGroups();
        },

        async allDisciplines(){
            const disciplinesStore = useDisciplinesStore();
            return await disciplinesStore.getDisciplines();
        },


        getConsForDate() {
            return (date) =>
                this.consultations.filter((cons) =>
                    cons.start_time.includes(format(date, "yyyy-MM-dd"))
                );
        },

//////////////////////////////////////////////////////////////////////////////////////////////Определения

        getIncludesDateInDates() {
            return (date) =>
                this.Dates.some((d) => isSameDay(d, date)) &&
                !isSameDay(date, this.startDate) &&
                !isSameDay(date, this.endDate);
        },

        getIsStartDate() {
            return (date) => isSameDay(date, this.startDate);
        },

        getIsEndDate() {
            return (date) => isSameDay(date, this.endDate);
        },

        getIsConsDate() {
            return (dateObject) => this.consultations.some(cons => cons.start_time.includes(format(dateObject, "yyyy-MM-dd")))
        }
    },

    actions: {

//////////////////////////////////////////////////////////////////////////////////////////////Инициализации

        setDates() {
            if (isBefore(this.startDate, this.endDate)) {
                this.Dates = [];
                let indexDate = new Date(this.startDate);
                while (!isSameDay(indexDate, this.endDate)) {
                    this.Dates.push(new Date(indexDate));
                    indexDate = addDays(indexDate, 1);
                }
                this.Dates.push(indexDate);
            }
            else if(isSameDay(this.startDate, this.endDate)){
                this.Dates = [this.startDate];
            }
        },
        async setDefaultDates() {
            const today = new Date();
            // Устанавливаем время на 00:00:00 для today
            today.setHours(0, 0, 0, 0);
            
            // Получаем день недели (0 - воскресенье, 1 - понедельник, ..., 6 - суббота)
            const dayOfWeek = today.getDay();

            const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
            
            // Начало недели (понедельник) в 00:00:00
            this.startDate = addDays(today, diffToMonday);
            
            // Конец недели (воскресенье) в 23:59:59
            this.endDate = addDays(this.startDate, 6);
            this.endDate.setHours(23, 59, 59, 999);

            this.setDates();

            await this.setConsByUser();
        },

        async setScopeDates(scopetDate) {
            const today = new Date(scopetDate);
            // Получаем день недели (0 - воскресенье, 1 - понедельник, ..., 6 - суббота)
            const dayOfWeek = today.getDay();

            const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
            
            this.startDate = addDays(today, diffToMonday);
            this.startDate.setHours(0, 0, 0, 0);
            this.endDate = addDays(this.startDate, 6);
            this.endDate.setHours(23, 59, 59, 999);

            this.setDates();

            await this.setConsByUser()

            this.navigateCons = this.consultations.find(cons => cons.start_time === scopetDate)
        },

//////////////////////////////////////////////////////////////////////////////////////////////увеличение-уменьшение раассматриваемой недели

        async nextWeek() {
            this.startDate = addDays(this.startDate, 7);
            this.endDate = addDays(this.endDate, 7);
            this.setDates();
            await this.setConsByUser()
        },

        async prevWeek() {
            this.startDate = addDays(this.startDate, -7);
            this.endDate = addDays(this.endDate, -7);
            this.setDates();
            await this.setConsByUser()
        },

//////////////////////////////////////////////////////////////////////////////////////////////увеличение-уменьшение дат(не используется)

        // async subtractStartDate() {
        //     this.startDate = subDays(this.startDate, 1);
        //     this.setDates();
        //     this.setConsByUser();
        // },
        // async appendStartDate() {
        //     if (isBefore(this.startDate, this.endDate)) {
        //         this.startDate = addDays(this.startDate, 1);
        //         this.setDates();
        //         await this.setConsByUser();
        //     }
        // },

        // async subtractEndtDate() {
        //     if (isBefore(this.startDate, this.endDate)) {
        //         this.endDate = subDays(this.endDate, 1);
        //         this.setDates();
        //         await this.setConsByUser();
        //     }
        // },
        // async appendEndtDate() {
        //     this.endDate = addDays(this.endDate, 1);
        //     this.setDates();
        //     await this.setConsByUser();
        // },

//////////////////////////////////////////////////////////////////////////////////////////////Изменение промежутка через календарь

        // setCalendarStartDate(dateObject) {
        //     if (isBefore(this.endDate, dateObject)) {
        //         this.startDate = this.endDate;
        //         this.endDate = dateObject;
        //     }
        //     else{ this.startDate = dateObject; }
        //     this.setDates();
        // },

        // setCalendarEndDate(dateObject) {
        //     if (isBefore(dateObject, this.startDate)) {
        //         this.endDate = this.startDate;
        //         this.startDate = dateObject;
        //     }
        //     else{ this.endDate = dateObject; }
        //     this.setDates();
        // },

//////////////////////////////////////////////////////////////////////////////////////////////api запросы

        async setConsByUser() {
            if (!this.startDate || !this.endDate) {
                this.setDefaultDates();
            }
            try {
                this.uploadRequest = true;
                this.consultations = await api.getAllCons(
                    this.group_id,
                    this.startDate,
                    this.endDate
                );
                this.uploadRequest = false;
            } catch (error) {
                console.error("Ошибка при загрузке консультаций:", error);
            }
            
        },

    },
    // persist: true
});
