import db, { ROOT } from './db';

interface ImportNode {
  titre: string;
  contenu: string;
  children?: ImportNode[];
}

const IMPORT_ID = 'groupe_2026-07-22';

const TREE: ImportNode[] = [
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
];

async function insertTree(nodes: ImportNode[], parentId: number) {
  for (const node of nodes) {
    const id = await db.pages.add({
      parentId,
      titre: node.titre,
      contenu: node.contenu,
      date: new Date().toISOString(),
    });
    if (node.children && id !== undefined) await insertTree(node.children, id);
  }
}

export async function isImportPending() {
  return localStorage.getItem(`import_${IMPORT_ID}`) !== '1';
}

export async function runImport() {
  await insertTree(TREE, ROOT);
  localStorage.setItem(`import_${IMPORT_ID}`, '1');
}
