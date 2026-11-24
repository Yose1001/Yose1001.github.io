// ชิ้นส่วนเล็ก ๆ ที่ใช้ซ้ำหลายที่
import type { ReactNode } from 'react'
import type { L, Lang } from '../i18n'

const LANGS = ['th', 'en'] as const

// Bi = ข้อความ 2 ภาษาที่ "จองพื้นที่" ไว้เท่ากับภาษาที่ยาวกว่าเสมอ
// วิธีทำ: วางทั้งสองภาษาซ้อนกันในช่องเดียว แล้วซ่อนภาษาที่ไม่ได้เลือก
// ผลคือสลับภาษาแล้วหน้าเว็บไม่ขยับ
export function Bi({ text, lang, block = false }: { text: L; lang: Lang; block?: boolean }) {
  return (
    <span className={block ? 'grid' : 'inline-grid'}>
      {LANGS.map((code) => (
        <span
          key={code}
          lang={code}
          aria-hidden={code !== lang}
          className={`col-start-1 row-start-1 ${code === lang ? '' : 'invisible'}`}
        >
          {text[code]}
        </span>
      ))}
    </span>
  )
}

// แบบเดียวกับ Bi แต่ใช้กับเนื้อหาเป็นก้อน เช่น รายการ bullet
export function BiBlock({ lang, render }: { lang: Lang; render: (code: Lang) => ReactNode }) {
  return (
    <div className="grid">
      {LANGS.map((code) => (
        <div
          key={code}
          lang={code}
          aria-hidden={code !== lang}
          className={`col-start-1 row-start-1 min-w-0 ${code === lang ? '' : 'invisible'}`}
        >
          {render(code)}
        </div>
      ))}
    </div>
  )
}

export function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string
  title: ReactNode
  subtitle?: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-slate-200 py-12 dark:border-slate-800">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </section>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
      {children}
    </span>
  )
}
