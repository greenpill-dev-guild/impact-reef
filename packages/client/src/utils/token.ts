export function getToken() {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    return "";
  }
}
export function setToken(token: string) {
  try {
    return localStorage.setItem("token", token);
  } catch (error) {
    return "";
  }
}
