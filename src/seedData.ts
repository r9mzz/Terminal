import type { Concept, Erreur, Strategie, Ressource } from './db';

const now = () => new Date().toISOString();
const diagram = (name: string) => `${import.meta.env.BASE_URL}diagrams/${name}.svg`;

export const SEED_CONCEPTS: Omit<Concept, 'id'>[] = [
  // --- ICT & SMC ---
  {
    titre: 'Fair Value Gap (FVG)',
    categorie: 'ICT',
    contenu:
      "Définition : imbalance (déséquilibre) de prix sur 3 bougies consécutives où seule la bougie centrale fournit de la liquidité dans une direction.\n\nConditions :\n- Bougie 1 High ne touche pas Bougie 3 Low (bullish)\n- Présence d'un vide de cotation à rééquilibrer\n- Le prix revient souvent retester au moins 50% du FVG (CE)\n\nInvalidation : clôture du corps d'une bougie sous/sur le Consequent Encroachment (50% du FVG).",
    images: [diagram('fvg')],
    liens: [],
    date: now(),
  },
  {
    titre: 'Order Block (OB)',
    categorie: 'ICT',
    contenu:
      "Définition : dernière bougie baissière/haussière avant un mouvement impulsif fort ayant cassé la structure (BOS).\n\nConditions :\n- A créé une cassure de structure (BOS/MSS)\n- A généré un FVG juste après son empreinte\n- A idéalement balayé la liquidité préalable (Sweep)\n\nInvalidation : traversée nette du corps de la bougie Order Block.",
    images: [diagram('order-block')],
    liens: [],
    date: now(),
  },
  {
    titre: 'Break of Structure (BOS)',
    categorie: 'ICT',
    contenu:
      "Définition : cassure d'un plus haut (High) ou plus bas (Low) majeur dans le sens de la tendance avec le corps de la bougie.\n\nConditions :\n- Confirmation impérative avec la clôture du corps (Body)\n- Une simple mèche (Wick) est considérée comme un Sweep/Liquidity Hunt\n\nInvalidation : réintégration immédiate du range précédent.",
    images: [diagram('bos')],
    liens: [],
    date: now(),
  },
  {
    titre: 'Market Structure Shift (MSS)',
    categorie: 'ICT',
    contenu:
      "Définition : changement de tendance à court terme à la suite d'une prise de liquidité majeure.\n\nConditions :\n- Sweep de liquidité (BSL ou SSL)\n- Mouvement impulsif opposé cassant le dernier creux/sommet récent avec FVG\n\nInvalidation : le prix continue dans la direction initiale sans créer de FVG.",
    images: [diagram('mss')],
    liens: [],
    date: now(),
  },
  {
    titre: 'Liquidation Pools (BSL / SSL)',
    categorie: 'ICT',
    contenu:
      "Définition : zones où s'accumulent les Stop Loss des traders retail (Buy Side Liquidity au-dessus des sommets, Sell Side Liquidity sous les creux).\n\nConditions :\n- Equal Highs (EQH) ou Equal Lows (EQL)\n- Trendline Liquidity (alignement de plus bas ou plus hauts)\n- Highs/Lows de la session précédente (PDH/PDL, PWH/PWL)\n\nInvalidation : la liquidité est toujours consommée ou créée.",
    images: [diagram('liquidity')],
    liens: [],
    date: now(),
  },
  {
    titre: 'Optimal Trade Entry (OTE)',
    categorie: 'ICT',
    contenu:
      "Définition : zone de retracement de Fibonacci idéale située entre 61.8%, 70.5% et 79% d'un mouvement impulsif.\n\nConditions :\n- Tracer le Fibo du creux au sommet (ou inversement) du Leg de structure\n- La zone 70.5% représente le 'Sweet Spot' de rechargement\n\nInvalidation : cassure du niveau 100% de Fibonacci (Invalidation du Leg).",
    images: [diagram('ote')],
    liens: [],
    date: now(),
  },
  {
    titre: 'Analyse Multi-Timeframe (HTF vs LTF)',
    categorie: 'Price Action',
    contenu:
      "Définition : séparation stricte du rôle des unités de temps pour maximiser le R:R et éviter le bruit.\n\nConditions :\n- HTF (H1/H4) : identifier le biais global, les prises de liquidité majeures et les zones cibles (PoI)\n- LTF (M5/M15) : attendre un changement de structure (MSS/ChOCH) et raffiner l'entrée pour réduire le SL\n- Règle d'or : ne jamais prendre une position basée uniquement sur du H1 sans confirmation LTF\n\nInvalidation : entrer directement au marché sur du H1 sans signal d'entrée en LTF.",
    images: [],
    liens: [],
    date: now(),
  },

  // --- PRICE ACTION CLASSIQUE ---
  {
    titre: 'Supports & Résistances',
    categorie: 'Price Action',
    contenu:
      "Définition : niveaux horizontaux où le prix a rebondi ou bloqué plusieurs fois dans le passé.\n\nConditions :\n- Au moins 2 ou 3 points de contact identifiables\n- Changement de rôle (Role Reversal) : un ancien Support devient Résistance\n\nInvalidation : breakout net confirmé par le volume.",
    images: [diagram('support-resistance')],
    liens: [],
    date: now(),
  },
  {
    titre: 'Patterns de Bougies (Pinbar & Engulfing)',
    categorie: 'Price Action',
    contenu:
      "Définition : formations de bougies japonaises indiquant un rejet fort (Pinbar/Hammer) ou une absorption d'offres/demandes (Avalement).\n\nConditions :\n- Pinbar : mèche représentant au moins 2/3 de la taille totale de la bougie\n- Engulfing : le corps de la bougie englobe totalement le corps de la précédente\n\nInvalidation : cassure de la mèche extrême de la bougie de signal.",
    images: [],
    liens: [],
    date: now(),
  },

  // --- INDICATEURS ---
  {
    titre: 'VWAP (Volume Weighted Average Price)',
    categorie: 'Indicateurs',
    contenu:
      "Définition : prix moyen pondéré par les volumes. Utilisé principalement sur les indices (NAS100, US500) et par les institutionnels, fonctionne aussi très bien en H4/Daily sur BTC.\n\nConditions :\n- Prix au-dessus du VWAP = biais haussier (Buyers in control)\n- Prix au-dessous du VWAP = biais baissier (Sellers in control)\n- Retest du VWAP sert de support/résistance dynamique\n\nInvalidation : traversée violente avec fort volume dans le sens inverse.",
    images: [diagram('vwap')],
    liens: [],
    date: now(),
  },
  {
    titre: 'Moyennes Mobiles (EMA 20 / 50 / 200)',
    categorie: 'Indicateurs',
    contenu:
      "Définition : indicateurs de suivi de tendance lissant l'évolution du prix sur une période donnée.\n\nConditions :\n- EMA 200 : définit la tendance majeure HTF\n- Golden Cross (EMA 50 croise EMA 200 vers le haut) = signal bullish\n- Death Cross (EMA 50 croise EMA 200 vers le bas) = signal bearish\n\nInvalidation : croisement inverse des moyennes mobiles.",
    images: [],
    liens: [],
    date: now(),
  },
  {
    titre: 'RSI & Divergences',
    categorie: 'Indicateurs',
    contenu:
      "Définition : oscillateur mesurant la vitesse et le changement des mouvements de prix. Utilisé pour repérer les surachats (>70), surventes (<30) et divergences.\n\nConditions :\n- Divergence Haussière : prix fait un plus bas (Lower Low) mais RSI fait un plus haut (Higher Low)\n- Divergence Baissière : prix fait un plus haut (Higher High) mais RSI fait un plus bas (Lower High)\n\nInvalidation : continuation impulsive du prix annulant la divergence.",
    images: [diagram('rsi-divergence')],
    liens: [],
    date: now(),
  },

  // --- PSYCHOLOGIE ---
  {
    titre: 'Revenge Trading',
    categorie: 'Psychologie',
    contenu:
      "Définition : envie irrépressible de reprendre une position immédiatement après une perte pour 'se venger' du marché et récupérer l'argent perdu.\n\nConditions (signes avant-coureurs) :\n- Ouverture d'un trade moins de 5 minutes après un SL\n- Absence de setup clair, entrée au marché sans checklist\n- Augmentation de la taille de position par rapport au trade précédent\n\nInvalidation : aucune — c'est un pattern comportemental à couper à la source, pas un setup à valider.",
    images: [],
    liens: [],
    date: now(),
  },
  {
    titre: 'Biais de Confirmation',
    categorie: 'Psychologie',
    contenu:
      "Définition : tendance à ne voir que les éléments graphiques qui confirment l'idée de trade qu'on a déjà en tête, en ignorant les signaux contraires.\n\nConditions :\n- Chercher un setup après avoir décidé du sens du trade plutôt que l'inverse\n- Ignorer une structure HTF opposée au biais souhaité\n- Changer de timeframe jusqu'à trouver un graphique qui 'confirme'\n\nInvalidation : toujours partir de l'analyse HTF neutre avant de chercher une direction.",
    images: [],
    liens: [],
    date: now(),
  },
  {
    titre: 'Routine Pré-Trading',
    categorie: 'Psychologie',
    contenu:
      "Définition : ensemble de vérifications systématiques effectuées avant d'ouvrir la plateforme de trading, pour trader depuis un état mental stable.\n\nConditions :\n- Vérifier le calendrier économique du jour (news Red Folder)\n- Noter son état émotionnel (fatigue, stress, excès de confiance)\n- Relire son plan de trading et sa checklist de stratégie\n- Définir la perte maximale acceptée pour la session (Max Daily Loss)\n\nInvalidation : ouvrir un graphique et trader dans l'instant sans préparation.",
    images: [],
    liens: [],
    date: now(),
  },
  {
    titre: 'Overconfidence après une série de gains',
    categorie: 'Psychologie',
    contenu:
      "Définition : excès de confiance après plusieurs trades gagnants consécutifs, menant à une prise de risque disproportionnée.\n\nConditions (signes avant-coureurs) :\n- Envie d'augmenter la taille de position 'parce que ça marche'\n- Skip de la checklist car on se sent 'en feu'\n- Multiplication du nombre de trades pris dans la journée\n\nInvalidation : garder un risque fixe par trade quelle que soit la série en cours, gagnante ou perdante.",
    images: [],
    liens: [],
    date: now(),
  },

  // --- GESTION DU RISQUE ---
  {
    titre: 'Règle des 1% & R:R Minimum',
    categorie: 'Gestion du risque',
    contenu:
      "Définition : discipline de gestion du capital visant à préserver le compte contre les séries de pertes (Drawdown).\n\nConditions :\n- Ne jamais risquer plus de 0.5% à 1% par trade\n- Cibler systématiquement un Risk:Reward minimum de 1:2 (2R)\n- Couper le trading de la journée après 2 Stop Loss d'affilée\n\nInvalidation : augmenter la taille de lot après une perte (Martingale).",
    images: [],
    liens: [],
    date: now(),
  },

  // --- SPÉCIFICITÉS PAR ACTIF & MACRO ---
  {
    titre: 'Trading du Gold (XAUUSD) & Sessions',
    categorie: 'Indices',
    contenu:
      "Définition : l'Or est extrêmement volatil et respecte particulièrement bien les bases ICT (OB, FVG, OTE) pendant la session US.\n\nConditions :\n- Concentrer les trades durant la session New York (13:30 - 17:00 EST)\n- Attention aux lots : la valeur du pip est élevée par rapport aux crypto-actifs\n- Corrélation inverse fréquente avec le DXY (Dollar Index)",
    images: [],
    liens: [],
    date: now(),
  },
  {
    titre: 'Analyse Macro : DXY & Taux d\'intérêt',
    categorie: 'Macro',
    contenu:
      "Définition : l'analyse fondamentale définit le biais long terme avant toute prise de position technique.\n\nConditions :\n- Baisse du DXY -> hausse générale du Gold (XAUUSD)\n- Baisse des taux de la FED -> injection de liquidités favorable aux marchés haussiers\n- Surveiller les annonces économiques majeures (ForexFactory) avant la session US\n\nInvalidation : trader pendant la publication des news sans précaution.",
    images: [],
    liens: [],
    date: now(),
  },
];

