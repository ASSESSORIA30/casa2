import type { PlanRoom } from '@/data/types';

function Furniture({ room }: { room: PlanRoom }) {
  const x = room.x * 10, y = room.y * 6, w = room.w * 10, h = room.h * 6;
  const c = '#67675f';
  const light = '#d9d4ca';
  const stroke = '#696b65';
  const cx = x + w / 2, cy = y + h / 2;
  if (room.type === 'bedroom' || room.type === 'suite') {
    const bw = Math.min(w * .58, 170), bh = Math.min(h * .52, 115);
    return <g opacity=".85"><rect x={cx-bw/2} y={cy-bh/2} width={bw} height={bh} rx="3" fill={light} stroke={stroke}/><rect x={cx-bw*.38} y={cy-bh*.38} width={bw*.76} height={bh*.25} rx="2" fill="#f1eee8" stroke={stroke}/><line x1={cx} y1={cy-bh/2} x2={cx} y2={cy+bh/2} stroke={stroke} strokeWidth="1"/></g>;
  }
  if (room.type === 'living') {
    return <g opacity=".82"><rect x={x+w*.1} y={y+h*.18} width={w*.45} height={Math.max(28,h*.18)} rx="8" fill={light} stroke={stroke}/><rect x={x+w*.18} y={y+h*.55} width={w*.34} height={Math.max(22,h*.13)} rx="10" fill="#b7ad9f" stroke={stroke}/><circle cx={x+w*.74} cy={y+h*.55} r={Math.min(26,w*.06)} fill="none" stroke={stroke}/><circle cx={x+w*.81} cy={y+h*.55} r={Math.min(26,w*.06)} fill="none" stroke={stroke}/><rect x={x+w*.69} y={y+h*.44} width={w*.18} height={h*.22} fill="none" stroke={stroke}/></g>;
  }
  if (room.type === 'kitchen') {
    return <g opacity=".82"><rect x={x+w*.08} y={y+h*.1} width={w*.84} height={Math.max(18,h*.16)} fill={light} stroke={stroke}/><rect x={x+w*.25} y={y+h*.48} width={w*.5} height={Math.max(24,h*.22)} fill="#c7bba9" stroke={stroke}/><circle cx={x+w*.36} cy={y+h*.59} r="6" fill="none" stroke={stroke}/><circle cx={x+w*.64} cy={y+h*.59} r="6" fill="none" stroke={stroke}/></g>;
  }
  if (room.type === 'bath') {
    return <g opacity=".82"><rect x={x+w*.1} y={y+h*.12} width={w*.35} height={h*.32} fill="none" stroke={stroke}/><ellipse cx={x+w*.72} cy={y+h*.28} rx={Math.max(9,w*.08)} ry={Math.max(13,h*.11)} fill="none" stroke={stroke}/><rect x={x+w*.14} y={y+h*.64} width={w*.7} height={Math.max(10,h*.12)} fill={light} stroke={stroke}/></g>;
  }
  if (room.type === 'closet') {
    return <g opacity=".8"><rect x={x+w*.09} y={y+h*.1} width={w*.28} height={h*.8} fill={light} stroke={stroke}/><rect x={x+w*.63} y={y+h*.1} width={w*.28} height={h*.8} fill={light} stroke={stroke}/>{[.2,.35,.5,.65,.8].map((p)=><line key={p} x1={x+w*.63} x2={x+w*.91} y1={y+h*p} y2={y+h*p} stroke={stroke}/>)}</g>;
  }
  if (room.type === 'office') {
    return <g opacity=".82"><rect x={x+w*.18} y={y+h*.2} width={w*.64} height={Math.max(20,h*.16)} fill={light} stroke={stroke}/><circle cx={cx} cy={y+h*.58} r={Math.min(18,w*.08)} fill="none" stroke={stroke}/></g>;
  }
  if (room.type === 'gym') {
    return <g opacity=".8"><circle cx={x+w*.28} cy={cy} r={Math.min(18,w*.08)} fill="none" stroke={stroke}/><circle cx={x+w*.72} cy={cy} r={Math.min(18,w*.08)} fill="none" stroke={stroke}/><rect x={cx-w*.12} y={cy-h*.08} width={w*.24} height={h*.16} fill="none" stroke={stroke}/></g>;
  }
  if (room.type === 'laundry' || room.type === 'technical' || room.type === 'pantry') {
    return <g opacity=".8"><rect x={x+w*.15} y={y+h*.2} width={w*.7} height={h*.6} fill={light} stroke={stroke}/><circle cx={x+w*.38} cy={cy} r={Math.min(15,w*.1)} fill="none" stroke={stroke}/><circle cx={x+w*.64} cy={cy} r={Math.min(15,w*.1)} fill="none" stroke={stroke}/></g>;
  }
  return <g opacity=".45"><circle cx={cx} cy={cy} r="3" fill={c}/></g>;
}

