import Image from "next/image";
import type { ImageKind } from "@/lib/images";

export interface SceneProps {
  kind: ImageKind | "site";
  /** 0..1 según superficie */
  scale?: number;
  pool?: boolean;
  garage?: boolean;
  seed?: number;
}

function Trees({ y, seed = 1 }: { y: number; seed?: number }) {
  const xs = [90, 260, 1330, 1480, 1560, 40];
  return (
    <g>
      {xs.map((x, i) => (
        <g key={i}>
          {(i + seed) % 2 === 0 ? (
            <ellipse cx={x} cy={y - 120 - ((i * 37) % 40)} rx={26} ry={130 + ((i * 29) % 50)} fill="#5B6754" opacity={0.95} />
          ) : (
            <g>
              <rect x={x - 5} y={y - 90} width={10} height={90} fill="#6B5B48" />
              <circle cx={x} cy={y - 110} r={62} fill="#7A8869" /><circle cx={x + 30} cy={y - 90} r={44} fill="#8A9778" />
            </g>
          )}
        </g>
      ))}
    </g>
  );
}

function Exterior({ kind, scale = 0.6, pool, garage, seed = 1 }: SceneProps) {
  const base = kind === "pool" ? 560 : 640;
  const w = (kind === "pool" ? 560 : 640) + 620 * scale;
  const x0 = 800 - w / 2 + (garage ? -40 : 0);
  const roofY = base - (kind === "pool" ? 170 : 215);
  const glassW = w * (kind === "exterior-garden" ? 0.62 : 0.5);
  const gx = x0 + w * 0.2;
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={`sky${seed}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E4DACA" /><stop offset="1" stopColor="#F8F1E5" /></linearGradient>
        <linearGradient id={`gl${seed}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2B2F31" /><stop offset="1" stopColor="#4A4136" /></linearGradient>
        <linearGradient id={`wa${seed}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A9C0BC" /><stop offset="1" stopColor="#7E9F9D" /></linearGradient>
        <linearGradient id={`gr${seed}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#CDBFA5" /><stop offset="1" stopColor="#B4A78D" /></linearGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#sky${seed})`} />
      <path d="M0 470 Q 300 380 620 450 T 1200 420 T 1600 460 L1600 700 L0 700Z" fill="#D7CDBA" />
      <path d="M0 520 Q 400 470 800 520 T 1600 500 L1600 700 L0 700Z" fill="#C6BBA4" />
      <rect y={base} width="1600" height={900 - base} fill={`url(#gr${seed})`} />
      <Trees y={base + 10} seed={seed} />
      {/* volumen principal */}
      <rect x={x0} y={roofY + 22} width={w} height={base - roofY - 22} fill="#BBB4A8" />
      <rect x={x0 - 30} y={roofY} width={w + 60} height={22} fill="#37332F" />
      <rect x={x0 - 30} y={roofY + 22} width={w + 60} height={9} fill="#B08A5E" />
      <rect x={x0} y={roofY + 31} width={w * 0.17} height={base - roofY - 31} fill="#A2988A" />
      <rect x={gx} y={roofY + 46} width={glassW} height={base - roofY - 60} fill={`url(#gl${seed})`} />
      {Array.from({ length: Math.round(glassW / 150) }).map((_, i) => (
        <rect key={i} x={gx + (i + 1) * (glassW / (Math.round(glassW / 150) + 1)) - 3} y={roofY + 46} width={6} height={base - roofY - 60} fill="#1E1C1A" />
      ))}
      <rect x={gx + 20} y={base - 55} width={glassW - 40} height={35} fill="#E7B980" opacity={0.28} />
      {/* volumen secundario / porche */}
      <rect x={x0 + w - 5} y={roofY + 60} width={w * 0.34} height={22} fill="#37332F" />
      <rect x={x0 + w - 5} y={roofY + 82} width={w * 0.34} height={8} fill="#B08A5E" />
      {[0.04, 0.32].map((p, i) => (<rect key={i} x={x0 + w + w * p} y={roofY + 90} width={10} height={base - roofY - 90} fill="#8C857A" />))}
      <rect x={x0 + w - 5} y={base - 12} width={w * 0.34} height={12} fill="#D8CEBC" />
      {garage && (<g><rect x={x0 - 320} y={roofY + 70} width={300} height={18} fill="#37332F" /><rect x={x0 - 300} y={roofY + 88} width={260} height={base - roofY - 88} fill="#C7BFB0" /><rect x={x0 - 280} y={roofY + 130} width={220} height={base - roofY - 130} fill="#8B6F4E" opacity={0.85} /></g>)}
      {/* terraza */}
      <rect x={x0 - 60} y={base} width={w + 120} height={26} fill="#D9D0BF" />
      {(pool || kind === "pool") && (
        kind === "pool" ? (<g><polygon points="180,720 1420,720 1520,900 80,900" fill={`url(#wa${seed})`} /><rect x={x0} y={base + 26} width={w} height={70} fill="#7E9F9D" opacity={0.35} /></g>)
          : (<polygon points={`${x0 + 60},${base + 60} ${x0 + w - 60},${base + 60} ${x0 + w},${base + 140} ${x0},${base + 140}`} fill={`url(#wa${seed})`} />)
      )}
      {kind === "exterior-garden" && (<g><rect x={x0 + 120} y={base - 34} width={150} height={34} rx={4} fill="#E9E1D2" /><rect x={x0 + 300} y={base - 34} width={40} height={34} fill="#E9E1D2" /></g>)}
    </svg>
  );
}

function Interior({ kind, seed = 1 }: SceneProps) {
  const floorY = 600;
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={`w${seed}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#E7DFD0" /><stop offset="1" stopColor="#F1EADD" /></linearGradient>
        <linearGradient id={`o${seed}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#CBD6C6" /><stop offset="1" stopColor="#E9E2D0" /></linearGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#w${seed})`} />
      <rect y={floorY} width="1600" height={900 - floorY} fill="#D3C8B3" />
      <rect y={floorY} width="1600" height="6" fill="#B9AD96" />
      <rect x={900} y={110} width={600} height={floorY - 110} fill={`url(#o${seed})`} />
      <rect x={1195} y={110} width={10} height={floorY - 110} fill="#26292B" /><rect x={900} y={110} width={600} height={8} fill="#26292B" />
      <path d="M900 560 Q 1100 430 1500 520 L1500 600 L900 600Z" fill="#9AAA8E" opacity={0.7} />
      <rect x={1500} y={90} width={40} height={floorY - 90} fill="#E4DCCB" opacity={0.7} />
      {kind === "living" && (<g>
        <rect x={140} y={430} width={620} height={170} rx={30} fill="#CBBBA0" /><rect x={140} y={380} width={620} height={90} rx={30} fill="#D8CAB0" />
        <rect x={390} y={640} width={260} height={70} rx={10} fill="#8C6D4C" /><ellipse cx={520} cy={780} rx={420} ry={60} fill="#E6DECD" />
        <rect x={60} y={150} width={14} height={450} fill="#2B2926" /><path d="M67 150 Q 200 90 280 160" stroke="#2B2926" strokeWidth={8} fill="none" />
        <rect x={780} y={330} width={100} height={270} fill="#A98B66" opacity={0.85} />
      </g>)}
      {kind === "kitchen" && (<g>
        <rect x={80} y={130} width={720} height={470} fill="#B9976D" /><rect x={80} y={130} width={720} height={12} fill="#2B2926" />
        {[0, 1, 2, 3].map((i) => <rect key={i} x={100 + i * 175} y={170} width={160} height={330} fill="#C8A87D" stroke="#A98B66" strokeWidth={3} />)}
        <rect x={80} y={500} width={720} height={100} fill="#8E7452" />
        <rect x={430} y={610} width={720} height={150} fill="#E4DDCE" /><rect x={430} y={760} width={720} height={80} fill="#B9976D" />
        {[560, 780, 1000].map((x) => (<g key={x}><line x1={x} y1={0} x2={x} y2={300} stroke="#2B2926" strokeWidth={3} /><ellipse cx={x} cy={310} rx={50} ry={22} fill="#E9C58E" /></g>))}
      </g>)}
      {kind === "master-bedroom" && (<g>
        <rect x={120} y={140} width={620} height={330} fill="#A98B66" /><rect x={120} y={140} width={620} height={8} fill="#8F7452" />
        <rect x={150} y={430} width={560} height={200} rx={16} fill="#E6DECD" /><rect x={150} y={420} width={560} height={90} rx={16} fill="#D9CFBB" />
        <rect x={190} y={410} width={150} height={60} rx={20} fill="#F2ECDF" /><rect x={520} y={410} width={150} height={60} rx={20} fill="#F2ECDF" />
        <rect x={40} y={470} width={90} height={110} fill="#8C6D4C" /><rect x={730} y={470} width={90} height={110} fill="#8C6D4C" />
        <ellipse cx={430} cy={740} rx={470} ry={70} fill="#E6DECD" />
      </g>)}
      {kind === "master-bath" && (<g>
        <ellipse cx={420} cy={700} rx={290} ry={100} fill="#F1ECE0" /><ellipse cx={420} cy={690} rx={250} ry={72} fill="#DAD3C2" />
        <rect x={80} y={120} width={500} height={130} fill="#B9976D" opacity={0} />
        <circle cx={330} cy={300} r={120} fill="#F4EFE4" stroke="#2B2926" strokeWidth={5} />
        <rect x={80} y={430} width={520} height={80} fill="#B08A5E" /><rect x={80} y={400} width={520} height={30} fill="#D9D0BF" />
        <rect x={640} y={100} width={12} height={500} fill="#2B2926" opacity={0.85} />
      </g>)}
    </svg>
  );
}

export function RenderImage({
  src, alt, className = "", sizes = "100vw", priority = false, label, scene,
}: {
  src?: string | null; alt: string; className?: string; sizes?: string; priority?: boolean; label?: string; scene: SceneProps;
}) {
  return (
    <div className={`relative overflow-hidden bg-stone-100 ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <>
          {scene.kind === "exterior-front" || scene.kind === "exterior-garden" || scene.kind === "pool" || scene.kind === "site"
            ? <Exterior {...scene} kind={scene.kind === "site" ? "exterior-front" : scene.kind} />
            : <Interior {...scene} />}
          <span role="img" aria-label={alt} className="absolute inset-0" />
          <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-charcoal/55 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-ivory/90 backdrop-blur">
            {label ?? "Render provisional"}
          </span>
        </>
      )}
    </div>
  );
}
