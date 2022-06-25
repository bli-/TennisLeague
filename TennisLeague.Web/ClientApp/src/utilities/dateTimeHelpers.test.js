import { DayOfWeek } from "../models/DaysOfWeekEnum";
import { addDaysToDate, findFirstDayAfterDate, getDayFromDate, getTimeFromDate } from "./dateTimeHelpers";

it('should return day of week', async () => {
    let date = new Date("1/1/2022");

    let dayOfWeek = getDayFromDate(date);

    expect(dayOfWeek).toBe('Saturday');
});

it('should return time from date', async () => {
    let time = '5:00 PM';
    let dateTime = new Date(`1/1/2022 ${time}`);

    let result = getTimeFromDate(dateTime);

    expect(result).toBe(time);
});

it('should add days to a date', async () => {
    let date = new Date('1/1/2022 12:00 AM');
    let days = 7;

    let result = addDaysToDate(date, days);
    
    expect(result).toStrictEqual(new Date('1/8/2022 12:00 AM'));
});

it('should subtract days on a date', async () => {
    let date = new Date('1/1/2022 12:00 AM');
    let days = -7;

    let result = addDaysToDate(date, days);
    
    expect(result).toStrictEqual(new Date('12/25/2021 12:00 AM'));
});

it('should return first occurance of a day if date is later in the week', async() => {
    let date = new Date('2/1/2022 12:00 AM'); // tuesday
    let dayOfWeek = DayOfWeek.Thursday;

    let result = findFirstDayAfterDate(date, dayOfWeek);

    expect(result).toStrictEqual(new Date('2/3/2022 12:00 AM'));
})

it('should return first occurance of a day if date is earlier in the week', async() => {
    let date = new Date('2/1/2022 12:00 AM'); // tuesday
    let dayOfWeek = DayOfWeek.Monday;

    let result = findFirstDayAfterDate(date, dayOfWeek);

    expect(result).toStrictEqual(new Date('2/7/2022 12:00 AM'));
})