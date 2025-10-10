'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { TinyWaveFormIcon } from '../components/TinyWaveFormIcon'

export function AboutSection(props: React.ComponentPropsWithoutRef<'section'>) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section {...props}>
      {/* تیتر */}
      <h2 className="flex items-center font-sans text-xs sm:text-sm font-medium text-slate-900">
        <TinyWaveFormIcon
          colors={['fill-violet-300', 'fill-pink-300']}
          className="h-2.5 w-2.5"
        />
        <span className="mr-2.5">درباره پادکست</span>
      </h2>

      {/* توضیح */}
      <p
        className={clsx(
          'mt-2 text-[13px] sm:text-[15px] md:text-base leading-7 text-slate-700',
          !isExpanded && 'lg:line-clamp-4'
        )}
      >
        کاوش در دنیای داده و هوش مصنوعی! در پادکست هوبوک، مباحث پیشرفته مهندسی داده،
        تحلیل داده و کاربردهای هوش مصنوعی رو بررسی می‌کنیم. از طراحی پایپ‌لاین‌های داده
        تا تحلیل و ارزش‌آفرینی از داده‌ها، با موضوعات کاربردی و به‌روز در حوزه داده
        همراه ما باشید.
      </p>

      {/* دکمه “نمایش بیشتر” */}
      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-xs sm:text-sm font-bold text-pink-500 hover:text-pink-700 active:text-pink-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          نمایش بیشتر
        </button>
      )}
    </section>
  )
}
