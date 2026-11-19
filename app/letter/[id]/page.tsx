import { Suspense } from "react";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Recipient from "./recipient";

type LetterPageProps = { params: Promise<{ id: string }> };

export default function Page({ params }: LetterPageProps) {
  return (
    <Suspense fallback={<LetterLoading />}>
      <SavedLetter params={params} />
    </Suspense>
  );
}

async function SavedLetter({ params }: LetterPageProps) {
  const { id } = await params;
  const letter = await new PrismaClient().letter.findUnique({ where: { id } });
  if (!letter) notFound();
  return <Recipient letter={letter} />;
}

function LetterLoading() {
  return (
    <main className="modal" aria-busy="true">
      <p className="eyebrow">A LETTER, JUST FOR YOU</p>
      <h2>A little love is on its way.</h2>
      <p role="status">Finding your letter…</p>
    </main>
  );
}
