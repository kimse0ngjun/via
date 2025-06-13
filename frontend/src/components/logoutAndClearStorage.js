export const logoutAndClearStorage = () => {
  // ✅ 로컬스토리지 항목 개별 삭제 (안전하게 필요 항목만)
  localStorage.removeItem("userEmail");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("chatHistory");
  localStorage.removeItem("isLoggedIn");

  // 또는 전부 다 지우고 싶다면 아래 사용:
  // localStorage.clear();
};
