export default function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="grid gap-7 border-t hairline pt-6 md:grid-cols-[.7fr_1.3fr] md:pt-8">
      <p className="eyebrow pt-2 opacity-60">{eyebrow}</p>
      <div>
        <h2 className="display-lg">{title}</h2>
        {text && <p className="body-lg mt-7 max-w-2xl opacity-70">{text}</p>}
      </div>
    </div>
  );
}