function Window({ room }: { room: PlanRoom }) {
  if (!room.window || room.window === 'none') return null;
  const x = room.x * 10, y = room.y * 6, w = room.w * 10, h = room.h * 6;
  const len = room.window === 'top' || room.window === 'bottom' ? Math.min(90, w*.52) : Math.min(70, h*.52);
  const stroke = '#b2a183';
  if (room.window === 'top') return <line x1={x+w/2-len/2} x2={x+w/2+len/2} y1={y} y2={y} stroke={stroke} strokeWidth="7"/>;
  if (room.window === 'bottom') return <line x1={x+w/2-len/2} x2={x+w/2+len/2} y1={y+h} y2={y+h} stroke={stroke} strokeWidth="7"/>;
  if (room.window === 'left') return <line x1={x} x2={x} y1={y+h/2-len/2} y2={y+h/2+len/2} stroke={stroke} strokeWidth="7"/>;
  return <line x1={x+w} x2={x+w} y1={y+h/2-len/2} y2={y+h/2+len/2} stroke={stroke} strokeWidth="7"/>;
}

function Door({ room }: { room: PlanRoom }) {
  if (!room.door || room.door === 'none') return null;
  const x = room.x * 10, y = room.y * 6, w = room.w * 10, h = room.h * 6;
  const r = 26;
  const stroke='#8e8d85';
  if (room.door === 'bottom') return <g><line x1={x+w*.18} x2={x+w*.18+r} y1={y+h} y2={y+h-r} stroke={stroke} strokeWidth="2"/><path d={`M ${x+w*.18+r} ${y+h} A ${r} ${r} 0 0 0 ${x+w*.18} ${y+h-r}`} fill="none" stroke={stroke}/></g>;
  if (room.door === 'top') return <g><line x1={x+w*.18} x2={x+w*.18+r} y1={y} y2={y+r} stroke={stroke} strokeWidth="2"/><path d={`M ${x+w*.18+r} ${y} A ${r} ${r} 0 0 1 ${x+w*.18} ${y+r}`} fill="none" stroke={stroke}/></g>;
  if (room.door === 'left') return <g><line x1={x} x2={x+r} y1={y+h*.22} y2={y+h*.22-r} stroke={stroke} strokeWidth="2"/><path d={`M ${x} ${y+h*.22-r} A ${r} ${r} 0 0 0 ${x+r} ${y+h*.22}`} fill="none" stroke={stroke}/></g>;
  return <g><line x1={x+w} x2={x+w-r} y1={y+h*.22} y2={y+h*.22-r} stroke={stroke} strokeWidth="2"/><path d={`M ${x+w} ${y+h*.22-r} A ${r} ${r} 0 0 1 ${x+w-r} ${y+h*.22}`} fill="none" stroke={stroke}/></g>;
}

export default function PlanView({ plan, furnished = true }: { plan: { widthM: number; depthM: number; rooms: PlanRoom[] }; furnished?: boolean }) {
  return (
    <div className="overflow-hidden bg-[#e2e4df] p-3 md:p-6">
      <svg viewBox="-65 -60 1130 720" className="h-auto w-full" role="img" aria-label={furnished ? 'Plano amueblado conceptual' : 'Plano arquitectónico conceptual'}>
        <rect x="0" y="0" width="1000" height="600" fill="#fbf8f2" stroke="#333530" strokeWidth="6"/>
        {plan.rooms.map((room, i) => {
          const x=room.x*10, y=room.y*6, w=room.w*10, h=room.h*6;
          return <g key={`${room.name}-${i}`}>
            <rect x={x} y={y} width={w} height={h} fill="#fbf8f2" stroke="#343630" strokeWidth="3"/>
            {furnished && <Furniture room={room}/>}<Window room={room}/><Door room={room}/>
            <text x={x+8} y={y+17} fontFamily="Arial, sans-serif" fontSize="10" fill="#30322e" fontWeight="600">{room.name.toUpperCase()}</text>
            <text x={x+8} y={y+31} fontFamily="Arial, sans-serif" fontSize="9" fill="#6f7069">{room.area.toFixed(1).replace('.', ',')} m²</text>
          </g>;
        })}
        <line x1="0" x2="1000" y1="-28" y2="-28" stroke="#8b8c85" strokeWidth="1"/><line x1="0" x2="0" y1="-38" y2="-18" stroke="#8b8c85"/><line x1="1000" x2="1000" y1="-38" y2="-18" stroke="#8b8c85"/>
        <text x="500" y="-36" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fill="#555750">{plan.widthM.toFixed(1).replace('.', ',')} m aprox.</text>
        <line x1="-28" x2="-28" y1="0" y2="600" stroke="#8b8c85" strokeWidth="1"/><line x1="-38" x2="-18" y1="0" y2="0" stroke="#8b8c85"/><line x1="-38" x2="-18" y1="600" y2="600" stroke="#8b8c85"/>
        <text x="-42" y="300" transform="rotate(-90 -42 300)" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fill="#555750">{plan.depthM.toFixed(1).replace('.', ',')} m aprox.</text>
        <g transform="translate(940 540)"><path d="M0 35 L20 0 L40 35 Z" fill="#2c2e2a"/><text x="20" y="52" textAnchor="middle" fontFamily="Arial" fontSize="11">N</text></g>
      </svg>
    </div>
  );
}
