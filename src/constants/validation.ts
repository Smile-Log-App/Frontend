export const ERROR_EMAIL_CHECK = "이메일 형식으로 작성해 주세요.";
export const ERROR_EMAIL_DUPLICATED = "중복된 이메일입니다.";
export const ERROR_EMAIL_EMPTY = "이메일을 입력해 주세요.";

export const ERROR_PASSWORD_CHECK = "비밀번호가 일치하지 않습니다.";
export const ERROR_PASSWORD_VALIDATION =
  "소문자, 숫자, 특수문자 포함 최소 8자를 입력해 주세요.";
export const ERROR_PASSWORD_EMPTY = "비밀번호를 입력해 주세요.";

export const ERROR_PASSWORD_SECOND_EMPTY = "비밀번호를 한 번 더 입력해 주세요.";

export const ERROR_USERNAME_EMPTY = "닉네임을 입력해 주세요.";
export const ERROR_USERNAME_VALIDATION =
  "닉네임은 한글, 영어, 숫자, 하이픈, 언더스코어 포함 2자 이상, 10자 이하만 가능합니다.";

export const ERROR_USER_ID_EMPTY = "아이디를 입력해 주세요.";
export const ERROR_USER_ID_VALIDATION =
  "아이디는 영문자, 숫자, 하이픈, 언더스코어 포함 5자 이상, 15자 이하만 가능합니다.";

// 닉네임 형식: 한글, 숫자, 하이픈, 언더스코어 중 2자 이상, 10자 이하
export const USERNAME_STANDARD = /^[가-힣a-zA-Z0-9_-]{2,10}$/;

// 아이디 형식: 영문자, 숫자, 하이픈, 언더스코어 중 5자 이상, 15자 이하
export const USER_ID_STANDARD = /^[a-zA-Z0-9_-]{5,15}$/;

// 이메일 형식
export const EMAIL_STANDARD =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

// 비밀번호 형식: 소문자, 숫자, 특수문자 포함 최소 8자
export const PASSWORD_STANDARD =
  /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!^%*?&]{8,}$/;
