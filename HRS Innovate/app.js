/* ==========================================
   DIGITAL INNOVATION — HRS
   app.js
   
   HOW TO EDIT:
   - To change workshop content → edit the "workshops" object below
   - To add/remove outer ring items → edit the "outerItems" object
   - To change quadrant positions → edit the "quads" object
   ========================================== */

// ==========================================
// DIAGRAM DIMENSIONS
// ==========================================
const CX = 350, CY = 350;
const R1 = 70;   // center circle radius (Why)
const R2 = 210;  // middle ring radius (How)
const R3 = 340;  // outer ring radius (What)

// ==========================================
// WORKSHOP DATA
// Edit name, subtitle, description, examples, etc. here
// ==========================================
const workshops = {
  ai: {
    name: "AI Workshop",
    subtitle: '"Bring Your Work to Life"',
    accent: "rgba(212,0,122,0.9)",
    description: "Students take existing classroom work and use AI-assisted tools to transform it into something interactive and immersive.",
    examples: [
      "A history assignment on the Western Front becomes a navigable 3D battlefield diorama with clickable information points.",
      "A math exploration of geometry in architecture becomes a 3D walkthrough where the mathematics is visible and tangible.",
      "A science investigation becomes an interactive model where users can manipulate variables."
    ],
    cct: ["inquiring", "generating", "analysing", "reflecting"],
    designThinking: "Students must first understand the audience for their work. Who will explore this? What do they need to understand?"
  },
  game: {
    name: "Game Development",
    subtitle: '"Create a Game for Someone"',
    accent: "rgba(212,0,122,0.75)",
    description: "Built on empathy and collaboration across year levels. Younger students share stories and visions. Older students bring these to life through iterative game design.",
    examples: [
      "A Year 5 student describes their dream game. A Year 8 student interviews them, builds a prototype, gets feedback, and iterates.",
      "Cross-age collaboration teaches active listening and translating someone else's vision.",
      "Younger students develop agency — their ideas become real."
    ],
    cct: ["inquiring", "generating", "reflecting"],
    designThinking: "The entire workshop IS design thinking. Empathise, Define, Ideate, Prototype, Test — with a real client."
  },
  maker: {
    name: "Maker Space",
    subtitle: "3D Printing · Robotics · Drones",
    accent: "rgba(212,0,122,0.65)",
    description: "Students design, build, code, and fly. Covers 3D printing, robotics challenges, and drone mapping.",
    examples: [
      "Design solutions to real problems then 3D print them.",
      "Robotics challenges: build and code robots to solve problems.",
      "Drone mapping: program flight paths, collect aerial data, generate terrain models."
    ],
    cct: ["generating", "analysing", "reflecting"],
    designThinking: "Every maker project starts with a problem. Identify, sketch, model, test, revise, produce."
  },
  entre: {
    name: "Entrepreneurship",
    subtitle: '"More to Come"',
    accent: "rgba(212,0,122,0.55)",
    description: "Students identify real problems, develop solutions, and pitch them — combining digital skills with business thinking.",
    examples: [
      "Identify problems in school or community and propose digital solutions.",
      "Pitch workshops: communicate ideas clearly and persuasively.",
      "Combine technical skills from other workshops with entrepreneurial thinking."
    ],
    cct: ["inquiring", "generating", "analysing", "reflecting"],
    designThinking: "Entrepreneurship is applied design thinking. Identify, understand, build, test."
  }
};

// ==========================================
// OUTER RING ITEMS
// Each array belongs to a quadrant (workshop).
// To remove an item: delete its line.
// To add an item: add { label: "Name", sub: "Subtitle" }
// To link to a demo: add hasDemo: true, demoId: "filename"
// ==========================================
const outerItems = {
  ai: [
    { label: "History", sub: "Interactive dioramas", hasDemo: true, demoId: "western-front" },
    { label: "Math", sub: "Real-world models", hasDemo: true, demoId: "pyramid-maths" },
    { label: "English", sub: "Write to create", hasDemo: true, demoId: "globe-theatre" },
    { label: "Science", sub: "Simulations", hasDemo: true, demoId: "human-cell" },
  ],
  game: [
    { label: "Storytelling", sub: "Narrative design" },
    { label: "Collaboration", sub: "Cross-age teams" },
    { label: "Empathy", sub: "Design for others" },
    { label: "Technical", sub: "Build & code" },
    { label: "Art", sub: "Visual design" },
    { label: "Dev-Client", sub: "Feedback loops" },
  ],
  maker: [
    { label: "3D Printing", sub: "Design & make" },
    { label: "Robotics", sub: "Build & solve" },
    { label: "Drones", sub: "Map & fly" },
    { label: "Engineering", sub: "Systems thinking" },
    { label: "Coding", sub: "Logic & control" },
  ],
  entre: [
    { label: "Identify Problems", sub: "Observe & question" },
    { label: "Express Ideas", sub: "Pitch & present" },
    { label: "Prototyping", sub: "Build to learn" },
    { label: "Iterate", sub: "Improve" },
  ]
};

