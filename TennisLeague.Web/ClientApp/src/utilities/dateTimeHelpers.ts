import { DayOfWeek } from "../models/DaysOfWeekEnum";

export function getDayFromDate (dateInput: Date): string {
    let date = new Date(dateInput);
    return DayOfWeek[date.getDay()];
}

export function getTimeFromDate (dateInput: Date): string {
    let date = new Date(dateInput);
    let ampm = 'AM';

    let hours = date.getHours();
    if (hours > 12) {
        hours -= 12;
        ampm = 'PM';
    }

    let minutes = date.getMinutes();

    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
}

export function findFirstDayAfterDate(date: Date, dayOfWeek: DayOfWeek): Date {
    let currentDay = date.getDay();
    let diff: number;
    if (currentDay < Number(dayOfWeek)) {
        diff = Number(dayOfWeek) - currentDay; 
    } else {
        diff = 7 - currentDay + Number(dayOfWeek);
    }

    return addDaysToDate(date, diff);
}

export function addDaysToDate(date: Date, numberOfDays: number): Date {
    let ret = new Date(date.getTime());
    ret.setDate(date.getDate() + numberOfDays);
    return ret;
}