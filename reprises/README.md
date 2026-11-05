# Reprises Club Grand Prix

Page web autonome pour apprendre une reprise de dressage figure par figure. Le cheval (vu de dessus) parcourt le tracé dans la carrière, s'arrête entre chaque figure, et le panneau affiche ce que dit le texte officiel et ce que regarde le juge.

## Ouvrir la page

Ouvrir `index.html` dans un navigateur. Aucune installation ni serveur n'est nécessaire.

Les polices (Bricolage Grotesque, Atkinson Hyperlegible) sont chargées depuis Google Fonts : sans connexion, la page reste utilisable avec des polices de secours.

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html` | Structure de la page (en-tête, carrière, panneau de la figure, frise des figures, notes). |
| `style.css` | Mise en page, thème clair et sombre (suit le réglage du système ou `data-theme`). |
| `app.js` | Moteur d'animation, rendu SVG de la carrière, et données des reprises (`REPS`). |

## Utilisation

- **Lancer / Pause** : bouton ou barre d'espace.
- **Figure précédente / suivante** : boutons, flèches ← et →, ou les pastilles numérotées.
- **Vitesse** : × 0,5, × 1, × 1,5 ou × 2.
- **Pause après chaque figure** : coché par défaut ; décocher pour enchaîner toute la reprise.
- **Mode mémoire** : cache le texte des figures, à révéler au besoin.
- **Voir tout le tracé** : affiche en pâle le reste du tracé.
- **Carrière 40 × 20** : disponible seulement pour les reprises qui l'autorisent. Les lettres en pointillé (V, S, R, P, L, I) sont alors placées à leur point repère.

Le choix de reprise, la vitesse et la taille de carrière sont mémorisés dans le navigateur (`localStorage`, clés `rep-key`, `rep-speed`, `rep-size`).

## Reprises incluses

Dressage : Club 1, Club 2, Club 3, Club 4, Club Elite (Grand Prix) et Club Elite CCE, Club 1 CCE, Club 3 CCE (dressage du complet).

## Modifier une reprise

Les reprises sont décrites dans l'objet `REPS` de `app.js` :

- `name`, `short`, `group` (`dre` ou `cce`), `sizes` (`[60]` ou `[60,40]`), `info`, `notes`, `score`, `ens` (notes d'ensemble et coefficients) et `legend`.
- `figs` : une entrée par figure, avec `steps` (lettres et texte de l'exercice), `ideas` (points regardés par le juge) et `letters` (repères à mettre en évidence).
- `path` : le tracé, écrit avec les fonctions `fig`, `gait`, `to`, `circle`, `arc`, `halt`, etc. Les allures sont définies dans `GA` (vitesse, couleur, tirets).

Pour ajouter une reprise, créer une entrée dans `REPS` et ajouter sa clé dans `ORDER`, dans le même fichier.

## Limites connues

- Les grilles 2025 ne précisent pas toujours la taille de la carrière : vérifier sur l'avant-programme avant de s'entraîner.
- Le tracé est une reconstruction à partir des grilles ; il n'a pas été contrôlé contre les figures officielles. Les écarts sont à signaler et à corriger dans `REPS`.
