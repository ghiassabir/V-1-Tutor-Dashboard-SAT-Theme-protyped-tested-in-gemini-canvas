// --- EOC Chapters (Simplified from PDF for brevity) ---
const eocChaptersFull = { 
    reading: ["Vocabulary in Context", "Making the Leap", "The Big Picture", "Literal Comprehension", "Reading for Function", "Supporting & Undermining", "Graphs & Charts", "Paired Passages"],
    writing: ["Transitions", "Specific Focus", "Sentences & Fragments", "Joining & Separating Sentences", "Non-Essential & Essential Clauses", "Verbs Agreements and Tense", "Pronouns", "Modification", "Parallel Structure"],
    math: ["Exponents & Radicals", "Percent", "Rates", "Ratio & Proportion", "Expressions", "Constructing Models", "Manipulating & Solving Equations", "Systems of Equations", "Inequalities", "Lines", "Functions", "Quadratics", "Angles", "Triangles", "Circles", "Trigonometry", "Probability", "Statistics 1"]
};
const allEocChaptersList = [].concat(...Object.values(eocChaptersFull));

const genericCbSkills = {
    reading: [ { name: "Info & Ideas: Central Ideas", key: "reading_central_ideas" }, { name: "Info & Ideas: Evidence", key: "reading_evidence"}, { name: "Craft & Structure: Vocab", key: "reading_vocab" }, { name: "Craft & Structure: Purpose", key: "reading_purpose"} ],
    writing: [ { name: "Expression: Rhetoric", key: "writing_rhetoric" }, { name: "Expression: Transitions", key: "writing_transitions"}, { name: "Conventions: Boundaries", key: "writing_boundaries" }, { name: "Conventions: Form/Sense", key: "writing_form_sense"} ],
    math: [ { name: "Algebra", key: "math_algebra" }, { name: "Advanced Math", key: "math_advanced"}, { name: "Problem Solving & Data", key: "math_problem_solving" }, { name: "Geometry & Trig", key: "math_geometry"} ]
};
const allCbSkillsList = [].concat(...Object.values(genericCbSkills).map(cat => cat.map(s => s.key)));

