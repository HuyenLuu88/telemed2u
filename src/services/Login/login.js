import { postService } from "../../utilities/request/restClient";
import { config } from "../../constants";

export const sendOtpService = (data) => {
  return postService(`/getotp`, data);
};
export const verifyOtpService = (data) => {
  return postService(`/verifylogin`, data);
};
export const registerService = (data) => {
  return postService(`/register`, data);
};
export const completeProfileService = (data) => {
  return postService(`/completeprofile`, data);
};
export const getDetailsService = (data) => {
  return postService(`/get-details`, data);
};
export const sendOtpToEmailService = (data) => {
  return postService(`/validate-Email`, data);
};
export const verifyQuestionsService = (data) => {
  return postService(`/validate-security-qes`, data);
};

