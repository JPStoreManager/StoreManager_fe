enum ResultResponse {
  YES = 'Y',
  NO = 'N'
};

interface ApiResponse<T> {
  result: ResultResponse;
  msg: string;
  timestamp: string;
  data: T;
};

export {ResultResponse};
export type {ApiResponse};