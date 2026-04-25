Handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

Handlebars.registerHelper('gt', function(a, b) {
  return a > b;
});

Handlebars.registerHelper('substring', function(str, start, end) {
  return str ? str.substring(start, end) : '';
});

Handlebars.registerHelper('longDesc', function(str, len) {
  return str && str.length > len;
});

Handlebars.registerHelper('trunc', function(str, len) {
  if (!str) return '';
  return str.length > len ? str.substring(0, len) + '...' : str;
});

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr; // Return as is if invalid
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

Handlebars.registerHelper('formatDate', function(dateStr) {
  return formatDate(dateStr);
});

Handlebars.registerHelper('or', function(a, b) {
  return a || b;
});

Handlebars.registerHelper('initials', function(name) {
  if (!name) return 'V';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
});

let portfolioData = {
  name: "",
  headerTitle: "",
  bio: "",
  aboutMe: "",
  image: "",
  resume: "",
  skills: [],
  softSkills: [],
  projects: [],
  education: [],
  experience: [],
  awards: [],
  certs: [],
  email: "",
  linkedin: "",
  github: "",
  instagram: "",
  twitter: "",
  whatsapp: "",
  stats: {
    projects: "",
    contributions: "",
    satisfaction: ""
  },
  themeColor: "blue",
  themeMode: "light"
};

let template = "";

function loadTemplate() {
  template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{name}} - Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    html { scroll-behavior: smooth; scroll-padding-top: 100px; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .glass {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .dark .glass {
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .skill-tag {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .skill-tag:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    .project-card {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  </style>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#eff6ff',
              100: '#dbeafe',
              200: '#bfdbfe',
              300: '#93c5fd',
              400: '#60a5fa',
              500: '#3b82f6',
              600: '#2563eb',
              700: '#1d4ed8',
              800: '#1e40af',
              900: '#1e3a8a',
            }
          }
        }
      }
    }
  </script>
  <script>
    function toggleReadMore(btn) {
      const p = btn.previousElementSibling;
      if (p.classList.contains('line-clamp-3')) {
        p.classList.remove('line-clamp-3');
        btn.innerText = 'Show Less';
      } else {
        p.classList.add('line-clamp-3');
        btn.innerText = 'Read More';
      }
    }

    function showAllProjects(btn) {
      const grid = btn.previousElementSibling;
      const items = grid.querySelectorAll('.project-card.hidden');
      items.forEach(item => item.classList.remove('hidden'));
      btn.style.display = 'none';
    }

    function showAllAwards(btn) {
      const grid = btn.previousElementSibling;
      const items = grid.querySelectorAll('.award-item.hidden');
      items.forEach(item => item.classList.remove('hidden'));
      btn.style.display = 'none';
    }

    function showAllCerts(btn) {
      const grid = btn.previousElementSibling;
      const items = grid.querySelectorAll('.cert-item.hidden');
      items.forEach(item => item.classList.remove('hidden'));
      btn.style.display = 'none';
    }

    function showAllExperience(btn) {
      const list = btn.previousElementSibling;
      const items = list.querySelectorAll('.experience-item.hidden');
      items.forEach(item => item.classList.remove('hidden'));
      btn.style.display = 'none';
    }

    function showAllEducation(btn) {
      const grid = btn.previousElementSibling;
      const items = grid.querySelectorAll('.edu-item.hidden');
      items.forEach(item => item.classList.remove('hidden'));
      btn.style.display = 'none';
    }

    function toggleMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      if (menu.style.display === 'none' || menu.classList.contains('hidden')) {
        menu.style.display = 'flex';
        menu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      } else {
        menu.style.display = 'none';
        menu.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    }

    // Initialize theme
    window.addEventListener('DOMContentLoaded', () => {
      // No toggle, just apply the creator's chosen theme
      if ('{{themeMode}}' === 'dark') {
        document.body.classList.add('dark');
      }
    });
  </script>
