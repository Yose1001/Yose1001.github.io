import { useEffect, useState } from 'react'
import photo from './assets/profile.jpg'
import { DownloadIcon, GithubIcon, LineIcon, LinkedinIcon, MailIcon } from './components/icons'
import { Projects } from './components/Projects'
import { Bi, BiBlock, Section, Tag } from './components/ui'
import { education, jobs, profile, skills } from './data/resume'
import { ui } from './i18n'
import type { Lang } from './i18n'

// อ่านค่าที่ผู้ใช้เคยเลือกไว้ (ภาษา/โหมดสี) จากเบราว์เซอร์
function readSaved(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // เก็บไม่ได้ก็ไม่เป็นไร แค่ไม่จำค่าไว้
  }
}

function initialLang(): Lang {
  const saved = readSaved('lang')
  if (saved === 'th' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('th') ? 'th' : 'en'
}

function initialDark(): boolean {
  const saved = readSaved('theme')
  if (saved) return saved === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const year = new Date().getFullYear()

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition'
// สีปุ่มตามหน้าที่: อีเมล = น้ำเงินม่วง, ดาวน์โหลด = แดง, GitHub = ดำ, LinkedIn = ฟ้าของ LinkedIn, LINE = เขียวของ LINE
const buttonPrimary = `${buttonBase} bg-indigo-600 text-white hover:bg-indigo-700`
const buttonDanger = `${buttonBase} bg-red-600 text-white hover:bg-red-700`
const buttonGithub = `${buttonBase} bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200`
const buttonLinkedin = `${buttonBase} bg-[#0A66C2] text-white hover:bg-[#084d92]`
const buttonLine = `${buttonBase} bg-[#06C755] text-white hover:bg-[#05a847]`
// ปุ่มที่อยู่ในตาราง: ยืดเต็มช่อง ลดขอบซ้ายขวาให้ข้อความพอดีบนจอมือถือ
const fill = 'w-full min-w-0 !px-3 text-center whitespace-nowrap'

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const [dark, setDark] = useState<boolean>(initialDark)

  useEffect(() => {
    document.documentElement.lang = lang
    save('lang', lang)
  }, [lang])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    save('theme', dark ? 'dark' : 'light')
  }, [dark])

  const navItems = [
    ['experience', ui.nav.experience],
    ['projects', ui.nav.projects],
    ['skills', ui.nav.skills],
    ['education', ui.nav.education],
    ['contact', ui.nav.contact],
  ] as const

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* แถบด้านบน */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-3">
          <a href="#top" className="font-bold tracking-tight">
            {profile.name}
          </a>
          <nav className="ml-auto hidden gap-5 text-sm text-slate-600 md:flex dark:text-slate-300">
            {navItems.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                <Bi text={label} lang={lang} />
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            {/* ปุ่มสลับภาษา */}
            <div className="flex overflow-hidden rounded-lg border border-slate-300 text-xs font-semibold dark:border-slate-700" role="group" aria-label="Language">
              {(['th', 'en'] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={`px-2.5 py-1.5 ${
                    lang === code
                      ? 'bg-indigo-600 text-white'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            {/* ปุ่มสลับโหมดสว่าง/มืด */}
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              aria-label={ui.theme[lang]}
              title={ui.theme[lang]}
              className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              {dark ? '☀' : '☾'}
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-4xl px-4">
        {/* ส่วนแนะนำตัว */}
        <section className="flex flex-col-reverse items-start gap-8 py-12 sm:flex-row sm:items-center sm:py-16">
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              <Bi text={profile.location} lang={lang} />
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{profile.name}</h1>
            {/* ชื่อไทยแสดงเฉพาะโหมดไทย แต่ยังจองพื้นที่ไว้ในโหมดอังกฤษ หน้าเว็บจะได้ไม่ขยับ */}
            <p
              aria-hidden={lang !== 'th'}
              className={`mt-1 text-lg text-slate-500 dark:text-slate-400 ${lang === 'th' ? '' : 'invisible'}`}
            >
              {profile.nameTh}
            </p>
            <p className="mt-4 text-lg font-semibold"><Bi text={profile.tagline} lang={lang} block /></p>
            <p className="mt-3 max-w-xl leading-relaxed text-slate-600 dark:text-slate-300">
              <Bi text={profile.summary} lang={lang} block />
            </p>
            {/* ปุ่ม 2 แถว: แถวบน = ปุ่มหลัก 2 ปุ่ม, แถวล่าง = ช่องทางโซเชียล 3 ปุ่ม กว้างเท่ากัน */}
            <div className="mt-6 grid max-w-md gap-3">
              <div className={`grid gap-3 ${profile.resumePdf ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <a className={`${buttonPrimary} ${fill}`} href={`mailto:${profile.email}`}>
                  <MailIcon />
                  <Bi text={ui.hero.contact} lang={lang} />
                </a>
                {profile.resumePdf && (
                  <a className={`${buttonDanger} ${fill}`} href={profile.resumePdf} download>
                    <DownloadIcon />
                    <Bi text={ui.hero.download} lang={lang} />
                  </a>
                )}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <a className={`${buttonGithub} ${fill}`} href={profile.github} target="_blank" rel="noreferrer">
                  <GithubIcon />
                  GitHub
                </a>
                <a className={`${buttonLinkedin} ${fill}`} href={profile.linkedin} target="_blank" rel="noreferrer">
                  <LinkedinIcon />
                  LinkedIn
                </a>
                <a className={`${buttonLine} ${fill}`} href={profile.line} target="_blank" rel="noreferrer">
                  <LineIcon />
                  LINE
                </a>
              </div>
            </div>
          </div>
          <img
            src={photo}
            alt={profile.name}
            width={640}
            height={736}
            className="h-44 w-40 shrink-0 rounded-2xl object-cover shadow-lg sm:h-60 sm:w-52"
          />
        </section>

        {/* ประสบการณ์ทำงาน แบบเส้นเวลา */}
        <Section id="experience" title={<Bi text={ui.experience.title} lang={lang} />}>
          <ol className="space-y-8 border-l-2 border-slate-200 pl-6 dark:border-slate-800">
            {jobs.map((job) => (
              <li key={job.role + job.company.en} className="relative">
                <span
                  className="absolute top-1.5 -left-[31px] h-3 w-3 rounded-full bg-indigo-600 ring-4 ring-slate-50 dark:ring-slate-950"
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-lg font-semibold">{job.role}</h3>
                  <span className="text-sm text-slate-500 dark:text-slate-400"><Bi text={job.period} lang={lang} /></span>
                </div>
                <p className="font-medium text-slate-700 dark:text-slate-300"><Bi text={job.company} lang={lang} block /></p>
                <BiBlock
                  lang={lang}
                  render={(code) => (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {job.bullets[code].map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  )}
                />
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <span className="mr-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {job.tagsLabel}
                  </span>
                  {job.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Projects lang={lang} />

        {/* ทักษะ */}
        <Section id="skills" title={<Bi text={ui.skills.title} lang={lang} />}>
          <dl className="grid gap-4 sm:grid-cols-2">
            {skills.map((group) => (
              <div
                key={group.group}
                className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
              >
                <dt className="text-sm font-semibold">{group.group}</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* การศึกษา */}
        <Section id="education" title={<Bi text={ui.education.title} lang={lang} />}>
          <h3 className="text-lg font-semibold"><Bi text={education.school} lang={lang} block /></h3>
          <p className="text-slate-600 dark:text-slate-300"><Bi text={education.degree} lang={lang} block /></p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{education.gpa}</p>
        </Section>

        {/* ติดต่อ */}
        <Section id="contact" title={<Bi text={ui.contact.title} lang={lang} />}>
          <p className="max-w-xl text-slate-600 dark:text-slate-300"><Bi text={ui.contact.text} lang={lang} block /></p>
          {/* 2x2 กว้างเท่ากัน (จอมือถือเรียงทีละปุ่ม เพราะอีเมลยาว) */}
          <div className="mt-5 grid max-w-xl gap-3 sm:grid-cols-2">
            <a className={`${buttonPrimary} ${fill}`} href={`mailto:${profile.email}`}>
              <MailIcon />
              {profile.email}
            </a>
            <a className={`${buttonGithub} ${fill}`} href={profile.github} target="_blank" rel="noreferrer">
              <GithubIcon />
              GitHub
            </a>
            <a className={`${buttonLinkedin} ${fill}`} href={profile.linkedin} target="_blank" rel="noreferrer">
              <LinkedinIcon />
              LinkedIn
            </a>
            <a className={`${buttonLine} ${fill}`} href={profile.line} target="_blank" rel="noreferrer">
              <LineIcon />
              LINE: {profile.lineId}
            </a>
          </div>
        </Section>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © {year} {profile.name}
      </footer>
    </div>
  )
}
