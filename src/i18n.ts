// ภาษาที่เว็บรองรับ และข้อความของปุ่ม/หัวข้อต่าง ๆ
export type Lang = 'th' | 'en'

// L<T> = ข้อมูลหนึ่งชิ้นที่มีทั้งภาษาไทยและอังกฤษ
export type L<T = string> = Record<Lang, T>

export const ui = {
  nav: {
    projects: { th: 'ผลงาน', en: 'Projects' },
    experience: { th: 'ประสบการณ์', en: 'Experience' },
    skills: { th: 'ทักษะ', en: 'Skills' },
    education: { th: 'การศึกษา', en: 'Education' },
    contact: { th: 'ติดต่อ', en: 'Contact' },
  },
  hero: {
    contact: { th: 'ติดต่อผม', en: 'Contact me' },
    download: { th: 'ดาวน์โหลด Resume', en: 'Download resume' },
  },
  projects: {
    title: { th: 'ผลงาน', en: 'Projects' },
    subtitle: {
      th: 'โปรเจคที่ดึงข้อมูลมาจาก GitHub',
      en: 'Projects pulled from GitHub',
    },
    seeMore: { th: 'ดูทั้งหมด', en: 'See more' },
    seeLess: { th: 'ย่อกลับ', en: 'See less' },
    prev: { th: 'เลื่อนไปซ้าย', en: 'Scroll left' },
    next: { th: 'เลื่อนไปขวา', en: 'Scroll right' },
    code: { th: 'ดูโค้ด', en: 'Code' },
    demo: { th: 'ดูเว็บจริง', en: 'Live demo' },
    loading: { th: 'กำลังโหลดจาก GitHub…', en: 'Loading from GitHub…' },
    empty: { th: 'ยังไม่มีโปรเจคที่แสดง', en: 'No projects to show yet' },
    noDescription: { th: 'ยังไม่มีคำอธิบาย', en: 'No description yet' },
  },
  experience: { title: { th: 'ประสบการณ์ทำงาน', en: 'Experience' } },
  skills: { title: { th: 'ทักษะทางเทคนิค', en: 'Technical skills' } },
  education: { title: { th: 'การศึกษา', en: 'Education' } },
  contact: {
    title: { th: 'ติดต่อ', en: 'Contact' },
    text: {
      th: 'สนใจร่วมงานหรืออยากพูดคุยเพิ่มเติม ติดต่อได้ทางช่องทางด้านล่างครับ',
      en: 'Interested in working together or want to talk? Reach me through the links below.',
    },
  },
  theme: { th: 'สลับโหมดสว่าง/มืด', en: 'Toggle light/dark mode' },
} satisfies Record<string, unknown>
