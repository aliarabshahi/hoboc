// ---------- INLINE TYPES FOR jalaali-js ----------
type JalaaliDate = {
  jy: number; // Jalali year
  jm: number; // Jalali month
  jd: number; // Jalali day
};

interface JalaaliJs {
  toJalaali: (date: Date | number, month?: number, day?: number) => JalaaliDate;
  toGregorian: (jy: number, jm: number, jd: number) => { gy: number; gm: number; gd: number };
  isLeapJalaaliYear: (jy: number) => boolean;
  jalaaliMonthLength: (jy: number, jm: number) => number;
}

// Import the untyped module and cast it
// Make sure @typescript-eslint/eslint-plugin is installed for this rule
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jalaali: JalaaliJs = require("jalaali-js");

// ==== helper: convert English digits to Persian ====
export function toPersianDigits(strOrNum: string | number) {
  return String(strOrNum).replace(/\d/g, (d) =>
    "۰۱۲۳۴۵۶۷۸۹"[parseInt(d, 10)]
  );
}

// ==== helper: format Jalali date with Persian digits ====
export function formatJalaliDate(isoDate: string) {
  const gDate = new Date(isoDate);
  const jDate = jalaali.toJalaali(gDate);
  const monthNames = [
    "فروردین", "اردیبهشت", "خرداد",
    "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر",
    "دی", "بهمن", "اسفند"
  ];
  const day = toPersianDigits(jDate.jd);
  const year = toPersianDigits(jDate.jy);
  const month = monthNames[jDate.jm - 1];
  return `${day} ${month} ${year}`;
}