const students = [];
const firstNames = ["Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona", "George", "Hannah", "Ian", "Julia"];
const lastNames = ["Smith", "Jones", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson"];

for (let i = 0; i < 10; i++) { 
    const latestTotalScore = 950 + Math.floor(Math.random() * 500); 
    const previousTotalScore = latestTotalScore - (Math.floor(Math.random() * 100) - 30); 
    const activityScore = 50 + Math.floor(Math.random() * 50); 

    const student = { 
        id: `student${String(i+1).padStart(3,'0')}`, name: `${firstNames[i]} ${lastNames[i]}`,
        targetScore: 1300 + Math.floor(Math.random() * 6) * 50, 
        cbPracticeTests: [], eocScores: { reading: [], writing: [], math: [] },
        khanData: { reading: [], writing: [], math: [] }, cbSkills: { reading: [], writing: [], math: [] },
        activityMetrics: {
            avgTimePerModuleCB: 25 + Math.floor(Math.random() * 20),
            eocAttempts: 10 + Math.floor(Math.random() * activityScore / 3), 
            khanActivitiesCompleted: 5 + Math.floor(Math.random() * activityScore / 5), 
            pagesViewed: 80 + Math.floor(Math.random() * activityScore * 1.5), 
            latestTotalScore: latestTotalScore,
            previousTotalScore: previousTotalScore, 
            activityScore: activityScore 
        },
        scoreHistory: [previousTotalScore - Math.floor(Math.random()*50), previousTotalScore, latestTotalScore] 
    };
    
    const testNames = ["Diagnostic Test", "Official Practice Test 1", "Official Practice Test 2", "Official Practice Test 3"];
    let currentScore = student.activityMetrics.previousTotalScore - 50; 
    testNames.forEach((name, idx) => {
        let rw, math, total;
        if (idx === testNames.length -1) { 
            total = student.activityMetrics.latestTotalScore;
            rw = Math.floor(total * (0.45 + Math.random() * 0.1)); 
            math = total - rw;
        } else {
            currentScore += Math.floor(Math.random()*70 - 10); 
            total = Math.max(900, Math.min(1550, currentScore)); 
            rw = Math.floor(total * (0.45 + Math.random() * 0.1));
            math = total - rw;
        }
        student.cbPracticeTests.push({ name, date: `2024-0${idx+3}-10`, rw, math, total });
    });
     for(let j=4; j<=7; j++) student.cbPracticeTests.push({ name: `Official Practice Test ${j}`, date: "Not Attempted", rw: "-", math: "-", total: "-" });

    Object.keys(eocChaptersFull).forEach(subject => {
        eocChaptersFull[subject].forEach(chapterName => {
            const scoreNum = Math.floor(Math.random() * 50 + 50);
            student.eocScores[subject].push({ name: chapterName, latestScore: `${scoreNum}%`, classAvg: `${Math.floor(Math.random() * 20 + 65)}%`, date: `2024-05-${Math.floor(Math.random()*20+1).toString().padStart(2,'0')}` });
        });
    });
    Object.keys(genericCbSkills).forEach(subject => {
        genericCbSkills[subject].slice(0, Math.floor(Math.random()*3)+1).forEach(skill => {
             student.khanData[subject].push({ name: `Khan Academy: ${skill.name} Practice`, score: `${Math.floor(Math.random()*5+5)}/10 (${Math.floor(Math.random()*50+50)}%)`, pointsPossible: "10", classAvg: `${Math.floor(Math.random()*20+60)}%`, date: `2024-05-${Math.floor(Math.random()*20+1).toString().padStart(2,'0')}` });
        });
    });
     Object.keys(genericCbSkills).forEach(subject => {
        genericCbSkills[subject].forEach(skillInfo => {
            student.cbSkills[subject].push({ name: skillInfo.name, key: skillInfo.key, score: Math.floor(Math.random() * 50 + 50), classAvg: Math.floor(Math.random() * 20 + 65) });
        });
    });
    students.push(student);
}

const classAverages = {
    totalScaledScore: students.reduce((sum, s) => sum + s.activityMetrics.latestTotalScore, 0) / students.length,
    rwScore: students.reduce((sum, s) => sum + (s.cbPracticeTests.find(t=>t.total === s.activityMetrics.latestTotalScore)?.rw || 0), 0) / students.length,
    mathScore: students.reduce((sum, s) => sum + (s.cbPracticeTests.find(t=>t.total === s.activityMetrics.latestTotalScore)?.math || 0), 0) / students.length,
    eocOverallPercentage: students.reduce((sum, s) => { let ts=0,c=0; Object.values(s.eocScores).flat().forEach(e=>{ts+=parseInt(e.latestScore);c++;}); return sum+(c>0?ts/c:0);},0)/students.length,
    avgActivityScore: students.reduce((sum, s) => sum + s.activityMetrics.activityScore, 0) / students.length,
    avgTimePerModuleCB: students.reduce((sum, s) => sum + s.activityMetrics.avgTimePerModuleCB, 0) / students.length,
    eocAttempts: students.reduce((sum, s) => sum + s.activityMetrics.eocAttempts, 0) / students.length,
    khanActivitiesCompleted: students.reduce((sum, s) => sum + s.activityMetrics.khanActivitiesCompleted, 0) / students.length,
    cbSkills: {}, eocChapters: {}
};
allCbSkillsList.forEach(key => { classAverages.cbSkills[key] = Math.round(students.reduce((s,std)=>s+ (std.cbSkills[Object.keys(genericCbSkills).find(subj=>genericCbSkills[subj].find(sk=>sk.key===key))]?.find(sk=>sk.key===key)?.score || 0),0)/students.length) || 0; });
allEocChaptersList.forEach(name => { classAverages.eocChapters[name] = Math.round(students.reduce((s,std)=>s+ (Object.values(std.eocScores).flat().find(e=>e.name===name)? parseInt(Object.values(std.eocScores).flat().find(e=>e.name===name).latestScore) :0),0)/students.length) || 0; });

let classScoreDistributionChartInstance, classSkillPerformanceChartInstance;
let studentScoreTrendChartInstance, studentOverallSkillChartInstance;
let modalDonutChartInstance, modalLineChartInstance;

// --- DOM Element References ---
const tutorTabs = document.querySelectorAll('.main-nav-button');
const tutorTabContents = document.querySelectorAll('.tutor-tab-content');
const studentSelector = document.getElementById('studentSelector');
const replicatedStudentDashboardDiv = document.getElementById('replicatedStudentDashboard');
const selectedStudentNameHeader = document.getElementById('selectedStudentNameHeader');
const studentSelectionPrompt = document.getElementById('studentSelectionPrompt');
const modal = document.getElementById('detailModal');
const modalQuestionDetailsContainer = document.getElementById('modalQuestionDetails');

// --- Event Listeners & Initialization ---
document.addEventListener('DOMContentLoaded', function () {
    console.log("Tutor Dashboard DOMContentLoaded");
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    students.forEach(student => { const opt = document.createElement('option'); opt.value = student.id; opt.textContent = student.name; studentSelector.appendChild(opt); });
    studentSelector.value = ""; // No student selected initially

    tutorTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            console.log("Tutor tab clicked:", tab.getAttribute('data-tutor-tab'));
            tutorTabs.forEach(t => t.classList.remove('active'));
            tutorTabContents.forEach(content => content.classList.add('hidden'));
            tab.classList.add('active');
            const targetContentId = tab.getAttribute('data-tutor-tab') + '-content';
            const targetEl = document.getElementById(targetContentId);
            if(targetEl) {
                targetEl.classList.remove('hidden');
                console.log("Showing content:", targetContentId);
            } else {
                console.error("Target content not found for tab:", targetContentId);
            }

            if (targetContentId === 'class-overview-content') loadClassOverviewData();
            else if (targetContentId === 'student-performance-tiers-content') loadStudentPerformanceTiers();
            else if (targetContentId === 'student-deep-dive-content') {
                if (studentSelector.value) loadStudentDashboard(studentSelector.value);
                else { 
                    replicatedStudentDashboardDiv.classList.add('hidden'); 
                    studentSelectionPrompt.classList.remove('hidden'); 
                    selectedStudentNameHeader.textContent = "";
                }
            }
        });
    });
    
    studentSelector.addEventListener('change', function() {
        if (this.value) { 
            console.log("Student selected:", this.value);
            loadStudentDashboard(this.value); 
            studentSelectionPrompt.classList.add('hidden'); 
        } else { 
            replicatedStudentDashboardDiv.classList.add('hidden'); 
            studentSelectionPrompt.classList.remove('hidden'); 
            selectedStudentNameHeader.textContent = ""; 
        }
    });

    if (tutorTabs.length > 0) tutorTabs[0].click(); // Activate first tab

    document.querySelectorAll('.student-main-tab-button').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.student-main-tab-button').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.student-main-tab-content').forEach(content => content.classList.add('hidden'));
            tab.classList.add('active'); 
            const targetContentId = 'student-' + tab.getAttribute('data-student-main-tab') + '-content';
            document.getElementById(targetContentId)?.classList.remove('hidden');
            if (tab.getAttribute('data-student-main-tab') === 'overview') {
                const student = students.find(s => s.id === studentSelector.value);
                if (student) initializeStudentOverviewCharts(student);
            }
            const firstSubTab = document.querySelector(`#${targetContentId} .sub-tab-button`);
            if (firstSubTab) firstSubTab.click();
        });
    });
    document.querySelectorAll('#replicatedStudentDashboard .sub-tab-button').forEach(subTab => {
        subTab.addEventListener('click', (e) => {
            const parentMainTabContent = subTab.closest('.student-main-tab-content');
            parentMainTabContent.querySelectorAll('.sub-tab-button').forEach(st => st.classList.remove('active'));
            parentMainTabContent.querySelectorAll('.student-sub-tab-content-panel').forEach(panel => panel.classList.add('hidden'));
            subTab.classList.add('active');
            const targetSubContentId = 'student-' + subTab.getAttribute('data-student-sub-tab') + '-content';
            document.getElementById(targetSubContentId)?.classList.remove('hidden');
        });
    });
});

