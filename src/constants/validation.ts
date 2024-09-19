export const ERROR_EMAIL_CHECK = "이메일 형식으로 작성해 주세요.";
export const ERROR_EMAIL_DUPLICATED = "중복된 이메일입니다.";
export const ERROR_EMAIL_EMPTY = "이메일을 입력해 주세요.";

export const ERROR_PASSWORD_CHECK = "비밀번호가 일치하지 않습니다.";
export const ERROR_PASSWORD_VALIDATION =
  "영문, 숫자, 특수문자 포함 8자 이상 입력해 주세요.";
export const ERROR_PASSWORD_EMPTY = "비밀번호를 입력해 주세요.";

export const ERROR_PASSWORD_SECOND_EMPTY = "비밀번호를 한 번 더 입력해 주세요.";

export const ERROR_NAME_EMPTY = "이름을 입력해주세요.";
export const ERROR_NAME_VALIDATION =
  "이름은 2자 이상, 5자 이하의 문자만 가능합니다.";

export const ERROR_USERNAME_EMPTY = "아이디를 입력해주세요.";
export const ERROR_USERNAME_VALIDATION =
  "아이디는 5자 이상, 15자 이하의 영문자와 숫자만 가능합니다.";

export const ERROR_TEAM_EMPTY = "팀을 선택해주세요.";
export const ERROR_PART_EMPTY = "파트를 선택해주세요.";

// 이름 형식
export const NAME_STANDARD = /^[a-zA-Z가-힣 ]{2,5}$/;

// 아이디 형식
export const USERNAME_STANDARD = /^[a-zA-Z0-9_-]{5,15}$/;

// 이메일 형식
export const EMAIL_STANDARD =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

// 비밀번호 형식: 영문, 숫자, 특수문자 포함 8자 이상
export const PASSWORD_STANDARD =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