export const SEED_ERREURS: Omit<Erreur, 'id'>[] = [
  {
    titre: 'Entrée FOMO',
    description:
      "Prise de position précipitée par peur de rater un mouvement sans attendre la confirmation du setup.\n\nPourquoi je fais cette erreur : impatience et fixation sur le PnL au lieu de la qualité de l'exécution.",
    solution:
      "Checklist :\n- Le mouvement a-t-il déjà démarré sans moi ?\n- Ai-je un BOS/MSS valide en LTF ?\n- Mon SL est-il placé sur un niveau invalide ou au hasard ?",
    captures: [],
    occurrences: 0,
    liens: [],
    date: now(),
  },
  {
    titre: 'Liquidité prise trop tôt',
    description:
      "Entrée dans un Order Block ou FVG avant que la liquidité (BSL/SSL) n'ait été balayée.\n\nPourquoi je fais cette erreur : confusion entre Inducement et vraie prise de liquidité.",
    solution: "Checklist :\n- Où se trouve l'Inducement ?\n- Le marché a-t-il nettoyé les sommets/creux récents ?",
    captures: [],
    occurrences: 0,
    liens: [],
    date: now(),
  },
  {
    titre: 'Overtrading post-perte',
    description:
      "Rencaissement de plusieurs trades d'affilée pour 'se refaire' rapidement après avoir essuyé un Stop Loss.\n\nPourquoi je fais cette erreur : ego blessé, colère contre le marché et refus de la perte.",
    solution:
      "Checklist :\n- Suis-je à plus de 2 trades aujourd'hui ?\n- Mon état d'esprit est-il calme ou frustré ?\n- Ferme la plateforme pendant au moins 1 heure.",
    captures: [],
    occurrences: 0,
    liens: [],
    date: now(),
  },
  {
    titre: 'Déplacement / Annulation du Stop Loss',
    description:
      "Reculer son SL en cours de trade pour repousser l'échéance de la perte.\n\nPourquoi je fais cette erreur : refus d'avoir tort et peur d'encaisser la perte réelle.",
    solution:
      "Checklist :\n- Mon SL est-il verrouillé dès l'exécution du trade ?\n- Suis-je prêt à perdre ce montant sans impacter mes émotions ?",
    captures: [],
    occurrences: 0,
    liens: [],
    date: now(),
  },
  {
    titre: 'Mauvais calcul de lot (Gold / Indices)',
    description:
      "Appliquer la même taille de lot sur le Gold que sur le BTC ou le Forex, menant à une perte disproportionnée.\n\nPourquoi je fais cette erreur : méconnaissance de la valeur du pip selon l'actif et négligence du Money Management.",
    solution:
      "Checklist :\n- Ai-je utilisé un calculateur de position avant de valider l'ordre ?\n- Mon risque en dollars dépasse-t-il exactement 1% du compte ?",
    captures: [],
    occurrences: 0,
    liens: [],
    date: now(),
  },
  {
    titre: 'Prise de position directe en HTF (H1/H4)',
    description:
      "Placer un ordre directement sur un niveau H1 sans chercher de confirmation en M5/M15.\n\nPourquoi je fais cette erreur : impatience et flemme d'attendre la confirmation sur petite unité de temps.",
    solution:
      "Checklist :\n- Suis-je descendu en M5 pour voir s'il y a une cassure de structure ?\n- Mon Stop Loss est-il inutilement trop large ?",
    captures: [],
    occurrences: 0,
    liens: [],
    date: now(),
  },
  {
    titre: 'Revenge trading après un Stop Loss',
    description:
      "Réouverture immédiate d'une position, souvent plus grosse, juste après avoir pris un Stop Loss, sans nouveau setup valide.\n\nPourquoi je fais cette erreur : besoin émotionnel de 'se refaire' tout de suite, incapacité à laisser passer le temps entre deux trades.",
    solution:
      "Checklist :\n- Est-ce que j'ai attendu au moins 30 minutes après mon dernier SL ?\n- Ce nouveau trade a-t-il un setup complet et indépendant du précédent ?\n- Suis-je en train de vouloir 'récupérer' un montant précis plutôt que de suivre mon plan ?",
    captures: [],
    occurrences: 0,
    liens: [],
    date: now(),
  },
  {
    titre: 'Trading sans routine pré-session',
    description:
      "Ouvrir directement la plateforme et chercher un trade sans avoir vérifié le calendrier économique, son état émotionnel ou son plan du jour.\n\nPourquoi je fais cette erreur : impatience de commencer à trader, sous-estimation de l'impact de la préparation sur la qualité des décisions.",
    solution:
      "Checklist :\n- Ai-je consulté le calendrier économique (ForexFactory) ?\n- Ai-je noté mon état émotionnel du jour ?\n- Ai-je relu ma checklist de stratégie avant d'ouvrir un graphique ?",
    captures: [],
    occurrences: 0,
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
      "1. Attendre le sweep de liquidité (Liquidity Hunt)\n2. Attendre le Market Structure Shift (MSS)\n3. Placer un Limit Order sur le FVG formé lors du MSS\n4. TP sur la liquidité opposée (EQH/EQL)\n\nInvalidation : pas de FVG avant la fin de l'heure, ou SL touché avant le remplissage du FVG.",
    captures: [],
    checklist: [
      'Heure exacte dans la fenêtre Silver Bullet ?',
      'Sweep de liquidité effectué ?',
      'Présence d\'un FVG clair ?',
    ],
    date: now(),
  },
  {
    nom: 'VWAP Retest (Indices)',
    objectif: 'Profiter de la continuation de tendance de la session US via un retest du VWAP.',
    conditions: 'Timeframes : 5m, 15m\nHoraires : 09:30 - 11:30 EST (NY Open)',
    etapes:
      "1. Identifier la tendance forte de l'ouverture US\n2. Attendre un retracement vers la ligne VWAP\n3. Attendre une bougie de rejet (Pinbar/Engulfing) au contact du VWAP\n4. Entrée sur la clôture de la bougie de confirmation\n\nInvalidation : clôture nette de 2 bougies 5m sous/sur le VWAP.",
    captures: [],
    checklist: [
      "Volume suffisant à l'ouverture ?",
      'Prix réagit-il nettement au VWAP ?',
      'R:R supérieur ou égal à 1:2 ?',
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
  {
    titre: 'FTMO Free Trial (Entraînement)',
    type: 'Outil',
    url: 'https://ftmo.com/',
    concepts: [],
    date: now(),
  },
  {
    titre: 'TradingView (Analyse)',
    type: 'Outil',
    url: 'https://www.tradingview.com/',
    concepts: [],
    date: now(),
  },
];
