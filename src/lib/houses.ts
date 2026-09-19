import { site } from "@/config/site";
import { houseData, HouseData, HousePricing } from "@/data/houses";
import { planConfigs } from "@/data/plan-configs";
import { buildPlan, Plan, PlanSummary } from "@/lib/plan";

/** Datos SEGUROS para frontend: sin costes internos. */
export interface PublicHouse extends Omit<HouseData, "pricing"> {
  title: string;
  shortTitle: string;
  bedrooms: number;
  bathrooms: number;
  summary: PlanSummary;
  price: string | null; // null → mostrar "Solicitar precio"
  plan: Plan;
}

/** Calcula el PVP a partir de costes si retailPrice no está fijado. Solo se ejecuta en servidor. */
function resolveRetail(p: HousePricing): number | null {
  if (p.retailPrice != null) return p.retailPrice;
  if (p.manufacturerCost != null && p.foundationCost != null && p.internalCosts != null && p.margin != null) {
    return Math.round(((p.manufacturerCost + p.foundationCost + p.internalCosts) * (1 + p.margin)) / 1000) * 1000;
  }
  return null;
}
const fmt = (n: number) => n.toLocaleString("es-ES") + " €";

function toPublic(h: HouseData): PublicHouse {
  const plan = buildPlan(planConfigs[h.code]);
  const { pricing, ...rest } = h;
  const retail = resolveRetail(pricing);
  return {
    ...rest,
    title: `${site.brandName} ${h.code}`,
    shortTitle: h.signature ? `${h.code} Signature` : h.code,
    bedrooms: plan.summary.bedrooms,
    bathrooms: plan.summary.bathrooms,
    summary: plan.summary,
    price: site.showPrices && retail != null ? fmt(retail) : null,
    plan,
  };
}

export const getHouses = (): PublicHouse[] => houseData.map(toPublic);
export const getHouse = (slug: string) => { const h = houseData.find((x) => x.slug === slug); return h ? toPublic(h) : undefined; };
export const priceLabel = (h: PublicHouse) => (h.price ? `Desde ${h.price}` : "Solicitar precio");
