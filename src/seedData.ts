import type { Concept, Erreur, Strategie, Ressource } from './db';

const now = () => new Date().toISOString();

export const SEED_ERREURS: Omit<Erreur, 'id'>[] = [
  {
    titre: 'Entrée FOMO',
    description:
      "Prise de position précipitée par peur de rater un mouvement explosif sans attendre la confirmation du setup.\n\nPourquoi je fais cette erreur : impatience et peur d'être laissé de côté. Fixation sur le résultat PnL au lieu du respect du plan.",
    solution:
      "Checklist :\n- Le mouvement a-t-il déjà commencé sans moi ?\n- Ai-je un BOS/MSS valide en LTF ?\n- Mon Stop Loss est-il sous/sur une zone clé ou placé 'au hasard' ?",
    captures: [],
    occurrences: 0,
    liens: [],
    date: now(),
  },
  {
    titre: 'Liquidité prise trop tôt',
    description:
      "Entrée dans un Order Block ou FVG avant que la liquidité (BSL/SSL) n'ait été balayée.\n\nPourquoi je fais cette erreur : confusion entre Inducement et vraie prise de liquidité.",
    solution: 'Checklist :\n- Où est l\'Inducement ?\n- Le marché a-t-il nettoyé les highs/lows récents ?',
    captures: [],
    occurrences: 0,
    liens: [],
    date: now(),
  },
  {
    titre: 'Trade pendant les News High Impact',
    description:
      'Prise de position 15 min avant ou après une annonce majeure (CPI, NFP, FOMC).\n\nPourquoi je fais cette erreur : recherche de volatilité facile et de gains rapides (gambling).',
    solution:
      "Checklist :\n- Y a-t-il une news Red Folder dans ForexFactory aujourd'hui ?\n- Suis-je hors des fenêtres d'annonce ?",
    captures: [],
    occurrences: 0,
    liens: [],
    date: now(),
  },
  {
    titre: 'Déplacement / Suppression du Stop Loss',
    description:
      "Reculer son SL pendant que le trade coule pour éviter d'encaisser la perte.\n\nPourquoi je fais cette erreur : refus d'avoir tort. Incapacité psychologique à accepter une perte normale.",
    solution:
      'Checklist :\n- Mon SL est-il verrouillé dès l\'exécution ?\n- Suis-je prêt à perdre 100% de ce risque ?',
    captures: [],
    occurrences: 0,
    liens: [],
    date: now(),
  },
];

export const SEED_CONCEPTS: Omit<Concept, 'id'>[] = [
  {
    titre: 'Fair Value Gap (FVG)',
    categorie: 'ICT',
    contenu:
      'Définition : imbalance de prix sur 3 bougies consécutives où seule la bougie centrale fournit de la liquidité dans une direction.\n\nConditions :\n- Bougie 1 High ne touche pas Bougie 3 Low (bullish)\n- Présence d\'un vide de cotation\n- Zone de rééquilibrage visée par le prix\n\nInvalidation : clôture complète du corps d\'une bougie au-delà du Consequent Encroachment (50% du FVG).',
    images: [],
    liens: [],
    date: now(),
  },
  {
    titre: 'Break of Structure (BOS)',
    categorie: 'ICT',
    contenu:
      'Définition : cassure d\'un plus haut ou plus bas majeur avec le corps de la bougie, confirmant la continuation de la tendance.\n\nConditions :\n- Clôture impérative du corps (body) au-dessus/en-dessous\n- Faire attention à la différence avec une simple mèche (Sweep)\n\nInvalidation : revers rapide fermant sous la structure cassée.',
    images: [],
    liens: [],
    date: now(),
  },
  {
    titre: 'Order Block (OB)',
    categorie: 'ICT',
    contenu:
      'Définition : dernière bougie haussière/baissière avant un mouvement impulsif ayant créé une cassure de structure (BOS).\n\nConditions :\n- Doit être à l\'origine d\'un FVG\n- Doit avoir balayé de la liquidité préalable\n\nInvalidation : traversée nette sans réaction du prix.',
    images: [],
    liens: [],
    date: now(),
  },
  {
    titre: 'Gestion du Risque (R:R)',
    categorie: 'Gestion du risque',
    contenu:
      'Définition : rapport entre ce que tu risques (1R) et ce que tu cibles en Take Profit (ex: 3R).\n\nConditions :\n- Risque fixe par trade (ex: 0.5% ou 1%)\n- R:R minimum recherché : 1:2\n\nInvalidation : risquer plus de 2% sur un seul trade.',
    images: [],
    liens: [],
    date: now(),
  },
];

export const SEED_STRATEGIES: Omit<Strategie, 'id'>[] = [
  {
    nom: 'ICT Silver Bullet',
    objectif: 'Capturer un mouvement de rééquilibrage rapide pendant une kill zone à fort volume.',
    conditions:
      'Timeframes : 1m, 3m, 5m\nHoraires : 10:00 - 11:00 EST (NY) ou 03:00 - 04:00 EST (London)',
    etapes:
      "1. Attendre le sweep de liquidité de la session précédente\n2. Identifier le MSS/BOS avec fort momentum\n3. Entrer sur le FVG formé pendant la fenêtre horaire\n4. Cibles : liquidité opposée (Equal Highs/Lows)\n\nInvalidation : pas de FVG formé avant 11:00 EST, ou SL dépassé avant l'entrée.",
    captures: [],
    checklist: [
      'Sommes-nous dans la Kill Zone ?',
      'La liquidité a-t-elle été prise ?',
      'Y a-t-il un FVG propre ?',
    ],
    date: now(),
  },
];

export const SEED_RESSOURCES: Omit<Ressource, 'id'>[] = [
  {
    titre: 'ICT Mentorship 2022',
    type: 'Chaîne YouTube',
    url: 'https://www.youtube.com/playlist?list=PLVgHx4Z63paYiFgQTI8wuyer3H_q55TYP',
    concepts: [],
    date: now(),
  },
];
