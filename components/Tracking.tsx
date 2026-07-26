import Script from "next/script";
import { lireReglages } from "@/lib/store";

/**
 * Injecte les balises de suivi configurées depuis /admin (onglet
 * « Suivi & balises »). Aucune balise n'est chargée tant qu'aucun
 * identifiant n'est renseigné : par défaut, le site ne dépose aucun
 * cookie tiers.
 *
 * La lecture est mise en cache 5 minutes : les pages restent servies
 * statiquement, et une modification est visible en quelques minutes.
 */
export default async function Tracking() {
  const r = await lireReglages(300);

  return (
    <>
      {r.verifGoogle && (
        <meta name="google-site-verification" content={r.verifGoogle} />
      )}
      {r.verifBing && <meta name="msvalidate.01" content={r.verifBing} />}

      {(r.gaId || r.adsId) && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${r.gaId || r.adsId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
${r.gaId ? `gtag('config','${r.gaId}');` : ""}
${r.adsId ? `gtag('config','${r.adsId}');` : ""}`}
          </Script>
        </>
      )}

      {r.metaPixel && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${r.metaPixel}');fbq('track','PageView');`}
        </Script>
      )}

      {/* rendu accessible au navigateur pour la conversion Google Ads */}
      {r.adsId && r.adsLabel && (
        <Script id="ads-conv" strategy="afterInteractive">
          {`window.__deralibAdsConversion='${r.adsId}/${r.adsLabel}';`}
        </Script>
      )}
    </>
  );
}