// --- Chart Theming Colors ---
const CHART_PRIMARY_COLOR = '#2a5266'; // SAT Hub Teal
const CHART_SECONDARY_COLOR = '#757575'; // Grey for comparison lines/bars
const CHART_PRIMARY_BG_BAR = 'rgba(42, 82, 102, 0.8)'; // Darker Teal Translucent for bars
const CHART_PRIMARY_BG_RADAR = 'rgba(42, 82, 102, 0.3)'; // Lighter Teal Translucent for radar fill

function initializeStudentOverviewCharts(student) { 
    console.log("Initializing student overview charts for:", student.name);
    const chartOptions = { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: true, position: 'bottom' }}};
    
    const studentScoreTrendCanvas = document.getElementById('studentScoreTrendChart');
    if (studentScoreTrendCanvas) {
        if(studentScoreTrendChartInstance) studentScoreTrendChartInstance.destroy();
        studentScoreTrendChartInstance = new Chart(studentScoreTrendCanvas.getContext('2d'), { 
            type: 'line', data: { labels: student.cbPracticeTests.filter(t => t.total !== "-").map(t => t.name.replace("Official Practice ","").replace("Test ","T")), datasets: [{ label: 'Your Score', data: student.scoreHistory, borderColor: CHART_PRIMARY_COLOR, tension: 0.1 }] }, options: chartOptions });
    } else { console.error("studentScoreTrendChart canvas not found"); }

    const studentOverallSkillCanvas = document.getElementById('studentOverallSkillChart');
    if (studentOverallSkillCanvas) {
        if(studentOverallSkillChartInstance) studentOverallSkillChartInstance.destroy();
        const studentSkillLabels = Object.values(student.cbSkills).flat().map(s => s.name.split(": ")[1] || s.name.split(" ")[0]); 
        const studentSkillScores = Object.values(student.cbSkills).flat().map(s => s.score); 
        const studentSkillClassAvgs = Object.values(student.cbSkills).flat().map(s => classAverages.cbSkills[s.key] || s.classAvg); 
        studentOverallSkillChartInstance = new Chart(studentOverallSkillCanvas.getContext('2d'), { 
            type: 'bar', data: { labels: studentSkillLabels.slice(0,8), datasets: [ { label: 'Your Accuracy', data: studentSkillScores.slice(0,8), backgroundColor: CHART_PRIMARY_BG_BAR}, { label: 'Class Average', data: studentSkillClassAvgs.slice(0,8), backgroundColor: CHART_SECONDARY_COLOR + 'AA' } ] }, options: { ...chartOptions, scales: { y: { beginAtZero: true, max: 100 }}} });
    } else { console.error("studentOverallSkillChart canvas not found"); }
}