</head>
<body class="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 {{#if (eq themeMode 'dark')}}dark{{/if}}">
  <nav class="glass sticky top-0 z-50 dark:bg-slate-900/80 dark:border-slate-800">
    <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <a href="#" class="flex items-center gap-3 group">
        <div class="w-10 h-10 bg-gradient-to-br from-{{themeColor}}-600 to-{{themeColor}}-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-{{themeColor}}-500/25 group-hover:rotate-12 transition-all duration-300">
          {{initials name}}
        </div>
        <span class="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent group-hover:text-{{themeColor}}-600 transition-colors">{{name}}</span>
      </a>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex gap-8 items-center">
        {{#if aboutMe}}<a href="#about" class="text-slate-600 dark:text-slate-400 hover:text-{{themeColor}}-600 dark:hover:text-{{themeColor}}-400 font-medium transition-colors">About</a>{{/if}}
        {{#if (or skills.length softSkills.length)}}<a href="#skills" class="text-slate-600 dark:text-slate-400 hover:text-{{themeColor}}-600 dark:hover:text-{{themeColor}}-400 font-medium transition-colors">Skills</a>{{/if}}
        {{#if projects.length}}<a href="#projects" class="text-slate-600 dark:text-slate-400 hover:text-{{themeColor}}-600 dark:hover:text-{{themeColor}}-400 font-medium transition-colors">Projects</a>{{/if}}
        {{#if education.length}}<a href="#education" class="text-slate-600 dark:text-slate-400 hover:text-{{themeColor}}-600 dark:hover:text-{{themeColor}}-400 font-medium transition-colors">Education</a>{{/if}}
        {{#if experience.length}}<a href="#experience" class="text-slate-600 dark:text-slate-400 hover:text-{{themeColor}}-600 dark:hover:text-{{themeColor}}-400 font-medium transition-colors">Experience</a>{{/if}}
        {{#if awards.length}}<a href="#awards" class="text-slate-600 dark:text-slate-400 hover:text-{{themeColor}}-600 dark:hover:text-{{themeColor}}-400 font-medium transition-colors">Awards</a>{{/if}}
        <a href="#contact" class="text-slate-600 dark:text-slate-400 hover:text-{{themeColor}}-600 dark:hover:text-{{themeColor}}-400 font-medium transition-colors">Contact</a>
        
        {{#if resume}}
        <a href="{{resume}}" download="{{name}}-Resume.pdf" class="px-5 py-2 bg-{{themeColor}}-600 text-white rounded-full font-semibold hover:bg-{{themeColor}}-700 transition-all shadow-md">Resume</a>
        {{/if}}
      </div>

      <!-- Mobile Menu Button -->
      <button onclick="toggleMobileMenu()" class="md:hidden p-2 text-slate-600 hover:text-{{themeColor}}-600 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>
    </div>
  </nav>

  <!-- Mobile Menu Overlay -->
  <div id="mobileMenu" class="hidden fixed top-0 left-0 w-full h-full z-[999] bg-[#0f172a] flex-col items-center justify-center p-8 text-center" style="display: none;">
    <button onclick="toggleMobileMenu()" class="absolute top-8 right-8 text-white/50 hover:text-white transition-all">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
    </button>
    
    <div class="flex flex-col space-y-10">
      {{#if aboutMe}}<a href="#about" onclick="toggleMobileMenu()" class="text-4xl font-bold text-white hover:text-{{themeColor}}-400 transition-colors">About</a>{{/if}}
      {{#if (or skills.length softSkills.length)}}<a href="#skills" onclick="toggleMobileMenu()" class="text-4xl font-bold text-white hover:text-{{themeColor}}-400 transition-colors">Skills</a>{{/if}}
      {{#if projects.length}}<a href="#projects" onclick="toggleMobileMenu()" class="text-4xl font-bold text-white hover:text-{{themeColor}}-400 transition-colors">Projects</a>{{/if}}
      {{#if education.length}}<a href="#education" onclick="toggleMobileMenu()" class="text-4xl font-bold text-white hover:text-{{themeColor}}-400 transition-colors">Education</a>{{/if}}
      {{#if experience.length}}<a href="#experience" onclick="toggleMobileMenu()" class="text-4xl font-bold text-white hover:text-{{themeColor}}-400 transition-colors">Experience</a>{{/if}}
      {{#if awards.length}}<a href="#awards" onclick="toggleMobileMenu()" class="text-4xl font-bold text-white hover:text-{{themeColor}}-400 transition-colors">Awards</a>{{/if}}
      <a href="#contact" onclick="toggleMobileMenu()" class="text-4xl font-bold text-white hover:text-{{themeColor}}-400 transition-colors">Contact</a>
      {{#if resume}}
      <div class="pt-10">
        <a href="{{resume}}" download="{{name}}-Resume.pdf" class="px-12 py-5 bg-{{themeColor}}-600 text-white rounded-3xl font-extrabold text-xl hover:bg-{{themeColor}}-700 transition-all shadow-2xl shadow-{{themeColor}}-500/40">Resume</a>
      </div>
      {{/if}}
    </div>
  </div>
  
  <header class="relative overflow-hidden bg-slate-900 text-white py-16 md:py-24 px-6 min-h-[500px] flex items-center">
    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
    <div class="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
      <div class="text-center md:text-left space-y-8 order-2 md:order-1">
        <div class="space-y-4">
          {{#if headerTitle}}
          <div class="inline-block px-4 py-1.5 bg-{{themeColor}}-500/10 text-{{themeColor}}-400 text-sm font-bold rounded-lg uppercase tracking-widest border border-{{themeColor}}-500/20">{{headerTitle}}</div>
          {{/if}}
          <h1 class="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight">{{name}}</h1>
          <p class="text-slate-400 dark:text-slate-300 text-base md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 break-words">{{bio}}</p>
        </div>
        
        <div class="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
          <a href="#contact" class="px-8 py-4 bg-{{themeColor}}-600 text-white rounded-2xl font-bold hover:bg-{{themeColor}}-700 transition-all shadow-lg shadow-{{themeColor}}-600/20 flex items-center gap-2">
            Let's Talk
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
          {{#if linkedin}}
          <a href="{{linkedin}}" target="_blank" class="px-8 py-4 bg-slate-800 dark:bg-slate-700 text-white rounded-2xl font-bold hover:bg-slate-700 dark:hover:bg-slate-600 transition-all border border-slate-700 flex items-center gap-2">
            LinkedIn
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          {{/if}}
        </div>

        {{#if (or stats.projects stats.contributions stats.satisfaction)}}
        <div class="flex flex-wrap justify-center md:justify-start gap-8 md:gap-10 pt-10 border-t border-slate-800/50">
          {{#if stats.projects}}
          <div>
            <p class="text-3xl font-extrabold text-white">{{stats.projects}}</p>
            <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Projects Done</p>
          </div>
          {{/if}}
          {{#if stats.contributions}}
          <div>
            <p class="text-3xl font-extrabold text-white">{{stats.contributions}}</p>
            <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">GitHub Contrib.</p>
          </div>
          {{/if}}
          {{#if stats.satisfaction}}
          <div>
            <p class="text-3xl font-extrabold text-white">{{stats.satisfaction}}</p>
            <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Client Satisfaction</p>
          </div>
          {{/if}}
        </div>
        {{/if}}
      </div>
      
      <div class="order-1 md:order-2 flex justify-center md:justify-end">
        {{#if image}}
        <div class="relative">
          <div class="absolute -inset-4 bg-{{themeColor}}-600/20 rounded-[4rem] blur-3xl animate-pulse"></div>
          <img src="{{image}}" class="w-64 h-64 md:w-96 md:h-96 rounded-[3rem] object-cover border-8 border-slate-800 shadow-2xl relative z-10">
          <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-{{themeColor}}-600/10 rounded-full blur-2xl"></div>
        </div>
        {{/if}}
      </div>
    </div>
  </header>
  
  <main class="max-w-5xl mx-auto px-6 py-20 space-y-24 dark:bg-slate-950">
    {{#if aboutMe}}
    <section id="about" class="max-w-3xl mx-auto text-center">
      <div class="inline-block px-4 py-1.5 bg-{{themeColor}}-50 dark:bg-{{themeColor}}-950/30 text-{{themeColor}}-600 dark:text-{{themeColor}}-400 text-sm font-bold rounded-full mb-6 uppercase tracking-widest">About Me</div>
      <p class="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium italic break-words">"{{aboutMe}}"</p>
    </section>
    {{/if}}

    {{#if (or skills.length softSkills.length)}}
    <section id="skills" class="text-center">
      <div class="flex items-center gap-4 mb-8">
        <div class="h-1 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white shrink-0">Skills & Expertise</h2>
        <div class="h-1 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
      </div>
      <div class="flex flex-wrap justify-center gap-3">
        {{#each skills}}
        <span class="skill-tag px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-{{themeColor}}-600 dark:text-{{themeColor}}-400 rounded-2xl font-bold shadow-sm break-words max-w-full hover:border-{{themeColor}}-400 hover:bg-{{themeColor}}-50 dark:hover:bg-{{themeColor}}-950/20 transition-all">{{this}}</span>
        {{/each}}
        {{#each softSkills}}
        <span class="skill-tag px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-{{themeColor}}-600 dark:text-{{themeColor}}-400 rounded-2xl font-bold shadow-sm break-words max-w-full hover:border-{{themeColor}}-400 hover:bg-{{themeColor}}-50 dark:hover:bg-{{themeColor}}-950/20 transition-all">{{this}}</span>
        {{/each}}
      </div>
    </section>
    {{/if}}
    
    {{#if projects.length}}
    <section id="projects" class="text-center">
      <div class="flex items-center gap-4 mb-8">
        <div class="h-1 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white shrink-0">Featured Projects</h2>
        <div class="h-1 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
      </div>
      <div id="projectsGrid" class="grid md:grid-cols-2 gap-8">
        {{#each projects}}
        <div class="project-card group p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-xl dark:hover:shadow-{{themeColor}}-500/10 flex flex-col h-full overflow-hidden text-left {{#if (gt @index 1)}}hidden{{/if}}">
          <div class="mb-4">
             <div class="flex justify-between items-start mb-1">
               <span class="inline-block px-3 py-1 bg-{{themeColor}}-50 dark:bg-{{themeColor}}-950/30 text-{{themeColor}}-600 dark:text-{{themeColor}}-400 text-xs font-bold rounded-full uppercase tracking-wider">Project</span>
               <span class="text-xs font-bold text-slate-400 dark:text-slate-500">{{formatDate date}}</span>
             </div>
             <h3 class="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-{{themeColor}}-600 dark:group-hover:text-{{themeColor}}-400 transition-colors break-words">{{name}}</h3>
          </div>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 break-words line-clamp-3">{{description}}</p>
          {{#if (longDesc description 150)}}
          <button onclick="toggleReadMore(this)" class="text-{{themeColor}}-600 dark:text-{{themeColor}}-400 font-semibold text-sm hover:underline text-left">Read More</button>
          {{/if}}
        </div>
        {{/each}}
      </div>
      {{#if (gt projects.length 2)}}
      <button onclick="showAllProjects(this)" class="mt-10 px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-{{themeColor}}-600 dark:text-{{themeColor}}-400 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95">Show All Projects</button>
      {{/if}}
    </section>
    {{/if}}
    {{#if education.length}}
    <section id="education" class="text-center">
      <div class="flex items-center gap-4 mb-8">
        <div class="h-1 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white shrink-0">Education</h2>
        <div class="h-1 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
      </div>
      <div class="grid md:grid-cols-2 gap-8">
        {{#each education}}
        <div class="edu-item p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm text-left {{#if (gt @index 3)}}hidden{{/if}}">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{level}}</h3>
            <span class="text-sm font-bold text-{{themeColor}}-600 bg-{{themeColor}}-50 dark:bg-{{themeColor}}-950/30 px-3 py-1 rounded-full">{{formatDate year}}</span>
          </div>
          <p class="text-slate-700 dark:text-slate-300 font-semibold break-words">{{school}}</p>
          <p class="text-slate-500 dark:text-slate-400 text-sm mt-2">Grade: {{grade}}</p>
        </div>
        {{/each}}
      </div>
      {{#if (gt education.length 4)}}
      <button onclick="showAllEducation(this)" class="mt-10 px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-{{themeColor}}-600 dark:text-{{themeColor}}-400 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95">Show More Education</button>
      {{/if}}
    </section>
    {{/if}}

    {{#if experience.length}}
    <section id="experience" class="text-center">
      <div class="flex items-center gap-4 mb-8">
        <div class="h-1 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white shrink-0">Experience & Events</h2>
        <div class="h-1 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
      </div>
      <div class="space-y-8">
        {{#each experience}}
        <div class="experience-item p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm text-left flex flex-col md:flex-row gap-6 {{#if (gt @index 2)}}hidden{{/if}}">
          <div class="md:w-1/4 flex flex-col gap-4">
            <span class="text-sm font-bold text-{{themeColor}}-600 bg-{{themeColor}}-50 dark:bg-{{themeColor}}-950/30 px-4 py-2 rounded-xl inline-block w-fit text-center">{{formatDate date}}</span>
            {{#if image}}
            <img src="{{image}}" class="w-full h-32 object-cover rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            {{/if}}
          </div>
          <div class="md:w-3/4">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">{{event}}</h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">{{description}}</p>
            {{#if (longDesc description 150)}}
            <button onclick="toggleReadMore(this)" class="text-{{themeColor}}-600 dark:text-{{themeColor}}-400 font-semibold text-sm hover:underline mt-2">Read More</button>
            {{/if}}
          </div>
        </div>
        {{/each}}
      </div>
      {{#if (gt experience.length 3)}}
      <button onclick="showAllExperience(this)" class="mt-10 px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-{{themeColor}}-600 dark:text-{{themeColor}}-400 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95">Show More Experience</button>
      {{/if}}
    </section>
    {{/if}}

    {{#if awards.length}}
    <section id="awards" class="text-center">
      <div class="flex items-center gap-4 mb-8">
        <div class="h-1 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white shrink-0">Honors & Awards</h2>
        <div class="h-1 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
      </div>
      <div id="awardsGrid" class="grid md:grid-cols-2 gap-8">
        {{#each awards}}
        <div class="award-item p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm text-left flex flex-col h-full {{#if (gt @index 1)}}hidden{{/if}}">
          {{#if image}}
          <img src="{{image}}" class="w-full h-48 object-cover rounded-2xl mb-6 shadow-sm border border-slate-100 dark:border-slate-800">
          {{/if}}
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{name}}</h3>
            <span class="text-sm font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-3 py-1 rounded-full shrink-0">{{formatDate date}}</span>
          </div>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">{{description}}</p>
          {{#if (longDesc description 150)}}
          <button onclick="toggleReadMore(this)" class="text-{{themeColor}}-600 dark:text-{{themeColor}}-400 font-semibold text-sm hover:underline mt-2">Read More</button>
          {{/if}}
        </div>
        {{/each}}
      </div>
      {{#if (gt awards.length 2)}}
      <button onclick="showAllAwards(this)" class="mt-10 px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95">Show All Awards</button>
      {{/if}}
    </section>
    {{/if}}

    {{#if certs.length}}
    <section id="certs" class="text-center">
      <div class="flex items-center gap-4 mb-8">
        <div class="h-1 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white shrink-0">Certifications</h2>
        <div class="h-1 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
      </div>
      <div id="certsGrid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {{#each certs}}
        <div class="cert-item group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all {{#if (gt @index 3)}}hidden{{/if}}">
          <div class="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img src="{{image}}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='https://via.placeholder.com/400x300?text=Certificate'">
          </div>
          <div class="p-4 text-left border-t border-slate-50 dark:border-slate-800">
            <div class="flex justify-between items-start mb-1">
              <h3 class="font-bold text-slate-900 dark:text-white truncate text-sm flex-1" title="{{name}}">{{name}}</h3>
              <span class="text-[9px] font-bold text-{{themeColor}}-500 ml-2 shrink-0">{{formatDate date}}</span>
            </div>
            <p class="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold truncate">{{org}}</p>
          </div>
        </div>
        {{/each}}
      </div>
      {{#if (gt certs.length 4)}}
      <button onclick="showAllCerts(this)" class="mt-10 px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-{{themeColor}}-600 dark:text-{{themeColor}}-400 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95">Show All Certificates</button>
      {{/if}}
    </section>
    {{/if}}

    <section id="contact" class="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800">
      <div class="inline-block px-4 py-1.5 bg-{{themeColor}}-50 dark:bg-{{themeColor}}-950/30 text-{{themeColor}}-600 dark:text-{{themeColor}}-400 text-sm font-bold rounded-full mb-6 uppercase tracking-widest">Get In Touch</div>
      <h2 class="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Let's Work Together</h2>
      <p class="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-12">I'm currently open to new opportunities and collaborations. Feel free to reach out through any of the channels below!</p>
      
      <div class="flex flex-col md:flex-row justify-center gap-6 max-w-2xl mx-auto px-6">
        {{#if email}}
        <a href="mailto:{{email}}" class="flex-1 flex items-center gap-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700 hover:border-{{themeColor}}-500 transition-all group shadow-sm">
          <div class="w-14 h-14 bg-{{themeColor}}-600 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-{{themeColor}}-200 dark:shadow-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </div>
          <div class="text-left">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Me</p>
            <p class="text-lg font-bold text-slate-900 dark:text-white truncate max-w-[180px]">{{email}}</p>
          </div>
        </a>
        {{/if}}
        
        {{#if whatsapp}}
        <a href="https://wa.me/{{whatsapp}}" target="_blank" class="flex-1 flex items-center gap-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700 hover:border-green-500 transition-all group shadow-sm">
          <div class="w-14 h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-green-200 dark:shadow-none p-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.123.554 4.197 1.607 6.031L0 24l6.105-1.602a11.832 11.832 0 005.937 1.57h.005c6.635 0 12.031-5.391 12.036-12.028a11.813 11.813 0 00-3.535-8.423"/></svg>
          </div>
          <div class="text-left">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp Me</p>
            <p class="text-lg font-bold text-slate-900 dark:text-white">Direct Chat</p>
          </div>
        </a>
        {{/if}}
      </div>
    </section>
  </main>
  
  <footer class="bg-slate-900 text-slate-400 py-20 px-6 border-t border-slate-800 transition-colors">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div class="md:col-span-1 space-y-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-{{themeColor}}-600 to-{{themeColor}}-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            {{initials name}}
          </div>
          <span class="text-xl font-bold text-white">{{name}}</span>
        </div>
        <p class="text-sm leading-relaxed">A professional portfolio built with passion. Showcasing expertise, projects, and achievements with high-impact design.</p>
        <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-lg text-xs font-bold border border-green-500/20">
          <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Available for new projects
        </div>
      </div>

      <div>
        <h3 class="text-white font-bold mb-6 uppercase tracking-widest text-[10px]">Quick Navigation</h3>
        <ul class="space-y-4 text-sm">
          {{#if aboutMe}}<li><a href="#about" class="hover:text-{{themeColor}}-400 transition-colors">About Me</a></li>{{/if}}
          {{#if projects.length}}<li><a href="#projects" class="hover:text-{{themeColor}}-400 transition-colors">Featured Projects</a></li>{{/if}}
          {{#if (or skills.length softSkills.length)}}<li><a href="#skills" class="hover:text-{{themeColor}}-400 transition-colors">Skills & Expertise</a></li>{{/if}}
          <li><a href="#contact" class="hover:text-{{themeColor}}-400 transition-colors">Contact Me</a></li>
        </ul>
      </div>

      <div>
        <h3 class="text-white font-bold mb-6 uppercase tracking-widest text-[10px]">Follow Me</h3>
        <ul class="space-y-4 text-sm">
          {{#if linkedin}}<li><a href="{{linkedin}}" target="_blank" class="hover:text-{{themeColor}}-400 transition-colors">LinkedIn</a></li>{{/if}}
          {{#if github}}<li><a href="{{github}}" target="_blank" class="hover:text-{{themeColor}}-400 transition-colors">GitHub</a></li>{{/if}}
          {{#if instagram}}<li><a href="{{instagram}}" target="_blank" class="hover:text-{{themeColor}}-400 transition-colors">Instagram</a></li>{{/if}}
          {{#if twitter}}<li><a href="{{twitter}}" target="_blank" class="hover:text-{{themeColor}}-400 transition-colors">X (Twitter)</a></li>{{/if}}
        </ul>
      </div>

      <div class="space-y-6">
        <h3 class="text-white font-bold mb-6 uppercase tracking-widest text-[10px]">Let's Connect</h3>
        {{#if email}}
        <p class="text-sm">Have a question or proposal? Drop me a line anytime.</p>
        <a href="mailto:{{email}}" class="text-white font-bold hover:text-{{themeColor}}-400 transition-colors flex items-center gap-2 group">
          {{email}}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
        {{/if}}
        {{#if whatsapp}}
        <a href="https://wa.me/{{whatsapp}}" target="_blank" class="inline-block mt-4 px-4 py-2 bg-green-500/10 text-green-400 rounded-lg text-xs font-bold border border-green-500/20 hover:bg-green-500 hover:text-white transition-all">
          WhatsApp Direct Chat
        </a>
        {{/if}}
      </div>
    </div>

    <div class="max-w-6xl mx-auto mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium tracking-wider uppercase text-slate-500">
      <p>© 2026 {{name}}. All rights reserved.</p>
      <p>Handcrafted with ❤️ using VOLO Builder</p>
    </div>
  </footer>
</body>
</html>\`;
}>`;
}

function toggleReadMore(btn) {
  const p = btn.previousElementSibling;
  if (p.classList.contains('line-clamp-3')) {
    p.classList.remove('line-clamp-3');
    btn.innerText = 'Show Less';
  } else {
    p.classList.add('line-clamp-3');
    btn.innerText = 'Read More';
  }
}

function showAllProjects(btn) {
  const grid = btn.previousElementSibling;
  const items = grid.querySelectorAll('.project-card.hidden');
  items.forEach(item => item.classList.remove('hidden'));
  btn.style.display = 'none';
}

function showAllAwards(btn) {
  const grid = btn.previousElementSibling;
  const items = grid.querySelectorAll('.award-item.hidden');
  items.forEach(item => item.classList.remove('hidden'));
  btn.style.display = 'none';
}

function showAllCerts(btn) {
  const grid = btn.previousElementSibling;
  const items = grid.querySelectorAll('.cert-item.hidden');
  items.forEach(item => item.classList.remove('hidden'));
  btn.style.display = 'none';
}

function showAllExperience(btn) {
  const list = btn.previousElementSibling;
  const items = list.querySelectorAll('.experience-item.hidden');
  items.forEach(item => item.classList.remove('hidden'));
  btn.style.display = 'none';
}

function showAllEducation(btn) {
  const grid = btn.previousElementSibling;
  const items = grid.querySelectorAll('.edu-item.hidden');
  items.forEach(item => item.classList.remove('hidden'));
  btn.style.display = 'none';
}

function render() {
  loadTemplate();
  let compiled = Handlebars.compile(template);
  let html = compiled(portfolioData);
  const preview = document.getElementById("preview");
  const previewContainer = preview.parentElement;
  preview.innerHTML = html;
  
  if (portfolioData.themeMode === 'dark') {
    preview.classList.add('dark');
    previewContainer.classList.add('dark');
  } else {
    preview.classList.remove('dark');
    previewContainer.classList.remove('dark');
  }
  
  // Highlight selected theme mode
  const modes = ['light', 'dark'];
  modes.forEach(m => {
    const btn = document.getElementById(`mode-${m}`);
    if (btn) {
      if (portfolioData.themeMode === m) {
        btn.classList.add('border-blue-500', 'bg-blue-50/50', 'ring-2', 'ring-blue-500/20');
        if (document.body.classList.contains('dark')) {
            btn.classList.add('bg-blue-900/20');
        }
      } else {
        btn.classList.remove('border-blue-500', 'bg-blue-50/50', 'ring-2', 'ring-blue-500/20', 'bg-blue-900/20');
      }
    }
  });

  // Highlight selected theme color
  const colors = ['blue', 'indigo', 'purple', 'rose', 'emerald', 'amber', 'teal', 'slate', 'cyan', 'sky', 'violet', 'fuchsia', 'pink', 'lime', 'orange', 'red'];
  colors.forEach(c => {
    const btn = document.getElementById(`btn-${c}`);
    if (btn) {
      if (portfolioData.themeColor === c) {
        btn.classList.add('ring-4', 'ring-blue-500/50', 'scale-110');
      } else {
        btn.classList.remove('ring-4', 'ring-blue-500/50', 'scale-110');
      }
    }
  });
}

function setThemeColor(color) {
  portfolioData.themeColor = color;
  save();
  render();
}

function setThemeMode(mode) {
  portfolioData.themeMode = mode;
  save();
  render();
}

function addSkill() {
  let s = document.getElementById("newSkill").value.trim();
  if (s) {
    portfolioData.skills.push(s);
    document.getElementById("newSkill").value = "";
    renderSkillsList();
    save();
    render();
  }
}

function addSoftSkill() {
  let s = document.getElementById("newSoftSkill").value.trim();
  if (s) {
    if (!portfolioData.softSkills) portfolioData.softSkills = [];
    portfolioData.softSkills.push(s);
    document.getElementById("newSoftSkill").value = "";
    renderSoftSkillsList();
    save();
    render();
  }
}

function addCert() {
  let n = document.getElementById("certName").value.trim();
  let o = document.getElementById("certOrg").value.trim();
  let d = document.getElementById("certDate").value;
  let imgInput = document.getElementById("certImage");
  let file = imgInput.files[0];

  if (n && file) {
    let reader = new FileReader();
    reader.onload = ev => {
      portfolioData.certs.push({name: n, org: o, date: d, image: ev.target.result});
      portfolioData.certs.sort((a, b) => new Date(b.date) - new Date(a.date));
      finalizeCertAdd();
    };
    reader.readAsDataURL(file);
  }
}

function finalizeCertAdd() {
  document.getElementById("certName").value = "";
  document.getElementById("certOrg").value = "";
  document.getElementById("certDate").value = "";
  document.getElementById("certImage").value = "";
  renderCertsList();
  save();
  render();
}

function addProject() {
  let n = document.getElementById("newProjectName").value.trim();
  let d = document.getElementById("newProjectDate").value;
  let ds = document.getElementById("newProjectDesc").value.trim();
  if (n) {
    if (!Array.isArray(portfolioData.projects)) portfolioData.projects = [];
    portfolioData.projects.push({name: n, date: d, description: ds});
    portfolioData.projects.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    });
    document.getElementById("newProjectName").value = "";
    document.getElementById("newProjectDate").value = "";
    document.getElementById("newProjectDesc").value = "";
    renderProjectsList();
    save();
    render();
  }
}

function addEducation() {
  let l = document.getElementById("eduLevel").value.trim();
  let s = document.getElementById("eduSchool").value.trim();
  let y = document.getElementById("eduYear").value.trim();
  let g = document.getElementById("eduGrade").value.trim();
  if (l || s) {
    if (!Array.isArray(portfolioData.education)) portfolioData.education = [];
    portfolioData.education.push({level: l, school: s, year: y, grade: g});
    portfolioData.education.sort((a, b) => {
      if (!a.year) return 1;
      if (!b.year) return -1;
      return new Date(b.year) - new Date(a.year);
    });
    document.getElementById("eduLevel").value = "";
    document.getElementById("eduSchool").value = "";
    document.getElementById("eduYear").value = "";
    document.getElementById("eduGrade").value = "";
    renderEducationList();
    save();
    render();
  }
}

function addExperience() {
  let e = document.getElementById("expEvent").value.trim();
  let d = document.getElementById("expDate").value.trim();
  let ds = document.getElementById("expDesc").value.trim();
  let imgInput = document.getElementById("expImage");
  let file = imgInput.files[0];

  if (e) {
    if (!Array.isArray(portfolioData.experience)) portfolioData.experience = [];
    if (file) {
      let reader = new FileReader();
      reader.onload = ev => {
        portfolioData.experience.push({event: e, date: d, description: ds, image: ev.target.result});
        portfolioData.experience.sort((a, b) => {
          if (!a.date) return 1;
          if (!b.date) return -1;
          return new Date(b.date) - new Date(a.date);
        });
        finalizeExperienceAdd();
      };
      reader.readAsDataURL(file);
    } else {
      portfolioData.experience.push({event: e, date: d, description: ds, image: ""});
      portfolioData.experience.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date) - new Date(a.date);
      });
      finalizeExperienceAdd();
    }
  }
}

function finalizeExperienceAdd() {
  document.getElementById("expEvent").value = "";
  document.getElementById("expDate").value = "";
  document.getElementById("expDesc").value = "";
  document.getElementById("expImage").value = "";
  renderExperienceList();
  save();
  render();
}

function addAward() {
  let n = document.getElementById("awardName").value.trim();
  let d = document.getElementById("awardDate").value.trim();
  let ds = document.getElementById("awardDesc").value.trim();
  let imgInput = document.getElementById("awardImage");
  let file = imgInput.files[0];

  if (n) {
    if (file) {
      let reader = new FileReader();
      reader.onload = ev => {
        portfolioData.awards.push({name: n, date: d, description: ds, image: ev.target.result});
        portfolioData.awards.sort((a, b) => new Date(b.date) - new Date(a.date));
        finalizeAwardAdd();
      };
      reader.readAsDataURL(file);
    } else {
      portfolioData.awards.push({name: n, date: d, description: ds, image: ""});
      portfolioData.awards.sort((a, b) => new Date(b.date) - new Date(a.date));
      finalizeAwardAdd();
    }
  }
}

function finalizeAwardAdd() {
  document.getElementById("awardName").value = "";
  document.getElementById("awardDate").value = "";
  document.getElementById("awardDesc").value = "";
  document.getElementById("awardImage").value = "";
  renderAwardsList();
  save();
  render();
}


function removeSkill(i) {
  portfolioData.skills.splice(i, 1);
  renderSkillsList();
  save();
  render();
}

function removeSoftSkill(i) {
  portfolioData.softSkills.splice(i, 1);
  renderSoftSkillsList();
  save();
  render();
}

function removeProject(i) {
  portfolioData.projects.splice(i, 1);
  renderProjectsList();
  save();
  render();
}

function removeEducation(i) {
  portfolioData.education.splice(i, 1);
  renderEducationList();
  save();
  render();
}

function removeExperience(i) {
  portfolioData.experience.splice(i, 1);
  renderExperienceList();
  save();
  render();
}

function removeAward(i) {
  portfolioData.awards.splice(i, 1);
  renderAwardsList();
  save();
  render();
}

function removeCert(i) {
  portfolioData.certs.splice(i, 1);
  renderCertsList();
  save();
  render();
}


function renderSkillsList() {
  let el = document.getElementById("skillsList");
  if (!el) return;
  el.innerHTML = portfolioData.skills.map((s, i) => 
    `<span class="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100 flex items-center gap-2 max-w-full break-all">
      ${s} 
      <button onclick="removeSkill(${i})" class="text-blue-300 hover:text-red-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </span>`
  ).join("");
}

function renderSoftSkillsList() {
  let el = document.getElementById("softSkillsList");
  if (!el) return;
  el.innerHTML = portfolioData.softSkills.map((s, i) => 
    `<span class="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-indigo-100 flex items-center gap-2 max-w-full break-all">
      ${s} 
      <button onclick="removeSoftSkill(${i})" class="text-indigo-300 hover:text-red-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </span>`
  ).join("");
}

function renderProjectsList() {
  let el = document.getElementById("projectsList");
  if (!el) return;
  if (!portfolioData.projects) portfolioData.projects = [];
  el.innerHTML = portfolioData.projects.map((p, i) => 
    `<div class="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center group">
      <div class="flex-1 min-w-0 pr-2">
        <div class="font-bold text-slate-800 truncate text-xs">${p.name}</div>
        <div class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">${p.date ? formatDate(p.date) : ''}</div>
      </div>
      <button onclick="removeProject(${i})" class="text-slate-300 hover:text-red-500 transition-colors p-1 shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>`
  ).join("");
}

function renderEducationList() {
  let el = document.getElementById("educationList");
  if (!el) return;
  if (!portfolioData.education) portfolioData.education = [];
  el.innerHTML = portfolioData.education.map((e, i) => 
    `<div class="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center group">
      <div class="flex-1 min-w-0 pr-2">
        <div class="font-bold text-slate-800 truncate text-xs">${e.level}</div>
        <div class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">${e.year ? formatDate(e.year) : ''}</div>
      </div>
      <button onclick="removeEducation(${i})" class="text-slate-300 hover:text-red-500 transition-colors p-1 shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>`
  ).join("");
}

function renderExperienceList() {
  let el = document.getElementById("experienceList");
  if (!el) return;
  if (!portfolioData.experience) portfolioData.experience = [];
  el.innerHTML = portfolioData.experience.map((e, i) => 
    `<div class="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center group">
      <div class="flex-1 min-w-0 pr-2">
        <div class="font-bold text-slate-800 truncate text-xs">${e.event}</div>
        <div class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">${e.date ? formatDate(e.date) : ''}</div>
      </div>
      <button onclick="removeExperience(${i})" class="text-slate-300 hover:text-red-500 transition-colors p-1 shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>`
  ).join("");
}

function renderAwardsList() {
  let el = document.getElementById("awardsList");
  if (!el) return;
  if (!portfolioData.awards) portfolioData.awards = [];
  el.innerHTML = portfolioData.awards.map((a, i) => 
    `<div class="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center group">
      <div class="flex-1 min-w-0 pr-2">
        <div class="font-bold text-slate-800 truncate text-xs">${a.name}</div>
        <div class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">${a.date ? formatDate(a.date) : ''}</div>
      </div>
      <button onclick="removeAward(${i})" class="text-slate-300 hover:text-red-500 transition-colors p-1 shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>`
  ).join("");
}

function renderCertsList() {
  let el = document.getElementById("certsList");
  if (!el) return;
  if (!portfolioData.certs) portfolioData.certs = [];
  el.innerHTML = portfolioData.certs.map((c, i) => 
    `<div class="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center group">
      <div class="flex-1 min-w-0 pr-2">
        <div class="font-bold text-slate-800 truncate text-xs">${c.name}</div>
        <div class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">${c.date ? formatDate(c.date) : ''}</div>
      </div>
      <button onclick="removeCert(${i})" class="text-slate-300 hover:text-red-500 transition-colors p-1 shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>`
  ).join("");
}


function save() {
  localStorage.setItem("voloDraft", JSON.stringify(portfolioData));
}

function load() {
  let s = localStorage.getItem("voloDraft");
  if (s) {
    portfolioData = JSON.parse(s);
    if (!portfolioData.education) portfolioData.education = [];
    if (!portfolioData.experience) portfolioData.experience = [];
    if (!portfolioData.awards) portfolioData.awards = [];
    if (!portfolioData.certs) portfolioData.certs = [];
    if (!portfolioData.skills) portfolioData.skills = [];
    if (!portfolioData.softSkills) portfolioData.softSkills = [];
    if (!portfolioData.projects) portfolioData.projects = [];
    document.getElementById("name").value = portfolioData.name || "";
    document.getElementById("headerTitle").value = portfolioData.headerTitle || "";
    document.getElementById("bio").value = portfolioData.bio || "";
    document.getElementById("aboutMe").value = portfolioData.aboutMe || "";
    document.getElementById("email").value = portfolioData.email || "";
    document.getElementById("linkedin").value = portfolioData.linkedin || "";
    document.getElementById("github").value = portfolioData.github || "";
    document.getElementById("instagram").value = portfolioData.instagram || "";
    document.getElementById("twitter").value = portfolioData.twitter || "";
    document.getElementById("whatsapp").value = portfolioData.whatsapp || "";
    document.getElementById("statProjects").value = portfolioData.stats?.projects || "";
    document.getElementById("statContribs").value = portfolioData.stats?.contributions || "";
    document.getElementById("statSatisfaction").value = portfolioData.stats?.satisfaction || "";

    ["email", "linkedin", "github", "instagram", "twitter", "whatsapp"].forEach(id => {
      handleSocialInput(id, document.getElementById(id).value);
    });

    if (portfolioData.image) {
      document.getElementById("imgPreview").innerHTML = `<img src="${portfolioData.image}" class="w-20 h-20 rounded-full">`;
    }
    if (portfolioData.resume) {
      document.getElementById("resumePreview").innerHTML = `<span class="text-green-600">✓ Resume uploaded</span>`;
    }
    renderSkillsList();
    renderSoftSkillsList();
    renderProjectsList();
    renderEducationList();
    renderExperienceList();
    renderAwardsList();
    renderCertsList();
    portfolioData.themeColor = portfolioData.themeColor || "blue";
  }
}

function clearAll() {
  portfolioData = {name: "", headerTitle: "", bio: "", aboutMe: "", image: "", resume: "", skills: [], softSkills: [], projects: [], education: [], experience: [], awards: [], certs: [], email: "", linkedin: "", github: "", instagram: "", twitter: "", whatsapp: "", stats: {projects: "", contributions: "", satisfaction: ""}, themeColor: "blue"};
  document.getElementById("name").value = "";
  document.getElementById("headerTitle").value = "";
  document.getElementById("bio").value = "";
  document.getElementById("aboutMe").value = "";
  document.getElementById("email").value = "";
  document.getElementById("linkedin").value = "";
  document.getElementById("github").value = "";
  document.getElementById("instagram").value = "";
  document.getElementById("twitter").value = "";
  document.getElementById("whatsapp").value = "";
  document.getElementById("statProjects").value = "";
  document.getElementById("statContribs").value = "";
  document.getElementById("statSatisfaction").value = "";
  document.getElementById("newSkill").value = "";
  document.getElementById("newProjectName").value = "";
  document.getElementById("newProjectDesc").value = "";
  document.getElementById("imgPreview").innerHTML = "";
  document.getElementById("resumePreview").innerHTML = "";
  document.getElementById("profileImage").value = "";
  document.getElementById("resumePdf").value = "";
  document.getElementById("expImage").value = "";
  renderSkillsList();
  renderSoftSkillsList();
  renderProjectsList();
  renderEducationList();
  renderExperienceList();
  renderAwardsList();
  renderCertsList();
  localStorage.removeItem("voloDraft");
  document.getElementById("preview").innerHTML = "";
}

function validateSocialLink(id, value) {
  if (!value) return true;
  const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
    github: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
    instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9._-]+\/?$/,
    twitter: /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_-]+\/?$/,
    whatsapp: /^\+?[0-9]{10,15}$/
  };
  return patterns[id] ? patterns[id].test(value) : true;
}

function handleSocialInput(id, value) {
  const isValid = validateSocialLink(id, value);
  const el = document.getElementById(id);
  const errorEl = document.getElementById(`${id}-error`);
  
  if (value && !isValid) {
    el.classList.add('input-error');
    el.classList.remove('input-success');
    errorEl.classList.remove('hidden');
  } else if (value && isValid) {
    el.classList.remove('input-error');
    el.classList.add('input-success');
    errorEl.classList.add('hidden');
  } else {
    el.classList.remove('input-error', 'input-success');
    errorEl.classList.add('hidden');
  }
  
  portfolioData[id] = value;
  save();
  render();
}

function setup() {
  // Prevent future dates
  const today = new Date().toISOString().split('T')[0];
  ["eduYear", "expDate", "awardDate", "certDate", "newProjectDate"].forEach(id => {
    let el = document.getElementById(id);
    if (el) el.max = today;
  });

  document.getElementById("name").addEventListener("input", e => { portfolioData.name = e.target.value; save(); render(); });
  document.getElementById("headerTitle").addEventListener("input", e => { portfolioData.headerTitle = e.target.value; save(); render(); });
  document.getElementById("bio").addEventListener("input", e => { portfolioData.bio = e.target.value; save(); render(); });
  document.getElementById("aboutMe").addEventListener("input", e => { portfolioData.aboutMe = e.target.value; save(); render(); });
  document.getElementById("email").addEventListener("input", e => handleSocialInput("email", e.target.value));
  document.getElementById("linkedin").addEventListener("input", e => handleSocialInput("linkedin", e.target.value));
  document.getElementById("github").addEventListener("input", e => handleSocialInput("github", e.target.value));
  document.getElementById("instagram").addEventListener("input", e => handleSocialInput("instagram", e.target.value));
  document.getElementById("twitter").addEventListener("input", e => handleSocialInput("twitter", e.target.value));
  document.getElementById("whatsapp").addEventListener("input", e => handleSocialInput("whatsapp", e.target.value));
  
  document.getElementById("statProjects").addEventListener("input", e => { if (!portfolioData.stats) portfolioData.stats = {}; portfolioData.stats.projects = e.target.value; save(); render(); });
  document.getElementById("statContribs").addEventListener("input", e => { if (!portfolioData.stats) portfolioData.stats = {}; portfolioData.stats.contributions = e.target.value; save(); render(); });
  document.getElementById("statSatisfaction").addEventListener("input", e => { if (!portfolioData.stats) portfolioData.stats = {}; portfolioData.stats.satisfaction = e.target.value; save(); render(); });
  
  document.getElementById("profileImage").addEventListener("change", e => {
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = ev => {
        portfolioData.image = ev.target.result;
        document.getElementById("imgPreview").innerHTML = `<img src="${portfolioData.image}" class="w-20 h-20 rounded-full">`;
        save();
      };
      reader.readAsDataURL(file);
    }
  });
  
  document.getElementById("resumePdf").addEventListener("change", e => {
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = ev => {
        portfolioData.resume = ev.target.result;
        document.getElementById("resumePreview").innerHTML = `<span class="text-green-600">✓ Resume uploaded: ${file.name}</span>`;
        save();
      };
      reader.readAsDataURL(file);
    }
  });
  
  document.getElementById("addEducationBtn").onclick = addEducation;
  document.getElementById("addExperienceBtn").onclick = addExperience;

  document.getElementById("addAwardBtn").onclick = () => {
    addAward();
  };

  document.getElementById("addCertBtn").onclick = () => {
    addCert();
  };

  load();
  render();
}

async function downloadZip() {
  const zip = new JSZip();
  loadTemplate();
  const compiled = Handlebars.compile(template);
  const html = compiled(portfolioData);
  
  // Add the main HTML file
  zip.file("index.html", html);
  
  // Add a README to make it feel like a "Proper" package
  const readme = `
# Your VOLO Portfolio

This folder contains your generated portfolio.

## Contents
- index.html: Your main portfolio page.

## How to use
Simply open 'index.html' in any modern web browser to view your portfolio.
All images and styles are embedded within the file for easy sharing.

Built with VOLO Portfolio Builder
  `.trim();
  zip.file("README.txt", readme);

  const blob = await zip.generateAsync({type: "blob"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${portfolioData.name.replace(/\s+/g, '_')}_Portfolio.zip`;
  a.click();
}

window.onload = setup;