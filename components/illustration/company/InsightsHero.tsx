import { C } from "../kit";
import { Stage, Tag, at } from "./bits";
import { CoverShadow, CoverSlab } from "./Covers";

const W = 480;
const H = 560;

/** Three document covers, floating in an isometric zig-zag stack. */
export function InsightsHero() {
  const slabs = [
    { kind: "portfolio", cx: 215, cy: 120, z: 0.5, cls: "ill-float", tag: "Portfolio", tx: 372, ty: 92 },
    { kind: "notes", cx: 285, cy: 290, z: 0.5, cls: "ill-float-2", tag: "Notes", tx: 105, ty: 318 },
    { kind: "model", cx: 205, cy: 458, z: 0.5, cls: "ill-float", tag: "Model", tx: 365, ty: 470 },
  ] as const;
  return (
    <Stage
      w={W}
      h={H}
      hero
      heroClass="h-[400px] sm:h-[480px]"
      label="Three document covers stacked in an isometric arrangement: the capability portfolio PDF, engineering and funding notes, and the engagement model."
      overlay={
        <>
          {slabs.map((s) => (
            <Tag key={s.kind} style={at(W, H, s.tx, s.ty)}>
              {s.tag}
            </Tag>
          ))}
        </>
      }
    >
      {/* flow between the documents */}
      <g fill="none" stroke={C.teal} strokeWidth="1.6" strokeDasharray="5 5" strokeLinecap="round" className="ill-dash">
        <path d="M215 188 C215 215 285 222 285 242" />
        <path d="M285 358 C285 385 205 392 205 412" />
      </g>
      {slabs.map((s) => (
        <g key={s.kind}>
          <CoverShadow cx={s.cx} cy={s.cy} dy={34} />
          <CoverSlab cx={s.cx} cy={s.cy} kind={s.kind} z={s.z} className={s.cls} />
        </g>
      ))}
    </Stage>
  );
}