function loadClassOverviewData() { 
    console.log("Loading Class Overview Data");
    const chartOptions = { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: true, position: 'bottom' }}};
    const kpiContainer = document.getElementById('classKpiSection'); 
    if (kpiContainer) {
        kpiContainer.innerHTML = `
            <div class="themed-card kpi-widget p-0"><div class="themed-card-title-strip" style="font-size:0.9rem; padding:0.5rem 1rem;">Avg Total Score</div><div class="themed-card-body text-center py-2"><span class="value">${Math.round(classAverages.totalScaledScore)}</span></div></div> 
            <div class="themed-card kpi-widget p-0"><div class="themed-card-title-strip" style="font-size:0.9rem; padding:0.5rem 1rem;">Avg R&W Score</div><div class="themed-card-body text-center py-2"><span class="value">${Math.round(classAverages.rwScore)}</span></div></div> 
            <div class="themed-card kpi-widget p-0"><div class="themed-card-title-strip" style="font-size:0.9rem; padding:0.5rem 1rem;">Avg Math Score</div><div class="themed-card-body text-center py-2"><span class="value">${Math.round(classAverages.mathScore)}</span></div></div> 
            <div class="themed-card kpi-widget p-0"><div class="themed-card-title-strip" style="font-size:0.9rem; padding:0.5rem 1rem;">Avg EOC Quiz %</div><div class="themed-card-body text-center py-2"><span class="value">${Math.round(classAverages.eocOverallPercentage)}%</span></div></div> 
            <div class="themed-card kpi-widget p-0"><div class="themed-card-title-strip" style="font-size:0.9rem; padding:0.5rem 1rem;">Avg Activity Score</div><div class="themed-card-body text-center py-2"><span class="value">${Math.round(classAverages.avgActivityScore)}</span></div></div>`;
    } else { console.error("classKpiSection not found"); }
    
    const activityReportContainer = document.getElementById('classActivityReport'); 
    if (activityReportContainer) {
        const sortedByActivity = [...students].sort((a,b) => b.activityMetrics.activityScore - a.activityMetrics.activityScore); 
        activityReportContainer.innerHTML = `<div><p class="text-sm text-gray-500">Avg Class Activity</p><p class="font-semibold text-xl">${Math.round(classAverages.avgActivityScore)}</p></div> <div><p class="text-sm text-green-500">Most Active</p><p class="font-semibold text-lg">${sortedByActivity[0].name} (${sortedByActivity[0].activityMetrics.activityScore})</p></div> <div><p class="text-sm text-red-500">Least Active</p><p class="font-semibold text-lg">${sortedByActivity[sortedByActivity.length-1].name} (${sortedByActivity[sortedByActivity.length-1].activityMetrics.activityScore})</p></div>`;
    } else { console.error("classActivityReport not found"); }

    const classScoreDistCanvas = document.getElementById('classScoreDistributionChart');
    if (classScoreDistCanvas) {
        if (classScoreDistributionChartInstance) classScoreDistributionChartInstance.destroy(); 
        const scoreCounts = students.reduce((acc, s) => { const bin = Math.floor(s.activityMetrics.latestTotalScore / 100) * 100; acc[bin] = (acc[bin] || 0) + 1; return acc; }, {}); 
        classScoreDistributionChartInstance = new Chart(classScoreDistCanvas.getContext('2d'), { type: 'bar', data: { labels: Object.keys(scoreCounts).map(bin => `${bin}-${parseInt(bin)+99}`).sort(), datasets: [{ label: '# of Students', data: Object.values(scoreCounts), backgroundColor: CHART_PRIMARY_BG_BAR }] }, options: { ...chartOptions, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } } }); 
    } else { console.error("classScoreDistributionChart canvas not found"); }
    
    const classSkillPerfCanvas = document.getElementById('classSkillPerformanceChart');
    if (classSkillPerfCanvas) {
        if (classSkillPerformanceChartInstance) classSkillPerformanceChartInstance.destroy(); 
        const skillKeysForChart = ['math_algebra', 'math_advanced', 'math_problem_solving', 'math_geometry', 'reading_central_ideas', 'reading_vocab', 'writing_rhetoric', 'writing_boundaries']; 
        classSkillPerformanceChartInstance = new Chart(classSkillPerfCanvas.getContext('2d'), { type: 'radar', data: { labels: skillKeysForChart.map(k=>k.split('_')[1].charAt(0).toUpperCase() + k.split('_')[1].slice(1) || k.split('_')[0]), datasets: [{ label: 'Class Avg Accuracy (%)', data: skillKeysForChart.map(key => classAverages.cbSkills[key] || 0), fill: true, backgroundColor: CHART_PRIMARY_BG_RADAR, borderColor: CHART_PRIMARY_COLOR, pointBackgroundColor: CHART_PRIMARY_COLOR }] }, options: { ...chartOptions, scales: { r: { beginAtZero: true, max: 100, suggestedMin: 40, pointLabels: { font: { size: 10 } } } } } }); 
    } else { console.error("classSkillPerformanceChart canvas not found"); }
    
    ['Reading', 'Writing', 'Math'].forEach(subject => { const containerId = `classWeakEoc${subject.replace(' & Language','')}`; const container = document.getElementById(containerId.toLowerCase()); if(container) { container.innerHTML = ''; const subjectEocs = eocChaptersFull[subject.toLowerCase().split(' ')[0]]; const sortedEocs = subjectEocs.map(name => ({name, avgScore: classAverages.eocChapters[name] || 0})).sort((a,b) => a.avgScore - b.avgScore).slice(0, 3); sortedEocs.forEach(eoc => { const studentsBelow70 = students.filter(s => (Object.values(s.eocScores).flat().find(se => se.name === eoc.name)? parseInt(Object.values(s.eocScores).flat().find(se => se.name === eoc.name).latestScore) : 100) < 70).length; container.innerHTML += `<div class="p-1 border-b border-gray-200 text-xs"><span class="font-medium">${eoc.name}</span>: Avg ${eoc.avgScore}% <span class="text-red-500">(${studentsBelow70}/${students.length} &lt;70%)</span></div>`; }); if(sortedEocs.length === 0) container.innerHTML = `<p class="text-xs text-gray-400">No specific weak EOC Quizzes identified for ${subject}.</p>`; } else { console.error(`Container not found for weak EOCs: ${containerId.toLowerCase()}`);} });
    
    const skillStrengthsUl = document.getElementById('classSkillStrengths'); const skillWeaknessesUl = document.getElementById('classSkillWeaknesses'); 
    if (skillStrengthsUl && skillWeaknessesUl) {
        skillStrengthsUl.innerHTML = ''; skillWeaknessesUl.innerHTML = ''; const allSkillsWithNames = []; Object.values(genericCbSkills).flat().forEach(skillInfo => { allSkillsWithNames.push({name: skillInfo.name, key: skillInfo.key, avgScore: classAverages.cbSkills[skillInfo.key] || 0}); }); allSkillsWithNames.sort((a,b) => b.avgScore - a.avgScore);  allSkillsWithNames.slice(0,3).forEach(s => skillStrengthsUl.innerHTML += `<li>${s.name} (${s.avgScore}%)</li>`); allSkillsWithNames.sort((a,b) => a.avgScore - b.avgScore);  allSkillsWithNames.slice(0,3).forEach(s => skillWeaknessesUl.innerHTML += `<li>${s.name} (${s.avgScore}%)</li>`);
    } else { console.error("Skill strengths/weaknesses ULs not found"); }
}

