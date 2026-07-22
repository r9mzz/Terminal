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
];

async function findOrCreateByTitle(titre: string, parentId: number): Promise<number> {
  const existing = await db.pages.where('parentId').equals(parentId).and((p) => p.titre === titre).first();
  if (existing?.id !== undefined) return existing.id;
  const id = await db.pages.add({ parentId, titre, contenu: '', date: new Date().toISOString() });
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
    const parentId = node.parentTitre ? await findOrCreateByTitle(node.parentTitre, ROOT) : ROOT;
    await insertNode(node, parentId);
  }
  localStorage.setItem(`import_${batch.id}`, '1');
}
