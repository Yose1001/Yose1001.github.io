import { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { useGithubProjects } from '../hooks/useGithubProjects'
import type { ProjectCard } from '../hooks/useGithubProjects'
import { ui } from '../i18n'
import type { Lang } from '../i18n'
import { Bi, Section, Tag } from './ui'

function Card({ card, lang }: { card: ProjectCard; lang: Lang }) {
  const t = ui.projects

  return (
    <article
      className="flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <h3 className="text-lg font-semibold break-words">{card.name}</h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {card.entry?.description ? (
          <Bi text={card.entry.description} lang={lang} block />
        ) : (
          (card.description ?? <Bi text={t.noDescription} lang={lang} block />)
        )}
      </p>

      {card.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {card.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        {card.language && (
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" aria-hidden="true" />
            {card.language}
          </span>
        )}
        {card.stars > 0 && (
          <span className="text-slate-500 dark:text-slate-400">★ {card.stars}</span>
        )}
        <span className="flex-1" />
        {card.demo && (
          <a className="font-medium text-indigo-600 hover:underline dark:text-indigo-400" href={card.demo} target="_blank" rel="noreferrer">
            <Bi text={t.demo} lang={lang} /> ↗
          </a>
        )}
        {card.url && (
          <a className="font-medium text-indigo-600 hover:underline dark:text-indigo-400" href={card.url} target="_blank" rel="noreferrer">
            <Bi text={t.code} lang={lang} /> ↗
          </a>
        )}
      </div>
    </article>
  )
}

const controlButton =
  'rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800'

export function Projects({ lang }: { lang: Lang }) {
  const { cards, loading } = useGithubProjects()
  const t = ui.projects

  // expanded = กด "ดูทั้งหมด" แล้ว แสดงทุกการ์ดเป็นตาราง
  const [expanded, setExpanded] = useState(false)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)
  const [dragging, setDragging] = useState(false)
  const rowRef = useRef<HTMLDivElement>(null)
  // ข้อมูลระหว่างลากเมาส์: จุดเริ่ม ตำแหน่งเลื่อนตอนเริ่ม และลากไปไกลพอจะนับว่า "ลาก" หรือยัง
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })

  // เช็กว่ายังเลื่อนไปซ้าย/ขวาได้อีกไหม เพื่อเปิด/ปิดปุ่มลูกศร
  const updateArrows = useCallback(() => {
    const row = rowRef.current
    if (!row) return
    setCanLeft(row.scrollLeft > 4)
    setCanRight(row.scrollLeft + row.clientWidth < row.scrollWidth - 4)
  }, [])

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [updateArrows, cards.length, expanded])

  function scrollByPage(direction: 1 | -1) {
    const row = rowRef.current
    if (!row) return
    row.scrollBy({ left: direction * row.clientWidth, behavior: 'smooth' })
  }

  function onMouseDown(e: MouseEvent<HTMLDivElement>) {
    if (e.button !== 0 || !rowRef.current) return
    drag.current = { active: true, startX: e.clientX, startScroll: rowRef.current.scrollLeft, moved: false }
  }

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const d = drag.current
    if (!d.active || !rowRef.current) return
    const dx = e.clientX - d.startX
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true
      setDragging(true)
    }
    if (d.moved) rowRef.current.scrollLeft = d.startScroll - dx
  }

  function endDrag() {
    drag.current.active = false
    setDragging(false)
  }

  // ถ้าเพิ่งลากเสร็จ ไม่ให้นับเป็นการคลิกลิงก์ในการ์ด
  function onClickCapture(e: MouseEvent<HTMLDivElement>) {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }
  }

  return (
    <Section id="projects" title={<Bi text={t.title} lang={lang} />} subtitle={<Bi text={t.subtitle} lang={lang} block />}>
      {loading ? (
        <p className="text-sm text-slate-500 dark:text-slate-400"><Bi text={t.loading} lang={lang} block /></p>
      ) : cards.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400"><Bi text={t.empty} lang={lang} block /></p>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-end gap-2">
            {!expanded && (
              <>
                <button type="button" className={controlButton} onClick={() => scrollByPage(-1)} disabled={!canLeft} aria-label={t.prev[lang]} title={t.prev[lang]}>
                  ←
                </button>
                <button type="button" className={controlButton} onClick={() => scrollByPage(1)} disabled={!canRight} aria-label={t.next[lang]} title={t.next[lang]}>
                  →
                </button>
              </>
            )}
            <button type="button" className={controlButton} onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
              {expanded ? <Bi text={t.seeLess} lang={lang} /> : <><Bi text={t.seeMore} lang={lang} /> ({cards.length})</>}
            </button>
          </div>

          {expanded ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {cards.map((card) => (
                <Card key={card.key} card={card} lang={lang} />
              ))}
            </div>
          ) : (
            // แถวเดียว เลื่อนซ้ายขวาได้ด้วยลูกศร ลากเมาส์ หรือปัดนิ้ว
            <div
              ref={rowRef}
              onScroll={updateArrows}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              onClickCapture={onClickCapture}
              onDragStart={(e) => e.preventDefault()}
              className={`project-row flex gap-4 overflow-x-auto pb-3 ${
                dragging ? 'cursor-grabbing select-none' : 'cursor-grab snap-x snap-mandatory'
              }`}
            >
              {cards.map((card) => (
                <div key={card.key} className="flex w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)]">
                  <Card card={card} lang={lang} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Section>
  )
}
