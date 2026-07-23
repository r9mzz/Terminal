import db, { ROOT } from './db';

interface ImportNode {
  titre: string;
  contenu: string;
  parentTitre?: string;
  appendTo?: string;
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
  {
    id: 'groupe_2026-07-23_indicateurs_et_synthese',
    label: 'Importer les indicateurs complémentaires + synthèse complète',
    description: "3 pages : ADX/RSI(M1)/ATR + ruban de MM, mesure d'amplitude, synthèse globale",
    tree: [
      {
        titre: "Indicateurs complémentaires : ADX, RSI(M1), ATR, ruban de moyennes mobiles",
        parentTitre: 'Stratégie Volume Profile — PPVNSA',
        contenu:
          "Lu sur 4 captures d'un graphique XAUUSD en M1 (plateforme mobile de trading, pas TradingView cette fois) :\n\n- Un ruban de plusieurs moyennes mobiles de périodes différentes est tracé directement sur le prix. Quand les lignes sont serrées/entremêlées, le marché est en range ; quand elles s'écartent nettement, ça confirme une tendance en cours — sert de filtre de tendance en complément du Volume Profile/VWAP.\n- Panel d'indicateurs affiché sous le graphique : ADX(14), RSI(14), ATR(14).\n  - ADX(14) : mesure la force de la tendance (peu importe le sens). Une valeur élevée (~40 observé) confirme un mouvement directionnel fort, pas un range.\n  - RSI(14) : utilisé ici en M1, cohérent avec la remarque de PPVNSA notée ailleurs comme quoi il ne l'utilise que sur cette unité de temps sur le Gold.\n  - ATR(14) : mesure la volatilité moyenne récente, probablement utilisé pour calibrer la taille du Stop Loss plutôt qu'un nombre de pips fixe à l'aveugle.\n\nÀ vérifier : ces captures montrent un setup possiblement personnel (compte affiché) plutôt que le setup officiel de PPVNSA — à confirmer avec lui si ces indicateurs font partie de sa méthode ou sont ceux d'un autre membre du groupe.",
      },
      {
        titre: "Mesurer l'amplitude d'un mouvement (outil de range)",
        parentTitre: 'Stratégie Volume Profile — PPVNSA',
        contenu:
          "Sur les mêmes captures, un outil de mesure de range est utilisé pour quantifier un mouvement récent : ex. 648 points sur 21 bougies (+0.23%), ou 4028 points sur 5 bougies (-0.7%).\n\nUtilité probable : évaluer si un mouvement est assez ample pour être considéré comme un vrai déplacement (Displacement, cf. la fiche Concept correspondante) avant de le trader, et/ou calibrer un objectif de prix ou un Stop Loss par rapport à l'amplitude typique récente plutôt qu'un chiffre fixe.",
      },
      {
        titre: 'Synthèse complète de la stratégie PPVNSA',
        parentTitre: 'Stratégie Volume Profile — PPVNSA',
        contenu:
          "Vue d'ensemble reconstituée à partir de tous les messages et captures du groupe (à mettre à jour si de nouveaux éléments arrivent) :\n\n1. Lecture de marché (Market Auction Theory / Volume Profile)\n   - POC (Point de Control), POC d'impulsion, POC Veille et Value Area Low/High : zones de forte concentration de volume, considérées comme des aimants de prix\n   - VWAP utilisée comme point d'équilibre (prix cher/pas cher), pas comme simple support/résistance\n   - Le profil se trace différemment selon l'objectif : session US (Asian open → 15h30), swing (plusieurs jours), ou veille → jour même (méthode perso de PPVNSA)\n\n2. Indicateurs de confirmation\n   - RSI(14) utilisé uniquement en M1 sur le Gold (jugé peu fiable sur les timeframes supérieures, notamment à cause des news qui faussent le signal ~2h)\n   - ADX(14) pour confirmer la force d'une tendance\n   - ATR(14) probablement pour calibrer le risque/SL à la volatilité réelle plutôt qu'à un chiffre fixe\n   - Ruban de moyennes mobiles pour filtrer range vs tendance\n   - FVG et prise de liquidité anticipée comme confirmations d'entrée supplémentaires\n\n3. Exécution et gestion du risque\n   - Lot proportionné au risque (ex: 1.25 lot, ou risque fixe ~3% d'un compte 25k = 750€ par trade)\n   - SL/TP calibrés (~20 pips de base, ou selon l'ATR/l'amplitude récente mesurée)\n   - Mise à breakeven (BE) systématique dès qu'un trade est assez en profit\n   - En cas de stop-out suivi d'une ré-entrée sur le même biais : diviser le risque habituel de moitié\n   - Dispatcher les entrées sur plusieurs niveaux de prix plutôt qu'une seule grosse entrée\n   - Prendre en compte le spread de son propre broker dans le suivi de ses statistiques, par transparence\n\n4. Philosophie sur les news macro\n   - Le sens du marché se lit via l'impact de la news sur le dollar, mais l'ampleur du mouvement dépend surtout de l'écart entre le chiffre publié et le consensus attendu\n   - Un humain ne peut pas réagir assez vite à une news : l'info est déjà pricée en quelques millisecondes par les algorithmes — une news se trade avant sa publication (positionnement anticipé), pas en réaction au chiffre\n   - Réagir à une news choc en pariant sur un sens précis (ex: 'bombardement = buy') est considéré comme du gambling, pas une stratégie\n\n5. Mantra\n   - Signal → Exécution → Discipline → Profit\n   - Point insisté par PPVNSA : même avec la pire exécution possible sur ses signaux (SL pris, BE ratés), le bilan ne devrait théoriquement pas être négatif — l'exécution reste, selon lui, le point faible de la plupart des membres\n\nRéserve à garder en tête : cette synthèse vient d'un groupe gratuit et de messages informels, pas d'un cours structuré — les points marqués comme 'à vérifier' ailleurs dans Connaissance restent à confirmer avant d'être suivis à la lettre.",
      },
    ],
  },
  {
    id: 'groupe_2026-07-23_ppvnsa_page_unique',
    label: 'Importer la stratégie PPVNSA (page unique)',
    description: "1 page complète — pense à supprimer l'ancienne arborescence éclatée après import",
    tree: [
      {
        titre: 'Stratégie PPVNSA — Volume Profile & Market Auction',
        contenu:
          "PHILOSOPHIE\nLire le marché comme les institutionnels (Market Auction Theory) via le Volume Profile plutôt que via des indicateurs classiques retardés. Le prix est attiré par les zones de forte concentration de volume, un peu comme des aimants.\n\nLECTURE DE MARCHÉ\n- POC (Point of Control) : niveau du profil où la concentration de volume est la plus forte\n- POC d'impulsion : POC formé pendant un mouvement impulsif\n- POC Veille : POC de la session précédente\n- Value Area Low / High : bornes de la zone où s'est concentré l'essentiel du volume, agissent aussi comme aimants\n- VWAP : utilisée comme point d'équilibre (le prix est 'cher' ou 'pas cher' par rapport à elle), pas comme simple support/résistance\n- Comment tracer selon l'objectif : session US (tracer de l'ouverture asiatique jusqu'à 15h30), swing (sur plusieurs jours), ou méthode perso de PPVNSA (tracer la veille pour dégager une direction et une zone à récupérer le jour même)\n- Outil utilisé sur TradingView : indicateur 'LuxAlgo - Clusters Volume Profile'\n\nINDICATEURS DE CONFIRMATION\n- RSI(14) : utilisé uniquement en M1 sur le Gold. Sur les timeframes supérieures, jugé peu fiable car une news/déclaration peut fausser le signal de surachat/survente pendant environ 2h\n- ADX(14) : confirme la force d'une tendance (une valeur élevée, ~40, confirme un mouvement directionnel fort plutôt qu'un range)\n- ATR(14) : mesure la volatilité récente, probablement utilisé pour calibrer le Stop Loss plutôt qu'un nombre de pips fixe\n- Ruban de moyennes mobiles multi-périodes : lignes serrées = range, lignes qui s'écartent = tendance confirmée\n- FVG et anticipation d'une prise de liquidité : confirmations d'entrée supplémentaires\n(Réserve : les indicateurs ADX/ATR/ruban de MM viennent de captures d'un setup qui pourrait être personnel à un membre plutôt que la doctrine officielle de PPVNSA — à confirmer)\n\nEXEMPLE D'ENTRÉE CONCRET\nSignal partagé en groupe : Buy 68, SL 58 (zones d'achat de différents membres entre 40 et 58, toutes basées sur le volume profile). Confirmations utilisées : RSI à 30 + FVG. Anticipation d'une prise de liquidité vers 62 avant la poussée haussière. Target : zone des 110 (point d'équilibre VWAP).\n\nMESURER L'AMPLITUDE D'UN MOUVEMENT\nUn outil de mesure de range est utilisé pour quantifier un mouvement récent (ex: 648 points sur 21 bougies, ou 4028 points sur 5 bougies) — sert probablement à juger si un mouvement est un vrai Displacement à trader, et/ou à calibrer un objectif ou un SL sur l'amplitude réelle plutôt qu'un chiffre fixe.\n\nEXÉCUTION ET GESTION DU RISQUE\n- Lot proportionné au risque (ex: 1.25 lot, ou risque fixe ~3% d'un compte 25k = 750€ par trade)\n- SL/TP calibrés (~20 pips de base, ou selon l'ATR/l'amplitude récente)\n- Mise à breakeven (BE) systématique dès qu'un trade est assez en profit, même si ça sacrifie une partie du potentiel\n- En cas de stop-out puis ré-entrée sur le même biais : diviser le risque habituel de moitié\n- Dispatcher les entrées sur plusieurs niveaux de prix plutôt qu'une seule grosse entrée\n- Prendre en compte le spread de son propre broker dans ses statistiques, par transparence (un même SL peut être touché chez un broker et pas chez un autre)\n- Sur une position à entrées multiples : prendre TP1 sur les entrées les plus hautes et TP2 sur les plus basses plutôt que tout sortir au même niveau\n\nEXEMPLES DE TRADES OBSERVÉS\n- SELL 4068 → TP 4047 (confluence POC/VWAP), rejet de 300 pips confirmant le target\n- Swing BUY depuis 3965, tenu en parallèle (+1150 pips flottants à un instant donné)\n- VENTE 4120-4125, SL 4130 : TP1 touché (+65), BE avant TP2, puis ré-entrée à risque divisé (4121-4125, SL 4131) avec dispatching d'entrées vers 4032\n- ACHAT 4079-4073, SL 4069 : TP1+TP2 touchés (+170 pips), reste ramené à BE\n- Bilan hebdo revendiqué : environ +900 pips sur la semaine, '0 perte' sur la période (déclaration à vérifier dans la durée, pas un fait acquis)\n\nCAS PRATIQUE (lecture de graphique)\nSur un exemple réel (3 captures de la même séance) : le prix rejette deux zones de POC (Veille ~4120, impulsion ~4130) sans les reconquérir, puis chute en s'éloignant de plus en plus d'une VWAP qui continue de monter — un écart grandissant entre prix et VWAP confirme une vraie journée de tendance et valide le biais vendeur, cohérent avec les trades SELL notés plus haut.\n\nPHILOSOPHIE SUR LES NEWS MACRO\n- Le sens du mouvement se lit via l'impact de la news sur le dollar (Gold généralement inverse au dollar), mais l'ampleur dépend surtout de l'écart entre le chiffre publié et le consensus attendu\n- Un humain ne peut pas réagir assez vite à une news : l'info est déjà pricée en quelques millisecondes par les algorithmes — une news se trade avant sa publication, pas en réaction au chiffre\n- Même les banques ne tradent pas en réaction directe aux news, mais dans un contexte plus large\n- Réagir à une news choc en pariant sur un sens précis (ex: 'bombardement = buy') est du gambling, pas une stratégie — toute l'info d'un conflit en cours est déjà pricée dans le marché\n\nMANTRA\nSignal → Exécution → Discipline → Profit.\nPoint insisté par PPVNSA : même avec la pire exécution possible sur ses signaux, le bilan ne devrait théoriquement pas être négatif — l'exécution reste, selon lui, le point faible de la plupart des membres.\n\nCONTEXTE DU CANAL\nPPVNSA est le fondateur du canal et la source de cette stratégie. Il lance un VIP payant (~300€, 5 personnes max au départ, mini-formation gratuite offerte aux 5 premiers).\n\nRÉSERVE GÉNÉRALE\nCette fiche vient d'un groupe gratuit et de messages informels, pas d'un cours structuré. Les signaux décrits comme 'tous gagnants' ou '0 perte' sont des déclarations à vérifier dans la durée — un historique court ne prouve pas un edge sur le long terme.",
      },
    ],
  },
  {
    id: 'groupe_2026-07-23_conflit_poc_vwap',
    label: 'Ajouter la nuance : quand POC et VWAP se contredisent',
    description: "Complète directement ta page 'Stratégie PPVNSA' (pas de nouvelle page)",
    tree: [
      {
        titre: 'Stratégie PPVNSA — Volume Profile & Market Auction',
        appendTo: 'Stratégie PPVNSA — Volume Profile & Market Auction',
        contenu:
          "QUE FAIRE QUAND LE POC ET LA VWAP SE CONTREDISENT\nLe POC (aimant directionnel fort) et la VWAP (référence 'cher/pas cher') peuvent pointer dans des sens différents en même temps — ce n'est pas une erreur, ce sont deux outils de nature différente qui n'ont pas le même poids.\n\n- La VWAP donne juste un contexte : le prix est statistiquement au-dessus ou en dessous de sa moyenne pondérée récente. Ce n'est pas un signal d'entrée en soi.\n- Le POC donne une cible plus concrète : une zone de forte concentration de volume vers laquelle le prix a tendance à revenir.\n\nQuand les deux se contredisent, c'est toujours la **réaction du prix sur la zone elle-même** qui tranche, jamais l'un des deux tout seul :\n- Rejet net du POC (mèche, bougie de retournement, RSI qui remonte) → le POC gagne, envisager le sens du rebond\n- Cassure nette du POC sans réaction → la baisse/hausse continue, le contexte VWAP ne suffisait pas à l'invalider\n\nC'est exactement pour ça qu'aucune entrée ne se prend sur un seul élément (juste 'pas cher' ou juste 'proche d'un POC') — il faut toujours une confirmation supplémentaire (FVG, RSI, prise de liquidité) qui vient trancher le conflit.",
      },
    ],
  },
  {
    id: 'groupe_2026-07-24_fiche_3_pages',
    label: 'Importer la fiche PPVNSA en 3 pages (Stratégie/Explication/Libre)',
    description: "3 pages propres — pense à supprimer l'ancienne page unique et l'ancienne arborescence après import",
    tree: [
      {
        titre: 'Stratégie PPVNSA',
        contenu:
          "PHILOSOPHIE\nLire le marché comme les institutionnels (Market Auction Theory) via le Volume Profile plutôt que via des indicateurs classiques retardés. Le prix est attiré par les zones de forte concentration de volume, un peu comme des aimants.\n\nLECTURE DE MARCHÉ\n- POC (Point of Control) : niveau du profil où la concentration de volume est la plus forte\n- POC d'impulsion : POC formé pendant un mouvement impulsif\n- POC Veille : POC de la session précédente\n- Value Area Low / High : bornes de la zone où s'est concentré l'essentiel du volume, agissent aussi comme aimants\n- VWAP : utilisée comme point d'équilibre (le prix est 'cher' ou 'pas cher' par rapport à elle), pas comme simple support/résistance. Se calcule depuis le début de la session (ou la période choisie) — on la regarde sur le même graphique que celui où on trade, ce qui compte c'est son point d'ancrage, pas un timeframe fixe\n- Comment tracer le Volume Profile selon l'objectif : session US (Asian open → 15h30), swing (plusieurs jours), ou méthode perso de PPVNSA (tracer la veille pour dégager une direction et une zone à récupérer le jour même). Le lookback doit correspondre à la fenêtre de temps réellement analysée (ex: ajuster à la session en cours plutôt que laisser un réglage par défaut)\n- Outil utilisé sur TradingView : indicateur 'LuxAlgo - Clusters Volume Profile'\n\nCONCEPTS ICT COMPLÉMENTAIRES\n- Order Block : dernière zone/bougie baissière (ou haussière) juste avant un retournement net\n- Displacement : mouvement impulsif rapide qui suit un Order Block, laisse souvent un FVG derrière lui\n- Liquidity Sweep : le prix va chercher un point bas/haut (stop loss des autres) avant de vraiment se retourner\n\nINDICATEURS DE CONFIRMATION\n- RSI(14) : utilisé uniquement en M1 sur le Gold. Sur les timeframes supérieures, jugé peu fiable car une news/déclaration peut fausser le signal de surachat/survente pendant environ 2h\n- ADX(14) : confirme la force d'une tendance (une valeur élevée, ~40, confirme un mouvement directionnel fort plutôt qu'un range)\n- ATR(14) : mesure la volatilité récente, probablement utilisé pour calibrer le Stop Loss plutôt qu'un nombre de pips fixe\n- Ruban de moyennes mobiles multi-périodes : lignes serrées = range, lignes qui s'écartent = tendance confirmée\n(Réserve : les indicateurs ADX/ATR/ruban de MM viennent de captures d'un setup qui pourrait être personnel à un membre plutôt que la doctrine officielle de PPVNSA — à confirmer)\n\nMESURER L'AMPLITUDE D'UN MOUVEMENT\nUn outil de mesure de range est utilisé pour quantifier un mouvement récent (ex: 648 points sur 21 bougies, ou 4028 points sur 5 bougies) — sert probablement à juger si un mouvement est un vrai Displacement à trader, et/ou à calibrer un objectif ou un SL sur l'amplitude réelle plutôt qu'un chiffre fixe.\n\nEXÉCUTION ET GESTION DU RISQUE\n- Lot proportionné au risque (ex: 1.25 lot, ou risque fixe ~3% d'un compte 25k = 750€ par trade)\n- SL/TP calibrés (~20 pips de base, ou selon l'ATR/l'amplitude récente)\n- Mise à breakeven (BE) systématique dès qu'un trade est assez en profit, même si ça sacrifie une partie du potentiel\n- En cas de stop-out puis ré-entrée sur le même biais : diviser le risque habituel de moitié\n- Dispatcher les entrées sur plusieurs niveaux de prix plutôt qu'une seule grosse entrée\n- Prendre en compte le spread de son propre broker dans ses statistiques, par transparence\n- Sur une position à entrées multiples : prendre TP1 sur les entrées les plus hautes et TP2 sur les plus basses\n\nQUE FAIRE QUAND LE POC ET LA VWAP SE CONTREDISENT\nLa VWAP donne un contexte ('cher/pas cher'), le POC donne une cible (zone de volume). Quand ils pointent dans des sens différents, c'est toujours la réaction du prix sur la zone qui tranche (rejet net = le POC gagne, cassure nette sans réaction = la VWAP ne suffisait pas à l'invalider) — jamais l'un des deux seul.\n\nPHILOSOPHIE SUR LES NEWS MACRO\n- Le sens du mouvement se lit via l'impact de la news sur le dollar, mais l'ampleur dépend surtout de l'écart entre le chiffre publié et le consensus attendu\n- Un humain ne peut pas réagir assez vite à une news : l'info est déjà pricée en quelques millisecondes par les algorithmes — une news se trade avant sa publication, pas en réaction au chiffre\n- Réagir à une news choc en pariant sur un sens précis est du gambling, pas une stratégie\n\nMANTRA\nSignal → Exécution → Discipline → Profit. Même avec la pire exécution possible sur ses signaux, le bilan ne devrait théoriquement pas être négatif — l'exécution reste, selon PPVNSA, le point faible de la plupart des membres.\n\nCONTEXTE DU CANAL\nPPVNSA est le fondateur du canal et la source de cette stratégie. Il lance un VIP payant (~300€, 5 personnes max au départ, mini-formation gratuite offerte aux 5 premiers).\n\nRÉSERVE GÉNÉRALE\nCette fiche vient d'un groupe gratuit et de messages informels, pas d'un cours structuré. Les signaux décrits comme 'tous gagnants' ou '0 perte' sont des déclarations à vérifier dans la durée.",
      },
      {
        titre: 'Explication — lecture des signaux vs stratégie',
        contenu:
          "Cette page sert à croiser des trades réellement observés avec la théorie de la page Stratégie, pour comprendre le rapport entre les deux.\n\n— BUY récurrent du 24 juillet : Order Block + Displacement —\nDeux setups quasiment identiques observés le même jour, vers 13h30-14h00 et vers 15h00-15h30, tous les deux résolus en BUY gagnant (correction : une lecture précédente avait supposé un SELL sur celui de 15h, c'était faux).\n\nSchéma observé à chaque fois :\n1. Le prix chute jusqu'à un point bas\n2. Une petite zone rouge se forme juste avant le retournement : la dernière zone baissière avant le mouvement impulsif (Order Block haussier)\n3. Juste après, une poussée haussière nette et rapide (zone turquoise) casse au-dessus : un Displacement, qui laisse probablement un FVG derrière lui\n4. Le BUY se prend sur/autour de cette zone Order Block + Displacement, et le prix continue ensuite sa remontée\n\nPourquoi ça colle à la stratégie : Order Block + Displacement + FVG est la combinaison ICT qui signe un vrai retournement (pas une simple manipulation) — la vitesse et la netteté du mouvement après l'Order Block sont ce qui distingue un retournement réel d'un faux mouvement. Le fait que le pattern se répète deux fois la même séance avec le même résultat montre que ce n'est pas un coup de chance mais un setup reconnu et répété.\n\nPoint clé : la stratégie ne fixe jamais le sens à l'avance. Certains jours ce sera plutôt des ventes (voir l'exemple du 22 juillet ci-dessous), d'autres jours comme celui-ci uniquement des achats. Ce qui compte c'est de reconnaître LE setup qui se présente sur le moment, pas de deviner la direction avant.\n\n— Cas contrasté : SELL après rejet du POC (22 juillet) —\nSur un exemple antérieur (3 captures de la même séance, 12h57/17h32/20h26) : le prix rejette deux zones de POC (Veille ~4120, impulsion ~4130) sans les reconquérir, puis chute en s'éloignant de plus en plus d'une VWAP qui continue de monter — l'écart grandissant entre prix et VWAP confirme une vraie journée de tendance et valide le biais vendeur ce jour-là.\n\n— Méthode générale pour croiser un signal avec la stratégie —\n1. Contexte de fond : la VWAP est-elle au-dessus ou en dessous du prix, plutôt en range ou en tendance ?\n2. Zone de confluence : un POC/Value Area, ou un Order Block avec Displacement\n3. Confirmation : rejet net, FVG qui se forme, prise de liquidité qui vient d'avoir lieu\n4. Seulement à ce moment-là le sens de l'entrée devient logique — jamais deviné avant coup",
      },
      {
        titre: 'Notes diverses (à renommer)',
        contenu: '',
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

async function appendToPageByTitle(titre: string, text: string) {
  const existing = await db.pages.filter((p) => p.titre === titre).first();
  if (existing?.id !== undefined) {
    await db.pages.update(existing.id, { contenu: `${existing.contenu}\n\n${text}` });
  } else {
    await db.pages.add({ parentId: ROOT, titre, contenu: text, date: new Date().toISOString() });
  }
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
    if (node.appendTo) {
      await appendToPageByTitle(node.appendTo, node.contenu);
      continue;
    }
    const parentId = node.parentTitre ? await findOrCreateByTitle(node.parentTitre) : ROOT;
    await insertNode(node, parentId);
  }
  localStorage.setItem(`import_${batch.id}`, '1');
}
