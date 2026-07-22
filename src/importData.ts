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
