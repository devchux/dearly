"use client";
import { useState } from "react";
import { ArrowLeft, Link } from "lucide-react";
import Butterflies from "./Butterflies";
export default function LetterModal({ theme, title, description, html, name, stickers, url, onClose, onCopy }: { theme:string; title:string; description:string; html:string; name:string; stickers:string[]; url:string; onClose:()=>void; onCopy:()=>void }) {
const [opened, setOpened] = useState(false);
return (
        <div className="modal">
          <button className="back" onClick={onClose}>
            <ArrowLeft size={18} /> Back to your letter
          </button>
          <p className="eyebrow">SOMETHING FROM THE HEART</p>
          {!opened ? (
            <>
              <h2>You have a little love waiting.</h2>
              <p>Some words are meant just for you.</p>
              <button className="envelope" onClick={() => setOpened(true)}>
                <span className="flap" />
                <span className="seal">♡</span>
                <span className="envelope-name">To someone very special</span>
              </button>
              <p className="hand-note">click the heart to open your letter</p>
            </>
          ) : (
            <article className={"paper revealed paper-" + theme.toLowerCase()}>
              <h2>{title}</h2>
              <p>{description}</p>
              <div
                className="letter-text"
                dangerouslySetInnerHTML={{ __html: html }}
              />
              <div className="signature">{name} ♡</div>
              <div className="paper-stickers">{stickers.join(" ")}</div>
            </article>
          )}
          <Butterflies />
          {url && (
            <button
              className="copy-link"
              onClick={() => {
                onCopy();
              }}
            >
              <Link size={15} /> Copy your letter link
            </button>
          )}
        </div>
);
}
