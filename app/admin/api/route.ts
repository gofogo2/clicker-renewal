import { gofogo } from "@/app/components/test";

export async function GET() {
    const result = gofogo();
    return Response.json(result);
  }