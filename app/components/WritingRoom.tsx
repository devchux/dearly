"use client";
import { useState } from "react";
import { useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ArrowUpRight, Heart } from "lucide-react";
import SiteHeader from "./SiteHeader";
import StudioIntro from "./StudioIntro";
import SiteFooter from "./SiteFooter";
import LetterComposer from "./LetterComposer";
import LetterPreview from "./LetterPreview";
import LetterModal from "./LetterModal";

const initial =
  "<p>My dearest you,</p><p>Some people make the world feel a little softer, a little warmer, a little more like home.</p><p>You are that person for me.</p><p>In all the little moments and all the ordinary days, I hope you know how very loved you are.</p><p>Always, and in all ways.</p>";

export default function WritingRoom() {
  const [theme, setTheme] = useState("Rosewater");
  const [title, setTitle] = useState("A little love, just for you");
  const [description, setDescription] = useState(
    "For my favorite person, on an ordinary day.",
  );
  const [name, setName] = useState("With love, me");
  const [stickers, setStickers] = useState(["🎀"]);
  const [view, setView] = useState(false);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const editor = useEditor({
    extensions: [StarterKit],
    content: initial,
    immediatelyRender: false,
  });
  // Tiptap mutates the editor instance; subscribe to its transactions so
  // sibling previews receive fresh content without relying on parent edits.
  const editorContent = useEditorState({
    editor,
    selector: ({ editor }) => ({
      html: editor?.getHTML() ?? initial,
      wordCount: editor?.getText().trim().split(/\s+/).filter(Boolean).length ?? 0,
    }),
  });
  const html = editorContent?.html ?? initial;
  const wordCount = editorContent?.wordCount ?? 0;

  async function seal() {
    setStatus("Sealing your letter…");
    try {
      const r = await fetch("/api/letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          content: editor?.getJSON(),
          theme,
          stickers,
          name,
        }),
      });
      if (!r.ok) throw Error();
      const data = await r.json();
      setUrl(location.origin + "/letter/" + data.id);
      setView(true);
      setStatus("");
    } catch {
      setStatus("Could not save your letter. Please try again.");
    }
  }
  return (
    <div>
      <SiteHeader />
      <main id="studio">
        <StudioIntro />
        <div className="studio">
          <LetterComposer
            {...{
              title,
              setTitle,
              description,
              setDescription,
              name,
              setName,
              theme,
              setTheme,
              stickers,
              setStickers,
              editor,
              wordCount,
            }}
          />
          <LetterPreview
            {...{ theme, title, name, stickers }}
            html={html}
            onPreview={() => setView(true)}
          />
        </div>
        <div className="send-row">
          <div>
            <Heart size={20} />
            <p>
              Made with feeling. Delivered with a little magic.
              <small>Your letter opens with a beautiful envelope reveal.</small>
            </p>
          </div>
          <button className="seal-button" onClick={seal}>
            Seal with love <ArrowUpRight size={18} />
          </button>
        </div>
        {status && <p role="status">{status}</p>}
        <SiteFooter />
      </main>
      {view && (
        <LetterModal
          {...{ theme, title, description, name, stickers, url }}
          html={html}
          onClose={() => setView(false)}
          onCopy={async () => {
            await navigator.clipboard.writeText(url);
            setStatus("Link copied!");
          }}
        />
      )}
    </div>
  );
}