// ==========================================
// QUADRANT POSITIONS (degrees, 0 = top, clockwise)
// top-right, bottom-right, bottom-left, top-left
// ==========================================
const quads = {
  ai:    { startDeg: -45,  endDeg: 45 },
  game:  { startDeg: 45,   endDeg: 135 },
  maker: { startDeg: 135,  endDeg: 225 },
  entre: { startDeg: 225,  endDeg: 315 },
};

// ==========================================
// SVG HELPERS (no need to edit these)
// ==========================================
function polarToCart(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCart(cx, cy, r, endAngle);
  const end = polarToCart(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

function describeWedge(cx, cy, r1, r2, startAngle, endAngle) {
  const outerStart = polarToCart(cx, cy, r2, startAngle);
  const outerEnd = polarToCart(cx, cy, r2, endAngle);
  const innerEnd = polarToCart(cx, cy, r1, endAngle);
  const innerStart = polarToCart(cx, cy, r1, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${outerStart.x} ${outerStart.y} A ${r2} ${r2} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y} L ${innerEnd.x} ${innerEnd.y} A ${r1} ${r1} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y} Z`;
}

function svgEl(tag, attrs) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

// ==========================================
// BUILD THE DIAGRAM
// ==========================================
function buildDiagram() {
  const svg = document.getElementById('ringSvg');
  
  // Ring circles (faded lines)
  svg.appendChild(svgEl("circle", { cx: CX, cy: CY, r: R3, fill: "none", stroke: "rgba(255,255,255,0.06)", "stroke-width": "1" }));
  svg.appendChild(svgEl("circle", { cx: CX, cy: CY, r: R2, fill: "none", stroke: "rgba(255,255,255,0.08)", "stroke-width": "1" }));
  svg.appendChild(svgEl("circle", { cx: CX, cy: CY, r: R1, fill: "none", stroke: "rgba(255,255,255,0.06)", "stroke-width": "1" }));
  
  // Divider lines (faded, from R1 to R3)
  [-45, 45, 135, 225].forEach(deg => {
    const inner = polarToCart(CX, CY, R1, deg);
    const outer = polarToCart(CX, CY, R3, deg);
    svg.appendChild(svgEl("line", {
      x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y,
      stroke: "rgba(255,255,255,0.06)", "stroke-width": "0.5"
    }));
  });

  // BUILD EACH QUADRANT as a group (ring2 wedge + labels + ring3 items)
  Object.entries(quads).forEach(([id, q]) => {
    const ws = workshops[id];
    const items = outerItems[id];
    
    // Master group — everything in this quadrant scales together on hover
    const quadGroup = svgEl("g", {
      class: "quad-group",
      "data-quad": id,
      style: `transform-origin: ${CX}px ${CY}px; transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s;`
    });
    
    // Invisible clickable wedge (ring2 area)
    const wedgePath = describeWedge(CX, CY, R1 + 2, R2 - 1, q.startDeg, q.endDeg);
    const wedge = svgEl("path", {
      d: wedgePath, fill: "transparent", cursor: "pointer"
    });
    wedge.addEventListener('click', () => openDetail(id));
    quadGroup.appendChild(wedge);
    
    // Invisible clickable wedge (outer ring area)
    const outerWedgePath = describeWedge(CX, CY, R2 + 1, R3 - 1, q.startDeg, q.endDeg);
    const outerWedge = svgEl("path", {
      d: outerWedgePath, fill: "transparent", cursor: "pointer"
    });
    quadGroup.appendChild(outerWedge);
    
    // Quadrant label (workshop name)
    const midAngle = (q.startDeg + q.endDeg) / 2;
    const labelR = (R1 + R2) / 2;
    const lp = polarToCart(CX, CY, labelR, midAngle);
    
    const nameEl = svgEl("text", {
      x: lp.x, y: lp.y - 6, "text-anchor": "middle",
      "font-family": "'Outfit', sans-serif", "font-size": "11",
      "font-weight": "600", "letter-spacing": "1.5",
      fill: "rgba(240,239,244,0.9)", "pointer-events": "none"
    });
    nameEl.textContent = ws.name.toUpperCase();
    quadGroup.appendChild(nameEl);
    
    // Quadrant subtitle
    const subEl = svgEl("text", {
      x: lp.x, y: lp.y + 12, "text-anchor": "middle",
      "font-family": "'Crimson Pro', serif", "font-size": "12",
      "font-style": "italic",
      fill: "rgba(240,239,244,0.5)", "pointer-events": "none"
    });
    subEl.textContent = ws.subtitle;
    quadGroup.appendChild(subEl);
    
    // Outer ring items for this quadrant
    const padding = 4;
    const arc = (q.endDeg - q.startDeg) - padding * 2;
    const step = arc / items.length;
    
    items.forEach((item, i) => {
      const angle = q.startDeg + padding + step * (i + 0.5);
      const midR = (R2 + R3) / 2;
      const p = polarToCart(CX, CY, midR, angle);
      
      const g = svgEl("g", {
        class: "outer-node",
        "data-quad": id,
        cursor: "pointer",
        transform: `translate(${p.x}, ${p.y})`
      });
      
      // Hover background
      const bg = svgEl("rect", {
        x: "-40", y: "-14", width: "80", height: "28", rx: "4",
        fill: "transparent", style: "transition: fill 0.3s"
      });
      g.appendChild(bg);
      
      // Label text
      const labelColor = item.hasDemo ? "#D4007A" : "rgba(240,239,244,0.55)";
      const text = svgEl("text", {
        "text-anchor": "middle", y: "-1",
        "font-family": "'Outfit', sans-serif", "font-size": "10",
        "font-weight": item.hasDemo ? "600" : "400",
        "letter-spacing": "1",
        fill: labelColor, style: "transition: fill 0.25s"
      });
      text.textContent = item.label;
      g.appendChild(text);
      
      // Sub text
      const sub = svgEl("text", {
        "text-anchor": "middle", y: "10",
        "font-family": "'Outfit', sans-serif", "font-size": "7.5",
        fill: "rgba(240,239,244,0.3)", "pointer-events": "none"
      });
      sub.textContent = item.sub;
      g.appendChild(sub);
      
      // Individual item hover
      g.addEventListener('mouseenter', () => {
        bg.setAttribute("fill", "rgba(168,0,92,0.12)");
        text.setAttribute("fill", "#D4007A");
      });
      g.addEventListener('mouseleave', () => {
        bg.setAttribute("fill", "transparent");
        text.setAttribute("fill", labelColor);
      });
      
      // Click
      g.addEventListener('click', (e) => {
        e.stopPropagation();
        if (item.hasDemo) {
          openDemoPage(item.demoId, `${ws.name} › ${item.label}`);
        } else {
          openDetail(id, item.label);
        }
      });
      
      quadGroup.appendChild(g);
    });
    
    // Quadrant-level hover: scale whole group, dim others
    quadGroup.addEventListener('mouseenter', () => {
      quadGroup.style.transform = 'scale(1.06)';
      wedge.setAttribute("fill", "rgba(168,0,92,0.06)");
      document.querySelectorAll('.quad-group').forEach(qg => {
        if (qg.dataset.quad !== id) {
          qg.style.opacity = '0.35';
        }
      });
    });
    quadGroup.addEventListener('mouseleave', () => {
      quadGroup.style.transform = 'scale(1)';
      wedge.setAttribute("fill", "transparent");
      document.querySelectorAll('.quad-group').forEach(qg => {
        qg.style.opacity = '1';
      });
    });
    
    svg.appendChild(quadGroup);
  });

  // CENTER CIRCLE (Why)
  const centerBg = svgEl("circle", {
    cx: CX, cy: CY, r: R1,
    fill: "rgba(168,0,92,0.06)", stroke: "rgba(168,0,92,0.25)",
    "stroke-width": "1", cursor: "pointer"
  });
  centerBg.addEventListener('mouseenter', function() {
    this.setAttribute("fill", "rgba(168,0,92,0.14)");
    this.setAttribute("stroke", "rgba(168,0,92,0.5)");
    this.style.transition = "all 0.3s";
  });
  centerBg.addEventListener('mouseleave', function() {
    this.setAttribute("fill", "rgba(168,0,92,0.06)");
    this.setAttribute("stroke", "rgba(168,0,92,0.25)");
  });
  centerBg.addEventListener('click', openWhyDetail);
  svg.appendChild(centerBg);
  
  // Center text
  const t1 = svgEl("text", {
    x: CX, y: CY - 20, "text-anchor": "middle",
    "font-family": "'Outfit', sans-serif", "font-size": "9",
    "letter-spacing": "5", "font-weight": "500",
    fill: "#D4007A", "pointer-events": "none"
  });
  t1.textContent = "WHY";
  svg.appendChild(t1);
  
  const t2 = svgEl("text", {
    x: CX, y: CY + 2, "text-anchor": "middle",
    "font-family": "'Crimson Pro', serif", "font-size": "15",
    fill: "#f0eff4", "pointer-events": "none"
  });
  t2.textContent = "Critical &";
  svg.appendChild(t2);
  
  const t3 = svgEl("text", {
    x: CX, y: CY + 20, "text-anchor": "middle",
    "font-family": "'Crimson Pro', serif", "font-size": "15",
    fill: "#f0eff4", "pointer-events": "none"
  });
  t3.textContent = "Creative Thinking";
  svg.appendChild(t3);
  
  // "HOW" and "WHAT" ring labels
  const howP = polarToCart(CX, CY, R2 + 14, -90);
  const howLabel = svgEl("text", {
    x: howP.x, y: howP.y, "text-anchor": "middle",
    "font-family": "'Outfit', sans-serif", "font-size": "8",
    "letter-spacing": "4", "font-weight": "400",
    fill: "rgba(240,239,244,0.25)", "pointer-events": "none"
  });
  howLabel.textContent = "HOW";
  svg.appendChild(howLabel);
  
  const whatP = polarToCart(CX, CY, R3 + 14, -90);
  const whatLabel = svgEl("text", {
    x: whatP.x, y: whatP.y, "text-anchor": "middle",
    "font-family": "'Outfit', sans-serif", "font-size": "8",
    "letter-spacing": "4", "font-weight": "400",
    fill: "rgba(240,239,244,0.2)", "pointer-events": "none"
  });
  whatLabel.textContent = "WHAT";
  svg.appendChild(whatLabel);
}

// ==========================================
// INTERACTIONS
// ==========================================
function openWhyDetail() {
  document.getElementById('detailContent').innerHTML = `
    <div class="detail-label">The Vision</div>
    <div class="detail-title">Why Digital Innovation?</div>
    <div class="detail-body">
      <p>The skills demanded of students entering the workforce evolve every year. Mechatronics is already the most popular elective at HRS — anecdotally, students report choosing it because it sounds like they'll learn something <em>new</em>.</p>
      <p>This program meets that demand by exposing middle school students to emerging tools, industries, and ways of thinking.</p>
      <h4>Critical & Creative Thinking</h4>
      <p>Every workshop maps to the Australian Curriculum's CCT capability. Students inquire, generate, analyse, and reflect — through building real things for real audiences.</p>
      <h4>Empathy & Agency</h4>
      <p>Design thinking is the pedagogical backbone. Students empathise, define, ideate, prototype, and test. They create for real purposes and real people.</p>
      <h4>Curiosity as Ignition</h4>
      <p>These workshops are crash-course incursions — high-energy, immersive days that spark interests students didn't know they had.</p>
      <div class="cct-tags">
        <span class="cct-tag cct-inquiring">Inquiring</span>
        <span class="cct-tag cct-generating">Generating</span>
        <span class="cct-tag cct-analysing">Analysing</span>
        <span class="cct-tag cct-reflecting">Reflecting</span>
      </div>
    </div>
  `;
  document.getElementById('detailOverlay').classList.add('active');
}

function openDetail(workshopId, fromLabel) {
  const ws = workshops[workshopId];
  if (!ws) return;
  const cctTags = ws.cct.map(c => `<span class="cct-tag cct-${c}">${c.charAt(0).toUpperCase() + c.slice(1)}</span>`).join('');
  const examples = ws.examples.map(ex => `<p>→ ${ex}</p>`).join('');
  document.getElementById('detailContent').innerHTML = `
    <div class="detail-label">${fromLabel ? fromLabel + ' — ' : ''}${ws.name}</div>
    <div class="detail-title">${ws.subtitle}</div>
    <div class="detail-body">
      <p>${ws.description}</p>
      <h4>What This Looks Like</h4>
      ${examples}
      <h4>Critical & Creative Thinking</h4>
      <div class="cct-tags">${cctTags}</div>
      <h4>Design Thinking</h4>
      <p>${ws.designThinking}</p>
    </div>
  `;
  document.getElementById('detailOverlay').classList.add('active');
}

function closeDetail() {
  document.getElementById('detailOverlay').classList.remove('active');
}

function openDemoPage(demoId, breadcrumb) {
  const demos = {
    'western-front': 'western-front-v2.html',
    'pyramid-maths': 'pyramid-maths.html',
    'globe-theatre': 'globe-theatre.html',
    'human-cell': 'human-cell.html',
  };
  if (demos[demoId]) {
    window.open(demos[demoId], '_blank');
  }
}

function closeDemoPage() {
  document.getElementById('demoIframe').src = '';
  document.getElementById('demoPage').classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Build diagram
  buildDiagram();
  
  // Intro enter button
  document.getElementById('enterBtn').addEventListener('click', () => {
    document.getElementById('introScreen').classList.add('hidden');
    document.getElementById('app').classList.add('visible');
    setTimeout(() => { document.getElementById('introScreen').style.display = 'none'; }, 1500);
  });
  
  // Detail overlay backdrop click to close
  document.getElementById('detailOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('detailOverlay')) closeDetail();
  });
  
  // Escape key closes panels
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeDetail(); closeDemoPage(); }
  });
});