function loadStudentPerformanceTiers() { 
    console.log("Loading Student Performance Tiers");
    const sprintersContainer = document.getElementById('sprintersList'); const strugglersContainer = document.getElementById('strugglersList'); 
    if (!sprintersContainer || !strugglersContainer) { console.error("Sprinter/Struggler containers not found"); return;}
    sprintersContainer.innerHTML = ''; strugglersContainer.innerHTML = ''; 
    const sprinters = []; const strugglers = []; 
    students.forEach(s => { const scoreImprovement = s.activityMetrics.latestTotalScore - s.activityMetrics.previousTotalScore; let isSprinter = false; let isStruggler = false; if (s.activityMetrics.latestTotalScore > (classAverages.totalScaledScore + 75) || scoreImprovement > 50 || s.activityMetrics.activityScore > 85) isSprinter = true; if (s.activityMetrics.latestTotalScore < (classAverages.totalScaledScore - 75) || scoreImprovement < -20 || s.activityMetrics.activityScore < 60) isStruggler = true; if (isStruggler) strugglers.push(s); else if(isSprinter) sprinters.push(s);}); 
    if (sprinters.length === 0 && students.length > 0) sprinters.push(...[...students].sort((a,b) => b.activityMetrics.latestTotalScore - a.activityMetrics.latestTotalScore).slice(0, Math.min(3, students.length))); 
    if (strugglers.length === 0 && students.length > 0) strugglers.push(...[...students].sort((a,b) => a.activityMetrics.latestTotalScore - b.activityMetrics.latestTotalScore).slice(0, Math.min(3, students.length))); 
    sprinters.slice(0,6).forEach(s => { const improvement = s.activityMetrics.latestTotalScore - s.activityMetrics.previousTotalScore; const improvementText = improvement >= 0 ? `+${improvement}` : improvement; const topSkill = Object.values(s.cbSkills).flat().sort((a,b)=>b.score-a.score)[0]; sprintersContainer.innerHTML += `<div class="themed-card sprinter-card p-0"><div class="themed-card-title-strip" style="font-size:1rem; padding:0.5rem 1rem; background-color: #28a745; color:white;">${s.name}</div><div class="themed-card-body text-xs"><p>Score: <span class="font-bold">${s.activityMetrics.latestTotalScore}</span> (Target: ${s.targetScore}) <span class="ml-1 ${improvement >=0 ? 'text-good':'text-poor'}">(${improvementText} pts)</span></p><p>Activity: ${s.activityMetrics.activityScore}/100</p><p class="mt-1">Strength: <span class="font-medium">${topSkill?topSkill.name:'N/A'} (${topSkill?topSkill.score:'' }%)</span></p></div></div>`; }); 
    if(sprinters.length === 0) sprintersContainer.innerHTML = "<p class='text-gray-500 col-span-full text-center'>No students currently flagged as sprinters.</p>"; 
    strugglers.slice(0,6).forEach(s => { const worstSkill = Object.values(s.cbSkills).flat().sort((a,b)=>a.score-b.score)[0]; strugglersContainer.innerHTML += `<div class="themed-card struggler-card p-0"><div class="themed-card-title-strip" style="font-size:1rem; padding:0.5rem 1rem; background-color: #dc3545; color:white;">${s.name}</div><div class="themed-card-body text-xs"><p>Score: <span class="font-bold">${s.activityMetrics.latestTotalScore}</span> (Target: ${s.targetScore})</p><p>Activity: ${s.activityMetrics.activityScore}/100 ${s.activityMetrics.activityScore < 60 ? '<span class="text-red-500 font-bold">LOW!</span>':''}</p><p class="mt-1">Focus Area: <span class="font-medium">${worstSkill?worstSkill.name:'N/A'} (${worstSkill?worstSkill.score:'' }%)</span></p></div></div>`; }); 
    if(strugglers.length === 0) strugglersContainer.innerHTML = "<p class='text-gray-500 col-span-full text-center'>No students currently flagged as strugglers.</p>";
}

