"use client";
import Butterflies from "../../components/Butterflies";
import { useState } from "react";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

export default function Recipient({
  letter,
}: {
  letter: {
    title: string;
    description: string;
    content: string;
    theme: string;
    stickers: string;
    name: string;
  };
}) {
  const [open, setOpen] = useState(false);
  return (
    <main className="modal">
      <p className="eyebrow">A LETTER, JUST FOR YOU</p>
      {!open ? (
        <>
          <h2>You have a little love waiting.</h2>
          <p>{letter.description}</p>
          <button
            className="envelope"
            onClick={() => setOpen(true)}
            aria-label="Open your letter"
          >
            <span className="flap" />
            <span className="seal">♡</span>
            <span className="envelope-name">To someone very special</span>
          </button>
          <p className="hand-note">click the heart to open your letter</p>
        </>
      ) : (
        <article
          className={"paper revealed paper-" + letter.theme.toLowerCase()}
        >
          <h2>{letter.title}</h2>
          <div
            className="letter-text"
            dangerouslySetInnerHTML={{
              __html: generateHTML(JSON.parse(letter.content), [StarterKit]),
            }}
          />
          <div className="signature">{letter.name} ♡</div>
          <div className="paper-stickers">
            {JSON.parse(letter.stickers).join(" ")}
          </div>
        </article>
      )}
      <Butterflies />
    </main>
  );
}
