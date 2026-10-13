import { DashboardMock } from "@/components/dataviz/Charts";
import { Live } from "../Live";

/** Full-stack data viz — dataviz register: a mini live dashboard on a soft card. */
export function CapDataviz() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-card-soft">
      <Live>
        <DashboardMock />
      </Live>
    </div>
  );
}
