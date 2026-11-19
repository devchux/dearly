"use client";
import { useState } from "react";
import { EditorContent, type Editor } from "@tiptap/react";
import { Check, Bold, Italic, AlignLeft, Smile, Undo2, Sparkles } from "lucide-react";
export default function LetterComposer({ title, setTitle, description, setDescription, name, setName, theme, setTheme, stickers, setStickers, editor, wordCount }: {
 title:string; setTitle:(value:string)=>void; description:string; setDescription:(value:string)=>void;
 name:string; setName:(value:string)=>void; theme:string; setTheme:(value:string)=>void;
 stickers:string[]; setStickers:(value:string[])=>void; editor:Editor|null; wordCount:number;
}) {
const [tab, setTab] = useState("Paper");
return (
          <section className="compose">
            <div className="section-heading">
              <span className="step">01</span>
              <h2>Make it yours</h2>
              <span className="saved">
                <Check size={12} /> Your little masterpiece
              </span>
            </div>
            <label>
              LETTER TITLE <span>Give your feelings a name</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="A little love, just for you"
              />
            </label>
            <label>
              A LITTLE INTRODUCTION <span>Just a line to set the mood</span>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              YOUR LETTER <span>There’s no perfect way. Just your way.</span>
            </label>
            <div className="editor">
              <div className="toolbar">
                <button
                  aria-label="Bold"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                  <Bold size={16} />
                </button>
                <button
                  aria-label="Italic"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                  <Italic size={16} />
                </button>
                <span className="divider" />
                <span className="font-choice">Handwritten⌄</span>
                <AlignLeft size={16} />
                <span className="grow" />
                <button
                  aria-label="Insert smiley"
                  onClick={() =>
                    editor?.chain().focus().insertContent(" ☺️ ").run()
                  }
                >
                  <Smile size={17} />
                </button>
                <button
                  aria-label="Undo"
                  onClick={() => editor?.chain().focus().undo().run()}
                >
                  <Undo2 size={16} />
                </button>
              </div>
              <EditorContent editor={editor} />
              <div className="editor-bottom">
                <span>A little honesty looks good on paper.</span>
                <span>{wordCount} words</span>
              </div>
            </div>
            <label className="signature-label">
              SIGN OFF WITH LOVE
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <div className="decorate-title">
              <Sparkles size={16} />
              <h3>The little details</h3>
              <span>Because love is in them.</span>
            </div>
            <div className="tabs">
              {["Paper", "Stickers", "Smileys"].map((t) => (
                <button
                  className={tab === t ? "active" : ""}
                  key={t}
                  onClick={() => setTab(t)}
                >
                  {t === "Paper" ? "▧" : t === "Stickers" ? "✿" : "☺"} {t}
                </button>
              ))}
            </div>
            {tab === "Paper" ? (
              <div className="papers">
                {["Rosewater", "Ivory", "Lilac", "Sage"].map((t, i) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={theme === t ? "selected" : ""}
                  >
                    <div className={"swatch swatch-" + i}>
                      {theme === t && <Check size={18} />}
                      <span>With love</span>
                    </div>
                    {t}
                  </button>
                ))}
              </div>
            ) : (
              <div className="sticker-picker">
                {(tab === "Stickers"
                  ? ["🎀", "🌷", "🦋", "🍒", "💌", "🌼", "🧸", "✨"]
                  : ["🥰", "☺️", "💕", "😘", "🤍", "🫶", "💐", "😍"]
                ).map((s) => (
                  <button
                    key={s}
                    onClick={() =>
                      tab === "Stickers"
                        ? setStickers([...stickers, s])
                        : editor?.chain().focus().insertContent(s).run()
                    }
                  >
                    {s}
                  </button>
                ))}
                <button onClick={() => setStickers([])}>Clear</button>
              </div>
            )}
          </section>

);
}
