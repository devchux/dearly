"use client";
import { Eye } from "lucide-react";

export default function LetterPreview({
  theme,
  title,
  html,
  name,
  stickers,
  onPreview,
}: {
  theme: string;
  title: string;
  html: string;
  name: string;
  stickers: string[];
  onPreview: () => void;
}) {
  return (
    <section className="preview-area">
      <div className="preview-top">
        <span>
          <span className="live-dot" /> A LITTLE PREVIEW
        </span>
        <button onClick={onPreview}>
          <Eye size={15} /> Preview the magic
        </button>
      </div>
      <div className={"paper paper-" + theme.toLowerCase()}>
        <div className="paper-flower">✿</div>
        <div className="paper-date">A LETTER, JUST FOR YOU</div>
        <h2>{title}</h2>
        <div className="paper-rule">♡</div>
        <div
          className="letter-text"
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
        <div className="signature">
          {name}
          <span>♡</span>
        </div>
        <div className="paper-stickers">
          {stickers.map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      </div>
      <div className="preview-caption">
        a little piece of your heart, on paper <span>♡</span>
      </div>
    </section>
  );
}
