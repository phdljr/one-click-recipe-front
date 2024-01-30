import * as yup from "yup";

export const extractErrors = error => {
  return error.inner.reduce((acc, error) => {
    return { ...acc, [error.path]: error.message };
  }, {});
}

export const orderValidate = yup.object().shape({
  senderName: yup.string().required("발송자 성함을 입력해 주세요."),
  senderPhoneNumber: yup.string().required("발송자 핸드폰 번호를 입력해 주세요."),
  senderEmail: yup.string().email("이메일 형식이 아닙니다.").required("발송자 이메일을 입력해 주세요."),
  receiverName: yup.string().required("수령자 성함을 입력해 주세요."),
  receiverPhoneNumber: yup.string().required("수령자 핸드폰 번호를 입력해 주세요."),
  address: yup.string().required("수령자 주소를 입력해 주세요."),
});