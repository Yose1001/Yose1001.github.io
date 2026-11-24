# Profile — เว็บ Resume ของ Yose Kawaguchi

เว็บหน้าเดียว แสดงประวัติ ผลงานจาก GitHub และช่องทางติดต่อ สลับภาษา TH/EN และโหมดสว่าง/มืดได้

Stack: React + Vite + TypeScript + Tailwind CSS (ไม่มี backend)

## วิธีรัน (ใน WSL)

```bash
cd /mnt/c/Work_Pro/08-txt/Profile
npm install      # ครั้งแรกครั้งเดียว
npm run dev      # เปิดเว็บที่ http://localhost:5173
npm run build    # สร้างไฟล์สำหรับนำขึ้นเว็บจริง (อยู่ในโฟลเดอร์ dist)
```

## แก้เนื้อหาที่ไหน

| อยากแก้ | ไฟล์ |
|---|---|
| ประวัติ ประสบการณ์ ทักษะ การศึกษา ช่องทางติดต่อ | `src/data/resume.ts` |
| รายการโปรเจคจาก GitHub | `src/data/projects.ts` |
| ข้อความปุ่มและหัวข้อ (TH/EN) | `src/i18n.ts` |
| รูปโปรไฟล์ | `src/assets/profile.jpg` |

## เพิ่มโปรเจคจาก GitHub

เปิด `src/data/projects.ts` แล้วเพิ่มบล็อกใหม่ในรายการ `projects`:

```ts
{ repo: 'Yose1001/ชื่อ-repo' },
```

เว็บจะดึงชื่อ คำอธิบาย ภาษา และดาวจาก GitHub ให้เอง การ์ดเรียงตามลำดับในไฟล์
repo ต้องเป็นแบบ public เว็บจึงจะดึงข้อมูลและใส่ลิงก์ให้ได้
