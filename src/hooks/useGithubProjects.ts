// ดึงข้อมูล repo จาก GitHub API แล้วรวมกับรายการใน data/projects.ts
import { useEffect, useState } from 'react'
import { alsoShowLatest, githubUser, projects } from '../data/projects'
import type { ProjectEntry } from '../data/projects'

type GithubRepo = {
  full_name: string
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  topics?: string[]
  fork: boolean
}

export type ProjectCard = {
  key: string
  entry?: ProjectEntry
  name: string
  description: string | null
  url: string | null // null = หา repo ไม่เจอ (เช่น repo เป็น private) จึงไม่แสดงลิงก์
  demo: string | null
  language: string | null
  stars: number
  tags: string[]
}

const API = 'https://api.github.com'
const CACHE_MINUTES = 60

// เก็บผลลัพธ์ไว้ในเบราว์เซอร์ 1 ชั่วโมง เพราะ GitHub จำกัดจำนวนครั้งที่เรียกได้
async function getJson<T>(url: string): Promise<{ status: number; data: T | null }> {
  const cacheKey = `gh:${url}`
  try {
    const hit = sessionStorage.getItem(cacheKey)
    if (hit) {
      const parsed = JSON.parse(hit) as { at: number; status: number; data: T | null }
      if (Date.now() - parsed.at < CACHE_MINUTES * 60_000) return parsed
    }
  } catch {
    // อ่าน cache ไม่ได้ก็ข้ามไปเรียกจริง
  }
  const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
  const data = res.ok ? ((await res.json()) as T) : null
  if (res.ok || res.status === 404) {
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), status: res.status, data }))
    } catch {
      // เก็บ cache ไม่ได้ก็ไม่เป็นไร
    }
  }
  return { status: res.status, data }
}

function toCard(entry: ProjectEntry | undefined, repo: GithubRepo | null, status: number): ProjectCard {
  const fullName = repo?.full_name ?? entry?.repo ?? ''
  return {
    key: fullName.toLowerCase(),
    entry,
    name: entry?.title ?? repo?.name ?? fullName.split('/')[1] ?? fullName,
    description: repo?.description ?? null,
    // 404 = ไม่มี repo นี้แบบสาธารณะ จึงไม่ใส่ลิงก์; ข้อผิดพลาดอื่น (เช่น เรียกเกินโควตา) ยังใส่ลิงก์ได้
    url: repo?.html_url ?? (status === 404 ? null : `https://github.com/${fullName}`),
    demo: entry?.demo ?? (repo?.homepage || null),
    language: repo?.language ?? null,
    stars: repo?.stargazers_count ?? 0,
    tags: entry?.tags ?? repo?.topics ?? [],
  }
}

export function useGithubProjects() {
  const [cards, setCards] = useState<ProjectCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const listed = await Promise.all(
        projects.map(async (entry) => {
          try {
            const { status, data } = await getJson<GithubRepo>(`${API}/repos/${entry.repo}`)
            return toCard(entry, data, status)
          } catch {
            return toCard(entry, null, 0) // ไม่มีเน็ต: ยังแสดงการ์ดจากข้อมูลในไฟล์ได้
          }
        }),
      )

      let latest: ProjectCard[] = []
      if (alsoShowLatest > 0) {
        try {
          const { data } = await getJson<GithubRepo[]>(
            `${API}/users/${githubUser}/repos?sort=updated&per_page=100`,
          )
          const listedKeys = new Set(listed.map((c) => c.key))
          latest = (data ?? [])
            .filter((r) => !r.fork && !listedKeys.has(r.full_name.toLowerCase()))
            .slice(0, alsoShowLatest)
            .map((r) => toCard(undefined, r, 200))
        } catch {
          latest = []
        }
      }

      if (cancelled) return
      // เรียงตามลำดับในไฟล์ projects.ts แล้วตามด้วย repo ล่าสุด
      setCards([...listed, ...latest])
      setLoading(false)
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return { cards, loading }
}
