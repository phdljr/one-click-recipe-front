import * as yup from "yup";

export const extractErrors = error => {
  return error.inner.reduce((acc, error) => {
    return { ...acc, [error.path]: error.message };
  }, {});
}

export const loginValidate = yup.object().shape({
  email: yup.string().email("이메일 형식이 아닙니다.").required("이메일을 입력해 주세요."),
  password: yup.string().required("비밀번호를 입력해 주세요."),
});