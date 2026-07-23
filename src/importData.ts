import db, { ROOT } from './db';

interface ImportNode {
  titre: string;
  contenu: string;
  parentTitre?: string;
  children?: ImportNode[];
}

export interface ImportBatch {
  id: string;
  label: string;
  description: string;
  tree: ImportNode[];
}

const BATCHES: ImportBatch[] = [
  {
    id: 'groupe_2026-07-22',
    label: 'Importer les notes triées du groupe',
    description: '3 pages : trade, macro, habitudes de session',
    tree: [
      {
        titre: 'Trades partagés (groupe)',
        contenu: '',
        children: [
          {
            titre: 'BUY 4126 — Gold, session asiatique',
            contenu:
              "Entrée : Buy 4126\nSL : 4116\nTP1 : 4136\nTP2 : 4146\nTP3 : 4160\n\nContexte donné par le groupe : zone de survente en session asiatique, rebond attendu. Niveau 4119-4120 mentionné comme zone de blocage possible si le marché réagit aux déclarations de Trump (22h).\n\nÀ noter : le groupe s'est ensuite contredit en évoquant une cassure de résistance qui pousserait plutôt vers du SELL — signal mitigé, à vérifier sur le graphique avant de suivre ce genre d'appel telle quelle.",
          },
        ],
      },
      {
        titre: 'Macro & news (groupe)',
        contenu:
          "Déclarations Trump (22h, rapportées par le groupe) :\n- L'Iran serait prêt bientôt à conclure un accord\n- L'inflation est en baisse\n- Le pétrole va s'effondrer\n- Appel à acheter des ordinateurs Dell\n\nRéaction du groupe : jugé étrange qu'un discours sur la fin d'un conflit et la baisse de l'inflation s'accompagne d'une pub pour un produit précis — soupçon que l'annonce cache autre chose. À prendre comme du bruit de marché à surveiller, pas comme une analyse fiable.",
      },
      {
        titre: 'Habitudes de session (groupe)',
        contenu:
          "Plusieurs membres tradent la session asiatique et la session US.\nFenêtre de surveillance asiatique évoquée : 00h00 - 05h00.\nUn membre commence sa journée de trading vers 2h-3h du matin.",
      },
    ],
  },
  {
    id: 'groupe_2026-07-22_signaux',
    label: 'Importer les signaux Gold (groupe)',
    description: '2 pages : session de trades en direct, question sur les lots fractionnés',
    tree: [
      {
        titre: 'Session Gold — recherche de liquidité 4005/4010',
        parentTitre: 'Trades partagés (groupe)',
        contenu:
          "Échange en direct dans le groupe (plusieurs intervenants, difficile à attribuer précisément) :\n\n- Zone de liquidité attendue avant une baisse plus marquée : 4005 - 4010\n- BUY à 3994\n- SELL ouvert vendredi soir vers 4010, prix monté à 4017 (flottant à -300 sur le week-end), position clôturée +300 à la réouverture\n- SELL à 3996, clôturé en profit mais jugé 'pris trop tard' par son auteur\n- Achat mentionné vers 3997, avec un SL à 4005 (l'auteur signale avoir posé deux ordres par erreur)\n- TP mentionné à 3987\n- Cibles évoquées ensuite : 3985, puis une zone plus basse autour de 3975 pour un futur BUY après un petit rebond\n\nAmbiance générale du groupe : anticipation d'une baisse du Gold après une chasse de liquidité vers 4005/4010, plusieurs profits pris entre 3985 et 4010.\n\nÀ noter : chat multi-intervenants sans pseudos clairs, ces niveaux sont à vérifier sur le graphique plutôt qu'à suivre tels quels.",
      },
      {
        titre: "Acheter une fraction d'un lot Gold",
        parentTitre: 'Notions pratiques (groupe)',
        contenu:
          "Question posée dans le groupe : peut-on acheter une position partielle (ex : 50-60€ de Gold) plutôt qu'une quantité/lot complet ?\n\nÀ vérifier selon le broker : la plupart des plateformes CFD/MT4-MT5 permettent des tailles de lot fractionnées (à partir de 0.01 lot) plutôt que d'investir un montant fixe en euros directement. Le lot 0.01 est souvent la taille recommandée pour débuter (mentionné par le groupe comme normal pour les débuts).",
      },
    ],
  },
  {
    id: 'groupe_2026-07-22_session_du_rsa_au_rs3',
    label: 'Importer la session Gold (DU RSA AU RS3)',
    description: '8 pages : méthodo POC/Value Area, 4 trades Gold, brokers, prop firm',
    tree: [
      {
        titre: 'Point of Control (POC) & Value Area — Volume Profile',
        parentTitre: 'Notions pratiques (groupe)',
        contenu:
          "Concept expliqué par le groupe à partir d'un trade réel (Gold, entrée 4068) :\n\n- Point of Control (POC) : la ligne horizontale du volume profile où la concentration de contrats est la plus forte. Une entrée sur le retest du POC est considérée comme un point d'intérêt fiable.\n- Value Area Low : borne basse de la zone où s'est concentré l'essentiel du volume. Sert de confluence avec d'autres objectifs (ex: VWAP).\n- VWAP utilisé ici comme objectif de prix (target) et pas seulement comme support/résistance dynamique — viser la VWAP en dessous du prix d'entrée sur un short.\n\nDans l'exemple donné, un rejet net de 300 pips sur cette zone a été interprété comme confirmation de la qualité du target (POC + Value Area Low + VWAP en confluence).",
      },
      {
        titre: 'SELL Gold 4068 → TP 4047 (confluence POC/VWAP)',
        parentTitre: 'Trades partagés (groupe)',
        contenu:
          "Entrée : Sell 4068 (retest du POC)\nTP : 4047 (confluence VWAP + Value Area Low)\nRésultat : rejet de 300 pips sur la zone, TP jugé validé.\n\nDeuxième round de vente sur la même zone décrit par l'auteur comme un scalp 'pour faire manger tout le monde', car peu de monde anticipait la baisse vers 4047 à ce moment.\n\nSuite : mouvement haussier après le trade, jugé cohérent avec un biais bullish global depuis le vendredi précédent. L'auteur note qu'un short restait pertinent à ce niveau précis car le prix était déjà haut, ce qui laissait de la marge pour ensuite laisser courir les gains d'un achat parallèle en swing.",
      },
      {
        titre: 'Swing BUY Gold depuis 3965',
        parentTitre: 'Trades partagés (groupe)',
        contenu:
          "Position d'achat ouverte depuis 3965, gardée en swing en parallèle des trades court terme sur la même paire.\nÉtat au moment du message : +1150 pips flottants.",
      },
      {
        titre: 'Session Gold — 22 juillet 2026 (TP1/TP2/TP3 touchés)',
        parentTitre: 'Trades partagés (groupe)',
        contenu:
          'Message épinglé du groupe pour le mardi 22 juillet 2026 :\nTP1 touché\nTP2 touché\nTP3 touché\n+200 pips au total sur la journée.',
      },
      {
        titre: 'SELL Gold ~4022, SL 4026, TP 3966',
        parentTitre: 'Trades partagés (groupe)',
        contenu:
          "Setup partagé en direct dans le groupe :\nEntrée : Sell ~4021-4022 (déclenché via un ordre en attente)\nSL : 4026 (un SL au-delà de 4030 jugé trop large par le groupe, 4025-4026 jugé correct)\nTP : 3966 (support identifié en H4)\n\nDésaccord dans le groupe sur la suite :\n- Un membre pense que le prix va directement chercher 4005 puis continuer vers 3966\n- Un autre pense que le prix va d'abord remonter chercher une zone de vente entre 4027 et 4035 (au-dessus d'une résistance immédiate à 4025) avant de redescendre\n\nÀ prendre comme deux scénarios contradictoires du même groupe, pas comme un signal validé — à croiser avec ta propre lecture du graphique.",
      },
      {
        titre: 'VENTE GOLD (owner) — SL 4130',
        parentTitre: 'Trades partagés (groupe)',
        contenu:
          "Signal posté par l'owner du groupe (PPVNSA) le jour même : VENTE GOLD, SL : 4130.\nEntrée et TP non visibles sur la capture — à compléter si tu as la suite du message.",
      },
      {
        titre: 'Brokers recommandés (groupe)',
        parentTitre: 'Notions pratiques (groupe)',
        contenu:
          "Plusieurs membres du groupe utilisent Vantage comme broker et le recommandent.\n\nÀ vérifier toi-même avant d'ouvrir un compte : régulation, spreads, exécution. Les liens de parrainage postés dans un groupe ne sont jamais une garantie de qualité du broker.",
      },
      {
        titre: 'Prop firm vs fonds propres — retour d\'expérience',
        parentTitre: 'Notions pratiques (groupe)',
        contenu:
          "Un membre partage avoir eu un compte funded de 300k$ chez Topstep, mais a pris l'habitude de trader en fonds propres et a gelé ses comptes prop pour ne plus payer les frais mensuels. Il indique qu'il y retournerait si un jour il voulait refaire du prop trading.\n\nÀ retenir : les comptes funded ont des frais récurrents (abonnement mensuel) à surveiller si le compte n'est pas actif.",
      },
    ],
  },
  {
    id: 'groupe_2026-07-22_news_impact',
    label: "Importer la note sur l'impact des news macro",
    description: '1 page : comment lire le sens et la force du mouvement sur une news',
    tree: [
      {
        titre: 'Impact des news macro sur le Gold — direction & intensité',
        parentTitre: 'Macro & news (groupe)',
        contenu:
          "Comment lire l'impact d'une news macro sur le Gold (résumé du groupe) :\n\n- Les news les plus impactantes sur le Gold sont les annonces de données macroéconomiques (emploi, inflation, taux, etc.)\n- Le sens du mouvement se lit via l'impact de la news sur le dollar : le Gold est coté en USD, donc généralement inversé au dollar — une news qui renforce le dollar fait généralement baisser le Gold, et inversement.\n- Un gros mouvement ne se produit que s'il y a un écart entre le chiffre publié et ce qui était attendu (consensus/prévision). Une news jugée 'grosse' dont le résultat correspond aux attentes ne génère pas forcément de gros mouvement.\n\nÀ creuser : suivre le calendrier économique (ex: ForexFactory) et comparer le chiffre réel au consensus, pas seulement l'importance affichée de la news.",
      },
    ],
  },
  {
    id: 'groupe_2026-07-23_news_nuance',
    label: 'Importer la précision sur le trading des news',
    description: "1 page : pourquoi une news se trade avant, pas pendant",
    tree: [
      {
        titre: 'Nuance : une news se trade avant, pas pendant',
        parentTitre: 'Impact des news macro sur le Gold — direction & intensité',
        contenu:
          "Précision apportée par PPVNSA sur la règle 'impact sur le dollar' :\n\n- Le principe de base reste valable : évaluer si la news est bonne ou mauvaise pour le dollar, puis en déduire l'effet probable sur le Gold (dollar monte → Gold baisse généralement, dollar baisse → Gold monte généralement).\n- Mais en pratique c'est plus compliqué que cette règle simple.\n- Problème principal : impossible de réagir assez vite à la publication d'une news pour avoir le temps de réfléchir, interpréter, puis passer un ordre — le temps de comprendre l'impact, le mouvement a déjà eu lieu.\n- Conclusion du groupe : une news se trade avant sa publication (positionnement en amont basé sur l'anticipation), pas après coup en réaction au chiffre publié.",
      },
    ],
  },
  {
    id: 'groupe_2026-07-23_vp_ppvnsa',
    label: 'Importer la stratégie Volume Profile (PPVNSA)',
    description: "5 pages : méthode POC/VWAP, exemple d'entrée, risque, outils, contexte VIP",
    tree: [
      {
        titre: 'Stratégie Volume Profile — PPVNSA',
        contenu:
          "Stratégie enseignée par PPVNSA (fondateur du canal, lance un VIP payant dessus). Repose sur la lecture du Volume Profile, du POC et de la VWAP comme des aimants de prix. Détails dans les sous-pages.",
        children: [
          {
            titre: 'Comment tracer et lire le Volume Profile',
            contenu:
              "Outil utilisé sur TradingView : indicateur 'LuxAlgo - Clusters Volume Profile' (certains membres le tracent aussi manuellement).\n\nZones clés :\n- POC (Point of Control) : niveau de plus forte concentration de volume, agit comme un aimant\n- POC d'impulsion : POC formé pendant un mouvement impulsif\n- POC Veille : POC de la session précédente\n- Value Area Low / High : bornes de la zone de volume principale, également des aimants\n- VWAP : utilisée ici comme point d'équilibre (le prix est 'cher' ou 'pas cher' par rapport à la VWAP), pas juste comme support/résistance\n\nComment tracer selon le style :\n- Pour trader la session US : tracer le profil de l'ouverture asiatique jusqu'à 15h30, ça donne des repères pour la session US\n- Pour du swing : tracer sur plusieurs jours\n- Méthode perso de PPVNSA : il trace le profil de la veille pour dégager une direction et une zone à 'récupérer' le jour suivant",
          },
          {
            titre: "Exemple d'entrée : zone 40-68 (RSI + FVG + liquidité)",
            contenu:
              "Signal partagé en groupe : Buy 68, SL 58. Différents membres avaient des zones d'achat entre 40 et 58, toutes basées sur le volume profile.\n\nConfirmations utilisées par l'un des membres : RSI à 30 + présence d'un FVG. Anticipation d'une prise de liquidité vers 62 avant la poussée haussière ('si ça pousse quand même à la hausse tant mieux').\n\nTarget donnée : zone des 110, correspondant au point d'équilibre de la VWAP.",
          },
          {
            titre: 'Gestion de position : lot, SL/TP, risque par trade',
            contenu:
              "Approche mentionnée : lot de 1.25, SL et TP autour de 20 pips (ou un peu plus), en gardant la direction sur la journée.\n\nAvec une bonne stratégie, viser un R:R de 1 à 2 par trade suffit à bien performer sur la durée.\n\nExemple de risque donné : compte de 25k, risque de 3% = 750€ par trade — 'on n'est pas millionnaire mais ça fait le taff'.",
          },
          {
            titre: 'Outils complémentaires : Orderflow / Footprint',
            contenu:
              "Le footprint/orderflow est présenté par un membre comme le complément parfait au Volume Profile / Market Auction Theory.\n\n- Pas d'outil footprint gratuit trouvé sur TradingView\n- Plateformes mentionnées : Bookmap, ATAS (payantes, décrites comme un vrai investissement)\n- Courbe d'apprentissage réelle : environ 4-5h de prise en main (+ ChatGPT pour comprendre) avant de commencer à capter les bases\n- Nécessite un ordinateur — pas utilisable sérieusement depuis un téléphone",
          },
          {
            titre: 'RSI sur Gold : avis de PPVNSA',
            contenu:
              "PPVNSA n'utilise pas le RSI sur le Gold en time frame élevé (H1 et au-dessus). Il l'utilise parfois uniquement en M1.\n\nRaison : une news ou une déclaration (ex: Trump) peut maintenir un faux signal de surachat/survente pendant environ 2h, ce qui rend le RSI peu fiable sur cet actif dans ces conditions.",
          },
        ],
      },
      {
        titre: 'Pourquoi réagir à une news "choc" est du gambling',
        parentTitre: 'Impact des news macro sur le Gold — direction & intensité',
        contenu:
          "Raisonnement détaillé de PPVNSA :\n\n- Un être humain ne peut pas trader en réaction directe à une news : l'information est déjà intégrée dans le prix en quelques millisecondes par les algorithmes qui cotent l'or.\n- Même les banques, qui ont l'information plus vite que le grand public, ne tradent pas en réaction immédiate à une news — elles agissent dans un contexte plus large, pas comme un réflexe.\n- Exemple concret discuté : un membre d'un autre groupe affirmait qu'une news de bombardement US en Iran était automatiquement un signal BUY. Jugé n'importe quoi par PPVNSA — depuis le début de la guerre en Iran, l'or n'a fait que baisser, et toute l'information liée à cette guerre est déjà pricée dans le marché.\n- Trader sur la base d'un ressenti ('je sais que ça baisse mais je sens que ça va remonter') n'est pas une stratégie, c'est du gambling — même si parfois ça marche par hasard.\n\nConclusion : PPVNSA revendique vouloir enseigner 'le vrai trading', pas ce genre d'approche.",
      },
      {
        titre: 'PPVNSA — contexte du canal et VIP',
        parentTitre: 'Notions pratiques (groupe)',
        contenu:
          "PPVNSA est le fondateur du canal et la source de la stratégie Volume Profile enseignée au groupe. Il lance un VIP payant (~300€, démarrage annoncé pour un lundi, 5 personnes max au départ).\n\nSes signaux sont décrits par les membres comme actuellement tous gagnants — à prendre comme un point positif à surveiller dans la durée plutôt qu'une garantie : un historique court ne prouve pas une edge sur le long terme, à continuer d'observer avant de se fier aveuglément aux signaux.",
      },
      {
        titre: 'Gérer les TP multiples sur plusieurs entrées',
        parentTitre: 'Trades partagés (groupe)',
        contenu:
          "Retour d'expérience partagé en groupe : sur une position construite via plusieurs entrées à des niveaux différents, prendre le TP1 sur les entrées les plus hautes et le TP2 sur les entrées les plus basses permet d'optimiser le résultat global plutôt que de tout sortir au même niveau.\n\nLeçon annexe : un membre a laissé tourner une position sans prendre de profit partiel, qui est ensuite revenue proche du point d'entrée (BE) — sécuriser une partie du gain sur les entrées les plus favorables évite ce genre de retour en arrière.",
      },
    ],
  },
  {
    id: 'groupe_2026-07-23_signaux_ppvnsa',
    label: 'Importer les signaux détaillés PPVNSA',
    description: '5 pages : 2 trades complets, bilan hebdo, méthode de gestion en direct',
    tree: [
      {
        titre: 'VENTE GOLD 4120-4125 → BE puis re-sell 4121-4125',
        parentTitre: 'Trades partagés (groupe)',
        contenu:
          "Signal 1 : VENTE GOLD\nEntrée : 4120-4125\nSL : 4130\nTP1 : 4116 / TP2 : 4113 / TP3 : 4099 / TP Open\n\nDéroulé : TP1 touché (+65 pips), prix approché à 1 pip du TP2 sans le toucher, position mise à breakeven (BE), puis stoppée à BE ('évidemment on se fait sortir et ça va tp2 direct après'). Clôturé : 65 pips en profit sur la partie sortie, ~100 pips flottants perdus au retour à BE. Leçon rappelée par PPVNSA : la protection du capital passe avant tout, même sur un 'petit' trade.\n\nSignal 2 (immédiatement après le retour à BE) : VENTE GOLD\nEntrée : 4121-4125\nSL : 4131\nTP1 : 4116 / TP2 : 4113 / TP3 : 4099 / TP Open\nConsigne donnée au groupe : diviser le risque habituel de moitié pour cette ré-entrée après un stop.\nContexte : cassure d'un sideway, tentative d'anticiper un fakeout.\n\nDéroulé : PPVNSA n'a pas été stoppé personnellement, mais suppose que certains membres avec un spread plus large chez leur broker ont pu être sortis — décide de compter ce cas comme un SL dans ses statistiques par souci de transparence. A ajouté des entrées supplémentaires vers 4032 (dispatching d'entrées), ce qui lui a permis de rester en profit global malgré certaines positions en drawdown. Résultat rapporté en cours de trade : +150 pips puis +220 pips.",
      },
      {
        titre: 'Session Gold — mercredi 22 juillet 2026 (bilan détaillé)',
        parentTitre: 'Trades partagés (groupe)',
        contenu:
          "Récap officiel de PPVNSA pour mercredi 22 juillet 2026 :\n\n- TP1 touché (+70 pips)\n- TP2 touché après passage à BE\n- Pour les membres sortis par le spread avant le BE : -120 pips\n- Pour les membres non sortis : TP1 et TP2 touchés, entre 100 et 220 pips de profit selon les entrées\n- Résultat clôturé pour PPVNSA lui-même : +290 pips\n\nBilan de la semaine annoncé : environ +900 pips.\n\nÀ noter : PPVNSA revendique '0 perte' sur la période — à prendre comme une déclaration à vérifier dans la durée, pas comme un fait acquis (cf. la page sur le contexte du canal/VIP).",
      },
      {
        titre: 'ACHAT GOLD 4079-4073 → TP1/TP2 touchés (+170 pips)',
        parentTitre: 'Trades partagés (groupe)',
        contenu:
          "Entrée : 4079-4073\nSL : 4069\nTP1 : 4085 / TP2 : 4088 / TP3 : 4098 / TP Open\n\nDéroulé : TP1 et TP2 touchés, +170 pips. Le reste de la position (viser TP3) a ensuite été ramené à breakeven puis stoppé à ce niveau ('BE touché sur tp3').",
      },
      {
        titre: 'Gestion de trade en direct — méthode PPVNSA',
        parentTitre: 'Notions pratiques (groupe)',
        contenu:
          "Techniques de gestion observées sur plusieurs trades en direct :\n\n- Mise à breakeven (BE) systématique dès qu'un trade est suffisamment en profit, pour protéger le capital même si ça veut dire renoncer à une partie du potentiel\n- En cas de stop-out puis ré-entrée sur le même biais, diviser le risque habituel de moitié plutôt que de reprendre la même taille\n- Dispatcher ses entrées sur plusieurs niveaux de prix plutôt qu'une seule grosse entrée : permet de rester en profit global même si certaines des entrées sont en drawdown\n- Tenir compte du spread de son propre broker : un même niveau de SL peut être touché chez certains brokers et pas chez d'autres — être transparent et compter ces cas dans ses statistiques plutôt que de les ignorer\n\nMantra donné par PPVNSA : Signal → Exécution → Discipline → Profit. Son point insisté : même en suivant ses trades avec la pire exécution possible (SL pris, pertes sur les BE, pires entrées), le bilan ne devrait théoriquement pas être négatif — mais l'exécution reste, selon lui, le point faible de beaucoup de membres.",
      },
      {
        titre: 'Offre : mini-formation gratuite pour les 5 premiers VIP',
        parentTitre: 'PPVNSA — contexte du canal et VIP',
        contenu:
          "PPVNSA propose une mini-formation gratuite sur l'exécution et sa stratégie aux 5 premiers membres inscrits au VIP.",
      },
    ],
  },
  {
    id: 'groupe_2026-07-23_cas_pratique_chart',
    label: 'Importer le cas pratique (lecture de graphique)',
    description: '1 page : rejet du POC + divergence VWAP sur un exemple réel',
    tree: [
      {
        titre: 'Cas pratique : rejet du POC → journée de tendance',
        parentTitre: 'Stratégie Volume Profile — PPVNSA',
        contenu:
          "Exemple de la méthode en action, lu directement sur 3 captures du même graphique Gold (12h57, 17h32 et 20h26 de la même séance) :\n\n- Le prix évolue autour de deux zones clés marquées par l'indicateur : POC Veille (~4120, zone cyan) et POC d'impulsion (~4130-4133, zone rose)\n- Vers 12h57, le prix revient retester ces deux zones après une poussée haussière, sans réussir à s'y maintenir\n- Entre 12h57 et 17h32, le prix casse sous les deux POC et accélère à la baisse (passe sous 4070)\n- Sur la même période, la VWAP (ligne verte) continue de monter alors que le prix baisse : l'écart entre prix et VWAP se creuse de plus en plus\n- Vers 20h26, le prix est descendu vers 4060-4070, très en dessous de la VWAP (~4135) — un écart de cet ordre confirme une vraie journée de tendance, pas un simple range\n\nLecture à en tirer : un rejet net des zones de POC (au lieu d'une reconquête) combiné à un prix qui s'éloigne durablement de la VWAP valide un biais vendeur pour la suite de la séance — cohérent avec les trades SELL de la session déjà notés (4068→4047, puis la suite vers 4022 et 4005).",
      },
    ],
  },
];

async function findOrCreateByTitle(titre: string): Promise<number> {
  const existing = await db.pages.filter((p) => p.titre === titre).first();
  if (existing?.id !== undefined) return existing.id;
  const id = await db.pages.add({ parentId: ROOT, titre, contenu: '', date: new Date().toISOString() });
  return id ?? ROOT;
}

async function insertNode(node: ImportNode, parentId: number) {
  const id = await db.pages.add({
    parentId,
    titre: node.titre,
    contenu: node.contenu,
    date: new Date().toISOString(),
  });
  if (node.children && id !== undefined) {
    for (const child of node.children) await insertNode(child, id);
  }
}

export async function pendingBatches(): Promise<ImportBatch[]> {
  return BATCHES.filter((b) => localStorage.getItem(`import_${b.id}`) !== '1');
}

export async function runBatch(batch: ImportBatch) {
  for (const node of batch.tree) {
    const parentId = node.parentTitre ? await findOrCreateByTitle(node.parentTitre) : ROOT;
    await insertNode(node, parentId);
  }
  localStorage.setItem(`import_${batch.id}`, '1');
}
