import type { Prix } from "@/lib/content";

export default function PriceTable({ prix, note }: { prix: Prix[]; note: string }) {
  return (
    <div>
      <div className="price-wrap">
        <table className="price-table">
          <thead>
            <tr>
              <th>Prestation</th>
              <th>Fourchette indicative</th>
              <th>Remarque</th>
            </tr>
          </thead>
          <tbody>
            {prix.map((p) => (
              <tr key={p.prestation}>
                <td>{p.prestation}</td>
                <td>{p.fourchette}</td>
                <td>{p.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="price-note">{note}</p>
    </div>
  );
}
