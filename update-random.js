const fs = require('fs');

const data = fs.readFileSync('src/app/page.tsx', 'utf8');

// The original file used Math.random() in GSAP and mapping arrays.
// Because it was giving a React Hydration Mismatch, we need to generate predetermined seeded data for the render.
let newStr = data.replace(
  /Array\.from\(\{ length: 40 \}\)\.map\(\(_, i\) => \([\s\S]*?fill=\{Math\.random\(\) > 0\.8 \? "#FDFBF7" : "none"\}\s*\/\>\s*\)\)/g, 
  `Array.from({ length: 40 }).map((_, i) => {
    // deterministic pseudo-random based on index
    const r1 = (i * 13) % 100 / 100;
    const r2 = (i * 17) % 100 / 100;
    const r3 = (i * 23) % 100 / 100;
    const r4 = (i * 29) % 100 / 100;
    const r5 = (i * 31) % 100 / 100;
    return (
      <rect 
        key={i} 
        x={200 + (r1 - 0.5) * 150} 
        y={200 + (r2 - 0.5) * 150} 
        width={40 + r3 * 60} 
        height={50 + r4 * 70} 
        transform={\`rotate(\${r5 * 360} 250 250)\`}
        fill={r1 > 0.8 ? "#FDFBF7" : "none"}
      />
    )
  })`
);

newStr = newStr.replace(
  /Array\.from\(\{ length: 25 \}\)\.map\(\(_, i\) => \([\s\S]*?fill=\{Math\.random\(\) > 0\.8 \? "#9B2226" : "none"\}\s*\/\>\s*\)\)/g, 
  `Array.from({ length: 25 }).map((_, i) => {
    const r1 = (i * 37) % 100 / 100;
    const r2 = (i * 41) % 100 / 100;
    const r3 = (i * 43) % 100 / 100;
    const r4 = (i * 47) % 100 / 100;
    const r5 = (i * 53) % 100 / 100;
    const r6 = (i * 59) % 100 / 100;
    return (
      <polygon 
        key={\`poly-\${i}\`}
        points={\`\${250 + r1*80},\${200 + r2*80} \${280 + r3*60},\${260 + r4*60} \${220 + r5*60},\${250 + r6*60}\`}
        stroke="#9B2226"
        fill={r1 > 0.8 ? "#9B2226" : "none"}
      />
    )
  })`
);

// We still want random in GSAP since GSAP runs strictly on Client when component mounts
newStr = newStr.replace(
  /y: \(\) => 300 \+ 0\.3 \* 200/g,
  `y: () => 300 + Math.random() * 200`
).replace(
  /x: \(\) => \(0\.3 - 0\.3\) \* 400/g, // Reverting previous rough sed replacement
  `x: () => (Math.random() - 0.5) * 400`
).replace(
  /x: \(\) => \(0\.3 - 0\.5\) \* 400/g,
  `x: () => (Math.random() - 0.5) * 400`
).replace(
  /rotation: \(\) => \(0\.3 - 0\.5\) \* 720/g,
  `rotation: () => (Math.random() - 0.5) * 720`
).replace(
  /rotation: \(\) => \(0\.3 - 0\.5\) \* 360/g,
  `rotation: () => (Math.random() - 0.5) * 360`
).replace(
  /x: \(\) => \(0\.3 - 0\.5\) \* 100/g,
  `x: () => (Math.random() - 0.5) * 100`
).replace(
  /y: \(\) => \(0\.3 - 0\.5\) \* 100/g,
  `y: () => (Math.random() - 0.5) * 100`
);

fs.writeFileSync('src/app/page.tsx', newStr);
