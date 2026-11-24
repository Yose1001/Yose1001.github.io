// ข้อมูล Resume ทั้งหมดอยู่ในไฟล์นี้ไฟล์เดียว
// อยากแก้ประวัติ แก้ที่นี่ แล้วหน้าเว็บจะเปลี่ยนตาม
import type { L } from '../i18n'

export const profile = {
  name: 'Yose Kawaguchi',
  nameTh: 'โยเซะ คาวากึจิ',
  tagline: {
    th: 'Software Engineer และ Full Stack Developer',
    en: 'Software Engineer & Full Stack Developer',
  } as L,
  summary: {
    th: 'มีประสบการณ์เก็บและวิเคราะห์ความต้องการ และทำงานร่วมกับลูกค้าโดยตรงและพัฒนาระบบ Process Automation (RPA / OCR) และระบบแบบ Low-Code และมีประสบการณ์เป็น Full Stack Developer พัฒนาเว็บไซต์ทั้ง Frontend และ Backend ด้วย React.js, Node.js และ Python',
    en: 'Experienced in gathering and analysing requirements, working directly with clients, and building process automation (RPA / OCR) and low-code systems, with Full Stack Developer experience building websites on both frontend and backend using React.js, Node.js and Python.',
  } as L,
  location: { th: 'กรุงเทพมหานคร', en: 'Bangkok, Thailand' } as L,
  email: 'yosekawagiji1001@gmail.com',
  github: 'https://github.com/Yose1001',
  linkedin: 'https://www.linkedin.com/in/yose-kawaguchi-70b5992a9',
  lineId: 'yose606',
  // ลิงก์เพิ่มเพื่อน LINE ด้วย ID (~ = ค้นด้วย ID)
  line: 'https://line.me/ti/p/~yose606',
  // ใส่ชื่อไฟล์ PDF ที่วางไว้ในโฟลเดอร์ public เช่น 'resume.pdf' เพื่อให้ปุ่มดาวน์โหลดแสดง
  resumePdf: './Resume_Yose_Kawaguchi.pdf' as string,
}

export type Job = {
  role: string
  company: L
  period: L
  bullets: L<string[]>
  tagsLabel: string
  tags: string[]
}

export const jobs: Job[] = [
  {
    role: 'Software Engineer',
    company: {
      th: 'บริษัท เคเอสพี เอเชีย ฟิน จำกัด (KSP AsiaFIN)',
      en: 'KSP AsiaFIN Co., Ltd.',
    },
    period: { th: 'พ.ค. 2025 – ปัจจุบัน', en: 'May 2025 – Present' },
    bullets: {
      th: [
        'เก็บและวิเคราะห์ความต้องการ (Requirements) จากลูกค้าโดยตรง',
        'พัฒนา Bot ด้วย Robotic Process Automation (RPA) บน Orange Bot',
        'พัฒนาระบบอ่านข้อมูลจากเอกสารด้วย Optical Character Recognition (OCR) บน Orange Vision',
        'พัฒนาระบบแบบ Low-Code บน Formplus',
        'ออกแบบสูตรและลอจิกการทำงานบน Excel',
        'ทดสอบและแก้ไขระบบก่อนส่งมอบให้ลูกค้า',
      ],
      en: [
        'Gather and analyse requirements directly from clients',
        'Build bots with Robotic Process Automation (RPA) on Orange Bot',
        'Build document data-extraction systems with Optical Character Recognition (OCR) on Orange Vision',
        'Build low-code systems on Formplus',
        'Design formulas and working logic in Excel',
        'Test and fix systems before delivery to clients',
      ],
    },
    tagsLabel: 'Platform',
    tags: ['Orange Bot', 'Orange Vision', 'Formplus', 'Excel'],
  },
  {
    role: 'Full Stack Developer',
    company: {
      th: 'บริษัทหลักทรัพย์ ไพ จำกัด (มหาชน) — Pi Securities',
      en: 'Pi Securities Public Company Limited',
    },
    period: { th: '2025 · 5 เดือน', en: '2025 · 5 months' },
    bullets: {
      th: [
        'พัฒนาเว็บไซต์ฝั่ง Frontend ด้วย React.js',
        'พัฒนาฝั่ง Backend ด้วย Node.js และ Python',
        'ออกแบบและพัฒนาส่วนติดต่อผู้ใช้ (UI/UX) ของเว็บไซต์',
        'พัฒนาและเชื่อมต่อ API ระหว่างระบบ',
      ],
      en: [
        'Built website frontends with React.js',
        'Built backends with Node.js and Python',
        'Designed and built the website user interface (UI/UX)',
        'Built and integrated APIs between systems',
      ],
    },
    tagsLabel: 'Stack',
    tags: ['HTML', 'CSS', 'React.js', 'Node.js', 'Python'],
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Automation', items: ['RPA', 'OCR', 'Low-Code', 'Excel'] },
  {
    group: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React.js', 'Bootstrap', 'Vite'],
  },
  { group: 'Backend', items: ['Python', 'Java', 'Node.js', 'Express', 'Spring Boot'] },
  { group: 'Database', items: ['MySQL', 'PostgreSQL', 'MongoDB'] },
  { group: 'DevOps', items: ['Git', 'GitHub', 'Docker'] },
  { group: 'Tools', items: ['Visual Studio', 'Postman', 'Figma', 'MAMP'] },
]

export const education = {
  school: {
    th: 'มหาวิทยาลัยราชภัฏมหาสารคาม',
    en: 'Rajabhat Maha Sarakham University',
  } as L,
  degree: {
    th: 'ปริญญาตรี · คณะเทคโนโลยีสารสนเทศ สาขาเทคโนโลยีสารสนเทศ',
    en: "Bachelor's degree · Faculty of Information Technology, Information Technology",
  } as L,
  gpa: 'GPA 3.70',
}
