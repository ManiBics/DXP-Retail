import fetchApigee from "@/utils/apigeeService";
import { fetchCommerce } from "@/utils/commerce";

export async function POST(request) {
  const body = await request.json();
  const res = await fetchCommerce("/customers", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return Response.json(res);
}
