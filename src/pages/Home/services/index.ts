import lxrequest from "@/services/index";

export function getDocument(name: string) {
  return lxrequest.request({
    url: `/guidance_info/${name}`,
    method: "get"
  });
}

export function getCanLogin(username: string, password: string) {
  return lxrequest.request({
    url: `/login`,
    method: "post",
    data: {
      username,
      password
    }
  });
}

export function getCanRegister(username: string, password: string) {
  return lxrequest.request({
    url: `/register`,
    method: "post",
    data: {
      username,
      password
    }
  });
}

export function getCanLogout() {
  return lxrequest.request({
    url: `/register`,
    method: "get"
  });
}
