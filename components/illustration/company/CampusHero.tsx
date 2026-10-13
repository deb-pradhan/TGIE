import { C, IsoBox, makeIso } from "../kit";
import { Icon } from "@/components/icons/Icon";
import { Person, Stage, Tag, at, pl, qF, qR, qT } from "./bits";

const W = 540;
const H = 510;
const P = makeIso(270, 208, 20, 13);
const { proj } = P;
/** small "Chennai" map plate above the plot, zoomed into the campus below */
const Q = makeIso(270, 36, 13, 8);

/** Isometric "TGIE campus": prototyping lab + fabrication shed on one plot. */
export function CampusHero() {
  const lab = P.box(1, 6, 4.5, 10.5, 0, 4.2);
  const shed = P.box(7, 1, 11.5, 5.5, 0, 3.0);
  const teeth = [0, 1, 2, 3].map((i) => ({ xa: 7 + i * 1.125, xb: 8.125 + i * 1.125 }));
  const pin = proj(6.2, 6.7, 0);
  const sparks = [
    [10.6, 6.2, 0.5],
    [10.9, 6.0, 1.1],
    [10.4, 6.5, 1.5],
    [11.1, 6.4, 0.8],
    [10.75, 5.8, 1.9],
  ] as const;

  return (
    <Stage
      w={W}
      h={H}
      hero
      label="Isometric TGIE campus in Thirumudivakkam, Chennai: a prototyping lab and an ISO 9001 fabrication shed joined by a path, with engineers walking between them."
      overlay={
        <>
          <Tag style={at(W, H, 270, 14)} className="!text-accent-deep">Chennai</Tag>
          <Tag style={at(W, H, 140, 212)}>Prototyping lab</Tag>
          <Tag style={at(W, H, 430, 214)}>Fabrication</Tag>
          <span
            style={at(W, H, 270, 490)}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-card py-1.5 pl-2 pr-3.5 text-[11.5px] font-medium text-ink shadow-[0_1px_0_var(--color-line)] sm:text-[12.5px]"
          >
            <span className="mr-1.5 inline-grid h-5 w-5 place-items-center rounded-full bg-accent-pale align-middle text-accent">
              <Icon name="pin" size={13} />
            </span>
            <span className="align-middle">Thirumudivakkam, Chennai</span>
          </span>
        </>
      }
    >
      {/* map plate: Chennai -> campus zoom */}
      <g fill="none" stroke={C.accent} strokeOpacity=".55" strokeWidth="1.2" strokeDasharray="4 5" className="ill-dash">
        <path d={P.seg(Q.proj(0, 9, 0), proj(0, 12, 0))} />
        <path d={P.seg(Q.proj(9, 0, 0), proj(12, 0, 0))} />
      </g>
      <IsoBox faces={Q.box(0, 0, 9, 9, -0.6, 0)} top={C.accentPale} stroke={C.lineStrong} />
      <g fill={C.faceTop} stroke="none">
        <path d={qT(Q, 0, 3.6, 9, 4.4, 0)} />
        <path d={qT(Q, 5, 0, 5.8, 9, 0)} />
        <path d={qT(Q, 0, 7, 5, 7.6, 0)} />
      </g>
      {[
        [0.6, 0.6, 2.2, 2.6],
        [1.0, 4.9, 3.0, 6.4],
        [6.4, 0.7, 8.3, 2.7],
        [6.3, 5.0, 8.4, 6.9],
        [6.5, 7.8, 8.2, 8.7],
      ].map(([x0, y0, x1, y1], i) => (
        <IsoBox key={i} faces={Q.box(x0, y0, x1, y1, 0, 0.7)} top={C.faceTop} right={C.faceDark} front={C.faceR} stroke={C.line} />
      ))}
      <g fill={C.accentSoft} stroke={C.accent} strokeWidth=".8">
        {[[3.6, 1.6], [3.6, 6.3], [2.2, 3.2]].map(([x, y], i) => {
          const [tx, ty] = Q.proj(x, y, 0.4);
          return <circle key={i} cx={tx} cy={ty} r="3.2" />;
        })}
      </g>
      {(() => {
        const [px, py] = Q.proj(5.4, 4, 0);
        return (
          <g>
            <ellipse className="ill-pulse" cx={px} cy={py} rx="11" ry="5.5" fill="none" stroke={C.accent} strokeWidth="1.3" />
            <g className="ill-float" transform={`translate(${px} ${py - 2})`}>
              <path d="M0 0 C-6 -8 -7 -12 -7 -15 a7 7 0 0 1 14 0 C7 -12 6 -8 0 0 Z" fill={C.accent} />
              <circle cx="0" cy="-15" r="2.6" fill={C.faceTop} />
            </g>
          </g>
        );
      })()}

      {/* ground plot */}
      <IsoBox faces={P.box(0, 0, 12, 12, -0.7, 0)} top={C.soft} stroke={C.lineStrong} />
      <g stroke={C.line} strokeWidth="1" fill="none">
        {[2, 4, 6, 8, 10].map((i) => (
          <g key={i}>
            <path d={P.seg(proj(i, 0, 0), proj(i, 12, 0))} />
            <path d={P.seg(proj(0, i, 0), proj(12, i, 0))} />
          </g>
        ))}
      </g>

      {/* paved path lab -> fab */}
      <path d={qT(P, 4.5, 7.8, 9.65, 8.6, 0)} fill={C.paper2} stroke={C.line} />
      <path d={qT(P, 8.85, 5.5, 9.65, 7.8, 0)} fill={C.paper2} stroke={C.line} />
      <path
        className="ill-dash"
        d={pl(P, [[4.55, 8.2, 0], [9.25, 8.2, 0], [9.25, 5.55, 0]])}
        fill="none"
        stroke={C.accent}
        strokeWidth="2"
        strokeDasharray="5 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* steel stock outside the shed */}
      <IsoBox faces={P.box(10.2, 6.5, 11.6, 7.6, 0, 0.4)} top={C.faceTop} right={C.faceDark} front={C.faceR} />
      <IsoBox faces={P.box(10.35, 6.65, 11.45, 7.45, 0.4, 0.8)} top={C.faceTop} right={C.faceDark} front={C.faceR} />

      {/* ---- prototyping lab ---- */}
      <IsoBox faces={lab} />
      <path d={pl(P, [[1, 10.5, 2.1], [4.5, 10.5, 2.1], [4.5, 6, 2.1]])} fill="none" stroke={C.lineStrong} strokeWidth="1" />
      <path d={qT(P, 1.25, 6.25, 4.25, 10.25, 4.2)} fill={C.accentPale} stroke={C.line} />
      {/* windows */}
      <g fill={C.accentPale} stroke={C.accent} strokeOpacity=".6" strokeWidth=".9">
        <path d={qF(P, 1.3, 2.4, 2.6, 3.6, 10.5)} />
        <path d={qF(P, 2.7, 3.8, 2.6, 3.6, 10.5)} fill={C.accentSoft} fillOpacity=".55" />
        <path d={qF(P, 1.3, 2.4, 0.6, 1.6, 10.5)} />
        <path d={qF(P, 2.7, 3.8, 0.6, 1.6, 10.5)} />
        <path d={qR(P, 6.5, 7.6, 2.6, 3.6, 4.5)} />
        <path d={qR(P, 7.9, 9.0, 2.6, 3.6, 4.5)} fill={C.accentSoft} fillOpacity=".55" />
        <path d={qR(P, 9.3, 10.2, 2.6, 3.6, 4.5)} />
        <path d={qR(P, 6.5, 7.4, 0.6, 1.6, 4.5)} />
        <path d={qR(P, 9.0, 10.2, 0.6, 1.6, 4.5)} />
      </g>
      <path d={qR(P, 7.7, 8.7, 0, 2.0, 4.5)} fill={C.accent} />
      <path d={qR(P, 7.7, 8.7, 0, 2.0, 4.5)} fill="none" stroke={C.accentDeep} strokeWidth="1" />
      {/* rooftop: HVAC, chip plaque, antenna */}
      <IsoBox faces={P.box(1.7, 7.2, 2.7, 8.4, 4.2, 4.9)} top={C.faceTop} />
      <path d={pl(P, [[2.0, 7.35, 4.95], [2.4, 7.35, 4.95]])} stroke={C.lineStrong} strokeWidth="1" />
      <IsoBox faces={P.box(2.9, 8.8, 4.0, 9.9, 4.2, 4.4)} top={C.accent} right={C.accentDeep} front={C.accentDeep} stroke={C.accentDeep} />
      <g stroke={C.accentPale} strokeWidth="1" fill="none">
        <path d={pl(P, [[3.1, 9.35, 4.4], [3.8, 9.35, 4.4]])} />
        <path d={pl(P, [[3.45, 9.0, 4.4], [3.45, 9.7, 4.4]])} />
      </g>
      <path d={pl(P, [[3.6, 7.4, 4.2], [3.6, 7.4, 6.4]])} stroke={C.ink2} strokeWidth="1.5" strokeLinecap="round" />
      {(() => {
        const [mx, my] = proj(3.6, 7.4, 6.4);
        return (
          <g>
            <circle className="ill-blink" cx={mx} cy={my} r="2.8" fill={C.accent} />
            <g className="ill-pulse" fill="none" stroke={C.accent} strokeWidth="1.4" strokeLinecap="round">
              <path d={`M${mx + 6} ${my - 5} a8 8 0 0 1 0 10`} />
              <path d={`M${mx + 10} ${my - 9} a13 13 0 0 1 0 18`} />
            </g>
          </g>
        );
      })()}

      {/* ---- fabrication shed ---- */}
      <IsoBox faces={shed} right={C.faceR} front={C.faceL} />
      <g stroke={C.lineStrong} strokeWidth=".8">
        {[1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((y) => (
          <path key={y} d={P.seg(proj(11.5, y, 0.2), proj(11.5, y, 2.9))} />
        ))}
      </g>
      {/* big bay door with a press brake inside */}
      <path d={qF(P, 8.2, 10.3, 0, 2.4, 5.5)} fill={C.graphite} stroke={C.lineStrong} strokeWidth="1.2" />
      <g fill="none" stroke={C.accentSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={pl(P, [[8.55, 5.5, 0.55], [9.95, 5.5, 0.55]])} />
        <path d={pl(P, [[8.55, 5.5, 1.7], [9.95, 5.5, 1.7]])} />
        <path d={pl(P, [[8.55, 5.5, 0.3], [8.55, 5.5, 2.0]])} />
        <path d={pl(P, [[9.95, 5.5, 0.3], [9.95, 5.5, 2.0]])} />
        <path d={pl(P, [[9.1, 5.5, 1.7], [9.25, 5.5, 1.1], [9.4, 5.5, 1.7]])} strokeWidth="1.4" />
      </g>
      <path d={qF(P, 10.7, 11.3, 1.4, 2.2, 5.5)} fill={C.accentPale} stroke={C.accent} strokeOpacity=".6" strokeWidth=".9" />
      <path d={qF(P, 7.4, 8.0, 1.4, 2.2, 5.5)} fill={C.accentPale} stroke={C.accent} strokeOpacity=".6" strokeWidth=".9" />

      {/* extraction stack + steam */}
      <IsoBox faces={P.box(7.3, 1.35, 7.9, 1.95, 3.0, 5.3)} top={C.faceTop} right={C.faceDark} front={C.faceR} />
      <g className="ill-float" fill={C.faceTop} stroke={C.line}>
        <circle cx={proj(7.6, 1.65, 5.3)[0] + 3} cy={proj(7.6, 1.65, 5.3)[1] - 7} r="5" />
        <circle cx={proj(7.6, 1.65, 5.3)[0] + 10} cy={proj(7.6, 1.65, 5.3)[1] - 15} r="3.5" />
      </g>

      {/* press brake roof-lights (sawtooth) */}
      {teeth.map(({ xa, xb }) => (
        <g key={xa}>
          <path d={P.poly([proj(xa, 5.5, 3), proj(xb, 5.5, 3), proj(xb, 5.5, 4.2)])} fill={C.faceL} stroke={C.line} />
          <path
            d={P.poly([proj(xa, 1, 3), proj(xb, 1, 4.2), proj(xb, 5.5, 4.2), proj(xa, 5.5, 3)])}
            fill={C.faceTop}
            stroke={C.line}
            strokeLinejoin="round"
          />
          <path d={qR(P, 1, 5.5, 3.0, 4.2, xb)} fill={C.accentPale} stroke={C.accent} strokeOpacity=".7" strokeWidth=".9" />
          <path
            d={[2.125, 3.25, 4.375].map((y) => P.seg(proj(xb, y, 3), proj(xb, y, 4.2))).join(" ")}
            stroke={C.accent}
            strokeOpacity=".6"
            strokeWidth=".8"
          />
        </g>
      ))}

      {/* weld sparks (dither dots) */}
      <g>
        {sparks.map(([x, y, z], i) => {
          const [sx, sy] = proj(x, y, z);
          return (
            <rect
              key={i}
              className={i % 2 ? "ill-pulse" : "ill-blink"}
              x={sx}
              y={sy}
              width="3.2"
              height="3.2"
              fill={i % 2 ? C.accent : C.accentSoft}
            />
          );
        })}
      </g>

      {/* location pin on the plot */}
      <ellipse className="ill-pulse" cx={pin[0]} cy={pin[1]} rx="16" ry="8" fill="none" stroke={C.accent} strokeWidth="1.5" />
      <g className="ill-float-2" transform={`translate(${pin[0]} ${pin[1] - 4})`}>
        <path d="M0 0 C-9 -12 -11 -18 -11 -23 a11 11 0 0 1 22 0 C11 -18 9 -12 0 0 Z" fill={C.accent} />
        <circle cx="0" cy="-23" r="4.2" fill={C.faceTop} />
      </g>

      {/* engineers */}
      <Person x={proj(5.1, 9.3, 0)[0]} y={proj(5.1, 9.3, 0)[1]} s={0.85} body={C.graphite} />
      <Person x={proj(5.55, 8.0, 0)[0]} y={proj(5.55, 8.0, 0)[1]} s={0.85} body={C.accent} />
      <Person className="ill-float-2" x={proj(7.7, 8.2, 0)[0]} y={proj(7.7, 8.2, 0)[1]} s={0.85} body={C.ink2} />
      <Person x={proj(9.9, 6.6, 0)[0]} y={proj(9.9, 6.6, 0)[1]} s={0.85} body={C.accent} hat />
      <Person x={proj(8.7, 6.4, 0)[0]} y={proj(8.7, 6.4, 0)[1]} s={0.85} body={C.graphite} hat />
    </Stage>
  );
}
