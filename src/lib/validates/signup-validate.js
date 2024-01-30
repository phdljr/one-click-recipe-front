import * as yup from "yup";

export const extractErrors = error => {
  return error.inner.reduce((acc, error) => {
    return { ...acc, [error.path]: error.message };
  }, {});
}

export const signUpValidate = yup.object().shape({
  email: yup.string().email("이메일 형식이 아닙니다.").required("이메일을 입력해 주세요."),
  nickname: yup.string().min(4, "닉네임의 길이는 4~20자여야 합니다.").max(20, "닉네임의 길이는 4~20자여야 합니다.").required("닉네임을 입력해 주세요."),
  password: yup.string().min(8, "비밀번호의 길이는 8~255자여야 합니다.").max(255, "비밀번호의 길이는 8~255자여야 합니다.").required("비밀번호를 입력해 주세요."),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null],
    '비밀번호가 일치하지 않습니다.')
});