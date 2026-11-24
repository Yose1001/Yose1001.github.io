// รายการโปรเจคจาก GitHub ที่อยากโชว์บนเว็บ
// วิธีเพิ่ม: คัดลอกบล็อก { ... } ด้านล่าง แล้วเปลี่ยน repo เป็น 'ชื่อผู้ใช้/ชื่อ-repo'
// ชื่อ คำอธิบาย ภาษา และดาว เว็บจะดึงจาก GitHub ให้เอง
// ช่องอื่น ๆ ไม่ใส่ก็ได้ ใส่เมื่ออยากเขียนทับข้อมูลจาก GitHub
import type { L } from '../i18n'

export type ProjectEntry = {
  repo: string // 'เจ้าของ/ชื่อ-repo'
  title?: string // ชื่อที่อยากให้แสดงแทนชื่อ repo
  description?: L // คำอธิบาย 2 ภาษา (ถ้าไม่ใส่ ใช้คำอธิบายจาก GitHub)
  tags?: string[] // ป้ายเทคโนโลยี
  demo?: string // ลิงก์เว็บจริง (ถ้ามี)
}

export const githubUser = 'Yose1001'

export const projects: ProjectEntry[] = [
  {
    repo: 'Yose1001/taskflow',
    title: 'TaskFlow',
    description: {
      th: 'ระบบจัดการงาน (Task Management) แบบ Full Stack พัฒนาเป็นขั้นตอนเหมือนโปรเจคจริงในบริษัท',
      en: 'A full-stack task management system, built step by step the way a real company project is run.',
    },
    tags: ['Go', 'React', 'PostgreSQL'],
  },
]

// นอกจากรายการด้านบน ให้แสดง repo สาธารณะล่าสุดเพิ่มอีกกี่อัน (0 = ไม่แสดงเพิ่ม)
// ตั้งไว้ 100 = แสดง repo สาธารณะทั้งหมด (repo ใหม่ที่สร้างทีหลังจะขึ้นเองด้วย)
export const alsoShowLatest = 100
