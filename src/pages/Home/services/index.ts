import lxrequest from "@/services/index";

export function getDocument(name: string) {
  return lxrequest.request({
    url: `/guidance_info/${name}`,
    method: "get"
  });
}
