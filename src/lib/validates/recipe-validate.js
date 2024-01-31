import * as yup from "yup";

// 폼마다 발생되는 오류들을 reduce를 이용해 한번에 모아주는 역할
// 한번에 오류가 난 폼들을 표시할 수 있기 때문에 사용
export const extractErrors = error => {
  return error.inner.reduce((acc, error) => {
    return { ...acc, [error.path]: error.message };
  }, {});
}

export const recipeValidate = yup.object().shape({
  title: yup.string().required("제목을 입력해 주세요."),
  serving: yup.number().min(1, "최소 1인분부터 작성할 수 있습니다.").required("인분을 입력해 주세요."),
});

export const recipeFoodValidate = yup.array().of(yup.object().shape({
  foodName: yup.string().required("재료명을 선택해 주세요."),
  amount: yup.number().min(1, "최소 수량은 1부터 입력할 수 있습니다.").max(32767, "최대 수량은 32767까지만 입력할 수 있습니다.").required("수량을 입력해 주세요."),
}));

export const recipeProcessValidate = yup.array().of(yup.object().shape({
  description: yup.string().required("설명을 입력해 주세요."),
}));