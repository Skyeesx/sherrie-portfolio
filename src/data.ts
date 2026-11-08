export const PROJECTS = ([
{t:"NU Facility Action and Monitoring System (NU-FAMS)",r:"Full-Stack Developer • Team Lead",s:"A web-based facility management system developed for NU Laguna that streamlines maintenance, housekeeping, and security issue reporting through a centralized platform.",
 o:"A facility action and monitoring system that lets members of the NU Laguna community submit facility-related concerns while administrators monitor, manage, and track reports efficiently.",
 role:"As team lead, I helped coordinate development tasks and ensured proper integration between the frontend, backend, and database.",
 prob:"Facility concerns such as maintenance, housekeeping, and security issues needed one centralized place to be reported, tracked, and followed up on.",
 f:["User authentication","Facility issue reporting","Report tracking and status updates","Priority management","Admin dashboard","Database-driven management system","Data visualization"],
 impl:"A PHP backend with a MySQL database handles authentication, report records, status, and priority. The HTML, CSS, and JavaScript frontend provides reporting forms and the admin dashboard with data visualization, developed and run locally on XAMPP.",
 tech:["PHP","MySQL","HTML","CSS","JavaScript","XAMPP"],repo:"https://github.com/Skyeesx/NUL-Facility-Action-and-Monitoring-System-"},
{t:"SCS Class Schedule Generator",r:"Full-Stack Developer",s:"A desktop-based academic scheduling application that automatically generates optimized class schedules for BSCS, BSIS, and BSIT programs.",
 o:"An automated class scheduling system for the Society of Computer Science Students that generates and manages academic schedules by importing course offerings, assigning rooms and time slots, and detecting scheduling conflicts.",
 role:"Full-Stack Developer, working across the scheduling logic, data handling, and desktop interface.",
 prob:"Building class schedules by hand is slow and prone to section and room conflicts. The system applies scheduling algorithms to reduce conflicts and optimize room utilization.",
 f:["Import and normalize course data from CSV files","Automatic schedule generation","Academic term-based scheduling","Conflict detection for sections and rooms","Graph coloring algorithm for reducing scheduling conflicts","Automatic section splitting based on enrollment capacity","Room allocation and utilization balancing","Room visualization grid","Schedule filtering, sorting, and CSV export"],
 impl:"A Python desktop app with a Tkinter interface and MySQL storage. Course data is imported and normalized from CSV files, then NetworkX graph coloring helps assign time slots so conflicting sections and rooms do not overlap.",
 tech:["Python","Tkinter","MySQL","NetworkX","CSV Processing"],repo:"https://github.com/Skyeesx/Academic-Scheduling-for-SCS"},
{t:"NUHanap",r:"Full-Stack Developer",s:"A university lost-and-found web application that helps students and staff report, search, and recover lost belongings through a centralized platform.",
 o:"A role-based lost-and-found management system for National University–Laguna that centralizes lost and found records while improving coordination between students, faculty, Discipline Office staff, and administrators.",
 role:"Full-Stack Developer, building features across the frontend, backend, and database.",
 prob:"Lost and found records were not centralized, making it harder for students, faculty, and the Discipline Office to coordinate item recovery. The system provides reporting workflows, item management, and role-based dashboards.",
 f:["Lost and found item browsing and searching","Item detail pages with images","Lost/found item reporting","Image upload support","User authentication","Personal report tracking","Role-based dashboards","Administrator account management","Inventory and item management","Suspended user access control"],
 impl:"A React and Vite frontend talks to a Node.js and Express backend backed by MySQL. User passwords are protected with bcrypt authentication, and role-based dashboards separate what students, staff, and administrators can do.",
 tech:["React","Vite","Node.js","Express.js","MySQL","bcrypt Authentication"],repo:"https://github.com/donenilo/group2_finals"}
]).map((p, i) => ({ ...p, img: ["/images/nu-fams.jpg","/images/scs-scheduler.jpg","/images/nuhanap.jpg"][i] }))

export const NAV = [
  ['hero', 'Home'], ['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'],
  ['experience', 'Leadership'], ['education', 'Education'], ['contact', 'Contact'],
]

export const SKILLS = ['Java', 'Python', 'C++', 'HTML', 'CSS', 'JavaScript', 'React', 'MySQL', 'Microsoft Word', 'Microsoft Excel']

// Replace these with your own links
export const EMAIL = 'borbonsherriemay@gmail.com'
export const SOCIALS = [
  { label: 'GitHub', url: 'https://github.com/Skyeesx' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sherrie-may-borbon/' },
  { label: 'Email', url: 'mailto:' + EMAIL },
]

export const LEADERSHIP = [
  { org: 'NU LAGUNA COUNCIL OF LEADERS', roles: [
    { t: 'Social Media Manager · Publicity Committee', d: '2026 – Present', p: 'Manages the council’s social media platforms, responds to student inquiries, and maintains a consistent, professional online presence.' },
    { t: 'CRSO Chairwoman', d: '2024 – 2026', p: 'Led student organization initiatives by coordinating academic and non-academic organizations, facilitating events, and supporting student leadership development.' },
  ] },
  { org: 'SCHOOL OF COMPUTER STUDIES', roles: [
    { t: 'Commissioner on Grievances', d: '2026 – Present', p: 'Oversees grievances within the council and mediates misunderstandings between members, providing guidance that supports fair, constructive resolutions.' },
    { t: 'Programs & Activities Director', d: '2025 – 2026', p: 'Planned and oversaw council events from preparation through execution.' },
    { t: 'Public Relations Officer', d: '2024 – 2025', p: 'Managed communication initiatives, documentation, and organization-related activities to improve student engagement.' },
  ] },
]
