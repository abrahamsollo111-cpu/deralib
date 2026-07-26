import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administration",
  // jamais indexé ni suivi par les moteurs
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // la classe .admin-page masque l'en-tête et le pied de page du site
  return <div className="admin-page">{children}</div>;
}
