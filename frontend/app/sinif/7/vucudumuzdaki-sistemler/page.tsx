import UnitPage from "@/app/sinif/[level]/[unitSlug]/page";

export const dynamic = "force-dynamic";

export default function Page() {
  return <UnitPage params={{ level: "7", unitSlug: "vucudumuzdaki-sistemler" }} />;
}
