import dayjs from 'dayjs'

type MonthDatepickerOnChange = (date: dayjs.Dayjs, dateString: string | string[]) => void;

export type {MonthDatepickerOnChange};