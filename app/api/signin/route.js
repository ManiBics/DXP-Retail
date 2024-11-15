import fetchNode from "@/utils/nodeService";
import { fetchCommerce } from "@/utils/commerce";

export async function POST(request) {
  const body = await request.json();
  const res = await fetchCommerce(`/login `, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return Response.json(res);
}
