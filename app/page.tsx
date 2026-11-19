import { Suspense } from "react";
import WritingRoom from "./components/WritingRoom";
import SiteHeader from "./components/SiteHeader";
import StudioIntro from "./components/StudioIntro";

export default function Home() {
  return (
    <Suspense fallback={<WritingRoomFallback />}>
      <WritingRoom />
    </Suspense>
  );
}

function WritingRoomFallback() {
  return (
    <div>
      <SiteHeader />
      <main id="studio">
        <StudioIntro />
        <p role="status" className="text-center py-12">Preparing your writing room…</p>
      </main>
    </div>
  );
}
