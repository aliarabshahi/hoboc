'use client'

import { useState } from 'react'
import clsx from 'clsx'

import { TinyWaveFormIcon } from '../components/TinyWaveFormIcon'

export function AboutSection(props: React.ComponentPropsWithoutRef<'section'>) {
  let [isExpanded, setIsExpanded] = useState(false)

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm/7 font-medium text-slate-900">
        <TinyWaveFormIcon
          colors={['fill-violet-300', 'fill-pink-300']}
          className="h-2.5 w-2.5"
        />
        <span className="mr-2.5">درباره پادکست</span>
      </h2>
      <p
        className={clsx(
          'mt-2 text-base/7 text-slate-700',
          !isExpanded && 'lg:line-clamp-4',
        )}
      >
کاوش در دنیای داده و هوش مصنوعی! در پادکست هوبوک، مباحث پیشرفته مهندسی داده، تحلیل داده و کاربردهای هوش مصنوعی رو بررسی می‌کنیم. از طراحی پایپ‌لاین‌های داده تا تحلیل و ارزش آفرینی از داده ها، با موضوعات کاربردی و به‌روز در حوزه داده همراه ما باشید.
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm/6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          نمایش بیشتر
        </button>
      )}
    </section>
  )
}
