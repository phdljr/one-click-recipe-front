import * as yup from "yup";

export const extractErrors = error => {
  return error.inner.reduce((acc, error) => {
    return { ...acc, [error.path]: error.message };
  }, {});
}

export const reviewValidate = yup.object().shape({
  content: yup.string().max(5000, "내용의 길이는 최대 5000자 입니다.").required("내용을 입력해 주세요."),
  star: yup.number().min(0, "점수는 0~5점 까지만 가능합니다.").max(5, "점수는 0~5점 까지만 가능합니다.").required("점수를 입력해 주세요."),
});