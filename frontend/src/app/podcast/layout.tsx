// app/podcast/layout.tsx
import { AudioProvider } from "./components/AudioProvider";
import SharedRightColumn from "./components/SharedRightColumn";
import { Waveform } from "./components/Waveform";

/** Podcast section layout with shared right column, audio context, and optional top waveform */
export default function PodcastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hosts = ["مهندس داده حمید", "تحلیلگر داده رضا"];

  return (
    <AudioProvider>
      <div className="flex flex-col lg:flex-row h-auto">
        <SharedRightColumn hosts={hosts} showWaveformOnMobile={true} />
        <main className="w-full lg:w-3/5 flex flex-col">
          {/* Top waveform (large screens only) */}
          <div className="hidden lg:block top-0 z-20 bg-white">
            <Waveform className="h-20 w-full" />
          </div>
          {children}
        </main>
      </div>
    </AudioProvider>
  );
}
