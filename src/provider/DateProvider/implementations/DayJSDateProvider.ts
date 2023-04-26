import dayjs from "dayjs";
import IDateProvider from "../IDateProvider";

export default class DayJSDateProvider implements IDateProvider {
    addDays(days: number): Date {
        return dayjs().add(days, 'days').toDate();
    }
    
}