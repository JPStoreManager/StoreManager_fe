/**
 * UI를 위해 1000단위마다 콤마(,)를 추가
 * @param amount 숫자
 * @returns 콤마가 추가된 문자열
 */
const addComma = (amount: number): string => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 돈과 관련된 값을 포맷팅하여 그리드 등에 사용될 수 있는 문자열로 반환
 * @param value 숫자 값
 * @returns 포맷된 문자열
 */
const renderMoney = (value: number | null | undefined): string => {
  return value ? addComma(value) : '0';
};

export {addComma, renderMoney};