function getPerformanceClassStudent(score) { if (score >= 85) return 'performance-good'; if (score >= 70) return 'performance-average'; return 'performance-poor'; }

function loadStudentDashboard(studentId) { 
    console.log("Loading dashboard for student:", studentId);
    const student = students.find(s => s.id === studentId); 
    if (!student) { console.error("Student not found:", studentId); return; }
    selectedStudentNameHeader.textContent = `- ${student.name}`; 
    replicatedStudentDashboardDiv.classList.remove('hidden'); 
    studentSelectionPrompt.classList.add('hidden'); 
    document.getElementById('comparativeStudentName').textContent = student.name; 
    initializeStudentOverviewCharts(student); 
    
    const comparisonContainer = document.getElementById('studentComparisonWidgets'); 
    comparisonContainer.innerHTML = `
        <div class="themed-card kpi-widget p-0"><div class="themed-card-title-strip" style="padding:0.4rem 0.8rem; font-size:0.8rem;">Total Score</div><div class="themed-card-body text-center py-2"><span class="value">${student.activityMetrics.latestTotalScore} <span class="text-sm ${student.activityMetrics.latestTotalScore > classAverages.totalScaledScore ? 'text-good':'text-poor'}">${student.activityMetrics.latestTotalScore > classAverages.totalScaledScore ? '↑':'↓'}</span></span><p class="comparison text-xs">Class Avg: ${Math.round(classAverages.totalScaledScore)}</p></div></div> 
        <div class="themed-card kpi-widget p-0"><div class="themed-card-title-strip" style="padding:0.4rem 0.8rem; font-size:0.8rem;">Avg Time/Module</div><div class="themed-card-body text-center py-2"><span class="value">${student.activityMetrics.avgTimePerModuleCB} min <span class="text-sm ${student.activityMetrics.avgTimePerModuleCB < classAverages.avgTimePerModuleCB ? 'text-good':'text-poor'}">${student.activityMetrics.avgTimePerModuleCB < classAverages.avgTimePerModuleCB ? '↓':'↑'}</span></span><p class="comparison text-xs">Class Avg: ${Math.round(classAverages.avgTimePerModuleCB)} min</p></div></div> 
        <div class="themed-card kpi-widget p-0"><div class="themed-card-title-strip" style="padding:0.4rem 0.8rem; font-size:0.8rem;">EOC Quiz Attempts</div><div class="themed-card-body text-center py-2"><span class="value">${student.activityMetrics.eocAttempts} <span class="text-sm ${student.activityMetrics.eocAttempts > classAverages.eocAttempts ? 'text-good':'text-poor'}">${student.activityMetrics.eocAttempts > classAverages.eocAttempts ? '↑':'↓'}</span></span><p class="comparison text-xs">Class Avg: ${Math.round(classAverages.eocAttempts)}</p></div></div> 
        <div class="themed-card kpi-widget p-0"><div class="themed-card-title-strip" style="padding:0.4rem 0.8rem; font-size:0.8rem;">Khan Academy Activities</div><div class="themed-card-body text-center py-2"><span class="value">${student.activityMetrics.khanActivitiesCompleted} <span class="text-sm ${student.activityMetrics.khanActivitiesCompleted > classAverages.khanActivitiesCompleted ? 'text-good':'text-poor'}">${student.activityMetrics.khanActivitiesCompleted > classAverages.khanActivitiesCompleted ? '↑':'↓'}</span></span><p class="comparison text-xs">Class Avg: ${Math.round(classAverages.khanActivitiesCompleted)}</p></div></div>`; 
    
    const studentScoreCardContainer = document.getElementById('studentScoreCards'); 
    const latestTest = student.cbPracticeTests.find(t => t.total === student.activityMetrics.latestTotalScore) || student.cbPracticeTests[0]; 
    studentScoreCardContainer.innerHTML = `
        <div class="themed-card p-0"><div class="themed-card-title-strip" style="padding:0.4rem 0.8rem; font-size:0.8rem;">Latest CB Total</div><div class="themed-card-body text-center py-2"><p class="text-3xl font-bold" style="color:#2a5266;">${latestTest.total} <span class="text-lg text-gray-500">/1600</span></p><p class="text-sm text-gray-500 mt-1">Class Avg: ${Math.round(classAverages.totalScaledScore)}</p></div></div> 
        <div class="themed-card p-0"><div class="themed-card-title-strip" style="padding:0.4rem 0.8rem; font-size:0.8rem;">Latest CB R&W</div><div class="themed-card-body text-center py-2"><p class="text-3xl font-bold" style="color:#2a5266;">${latestTest.rw} <span class="text-lg text-gray-500">/800</span></p><p class="text-sm text-gray-500 mt-1">Class Avg: ${Math.round(classAverages.rwScore)}</p></div></div> 
        <div class="themed-card p-0"><div class="themed-card-title-strip" style="padding:0.4rem 0.8rem; font-size:0.8rem;">Latest CB Math</div><div class="themed-card-body text-center py-2"><p class="text-3xl font-bold" style="color:#2a5266;">${latestTest.math} <span class="text-lg text-gray-500">/800</span></p><p class="text-sm text-gray-500 mt-1">Class Avg: ${Math.round(classAverages.mathScore)}</p></div></div> 
        <div class="themed-card p-0"><div class="themed-card-title-strip" style="padding:0.4rem 0.8rem; font-size:0.8rem;">Avg EOC Quiz %</div><div class="themed-card-body text-center py-2"><p class="text-3xl font-bold" style="color:#2a5266;">${Math.round(Object.values(student.eocScores).flat().reduce((s,e)=>s+parseInt(e.latestScore),0) / (Object.values(student.eocScores).flat().length || 1) )}%</p><p class="text-sm text-gray-500 mt-1">Class Avg: ${Math.round(classAverages.eocOverallPercentage)}%</p></div></div> 
        <div class="themed-card p-0"><div class="themed-card-title-strip" style="padding:0.4rem 0.8rem; font-size:0.8rem;">Target Score</div><div class="themed-card-body text-center py-2"><p class="text-3xl font-bold text-purple-600">${student.targetScore}</p><p class="text-sm text-gray-500 mt-1">Goal: ${student.targetScore - latestTest.total > 0 ? '+':''}${student.targetScore - latestTest.total} pts</p></div></div>`; 
    
    const studentCbTbody = document.getElementById('student-cb-tests-tbody'); studentCbTbody.innerHTML = ''; 
    student.cbPracticeTests.forEach(test => { const classAvgForTestRW = Math.round(classAverages.rwScore); const classAvgForTestMath = Math.round(classAverages.mathScore); const classAvgForTestTotal = classAvgForTestRW + classAvgForTestMath; const row = studentCbTbody.insertRow(); row.className = 'clickable-row'; row.innerHTML = `<td>${test.name}</td><td>${test.date}</td><td>${test.rw}</td><td>${test.math}</td><td>${test.total}</td><td>${test.rw !== '-' ? classAvgForTestRW : '(N/A)'}</td><td>${test.math !== '-' ? classAvgForTestMath : '(N/A)'}</td><td>${test.total !== '-' ? classAvgForTestTotal : '(N/A)'}</td>`; row.onclick = () => openModal(`Student: ${student.name} - CB Test: ${test.name}`, { type: 'cb_test', data: test, studentName: student.name }); }); 
    
    ['reading', 'writing', 'math'].forEach(subject => { 
        const eocTbodyContainer = document.getElementById(`student-${subject}-eoc-tbody`); eocTbodyContainer.innerHTML = ''; 
        if (!student.eocScores[subject] || student.eocScores[subject].length === 0) { eocTbodyContainer.innerHTML = `<div class="p-3 text-gray-500">No EOC Quiz data for ${subject}.</div>`; } 
        else { const table = document.createElement('table'); table.className = 'min-w-full table'; table.innerHTML = `<thead><tr><th>Chapter</th><th>Latest Score</th><th>Date</th><th>Class Avg</th></tr></thead><tbody></tbody>`; const body = table.querySelector('tbody'); student.eocScores[subject].forEach(eoc => { const row = body.insertRow(); row.className = 'clickable-row'; row.innerHTML = `<td>${eoc.name}</td><td>${eoc.latestScore}</td><td>${eoc.date}</td><td>${classAverages.eocChapters[eoc.name] || eoc.classAvg}%</td>`; row.onclick = () => openModal(`Student: ${student.name} - EOC Quiz: ${eoc.name}`, { type: 'eoc_quiz', data: eoc, studentName: student.name }); }); eocTbodyContainer.appendChild(table); } 
        
        const khanContainer = document.getElementById(`student-${subject}-khan-data`); khanContainer.innerHTML = ''; 
        if (!student.khanData[subject] || student.khanData[subject].length === 0) { khanContainer.innerHTML = `<p class="text-gray-500 p-3">No Khan Academy ${subject} data.</p>`; } 
        else { const table = document.createElement('table'); table.className = 'min-w-full table'; table.innerHTML = `<thead><tr><th>Assignment</th><th>Score</th><th>Date</th><th>Class Avg</th></tr></thead><tbody></tbody>`; const body = table.querySelector('tbody'); student.khanData[subject].forEach(khan => { const row = body.insertRow(); row.className = 'clickable-row'; row.innerHTML = `<td>${khan.name}</td><td>${khan.score}</td><td>${khan.date}</td><td>${khan.classAvg}</td>`; row.onclick = () => openModal(`Student: ${student.name} - Khan Academy: ${khan.name}`, { type: 'khan', data: khan, studentName: student.name }); }); khanContainer.appendChild(table); } 
        
        const skillsContainer = document.getElementById(`student-${subject}-cb-skills-data`); skillsContainer.innerHTML = ''; 
         if (!student.cbSkills[subject] || student.cbSkills[subject].length === 0) { skillsContainer.innerHTML = `<p class="text-gray-500 p-3">No CB Skill data for ${subject}.</p>`; } 
         else { student.cbSkills[subject].forEach(skill => { const skillDiv = document.createElement('div'); skillDiv.className = 'p-3 bg-gray-50 rounded-md border'; const perfClass = getPerformanceClassStudent(skill.score); skillDiv.innerHTML = `<div class="flex justify-between items-center mb-1"><span class="text-sm font-medium">${skill.name}</span><span class="text-xs ${perfClass.replace('performance-','text-')} font-semibold">${skill.score}%</span></div><div class="progress-bar-container"><div class="progress-bar ${perfClass}" style="width: ${skill.score}%"></div></div><p class="text-xs text-gray-500 mt-1">Class Avg: ${classAverages.cbSkills[skill.key] || skill.classAvg}%</p>`; skillsContainer.appendChild(skillDiv); }); } 
    }); 
    const firstStudentTab = document.querySelector('#replicatedStudentDashboard .student-main-tab-button'); if(firstStudentTab) firstStudentTab.click(); 
}
        
