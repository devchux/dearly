import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data.title || !data.content)
      return Response.json(
        { error: "Title and content required" },
        { status: 400 },
      );
    const letter = await prisma.letter.create({
      data: {
        title: String(data.title).slice(0, 200),
        description: String(data.description).slice(0, 500),
        content: JSON.stringify(data.content),
        theme: data.theme,
        stickers: JSON.stringify(data.stickers),
        name: String(data.name).slice(0, 100),
      },
    });
    return Response.json({ id: letter.id });
  } catch {
    return Response.json({ error: "Unable to save" }, { status: 500 });
  }
}
