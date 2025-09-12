// app/podcast/components/SharedRightColumn.tsx
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { AboutSection } from "./AboutSection";
import { Waveform } from "./Waveform";
import posterImage from "../../../public/images/podcast/hoboc-podcast-poster.png";
import { HiOutlineUser as PersonIcon } from "react-icons/hi2";

interface SharedRightColumnProps {
  hosts: string[];
  showWaveformOnMobile?: boolean;
}

export default function SharedRightColumn({ 
  hosts, 
  showWaveformOnMobile = true 
}: SharedRightColumnProps) {
  return (
    <aside className="w-full lg:w-2/5 bg-slate-50 border-b lg:border-b-0 lg:border-e border-slate-200 overflow-y-auto lg:pr-40 md:pr-12">
      {showWaveformOnMobile && (
        <div className="block lg:hidden">
          <Waveform className="h-20 w-full" />
        </div>
      )}

      <div className="px-6 py-10 lg:py-16 flex flex-col items-center lg:items-start">
        <Link
          href="/"
          className="relative block w-56 sm:w-72 rounded-xl overflow-hidden bg-slate-200 shadow-xl mx-auto"
        >
          <Image
            src={posterImage}
            alt="پوستر پادکست داده"
            className="w-full"
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 18rem, 14rem"
            priority
          />
          <div className="absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset" />
        </Link>

        <div className="mt-8 text-center">
          <p className="text-xl font-bold text-slate-900">
            <Link href="/">دنیای داده</Link>
          </p>
          <p className="mt-3 text-lg font-medium text-slate-700">
            گفتگو با مهندسان داده، تحلیلگران و متخصصان بیگ‌دیتا درباره
            تکنولوژی‌ها، ابزارها و چالش‌های دنیای داده.
          </p>
        </div>

        <AboutSection className="mt-8" />

        <h2 className="mt-8 flex items-center font-mono text-sm font-medium text-slate-900">
          <PersonIcon className="h-3 w-auto text-slate-300" />
          <span className="mr-2.5">با اجرای</span>
        </h2>
        <div className="mt-2 flex gap-6 text-sm font-bold text-slate-900">
          {hosts.map((host, i) => (
            <Fragment key={host}>
              {i !== 0 && (
                <span aria-hidden="true" className="text-slate-400">
                  /
                </span>
              )}
              {host}
            </Fragment>
          ))}
        </div>
      </div>
    </aside>
  );
}