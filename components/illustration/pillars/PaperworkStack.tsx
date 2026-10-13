import { C, IsoBox, SceneFrame } from "../kit";
import { makeScene } from "./shared";

/**
 * Three QC documents laid out on the iso plane: mill certificate, WPS, test
 * report. Replaces the dark "delivered with the paperwork" band.
 */
const sc = makeScene(96, 34, 26, 14);
const { box, topM } = sc;
const DOCS = ["MILL CERT", "WPS", "TEST REPORT"];

export function PaperworkStack() {
  return (
    <SceneFrame viewBox="0 0 380 230" ground label="Mill certificate, WPS and test report delivered with every fabrication job">
      {DOCS.map((title, i) => {
        const x0 = i * 3.1;
        return (
          <g key={title} className={i === 1 ? "ill-float-2" : undefined}>
            <IsoBox faces={box(x0, 0, x0 + 2.7, 3.4, 0, 0.12)} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
            <g transform={topM(0.12)}>
              <text x={x0 + 0.25} y={0.7} fontSize={0.34} fill={C.accentDeep} fontFamily="ui-monospace, Menlo, monospace" letterSpacing={0.03}>
                {title}
              </text>
              <rect x={x0 + 0.25} y={0.92} width={2.2} height={0.05} fill={C.line} />
              {[0, 1, 2, 3].map((r) => {
                const y = 1.25 + r * 0.42;
                return (
                  <g key={r}>
                    <rect x={x0 + 0.25} y={y} width={[1.1, 0.8, 1.2, 0.9][r]} height={0.14} rx={0.07} fill={C.lineStrong} />
                    <rect x={x0 + 1.5} y={y} width={[0.5, 0.6, 0.4, 0.55][r]} height={0.14} rx={0.07} fill={C.line} />
                    <path d={`M${x0 + 2.15} ${y + 0.08}l0.1 0.1 0.22 -0.24`} stroke={C.accent} strokeWidth={0.06} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                );
              })}
              <path d={`M${x0 + 0.3} 3.05c0.2-0.35 0.3 0.2 0.5-0.1s0.2-0.15 0.35-0.05`} stroke={C.ink2} strokeWidth={0.05} fill="none" strokeLinecap="round" />
              <circle cx={x0 + 2.0} cy={2.95} r={0.3} fill="none" stroke={C.accent} strokeWidth={0.06} />
              <path d={`M${x0 + 1.88} ${2.95}l0.09 0.09 0.17 -0.19`} stroke={C.accent} strokeWidth={0.06} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        );
      })}
    </SceneFrame>
  );
}
