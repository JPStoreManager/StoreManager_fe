import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';

/**
 * dayjs에 대한 기본 설정 적용
 */
const _configureDayjs = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Asia/Seoul');
  dayjs.locale('ko');
};
_configureDayjs();

/**
 * 현재 날짜 및 시간의 dayjs 객체 반환
 * @returns 현재 날짜 및 시간의 dayjs 객체 반환
 */
const getNow = (): dayjs.Dayjs => {
  return dayjs();
};

/**
 * dayjs 객체를 문자열로 변환
 * @param date dayjs 객체
 * @returns YYYY-MM-DD 형식의 문자열
 */
const convertToString = (date: dayjs.Dayjs): string => {
  return date.format('YYYY-MM-DD');
}

/**
 * dayjs 객체를 지정된 형식의 문자열로 변환
 * @param date dayjs 객체
 * @param format 변환할 형식
 * @returns 지정된 형식의 문자열
 */
const convertToFormattedString = (date: dayjs.Dayjs, format: string): string => {
  return date.format(format);
}

/**
 * 날짜 문자열을 dayjs 객체로 변환
 * @param dateString 날짜 문자열
 * @returns dayjs 객체
 */
const convertToDayjs = (dateString: string): dayjs.Dayjs => {
  return dayjs(dateString);
}

export { getNow, convertToString, convertToFormattedString, convertToDayjs };