function openModal(title, contentDetails) { 
    const modalHeaderH2 = modal.querySelector('.modal-header h2'); 
    if(modalHeaderH2) modalHeaderH2.textContent = title;
    modalQuestionDetailsContainer.innerHTML = ''; 
    const dQ=Array.from({length:5+Math.floor(Math.random()*5)},(_,i)=>{const cor=Math.random()>0.3;const stat=Math.random()>0.1?'answered':'unanswered';return{text:`Sample Question ${i+1} from ${contentDetails.type||'test'}...`,yourAnswer:stat==='unanswered'?"N/A":(cor?`Opt A`:`Opt B`),correct:stat==='unanswered'?false:cor,classCorrectPercent:60+Math.floor(Math.random()*35),status:stat};}); 
    dQ.forEach((q,index)=>{const qD=document.createElement('div');let sTxt='',sCls='';if(q.status==='unanswered'){sTxt='Unanswered';sCls='bg-yellow-50 border-yellow-200 text-yellow-600';}else if(q.correct){sTxt='Correct';sCls='bg-green-50 border-green-200';}else{sTxt='Incorrect';sCls='bg-red-50 border-red-200';} qD.className=`p-2 border rounded-md ${sCls}`; qD.innerHTML=`<p class="font-medium text-gray-700">Q${index+1}: ${q.text}</p><p>Your Answer: <span class="font-semibold">${q.yourAnswer}</span> (${sTxt})</p><p class="text-xs">Class Avg: ${q.classCorrectPercent}%</p>`; modalQuestionDetailsContainer.appendChild(qD);}); 
    if(modalDonutChartInstance)modalDonutChartInstance.destroy();if(modalLineChartInstance)modalLineChartInstance.destroy(); 
    const cor=dQ.filter(q=>q.status==='answered'&&q.correct).length;const inc=dQ.filter(q=>q.status==='answered'&&!q.correct).length;const un=dQ.filter(q=>q.status==='unanswered').length; 
    const donutCtx = document.getElementById('modalDonutChart')?.getContext('2d');
    if(donutCtx) {
      modalDonutChartInstance=new Chart(donutCtx,{type:'doughnut',data:{labels:['Correct','Incorrect','Unanswered'],datasets:[{data:[cor,inc,un],backgroundColor:['#28a745','#dc3545','#6c757d'],hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{position:'bottom'}},cutout:'50%'}}); 
    }
    const lineCtx = document.getElementById('modalLineChart')?.getContext('2d');
    if (lineCtx) {
      modalLineChartInstance=new Chart(lineCtx,{type:'line',data:{labels:['W1','W2','W3','W4','W5'],datasets:[{label:'Your Score Trend',data:Array.from({length:5},()=>50+Math.random()*40),borderColor:CHART_PRIMARY_COLOR,fill:false},{label:'Class Avg Trend',data:Array.from({length:5},()=>45+Math.random()*35),borderColor:CHART_SECONDARY_COLOR,borderDash:[5,5],fill:false}]},options:{responsive:true,maintainAspectRatio:true,scales:{y:{beginAtZero:true,max:100}},plugins:{legend:{position:'bottom'}}}}); 
    }
    if(modal) modal.style.display="block"; 
}
function closeModal() { if(modal) modal.style.display = "none"; if (modalDonutChartInstance) modalDonutChartInstance.destroy(); if (modalLineChartInstance) modalLineChartInstance.destroy(); }
window.onclick = function(event) { if (event.target == modal) closeModal(); }
    </script>
</body>
</html>