import type { Context, Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { validate } from "@kickstartds/ds-agency-premium/tokens/branding-tokens.schema.validate.mjs";

const STORE_NAME = "tokens";

const res = (status: number, body?: object | string) => {
  const headers = new Headers();
  if (typeof body === "object") {
    body = JSON.stringify(body);
    headers.append("content-type", "application/json");
  }
  return new Response(body, { status, headers });
};

export default async (req: Request, context: Context) => {
  const store = getStore(STORE_NAME);

  try {
    if (req.method === "GET" && !context.params.token) {
      const list = await store.list();
      return res(
        200,
        list.blobs.map((blob) => blob.key),
      );
    }

    if (!context.params.token) {
      return new Response("Missing Token in Url", { status: 422 });
    }
    const data = await store.get(context.params.token);

    switch (req.method) {
      case "GET":
        if (!data) {
          return res(404, "Not Found");
        }
        return res(200, data);

      case "POST":
        if (data) {
          return res(409, "Token name already exists");
        }

      case "POST":
      case "PUT":
        let body;
        try {
          body = await req.json();
        } catch (e) {
          return res(
            422,
            e instanceof Error ? e.message : "Missing or Invalid Data",
          );
        }
        if (!validate(body)) {
          console.error(validate.errors);
          return res(422, "Invalid Data");
        }
        await store.setJSON(context.params.token, body);

      case "POST":
        return res(201, body);

      case "PUT":
        return res(200, body);

      case "DELETE":
        await store.delete(context.params.token);
        return res(200);

      default:
        return res(405, "Method Not Allowes");
    }
  } catch (error) {
    console.error(error);
    const errorMsg =
      error instanceof Error ? error.message : "Internal Server Error";
    return res(500, errorMsg);
  }
};

export const config: Config = {
  path: ["/api/tokens", "/api/tokens/:token"],
};
