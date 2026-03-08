// ============================================================
// RUSSIAN COURSE — 90 LESSONS DATA
// 3 months, 6 days/week (+ 1 rest), ~15 min/lesson
// Focus: Alphabet, Vocabulary (cognates + common words),
//        Pronunciation, Sentence structure
// ============================================================

const LESSONS_DATA = {

  // ============================================================
  // SEMAINE 1 — L'ALPHABET CYRILLIQUE (Part 1)
  // ============================================================
  "S1J1": {
    week: 1, day: 1,
    title: "Bienvenue ! L'alphabet russe",
    subtitle: "Découverte du cyrillique — les lettres similaires au français",
    sections: [
      {
        type: "intro",
        tag: "Introduction",
        title: "Pourquoi le cyrillique ?",
        text: "L'alphabet cyrillique compte 33 lettres. Bonne nouvelle : environ 10 ressemblent à nos lettres latines ! Vous lirez votre premier mot russe aujourd'hui."
      },
      {
        type: "alphabet",
        tag: "Alphabet",
        title: "Les lettres 'jumelles' — identiques ou proches",
        letters: [
          { cyr: "А а", latin: "A a", sound: "[a]", example: "Аист", ex_fr: "cigogne", similar: true },
          { cyr: "Е е", latin: "Ye ye", sound: "[yé]", example: "Ель", ex_fr: "sapin", similar: true },
          { cyr: "К к", latin: "K k", sound: "[k]", example: "Кот", ex_fr: "chat", similar: true },
          { cyr: "М м", latin: "M m", sound: "[m]", example: "Мама", ex_fr: "maman", similar: true },
          { cyr: "О о", latin: "O o", sound: "[o]", example: "Окно", ex_fr: "fenêtre", similar: true },
          { cyr: "Т т", latin: "T t", sound: "[t]", example: "Том", ex_fr: "Tom", similar: true },
        ]
      },
      {
        type: "pronunciation",
        tag: "Prononciation",
        title: "Règle d'or n°1 : La voyelle accentuée",
        rules: [
          { symbol: "О accentué", desc: "Se prononce [o] comme dans 'pot'. Ex : мОсква → [mOskva]" },
          { symbol: "О non accentué", desc: "Se prononce [a] ! Ex : молокО → [malakO] (lait)" },
          { symbol: "А", desc: "Toujours [a], que ce soit accentué ou non. Facile !" },
        ]
      },
      {
        type: "vocab",
        tag: "Vocabulaire",
        title: "Vos premiers mots — cognats franco-russes",
        words: [
          { ru: "театр", phonetic: "[t'i-ATR]", fr: "théâtre", cognat: true, note: null },
          { ru: "метро", phonetic: "[mi-TRO]", fr: "métro", cognat: true, note: null },
          { ru: "Кот", phonetic: "[kot]", fr: "chat (male)", cognat: false, note: "Double sens : aussi prénom masculin 'Kot'" },
          { ru: "Мама", phonetic: "[MA-ma]", fr: "maman", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Comment se prononce le О dans 'молоко' (lait) ?",
        options: ["[o-o-ko]", "[a-la-KO]", "[mo-lo-ko]", "[mu-lu-ku]"],
        correct: 1,
        feedback: "Bravo ! En russe, le О non-accentué devient [a]. Seul le dernier О (accentué) se prononce [o]."
      }
    ]
  },

  "S1J2": {
    week: 1, day: 2,
    title: "L'alphabet — Les faux amis visuels",
    subtitle: "Des lettres qui ressemblent aux nôtres mais sonnent différemment !",
    sections: [
      {
        type: "intro",
        tag: "Attention",
        title: "Les pièges de l'alphabet",
        text: "Certaines lettres cyrilliques ressemblent à des lettres latines mais ont un son COMPLÈTEMENT différent. Ces 'faux amis visuels' sont le premier piège pour les francophones !"
      },
      {
        type: "alphabet",
        tag: "Faux Amis",
        title: "Lettres pièges — à mémoriser absolument",
        letters: [
          { cyr: "В в", latin: "V v", sound: "[v]", example: "Вода", ex_fr: "eau", similar: false },
          { cyr: "Н н", latin: "N n", sound: "[n]", example: "Нос", ex_fr: "nez", similar: false },
          { cyr: "Р р", latin: "R r", sound: "[r roulé]", example: "Рот", ex_fr: "bouche", similar: false },
          { cyr: "С с", latin: "S s", sound: "[s]", example: "Сок", ex_fr: "jus", similar: false },
          { cyr: "У у", latin: "OU ou", sound: "[ou]", example: "Ухо", ex_fr: "oreille", similar: false },
          { cyr: "Х х", latin: "KH kh", sound: "[kh]", example: "Хлеб", ex_fr: "pain", similar: false },
        ]
      },
      {
        type: "pronunciation",
        tag: "Prononciation",
        title: "Le R russe — comme en espagnol !",
        rules: [
          { symbol: "Р", desc: "R roulé, comme l'r espagnol dans 'pero'. Placez la langue en haut et faites vibrer." },
          { symbol: "Х", desc: "Comme le 'j' espagnol ou le 'ch' allemand (Bach). Air qui frotte la gorge." },
          { symbol: "С", desc: "Toujours [s] comme dans 'sac', jamais [z]. Ex : сок = [sok]" },
        ]
      },
      {
        type: "vocab",
        tag: "Vocabulaire",
        title: "Cognats et mots essentiels",
        words: [
          { ru: "ресторан", phonetic: "[res-ta-RAN]", fr: "restaurant", cognat: true, note: null },
          { ru: "спорт", phonetic: "[sport]", fr: "sport", cognat: true, note: null },
          { ru: "сок", phonetic: "[sok]", fr: "jus (de fruit)", cognat: false, note: null },
          { ru: "вода", phonetic: "[va-DA]", fr: "eau", cognat: false, note: "Attention : le O est atone → [a]" },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "La lettre С en russe se prononce comme :",
        options: ["[k] comme C français devant A", "[s] comme dans 'sac'", "[ts] comme dans 'tsar'", "[ch] comme dans 'chat'"],
        correct: 1,
        feedback: "Exact ! С = [s] toujours. C'est un faux ami visuel du C latin."
      }
    ]
  },

  "S1J3": {
    week: 1, day: 3,
    title: "L'alphabet — Lettres nouvelles (1)",
    subtitle: "Des lettres qui n'existent pas en latin — mais faciles à retenir !",
    sections: [
      {
        type: "intro",
        tag: "Nouvelles lettres",
        title: "Lettres 100% cyrilliques",
        text: "Ces lettres n'ont pas d'équivalent visuel en latin. Mais avec des astuces mnémotechniques, vous les retiendrez en une leçon !"
      },
      {
        type: "alphabet",
        tag: "Alphabet",
        title: "Nouvelles lettres — groupe 1",
        letters: [
          { cyr: "Б б", latin: "B b", sound: "[b]", example: "Банан", ex_fr: "banane", similar: false },
          { cyr: "Г г", latin: "G g", sound: "[g]", example: "Год", ex_fr: "année", similar: false },
          { cyr: "Д д", latin: "D d", sound: "[d]", example: "Дом", ex_fr: "maison", similar: false },
          { cyr: "З з", latin: "Z z", sound: "[z]", example: "Зуб", ex_fr: "dent", similar: false },
          { cyr: "И и", latin: "I i", sound: "[i]", example: "Игра", ex_fr: "jeu", similar: false },
          { cyr: "Й й", latin: "Y y", sound: "[y court]", example: "Йога", ex_fr: "yoga", similar: false },
        ]
      },
      {
        type: "tip",
        tag: "Astuce Mnémotechnique",
        text: "Б = B avec une 'barbe' en haut. Д = D comme une maison avec un toit pointu. З = Z miroir d'un 3. И = miroir du N latin. Й = И avec un accent."
      },
      {
        type: "vocab",
        tag: "Vocabulaire",
        title: "Mots du quotidien + cognats",
        words: [
          { ru: "банан", phonetic: "[ba-NAN]", fr: "banane", cognat: true, note: null },
          { ru: "йога", phonetic: "[YO-ga]", fr: "yoga", cognat: true, note: null },
          { ru: "дом", phonetic: "[dom]", fr: "maison / immeuble", cognat: false, note: "Double sens : дом = maison, mais aussi 'foyer' au sens figuré" },
          { ru: "год", phonetic: "[got]", fr: "année / an", cognat: false, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Que signifie 'банан' en russe ?",
        options: ["Pain", "Banane", "Bain", "Balle"],
        correct: 1,
        feedback: "Oui ! Банан = banane. C'est un cognat parfait — même prononciation ou presque !"
      }
    ]
  },

  "S1J4": {
    week: 1, day: 4,
    title: "L'alphabet — Lettres nouvelles (2)",
    subtitle: "П, Л, Ф, Э, Ю, Я — et vos premiers mots complets !",
    sections: [
      {
        type: "alphabet",
        tag: "Alphabet",
        title: "Nouvelles lettres — groupe 2",
        letters: [
          { cyr: "Л л", latin: "L l", sound: "[l]", example: "Луна", ex_fr: "lune", similar: false },
          { cyr: "П п", latin: "P p", sound: "[p]", example: "Папа", ex_fr: "papa", similar: false },
          { cyr: "Ф ф", latin: "F f", sound: "[f]", example: "Факт", ex_fr: "fait", similar: false },
          { cyr: "Э э", latin: "È è", sound: "[é ouvert]", example: "Это", ex_fr: "c'est / cela", similar: false },
          { cyr: "Ю ю", latin: "YOU", sound: "[you]", example: "Юмор", ex_fr: "humour", similar: false },
          { cyr: "Я я", latin: "YA", sound: "[ya]", example: "Яблоко", ex_fr: "pomme", similar: false },
        ]
      },
      {
        type: "pronunciation",
        tag: "Prononciation",
        title: "Les voyelles 'molles' : Е, Ё, И, Ю, Я",
        rules: [
          { symbol: "Я", desc: "[ya] comme dans 'yaourt'. Я signifie aussi 'Je' en russe !" },
          { symbol: "Ю", desc: "[you] comme dans 'you' anglais. Ex : юмор = humour" },
          { symbol: "Э", desc: "[é] ouvert. Э = 'cela/c'est' — mot très utile !" },
        ]
      },
      {
        type: "vocab",
        tag: "Vocabulaire",
        title: "Cognats et mots-clés",
        words: [
          { ru: "факт", phonetic: "[fakt]", fr: "fait, donnée", cognat: true, note: null },
          { ru: "юмор", phonetic: "[YOU-mor]", fr: "humour", cognat: true, note: null },
          { ru: "Я", phonetic: "[ya]", fr: "Je / moi", cognat: false, note: "Я = 'Je' ET la dernière lettre de l'alphabet. Coïncidence ?" },
          { ru: "это", phonetic: "[E-ta]", fr: "c'est / cela", cognat: false, note: "Mot le plus utile du russe ! Это кот = c'est un chat" },
        ]
      },
      {
        type: "grammar",
        tag: "Structure",
        title: "Votre première phrase russe",
        pattern: "Это + [nom] = C'est un/une [nom]",
        examples: [
          { ru: "Это кот.", fr: "C'est un chat." },
          { ru: "Это дом.", fr: "C'est une maison." },
          { ru: "Это театр.", fr: "C'est un théâtre." },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Comment dit-on 'C'est un restaurant' en russe ?",
        options: ["Это ресторан.", "Я ресторан.", "Это юмор.", "Кот ресторан."],
        correct: 0,
        feedback: "Parfait ! Это ресторан. — C'est littéralement 'Cela restaurant'. Le russe n'utilise pas de verbe 'être' au présent !"
      }
    ]
  },

  "S1J5": {
    week: 1, day: 5,
    title: "L'alphabet — Les sons spéciaux",
    subtitle: "Ж, Ш, Щ, Ч, Ц — les sons qui n'existent pas en français",
    sections: [
      {
        type: "intro",
        tag: "Sons Russes",
        title: "Des sons exotiques mais logiques",
        text: "Le russe a des sons qui n'existent pas en français. Avec de la pratique, votre bouche s'y habituera. Ces sons sont très caractéristiques de la langue russe !"
      },
      {
        type: "alphabet",
        tag: "Alphabet",
        title: "Les consonnes spéciales",
        letters: [
          { cyr: "Ж ж", latin: "J j", sound: "[j de 'jour']", example: "Журнал", ex_fr: "journal/magazine", similar: false },
          { cyr: "Ш ш", latin: "CH dur", sound: "[ch dur]", example: "Школа", ex_fr: "école", similar: false },
          { cyr: "Щ щ", latin: "SHCH", sound: "[ch+tch fondu]", example: "Щи", ex_fr: "soupe chou", similar: false },
          { cyr: "Ч ч", latin: "TCH", sound: "[tch]", example: "Чай", ex_fr: "thé", similar: false },
          { cyr: "Ц ц", latin: "TS ts", sound: "[ts]", example: "Центр", ex_fr: "centre", similar: false },
          { cyr: "Ъ ъ", latin: "—", sound: "[signe dur]", example: "Съезд", ex_fr: "congrès", similar: false },
          { cyr: "Ь ь", latin: "—", sound: "[signe mou]", example: "Боль", ex_fr: "douleur", similar: false },
        ]
      },
      {
        type: "pronunciation",
        tag: "Prononciation",
        title: "Les signes qui modifient les consonnes",
        rules: [
          { symbol: "Ь (mou)", desc: "Rend la consonne 'douce' (palatalisée). Ex : мать [mat'] — mère. Levez la langue vers le palais." },
          { symbol: "Ъ (dur)", desc: "Sépare une consonne et une voyelle molle. Rare, ne change pas le son principal." },
          { symbol: "Ж / Ш", desc: "Toujours durs ! Jamais mouillés. Ш = CH de 'chat' mais sans le sourire." },
        ]
      },
      {
        type: "vocab",
        tag: "Vocabulaire",
        title: "Cognats + mots essentiels du jour",
        words: [
          { ru: "журнал", phonetic: "[zhoour-NAL]", fr: "magazine, revue", cognat: true, note: null },
          { ru: "центр", phonetic: "[TSENTR]", fr: "centre", cognat: true, note: null },
          { ru: "чай", phonetic: "[tchaï]", fr: "thé", cognat: false, note: "Double sens : чай signifie 'thé' mais aussi dans l'expression 'на чай' = pourboire !" },
          { ru: "школа", phonetic: "[SHKO-la]", fr: "école", cognat: false, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Quel son produit la lettre Ч ?",
        options: ["[ch] comme dans 'chat'", "[tch] comme dans 'tchèque'", "[ts] comme dans 'tsar'", "[j] comme dans 'jour'"],
        correct: 1,
        feedback: "Oui ! Ч = [tch]. Чай = [tchaï] = thé. C'est le son TCH de 'tchin-tchin' !"
      }
    ]
  },

  "S1J6": {
    week: 1, day: 6,
    title: "Révision Alphabet complet + Lecture",
    subtitle: "Les 33 lettres — Lire ses premiers textes russes !",
    sections: [
      {
        type: "intro",
        tag: "Révision",
        title: "L'alphabet complet en un coup d'œil",
        text: "Félicitations ! Cette semaine vous avez découvert les 33 lettres cyrilliques. Voici le tableau complet, puis des exercices de lecture."
      },
      {
        type: "alphabet",
        tag: "Alphabet Complet",
        title: "Les 33 lettres",
        letters: [
          { cyr: "А а", latin: "A", sound: "[a]", example: "аист", ex_fr: "cigogne" },
          { cyr: "Б б", latin: "B", sound: "[b]", example: "банан", ex_fr: "banane" },
          { cyr: "В в", latin: "V", sound: "[v]", example: "вода", ex_fr: "eau" },
          { cyr: "Г г", latin: "G", sound: "[g]", example: "год", ex_fr: "an" },
          { cyr: "Д д", latin: "D", sound: "[d]", example: "дом", ex_fr: "maison" },
          { cyr: "Е е", latin: "YE", sound: "[yé]", example: "ель", ex_fr: "sapin" },
          { cyr: "Ё ё", latin: "YO", sound: "[yo]", example: "ёж", ex_fr: "hérisson" },
          { cyr: "Ж ж", latin: "ZH", sound: "[j]", example: "журнал", ex_fr: "magazine" },
          { cyr: "З з", latin: "Z", sound: "[z]", example: "зуб", ex_fr: "dent" },
          { cyr: "И и", latin: "I", sound: "[i]", example: "игра", ex_fr: "jeu" },
          { cyr: "Й й", latin: "Y", sound: "[y]", example: "йога", ex_fr: "yoga" },
          { cyr: "К к", latin: "K", sound: "[k]", example: "кот", ex_fr: "chat" },
          { cyr: "Л л", latin: "L", sound: "[l]", example: "луна", ex_fr: "lune" },
          { cyr: "М м", latin: "M", sound: "[m]", example: "мама", ex_fr: "maman" },
          { cyr: "Н н", latin: "N", sound: "[n]", example: "нос", ex_fr: "nez" },
          { cyr: "О о", latin: "O/A", sound: "[o/a]", example: "окно", ex_fr: "fenêtre" },
          { cyr: "П п", latin: "P", sound: "[p]", example: "папа", ex_fr: "papa" },
          { cyr: "Р р", latin: "R", sound: "[r roulé]", example: "рот", ex_fr: "bouche" },
          { cyr: "С с", latin: "S", sound: "[s]", example: "сок", ex_fr: "jus" },
          { cyr: "Т т", latin: "T", sound: "[t]", example: "том", ex_fr: "tome" },
          { cyr: "У у", latin: "OU", sound: "[ou]", example: "ухо", ex_fr: "oreille" },
          { cyr: "Ф ф", latin: "F", sound: "[f]", example: "факт", ex_fr: "fait" },
          { cyr: "Х х", latin: "KH", sound: "[kh]", example: "хлеб", ex_fr: "pain" },
          { cyr: "Ц ц", latin: "TS", sound: "[ts]", example: "центр", ex_fr: "centre" },
          { cyr: "Ч ч", latin: "TCH", sound: "[tch]", example: "чай", ex_fr: "thé" },
          { cyr: "Ш ш", latin: "CH", sound: "[ch]", example: "школа", ex_fr: "école" },
          { cyr: "Щ щ", latin: "SHCH", sound: "[chtch]", example: "щи", ex_fr: "soupe" },
          { cyr: "Ъ ъ", latin: "—", sound: "[dur]", example: "съезд", ex_fr: "congrès" },
          { cyr: "Ы ы", latin: "Y dur", sound: "[ï dur]", example: "рыба", ex_fr: "poisson" },
          { cyr: "Ь ь", latin: "—", sound: "[mou]", example: "мать", ex_fr: "mère" },
          { cyr: "Э э", latin: "E", sound: "[é]", example: "это", ex_fr: "c'est" },
          { cyr: "Ю ю", latin: "YOU", sound: "[you]", example: "юмор", ex_fr: "humour" },
          { cyr: "Я я", latin: "YA", sound: "[ya]", example: "яблоко", ex_fr: "pomme" },
        ]
      },
      {
        type: "vocab",
        tag: "Lecture Guidée",
        title: "Lisez ces mots — vous les connaissez déjà !",
        words: [
          { ru: "кофе", phonetic: "[KO-fé]", fr: "café", cognat: true, note: null },
          { ru: "такси", phonetic: "[tak-SI]", fr: "taxi", cognat: true, note: null },
          { ru: "пицца", phonetic: "[PI-tsa]", fr: "pizza", cognat: true, note: null },
          { ru: "интернет", phonetic: "[in-ter-NET]", fr: "internet", cognat: true, note: null },
          { ru: "телефон", phonetic: "[ti-li-FON]", fr: "téléphone", cognat: true, note: null },
          { ru: "музыка", phonetic: "[MOU-zi-ka]", fr: "musique", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice Final",
        question: "Que signifie 'кофе такси пицца' ?",
        options: ["Café taxi pizza", "Thé car fromage", "Jus bus pain", "Eau bus salade"],
        correct: 0,
        feedback: "Bravo ! Ces mots sont des cognats parfaits. Vous lisez déjà le russe !"
      }
    ]
  },

  // ============================================================
  // SEMAINE 2 — Salutations, se présenter, chiffres
  // ============================================================
  "S2J1": {
    week: 2, day: 1,
    title: "Bonjour, bonsoir ! Les salutations",
    subtitle: "Dire bonjour, au revoir, merci — les bases de la politesse",
    sections: [
      {
        type: "intro",
        tag: "Semaine 2",
        title: "On parle maintenant !",
        text: "L'alphabet est acquis. Cette semaine, nous passons aux premières conversations. Vous saurez vous présenter et échanger des politesses en russe."
      },
      {
        type: "vocab",
        tag: "Vocabulaire",
        title: "Les salutations essentielles",
        words: [
          { ru: "Привет!", phonetic: "[pri-VYET]", fr: "Salut ! (informel)", cognat: false, note: null },
          { ru: "Здравствуйте!", phonetic: "[ZDRAS-tvouy-tyé]", fr: "Bonjour ! (formel)", cognat: false, note: "Vient de 'здоровье' = santé. Littéralement 'soyez en bonne santé' !" },
          { ru: "До свидания", phonetic: "[da svi-DA-ni-ya]", fr: "Au revoir (formel)", cognat: false, note: null },
          { ru: "Пока!", phonetic: "[pa-KA]", fr: "Salut / Tchao (informel)", cognat: false, note: null },
          { ru: "Спасибо", phonetic: "[spa-SI-ba]", fr: "Merci", cognat: false, note: null },
          { ru: "Пожалуйста", phonetic: "[pa-ZHAL-ous-ta]", fr: "S'il vous plaît / De rien", cognat: false, note: "Double sens : 'pожалуйста' = SVP ET 'de rien/avec plaisir' selon contexte" },
        ]
      },
      {
        type: "pronunciation",
        tag: "Prononciation",
        title: "Здравствуйте — le mot le plus difficile !",
        rules: [
          { symbol: "Здравствуйте", desc: "On ne prononce pas le premier В : [ZDRAS-tvouy-tyé]. Le groupe -вств- se simplifie !" },
          { symbol: "Пожалуйста", desc: "[pa-ZHAL-ous-ta] — le й final disparaît presque. Prononcez vite : 'pajalousta'" },
          { symbol: "Accent", desc: "En russe, l'accent n'est pas marqué dans les textes normaux. Il faut l'apprendre mot par mot." },
        ]
      },
      {
        type: "grammar",
        tag: "Structure",
        title: "Se présenter",
        pattern: "Меня зовут [prénom] = Je m'appelle [prénom]",
        examples: [
          { ru: "Меня зовут Анна.", fr: "Je m'appelle Anna." },
          { ru: "Как вас зовут?", fr: "Comment vous appelez-vous ?" },
          { ru: "Как тебя зовут?", fr: "Comment tu t'appelles ?" },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots identiques français-russe",
        words: [
          { ru: "турист", phonetic: "[tou-RIST]", fr: "touriste", cognat: true, note: null },
          { ru: "виза", phonetic: "[VI-za]", fr: "visa", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Comment dit-on 'Merci' en russe ?",
        options: ["Привет", "Пожалуйста", "Спасибо", "До свидания"],
        correct: 2,
        feedback: "Спасибо ! [spa-SI-ba] — Merci. Et pour répondre 'de rien', on dit... Пожалуйста !"
      }
    ]
  },

  "S2J2": {
    week: 2, day: 2,
    title: "Les chiffres de 0 à 10",
    subtitle: "Compter, donner son numéro, comprendre les prix",
    sections: [
      {
        type: "vocab",
        tag: "Chiffres",
        title: "0 à 10 — les indispensables",
        words: [
          { ru: "ноль / нуль", phonetic: "[nol/noul]", fr: "zéro", cognat: false, note: null },
          { ru: "один / одна", phonetic: "[a-DIN / ad-NA]", fr: "un / une", cognat: false, note: "Double sens : один = seul, solitaire (masc.), одна = seule (fém.)" },
          { ru: "два / две", phonetic: "[dva / dvyé]", fr: "deux (masc./fém.)", cognat: false, note: null },
          { ru: "три", phonetic: "[tri]", fr: "trois", cognat: false, note: null },
          { ru: "четыре", phonetic: "[tchet-I-ryé]", fr: "quatre", cognat: false, note: null },
          { ru: "пять", phonetic: "[pyat']", fr: "cinq", cognat: false, note: null },
          { ru: "шесть", phonetic: "[chyest']", fr: "six", cognat: false, note: null },
          { ru: "семь", phonetic: "[syem']", fr: "sept", cognat: false, note: null },
          { ru: "восемь", phonetic: "[VO-syem']", fr: "huit", cognat: false, note: null },
          { ru: "девять", phonetic: "[DYE-vyat']", fr: "neuf", cognat: false, note: null },
          { ru: "десять", phonetic: "[DYE-syat']", fr: "dix", cognat: false, note: null },
        ]
      },
      {
        type: "pronunciation",
        tag: "Prononciation",
        title: "Le signe mou Ь après les chiffres",
        rules: [
          { symbol: "пять [pyat']", desc: "Le Ь final palatalise le Т. Dites 'pyat'' avec la langue contre le palais à la fin." },
          { symbol: "шесть, семь...", desc: "De 5 à 20, tous les chiffres se terminent par Ь. Signe mou obligatoire !" },
          { symbol: "Astuce", desc: "Cinq = пять → pensez à 'piat' russe. Sept = семь → pensez à 'sem' (comme sème)" },
        ]
      },
      {
        type: "grammar",
        tag: "Structure",
        title: "Les prix et quantités",
        pattern: "Сколько стоит? = Combien ça coûte ?",
        examples: [
          { ru: "Один рубль", fr: "Un rouble" },
          { ru: "Три рубля", fr: "Trois roubles (avec changement de cas !)" },
          { ru: "Сколько стоит кофе?", fr: "Combien coûte le café ?" },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots quasi-identiques",
        words: [
          { ru: "студент", phonetic: "[stou-DYENT]", fr: "étudiant", cognat: true, note: null },
          { ru: "профессор", phonetic: "[pra-FYE-sor]", fr: "professeur (universitaire)", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Comment dit-on 'sept' en russe ?",
        options: ["шесть", "восемь", "семь", "девять"],
        correct: 2,
        feedback: "Семь [syem'] = sept. N'oubliez pas le signe mou Ь à la fin !"
      }
    ]
  },

  "S2J3": {
    week: 2, day: 3,
    title: "Se présenter — nationalité et langue",
    subtitle: "D'où venez-vous ? Quelle langue parlez-vous ?",
    sections: [
      {
        type: "vocab",
        tag: "Nationalités",
        title: "Pays et nationalités",
        words: [
          { ru: "Франция", phonetic: "[FRAN-tsi-ya]", fr: "France", cognat: true, note: null },
          { ru: "Россия", phonetic: "[ra-SI-ya]", fr: "Russie", cognat: true, note: null },
          { ru: "француз / француженка", phonetic: "[fran-TSOUZ]", fr: "Français / Française", cognat: false, note: null },
          { ru: "русский / русская", phonetic: "[ROOS-ki / ROOS-ka-ya]", fr: "Russe (homme/femme)", cognat: false, note: "Double sens : русский = Russe ET la langue russe !" },
          { ru: "иностранец", phonetic: "[i-nas-TRA-nyets]", fr: "étranger", cognat: false, note: null },
        ]
      },
      {
        type: "grammar",
        tag: "Structure",
        title: "Parler de soi — origines et langue",
        pattern: "Я из [pays] = Je viens de [pays]",
        examples: [
          { ru: "Я из Франции.", fr: "Je viens de France." },
          { ru: "Я говорю по-французски.", fr: "Je parle français." },
          { ru: "Вы говорите по-русски?", fr: "Vous parlez russe ?" },
          { ru: "Немного.", fr: "Un peu." },
        ]
      },
      {
        type: "pronunciation",
        tag: "Prononciation",
        title: "Les adjectifs masculins et féminins",
        rules: [
          { symbol: "-ский [ski]", desc: "Terminaison adjectif masculin. русский = russe (homme). Prononcez [ROOS-ki]" },
          { symbol: "-ская [ska-ya]", desc: "Terminaison adjectif féminin. русская = russe (femme). Prononcez [ROOS-ka-ya]" },
          { symbol: "по-", desc: "Préfixe pour 'en langue'. по-русски = en russe, по-французски = en français" },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots identiques",
        words: [
          { ru: "паспорт", phonetic: "[PAS-port]", fr: "passeport", cognat: true, note: null },
          { ru: "адрес", phonetic: "[A-dres]", fr: "adresse", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Comment dit-on 'Je parle un peu russe' ?",
        options: ["Я русский немного.", "Я говорю по-русски немного.", "Немного по-русски я говорю.", "Я говорю немного по-русски."],
        correct: 3,
        feedback: "Я говорю немного по-русски. — Littéralement 'Je parle un-peu en-russe'. En russe, l'ordre des mots est souple mais cette formulation est la plus naturelle."
      }
    ]
  },

  "S2J4": {
    week: 2, day: 4,
    title: "La famille",
    subtitle: "Père, mère, frère, sœur — le vocabulaire de la famille",
    sections: [
      {
        type: "vocab",
        tag: "Famille",
        title: "Les membres de la famille",
        words: [
          { ru: "мама", phonetic: "[MA-ma]", fr: "maman", cognat: true, note: null },
          { ru: "папа", phonetic: "[PA-pa]", fr: "papa", cognat: true, note: null },
          { ru: "брат", phonetic: "[brat]", fr: "frère", cognat: false, note: null },
          { ru: "сестра", phonetic: "[syest-RA]", fr: "sœur", cognat: false, note: null },
          { ru: "бабушка", phonetic: "[BA-boush-ka]", fr: "grand-mère", cognat: false, note: "Babushka est entré dans le vocabulaire français ! La babouchka." },
          { ru: "дедушка", phonetic: "[DYE-doush-ka]", fr: "grand-père", cognat: false, note: null },
          { ru: "сын", phonetic: "[syn]", fr: "fils", cognat: false, note: null },
          { ru: "дочь", phonetic: "[dotch']", fr: "fille (enfant)", cognat: false, note: null },
          { ru: "муж", phonetic: "[mouj]", fr: "mari / époux", cognat: false, note: "Double sens : муж = mari, mais мужчина = homme en général" },
          { ru: "жена", phonetic: "[zhi-NA]", fr: "femme / épouse", cognat: false, note: "Double sens : жена = épouse, женщина = femme en général" },
        ]
      },
      {
        type: "grammar",
        tag: "Structure",
        title: "Parler de sa famille",
        pattern: "У меня есть [famille] = J'ai un/une [famille]",
        examples: [
          { ru: "У меня есть брат.", fr: "J'ai un frère." },
          { ru: "У меня нет сестры.", fr: "Je n'ai pas de sœur." },
          { ru: "У тебя есть семья?", fr: "Tu as une famille ? (Est-ce que tu as une famille ?)" },
        ]
      },
      {
        type: "pronunciation",
        tag: "Astuce",
        title: "У меня есть — la tournure 'avoir'",
        rules: [
          { symbol: "У меня есть", desc: "Littéralement 'Chez moi il y a'. Le russe n'a pas de verbe 'avoir' — on dit 'il y a près de moi' !" },
          { symbol: "У тебя", desc: "= chez toi → tu as" },
          { symbol: "У него / неё", desc: "= chez lui / elle → il/elle a" },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots similaires",
        words: [
          { ru: "семья", phonetic: "[syem-YA]", fr: "famille", cognat: false, note: "Proche du latin 'familia' !" },
          { ru: "фамилия", phonetic: "[fa-MI-li-ya]", fr: "nom de famille", cognat: true, note: "Attention : faux-ami partiel ! Фамилия = NOM de famille (pas toute la famille)" },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Comment dit-on 'J'ai une sœur' en russe ?",
        options: ["Я сестра.", "У меня есть сестра.", "Моя сестра есть.", "У меня сестра нет."],
        correct: 1,
        feedback: "У меня есть сестра. — 'Chez moi il y a une sœur.' La structure У меня есть s'utilise pour exprimer la possession en russe !"
      }
    ]
  },

  "S2J5": {
    week: 2, day: 5,
    title: "Les couleurs et descriptions",
    subtitle: "Adjectifs de couleur — accord et utilisation",
    sections: [
      {
        type: "vocab",
        tag: "Couleurs",
        title: "Les couleurs de base",
        words: [
          { ru: "красный", phonetic: "[KRAS-ni]", fr: "rouge", cognat: false, note: "Double sens : красный = rouge, красота = beauté, красивый = beau. Même racine !" },
          { ru: "синий / голубой", phonetic: "[SI-ni / ga-lou-BOÏ]", fr: "bleu foncé / bleu ciel", cognat: false, note: "Le russe distingue deux bleus ! Синий = bleu foncé, голубой = bleu clair" },
          { ru: "зелёный", phonetic: "[zi-LYO-ni]", fr: "vert", cognat: false, note: null },
          { ru: "жёлтый", phonetic: "[ZHOL-ti]", fr: "jaune", cognat: false, note: null },
          { ru: "белый", phonetic: "[BYE-li]", fr: "blanc", cognat: false, note: null },
          { ru: "чёрный", phonetic: "[TCHOR-ni]", fr: "noir", cognat: false, note: null },
          { ru: "розовый", phonetic: "[RO-za-vi]", fr: "rose", cognat: false, note: null },
          { ru: "оранжевый", phonetic: "[a-RAN-zhi-vi]", fr: "orange", cognat: true, note: null },
        ]
      },
      {
        type: "grammar",
        tag: "Structure",
        title: "L'accord des adjectifs",
        pattern: "[adjectif masc.] + [nom masc.] — adjectif s'accorde !",
        examples: [
          { ru: "красный дом", fr: "une maison rouge (masc.)" },
          { ru: "красная машина", fr: "une voiture rouge (fém.)" },
          { ru: "красное море", fr: "la mer Rouge (neutre)" },
        ]
      },
      {
        type: "pronunciation",
        tag: "Prononciation",
        title: "Les terminaisons adjectivales",
        rules: [
          { symbol: "-ый / -ий", desc: "Masculin : красный [KRAS-ni], синий [SI-ni]" },
          { symbol: "-ая / -яя", desc: "Féminin : красная [KRAS-na-ya]" },
          { symbol: "-ое / -ее", desc: "Neutre : красное [KRAS-na-ye]" },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots proches",
        words: [
          { ru: "оранжевый", phonetic: "[a-RAN-zhi-vi]", fr: "orange (couleur)", cognat: true, note: null },
          { ru: "розовый", phonetic: "[RO-za-vi]", fr: "rose — de 'роза' = rose (fleur)", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Comment dit-on 'une voiture rouge' (машина = voiture, féminin) ?",
        options: ["красный машина", "красная машина", "красное машина", "красны машина"],
        correct: 1,
        feedback: "красная машина — машина est féminin, donc l'adjectif prend la terminaison -ая. Parfait !"
      }
    ]
  },

  "S2J6": {
    week: 2, day: 6,
    title: "Révision semaine 2 + Mini-dialogue",
    subtitle: "Consolider les bases — une conversation complète",
    sections: [
      {
        type: "intro",
        tag: "Révision",
        title: "Vous savez déjà beaucoup !",
        text: "Salutations, chiffres, famille, nationalités, couleurs. Voici une conversation réelle que vous pouvez désormais comprendre et reproduire."
      },
      {
        type: "grammar",
        tag: "Mini-Dialogue",
        title: "Première conversation en russe",
        pattern: "Dialogue complet — lisez à voix haute !",
        examples: [
          { ru: "— Привет! Как тебя зовут?", fr: "— Salut ! Comment tu t'appelles ?" },
          { ru: "— Меня зовут Пьер. А тебя?", fr: "— Je m'appelle Pierre. Et toi ?" },
          { ru: "— Я Наташа. Ты из Франции?", fr: "— Je suis Natasha. Tu viens de France ?" },
          { ru: "— Да, я француз. Ты говоришь по-французски?", fr: "— Oui, je suis français. Tu parles français ?" },
          { ru: "— Немного. У тебя есть семья в России?", fr: "— Un peu. Tu as de la famille en Russie ?" },
          { ru: "— Нет, но у меня есть друг в Москве.", fr: "— Non, mais j'ai un ami à Moscou." },
        ]
      },
      {
        type: "vocab",
        tag: "Nouveaux mots du dialogue",
        title: "Mots indispensables",
        words: [
          { ru: "да / нет", phonetic: "[da / nyet]", fr: "oui / non", cognat: false, note: null },
          { ru: "но", phonetic: "[no]", fr: "mais", cognat: false, note: "Quasi-cognat ! 'No' = mais en russe" },
          { ru: "друг / подруга", phonetic: "[drook / pad-ROO-ga]", fr: "ami (masc.) / amie (fém.)", cognat: false, note: null },
          { ru: "в Москве", phonetic: "[v mask-VYE]", fr: "à Moscou", cognat: false, note: null },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots identiques",
        words: [
          { ru: "Москва", phonetic: "[mask-VA]", fr: "Moscou (= Moskva)", cognat: true, note: null },
          { ru: "Париж", phonetic: "[pa-RISH]", fr: "Paris", cognat: true, note: "Prononcé avec un Ж final — [pa-RISH]" },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice Final",
        question: "Comment dit-on 'Oui, j'ai un ami' en russe ?",
        options: ["Нет, у меня друг.", "Да, у меня есть друг.", "Да, я есть друг.", "Да, у меня нет друг."],
        correct: 1,
        feedback: "Да, у меня есть друг. — Oui, chez moi il y a un ami. Structure parfaite !"
      }
    ]
  },

  // ============================================================
  // SEMAINE 3 — Chiffres 11-100, heure, jours, verbes essentiels
  // ============================================================
  "S3J1": {
    week: 3, day: 1,
    title: "Les chiffres de 11 à 100",
    subtitle: "Comprendre les prix, les numéros, les âges",
    sections: [
      {
        type: "vocab",
        tag: "Chiffres",
        title: "11 à 20",
        words: [
          { ru: "одиннадцать", phonetic: "[a-DIN-na-tsat']", fr: "onze", cognat: false, note: null },
          { ru: "двенадцать", phonetic: "[dvyi-NA-tsat']", fr: "douze", cognat: false, note: null },
          { ru: "тринадцать", phonetic: "[tri-NA-tsat']", fr: "treize", cognat: false, note: null },
          { ru: "двадцать", phonetic: "[DVA-tsat']", fr: "vingt", cognat: false, note: null },
          { ru: "тридцать", phonetic: "[TRI-tsat']", fr: "trente", cognat: false, note: null },
          { ru: "сорок", phonetic: "[SO-rok]", fr: "quarante", cognat: false, note: "Attention : forme irrégulière !" },
          { ru: "пятьдесят", phonetic: "[pyat'-dye-SYAT]", fr: "cinquante", cognat: false, note: null },
          { ru: "сто", phonetic: "[sto]", fr: "cent", cognat: false, note: null },
        ]
      },
      {
        type: "grammar",
        tag: "Structure",
        title: "Dire son âge",
        pattern: "Мне [nombre] лет = J'ai [nombre] ans",
        examples: [
          { ru: "Мне двадцать лет.", fr: "J'ai vingt ans." },
          { ru: "Сколько тебе лет?", fr: "Quel âge as-tu ?" },
          { ru: "Ему тридцать два года.", fr: "Il a trente-deux ans." },
        ]
      },
      {
        type: "pronunciation",
        tag: "Astuce",
        title: "лет / года / год — l'âge en russe",
        rules: [
          { symbol: "1 год", desc: "Un an → год (nominatif)" },
          { symbol: "2-4 года", desc: "2, 3, 4 ans → года (génitif singulier)" },
          { symbol: "5+ лет", desc: "5 ans et plus → лет (génitif pluriel)" },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots similaires",
        words: [
          { ru: "процент", phonetic: "[pra-TSENT]", fr: "pour cent, pourcentage", cognat: true, note: null },
          { ru: "миллион", phonetic: "[mi-li-ON]", fr: "million", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Comment dit-on 'J'ai trente ans' ?",
        options: ["Мне тридцать год.", "Мне тридцать лет.", "У меня тридцать лет.", "Я тридцать лет."],
        correct: 1,
        feedback: "Мне тридцать лет. — Mне = à moi. Après 5+, on utilise лет (génitif pluriel de год)."
      }
    ]
  },

  "S3J2": {
    week: 3, day: 2,
    title: "L'heure et le temps",
    subtitle: "Quelle heure est-il ? Les jours de la semaine",
    sections: [
      {
        type: "vocab",
        tag: "Temps",
        title: "Les jours de la semaine",
        words: [
          { ru: "понедельник", phonetic: "[pa-ni-DYEL-nik]", fr: "lundi", cognat: false, note: null },
          { ru: "вторник", phonetic: "[FTOR-nik]", fr: "mardi", cognat: false, note: null },
          { ru: "среда", phonetic: "[sry-DA]", fr: "mercredi", cognat: false, note: null },
          { ru: "четверг", phonetic: "[tchet-VYERK]", fr: "jeudi", cognat: false, note: null },
          { ru: "пятница", phonetic: "[PYAT-ni-tsa]", fr: "vendredi", cognat: false, note: null },
          { ru: "суббота", phonetic: "[soob-BO-ta]", fr: "samedi", cognat: true, note: "De l'hébreu Shabbat ! Même origine que 'sabbat' en français" },
          { ru: "воскресенье", phonetic: "[vask-ri-SYE-nye]", fr: "dimanche", cognat: false, note: "Littéralement 'résurrection' — jour de la résurrection du Christ !" },
        ]
      },
      {
        type: "grammar",
        tag: "Structure",
        title: "L'heure en russe",
        pattern: "Который час? = Quelle heure est-il ?",
        examples: [
          { ru: "Час дня.", fr: "Il est une heure (de l'après-midi)." },
          { ru: "Два часа.", fr: "Il est deux heures." },
          { ru: "Пять часов.", fr: "Il est cinq heures." },
          { ru: "Сейчас полдень.", fr: "Il est midi." },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots proches",
        words: [
          { ru: "минута", phonetic: "[mi-NOO-ta]", fr: "minute", cognat: true, note: null },
          { ru: "секунда", phonetic: "[si-KOON-da]", fr: "seconde", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Quel jour signifie 'résurrection' en russe ?",
        options: ["Пятница", "Суббота", "Воскресенье", "Понедельник"],
        correct: 2,
        feedback: "Воскресенье ! Dimanche vient de 'воскресение' (résurrection). La semaine russe porte l'histoire du christianisme orthodoxe."
      }
    ]
  },

  "S3J3": {
    week: 3, day: 3,
    title: "Les verbes essentiels — présent",
    subtitle: "Être, avoir, aller, vouloir, pouvoir",
    sections: [
      {
        type: "intro",
        tag: "Grammaire",
        title: "Le verbe en russe",
        text: "Le russe conjugue ses verbes en 6 personnes comme le français. Il existe deux groupes de conjugaison. Commençons par les plus utiles !"
      },
      {
        type: "grammar",
        tag: "Conjugaison",
        title: "ГОВОРИТЬ — Parler (Groupe 2)",
        pattern: "Я говорю / Ты говоришь / Он говорит / Мы говорим / Вы говорите / Они говорят",
        examples: [
          { ru: "Я говорю по-русски.", fr: "Je parle russe." },
          { ru: "Ты говоришь быстро.", fr: "Tu parles vite." },
          { ru: "Они говорят по-французски.", fr: "Ils parlent français." },
        ]
      },
      {
        type: "grammar",
        tag: "Conjugaison",
        title: "ХОТЕТЬ — Vouloir (irrégulier !)",
        pattern: "Я хочу / Ты хочешь / Он хочет / Мы хотим / Вы хотите / Они хотят",
        examples: [
          { ru: "Я хочу кофе.", fr: "Je veux un café." },
          { ru: "Ты хочешь есть?", fr: "Tu veux manger ?" },
          { ru: "Мы хотим в Москву.", fr: "Nous voulons aller à Moscou." },
        ]
      },
      {
        type: "vocab",
        tag: "Verbes-clés",
        title: "Verbes indispensables",
        words: [
          { ru: "знать", phonetic: "[znat']", fr: "savoir, connaître", cognat: false, note: "Я знаю = je sais. Я не знаю = je ne sais pas" },
          { ru: "понимать", phonetic: "[pa-ni-MAT']", fr: "comprendre", cognat: false, note: null },
          { ru: "идти / ходить", phonetic: "[id-TI / kha-DIT']", fr: "aller (à pied — sens unique / habituel)", cognat: false, note: "Le russe distingue 'aller une fois' et 'aller habituellement' !" },
          { ru: "можно", phonetic: "[MOZH-na]", fr: "c'est permis / on peut", cognat: false, note: "Можно ? = Je peux ? / Est-ce permis ? Mot très pratique !" },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 verbes similaires",
        words: [
          { ru: "думать", phonetic: "[DOU-mat']", fr: "penser — de думать", cognat: false, note: "Proche du latin 'duma' (assemblée, pensée collective)" },
          { ru: "организовать", phonetic: "[ar-ga-ni-ZO-vat']", fr: "organiser", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Comment dit-on 'Je ne comprends pas' en russe ?",
        options: ["Я не знаю.", "Я не понимаю.", "Я не говорю.", "Я не хочу."],
        correct: 1,
        feedback: "Я не понимаю. [ya nye pa-ni-MA-you] — Phrase essentielle pour un débutant ! Не = ne...pas, se place avant le verbe."
      }
    ]
  },

  "S3J4": {
    week: 3, day: 4,
    title: "La nourriture et les repas",
    subtitle: "Au restaurant, au marché — manger en Russie",
    sections: [
      {
        type: "vocab",
        tag: "Alimentation",
        title: "Les aliments essentiels",
        words: [
          { ru: "хлеб", phonetic: "[khlyeb]", fr: "pain", cognat: false, note: null },
          { ru: "вода", phonetic: "[va-DA]", fr: "eau", cognat: false, note: null },
          { ru: "молоко", phonetic: "[ma-la-KO]", fr: "lait", cognat: false, note: null },
          { ru: "мясо", phonetic: "[MYA-sa]", fr: "viande", cognat: false, note: null },
          { ru: "рыба", phonetic: "[RI-ba]", fr: "poisson", cognat: false, note: null },
          { ru: "суп", phonetic: "[soup]", fr: "soupe", cognat: true, note: null },
          { ru: "салат", phonetic: "[sa-LAT]", fr: "salade", cognat: true, note: null },
          { ru: "борщ", phonetic: "[borchtch]", fr: "bortsch (soupe betterave)", cognat: true, note: "Le mot борщ est entré dans toutes les langues du monde !" },
        ]
      },
      {
        type: "grammar",
        tag: "Au Restaurant",
        title: "Commander et demander",
        pattern: "Дайте мне... = Donnez-moi... / Я возьму... = Je prends...",
        examples: [
          { ru: "Дайте мне меню, пожалуйста.", fr: "Donnez-moi le menu, s'il vous plaît." },
          { ru: "Я возьму борщ и хлеб.", fr: "Je prends le bortsch et du pain." },
          { ru: "Счёт, пожалуйста!", fr: "L'addition, s'il vous plaît !" },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots identiques",
        words: [
          { ru: "суп", phonetic: "[soup]", fr: "soupe", cognat: true, note: null },
          { ru: "салат", phonetic: "[sa-LAT]", fr: "salade", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Comment demander l'addition en russe ?",
        options: ["Меню, пожалуйста!", "Дайте мне воду!", "Счёт, пожалуйста!", "Я хочу суп!"],
        correct: 2,
        feedback: "Счёт, пожалуйста ! [shchot, pazhalouïsta] — L'addition s'il vous plaît. Счёт signifie aussi 'compte bancaire' et 'score' dans un match !"
      }
    ]
  },

  "S3J5": {
    week: 3, day: 5,
    title: "Se déplacer — transports et directions",
    subtitle: "Métro, bus, taxi — trouver son chemin à Moscou",
    sections: [
      {
        type: "vocab",
        tag: "Transports",
        title: "Les moyens de transport",
        words: [
          { ru: "метро", phonetic: "[myet-RO]", fr: "métro", cognat: true, note: null },
          { ru: "автобус", phonetic: "[af-TO-bous]", fr: "autobus", cognat: true, note: null },
          { ru: "такси", phonetic: "[tak-SI]", fr: "taxi", cognat: true, note: null },
          { ru: "поезд", phonetic: "[PO-yest]", fr: "train", cognat: false, note: null },
          { ru: "самолёт", phonetic: "[sa-ma-LYOT]", fr: "avion", cognat: false, note: "Littéralement 'vole-lui-même' (сам = lui-même, лететь = voler)" },
          { ru: "машина", phonetic: "[ma-SHI-na]", fr: "voiture", cognat: false, note: null },
        ]
      },
      {
        type: "grammar",
        tag: "Directions",
        title: "Demander et comprendre son chemin",
        pattern: "Где находится [lieu] ? = Où se trouve [lieu] ?",
        examples: [
          { ru: "Где метро?", fr: "Où est le métro ?" },
          { ru: "Как добраться до центра?", fr: "Comment aller au centre ?" },
          { ru: "Направо / Налево / Прямо", fr: "À droite / À gauche / Tout droit" },
          { ru: "Первый поворот налево.", fr: "Premier tournant à gauche." },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots similaires",
        words: [
          { ru: "аэропорт", phonetic: "[a-e-ra-PORT]", fr: "aéroport", cognat: true, note: null },
          { ru: "вокзал", phonetic: "[vak-ZAL]", fr: "gare", cognat: false, note: "Vient de 'Vauxhall' (gare de Londres) ! Entré en russe au XIXe siècle." },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Que signifie 'Прямо' ?",
        options: ["À droite", "À gauche", "Tout droit", "En arrière"],
        correct: 2,
        feedback: "Прямо = tout droit. Направо = à droite, Налево = à gauche. Trois mots essentiels pour ne pas se perdre !"
      }
    ]
  },

  "S3J6": {
    week: 3, day: 6,
    title: "Révision + Jeu de rôle : à la gare",
    subtitle: "Mise en pratique — acheter un billet de train",
    sections: [
      {
        type: "grammar",
        tag: "Jeu de Rôle",
        title: "À la gare — dialogue complet",
        pattern: "Situation : acheter un billet pour Saint-Pétersbourg",
        examples: [
          { ru: "— Один билет до Санкт-Петербурга, пожалуйста.", fr: "— Un billet pour Saint-Pétersbourg, s'il vous plaît." },
          { ru: "— На какое число?", fr: "— Pour quelle date ?" },
          { ru: "— На пятницу, двадцать первого.", fr: "— Pour vendredi le 21." },
          { ru: "— В одну сторону или туда и обратно?", fr: "— Aller simple ou aller-retour ?" },
          { ru: "— В одну сторону. Сколько стоит?", fr: "— Aller simple. Combien ça coûte ?" },
          { ru: "— Три тысячи рублей.", fr: "— Trois mille roubles." },
        ]
      },
      {
        type: "vocab",
        tag: "Vocabulaire transport",
        title: "Mots-clés du dialogue",
        words: [
          { ru: "билет", phonetic: "[bi-LYET]", fr: "billet, ticket", cognat: true, note: null },
          { ru: "тысяча", phonetic: "[TY-sya-tcha]", fr: "mille (1000)", cognat: false, note: null },
          { ru: "туда и обратно", phonetic: "[tou-DA i ab-RAT-na]", fr: "aller-retour", cognat: false, note: null },
          { ru: "Санкт-Петербург", phonetic: "[sankt pi-tyer-BOURG]", fr: "Saint-Pétersbourg", cognat: true, note: null },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots identiques",
        words: [
          { ru: "билет", phonetic: "[bi-LYET]", fr: "billet (ticket)", cognat: true, note: null },
          { ru: "платформа", phonetic: "[plat-FOR-ma]", fr: "plateforme / quai", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice Final",
        question: "Comment dit-on 'Un aller-retour' en russe ?",
        options: ["Один билет.", "Туда и обратно.", "В одну сторону.", "Два билета."],
        correct: 1,
        feedback: "Туда и обратно — littéralement 'là-bas et en retour'. Pour aller simple : В одну сторону (dans une direction)."
      }
    ]
  },

  // ============================================================
  // SEMAINE 4 — Corps humain, santé, adverbes, questions
  // ============================================================
  "S4J1": {
    week: 4, day: 1,
    title: "Le corps humain",
    subtitle: "Vocabulary du corps — utile chez le médecin",
    sections: [
      {
        type: "vocab",
        tag: "Corps",
        title: "Les parties du corps",
        words: [
          { ru: "голова", phonetic: "[ga-la-VA]", fr: "tête", cognat: false, note: null },
          { ru: "рука", phonetic: "[rou-KA]", fr: "main / bras", cognat: false, note: "Double sens : рука = à la fois la main ET le bras en russe !" },
          { ru: "нога", phonetic: "[na-GA]", fr: "pied / jambe", cognat: false, note: "Double sens : нога = à la fois le pied ET la jambe !" },
          { ru: "глаз", phonetic: "[glas]", fr: "œil", cognat: false, note: null },
          { ru: "ухо", phonetic: "[OU-kha]", fr: "oreille", cognat: false, note: null },
          { ru: "нос", phonetic: "[nos]", fr: "nez", cognat: false, note: null },
          { ru: "рот", phonetic: "[rot]", fr: "bouche", cognat: false, note: null },
          { ru: "сердце", phonetic: "[SYER-tse]", fr: "cœur", cognat: false, note: null },
        ]
      },
      {
        type: "grammar",
        tag: "Chez le Médecin",
        title: "Exprimer la douleur",
        pattern: "У меня болит [partie du corps] = J'ai mal à [partie]",
        examples: [
          { ru: "У меня болит голова.", fr: "J'ai mal à la tête." },
          { ru: "У меня болит живот.", fr: "J'ai mal au ventre." },
          { ru: "Вызовите врача!", fr: "Appelez un médecin !" },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots similaires",
        words: [
          { ru: "доктор", phonetic: "[DOK-tor]", fr: "docteur", cognat: true, note: null },
          { ru: "аптека", phonetic: "[ap-TYE-ka]", fr: "pharmacie — de 'apotheca' (latin)", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Comment dit-on 'J'ai mal à la tête' ?",
        options: ["Я болею голова.", "У меня болит голова.", "Моя голова болит много.", "Голова у меня плохо."],
        correct: 1,
        feedback: "У меня болит голова. — Structure identique à 'j'ai un frère' : У меня (chez moi) болит (fait mal) голова (tête)."
      }
    ]
  },

  "S4J2": {
    week: 4, day: 2,
    title: "Les questions — qui, quoi, où, quand",
    subtitle: "Poser toutes les questions importantes",
    sections: [
      {
        type: "vocab",
        tag: "Questions",
        title: "Les mots interrogatifs",
        words: [
          { ru: "кто?", phonetic: "[kto]", fr: "qui ?", cognat: false, note: null },
          { ru: "что?", phonetic: "[shto]", fr: "quoi ? / que ?", cognat: false, note: "Attention : Что s'écrit avec Ч mais se prononce [shto] !" },
          { ru: "где?", phonetic: "[gdyé]", fr: "où ? (lieu)", cognat: false, note: null },
          { ru: "куда?", phonetic: "[kou-DA]", fr: "où ? (direction)", cognat: false, note: "Double sens : Где = où est-ce, Куда = vers où aller — distinction importante !" },
          { ru: "когда?", phonetic: "[kag-DA]", fr: "quand ?", cognat: false, note: null },
          { ru: "почему?", phonetic: "[pa-tchi-MOU]", fr: "pourquoi ?", cognat: false, note: null },
          { ru: "как?", phonetic: "[kak]", fr: "comment ?", cognat: false, note: null },
          { ru: "сколько?", phonetic: "[SKOL-ka]", fr: "combien ?", cognat: false, note: null },
        ]
      },
      {
        type: "grammar",
        tag: "Structure",
        title: "Former des questions simples",
        pattern: "[Mot interrogatif] + [groupe verbal] ?",
        examples: [
          { ru: "Кто это?", fr: "Qui est-ce ?" },
          { ru: "Что ты делаешь?", fr: "Qu'est-ce que tu fais ?" },
          { ru: "Где ты живёшь?", fr: "Où habites-tu ?" },
          { ru: "Почему ты смеёшься?", fr: "Pourquoi tu ris ?" },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots identiques",
        words: [
          { ru: "вопрос", phonetic: "[vap-ROS]", fr: "question", cognat: false, note: "Pas un cognat mais racine slave : вопрошать = interroger" },
          { ru: "информация", phonetic: "[in-for-MA-tsi-ya]", fr: "information", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Что se prononce :",
        options: ["[tchto]", "[shto]", "[kto]", "[chto]"],
        correct: 1,
        feedback: "[shto] ! C'est une exception célèbre : Что s'écrit avec Ч [tch] mais se prononce [sh]. C'est une simplification phonétique historique."
      }
    ]
  },

  "S4J3": {
    week: 4, day: 3,
    title: "La maison et les pièces",
    subtitle: "Chez soi — salon, chambre, cuisine, salle de bain",
    sections: [
      {
        type: "vocab",
        tag: "Maison",
        title: "Les pièces de la maison",
        words: [
          { ru: "квартира", phonetic: "[kvar-TI-ra]", fr: "appartement", cognat: true, note: null },
          { ru: "комната", phonetic: "[KOM-na-ta]", fr: "chambre / pièce", cognat: false, note: null },
          { ru: "кухня", phonetic: "[KOUKH-nya]", fr: "cuisine", cognat: false, note: null },
          { ru: "ванная", phonetic: "[VAN-na-ya]", fr: "salle de bain", cognat: false, note: null },
          { ru: "гостиная", phonetic: "[gas-TI-na-ya]", fr: "salon", cognat: false, note: null },
          { ru: "спальня", phonetic: "[SPAL'-nya]", fr: "chambre à coucher", cognat: false, note: null },
          { ru: "окно", phonetic: "[ak-NO]", fr: "fenêtre", cognat: false, note: null },
          { ru: "дверь", phonetic: "[dvyer']", fr: "porte", cognat: false, note: null },
        ]
      },
      {
        type: "grammar",
        tag: "Structure",
        title: "Localiser dans la maison",
        pattern: "В + [pièce] = dans [pièce] (avec changement de cas)",
        examples: [
          { ru: "Я в кухне.", fr: "Je suis dans la cuisine." },
          { ru: "Книга на столе.", fr: "Le livre est sur la table." },
          { ru: "Кот под диваном.", fr: "Le chat est sous le canapé." },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots quasi-identiques",
        words: [
          { ru: "квартира", phonetic: "[kvar-TI-ra]", fr: "appartement (du latin 'quartier')", cognat: true, note: null },
          { ru: "гараж", phonetic: "[ga-RAZH]", fr: "garage", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Que signifie 'Кот под диваном' ?",
        options: ["Le chat est sur le canapé.", "Le chat est sous le canapé.", "Le chat est dans la cuisine.", "Le chat est derrière la porte."],
        correct: 1,
        feedback: "Под = sous. Под диваном = sous le canapé. Диван vient de l'arabe/turc 'diwan' — même origine que le mot français 'divan' !"
      }
    ]
  },

  "S4J4": {
    week: 4, day: 4,
    title: "Les adjectifs — personnalité et description",
    subtitle: "Décrire les gens, les choses — vocabulaire riche",
    sections: [
      {
        type: "vocab",
        tag: "Adjectifs",
        title: "Décrire une personne",
        words: [
          { ru: "хороший / плохой", phonetic: "[kha-RO-shi / pla-KHOï]", fr: "bon / mauvais", cognat: false, note: null },
          { ru: "красивый", phonetic: "[kra-SI-vi]", fr: "beau / belle", cognat: false, note: "De красный (rouge/beau) — même racine ! красота = beauté" },
          { ru: "умный", phonetic: "[OOM-ni]", fr: "intelligent, malin", cognat: false, note: null },
          { ru: "добрый", phonetic: "[DOB-ri]", fr: "gentil, bon", cognat: false, note: "Double sens : добрый = gentil ET 'Добрый день !' = Bonjour !" },
          { ru: "весёлый", phonetic: "[vi-SYO-li]", fr: "joyeux, gai", cognat: false, note: null },
          { ru: "молодой / старый", phonetic: "[ma-la-DOÏ / STA-ri]", fr: "jeune / vieux", cognat: false, note: null },
          { ru: "большой / маленький", phonetic: "[bal'-SHOÏ / MA-lyen'-ki]", fr: "grand / petit", cognat: false, note: null },
        ]
      },
      {
        type: "grammar",
        tag: "Structure",
        title: "Décrire avec les adjectifs",
        pattern: "Он/Она [adjectif] = Il/Elle est [adjectif]",
        examples: [
          { ru: "Она очень красивая.", fr: "Elle est très belle." },
          { ru: "Он умный и добрый.", fr: "Il est intelligent et gentil." },
          { ru: "Это большой город.", fr: "C'est une grande ville." },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 adjectifs similaires",
        words: [
          { ru: "нормальный", phonetic: "[nar-MAL'-ni]", fr: "normal", cognat: true, note: null },
          { ru: "популярный", phonetic: "[pa-pou-LYAR-ni]", fr: "populaire", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Comment dit-on 'Elle est très jolie' ?",
        options: ["Она очень красивый.", "Она очень красивая.", "Она красивая очень.", "Он очень красивая."],
        correct: 1,
        feedback: "Она очень красивая. — Она = elle (féminin), donc l'adjectif prend la terminaison -ая. Очень = très."
      }
    ]
  },

  "S4J5": {
    week: 4, day: 5,
    title: "Les hobbies et loisirs",
    subtitle: "Parler de ce qu'on aime faire",
    sections: [
      {
        type: "vocab",
        tag: "Loisirs",
        title: "Les activités populaires",
        words: [
          { ru: "читать", phonetic: "[tchi-TAT']", fr: "lire", cognat: false, note: null },
          { ru: "слушать музыку", phonetic: "[SLOU-shat' MOU-zi-kou]", fr: "écouter de la musique", cognat: false, note: null },
          { ru: "смотреть фильм", phonetic: "[smatr-YET' film]", fr: "regarder un film", cognat: false, note: null },
          { ru: "играть в футбол", phonetic: "[ig-RAT' v foud-BOL]", fr: "jouer au football", cognat: true, note: null },
          { ru: "путешествовать", phonetic: "[pou-tye-SHEST-va-vat']", fr: "voyager", cognat: false, note: null },
          { ru: "готовить", phonetic: "[ga-TO-vit']", fr: "cuisiner", cognat: false, note: null },
        ]
      },
      {
        type: "grammar",
        tag: "Structure",
        title: "Exprimer ses goûts",
        pattern: "Я люблю [verbe inf.] = J'aime [faire qqch.]",
        examples: [
          { ru: "Я люблю читать.", fr: "J'aime lire." },
          { ru: "Мне нравится музыка.", fr: "J'aime la musique. (elle me plaît)" },
          { ru: "Я не люблю готовить.", fr: "Je n'aime pas cuisiner." },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots identiques",
        words: [
          { ru: "футбол", phonetic: "[foud-BOL]", fr: "football", cognat: true, note: null },
          { ru: "музыка", phonetic: "[MOU-zi-ka]", fr: "musique", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Comment dit-on 'J'aime voyager' ?",
        options: ["Я нравится путешествовать.", "Мне люблю путешествовать.", "Я люблю путешествовать.", "Мне путешествовать нравится очень."],
        correct: 2,
        feedback: "Я люблю путешествовать. — Я люблю (J'aime) + infinitif. Structure simple et directe !"
      }
    ]
  },

  "S4J6": {
    week: 4, day: 6,
    title: "Révision Mois 1 — Test de niveau A1",
    subtitle: "Bilan des 4 premières semaines — êtes-vous prêt pour le Mois 2 ?",
    sections: [
      {
        type: "intro",
        tag: "Bilan Mois 1",
        title: "Félicitations ! Un mois de russe !",
        text: "Vous avez appris l'alphabet, les salutations, les chiffres, les couleurs, la famille, les verbes essentiels. C'est le niveau A1 ! Le Mois 2 vous emmènera vers A2."
      },
      {
        type: "vocab",
        tag: "Récapitulatif",
        title: "Les 20 mots les plus utiles appris",
        words: [
          { ru: "Привет / Здравствуйте", phonetic: "", fr: "Salut / Bonjour", cognat: false, note: null },
          { ru: "Спасибо / Пожалуйста", phonetic: "", fr: "Merci / SVP / De rien", cognat: false, note: null },
          { ru: "Да / Нет", phonetic: "", fr: "Oui / Non", cognat: false, note: null },
          { ru: "Я не понимаю", phonetic: "", fr: "Je ne comprends pas", cognat: false, note: null },
          { ru: "Меня зовут...", phonetic: "", fr: "Je m'appelle...", cognat: false, note: null },
          { ru: "Сколько стоит?", phonetic: "", fr: "Combien ça coûte ?", cognat: false, note: null },
          { ru: "Где метро?", phonetic: "", fr: "Où est le métro ?", cognat: false, note: null },
          { ru: "Я люблю / Я хочу", phonetic: "", fr: "J'aime / Je veux", cognat: false, note: null },
        ]
      },
      {
        type: "grammar",
        tag: "Structures maîtrisées",
        title: "Ce que vous savez construire",
        pattern: "Récapitulatif des constructions apprises",
        examples: [
          { ru: "Это + [nom]", fr: "C'est un/une..." },
          { ru: "У меня есть / нет + [nom]", fr: "J'ai / Je n'ai pas de..." },
          { ru: "Я люблю + [infinitif]", fr: "J'aime + verbe" },
          { ru: "У меня болит + [corps]", fr: "J'ai mal à..." },
          { ru: "Мне [nombre] лет", fr: "J'ai [x] ans" },
        ]
      },
      {
        type: "exercise",
        tag: "Test Final Mois 1",
        question: "Traduisez : 'Bonjour ! Je m'appelle Marie, j'ai 25 ans et j'aime voyager.'",
        options: [
          "Привет! Меня зовут Мари, мне двадцать пять лет и я люблю путешествовать.",
          "Здравствуйте! Я Мари, у меня двадцать пять год и мне нравится.",
          "Привет! Зовут Мари, мне двадцать пять лет и люблю путешествовать.",
          "Добрый день! Я зовут Мари, двадцать пять мне лет и путешествовать люблю."
        ],
        correct: 0,
        feedback: "Parfait ! Привет! Меня зовут Мари, мне двадцать пять лет и я люблю путешествовать. — Toutes les structures sont correctes. Vous êtes niveau A1 !"
      }
    ]
  },

  // ============================================================
  // SEMAINE 5 — MOIS 2 : Conjugaisons, présent complet
  // ============================================================
  "S5J1": {
    week: 5, day: 1,
    title: "Mois 2 : Les verbes du 1er groupe",
    subtitle: "Conjugaison en -ать et -ять — le présent complet",
    sections: [
      {
        type: "intro",
        tag: "Mois 2 — Semaine 5",
        title: "On monte en niveau !",
        text: "Ce mois-ci, vous maîtriserez la conjugaison au présent, les questions complexes, et les situations de la vie quotidienne. Objectif : A2 !"
      },
      {
        type: "grammar",
        tag: "Conjugaison",
        title: "Groupe 1 : verbes en -ать",
        pattern: "ЧИТАТЬ (lire) → чита- + terminaisons",
        examples: [
          { ru: "Я читаю", fr: "Je lis" },
          { ru: "Ты читаешь", fr: "Tu lis" },
          { ru: "Он/Она читает", fr: "Il/Elle lit" },
          { ru: "Мы читаем", fr: "Nous lisons" },
          { ru: "Вы читаете", fr: "Vous lisez" },
          { ru: "Они читают", fr: "Ils/Elles lisent" },
        ]
      },
      {
        type: "vocab",
        tag: "Verbes Groupe 1",
        title: "Les verbes en -ать les plus utiles",
        words: [
          { ru: "читать", phonetic: "[tchi-TAT']", fr: "lire", cognat: false, note: null },
          { ru: "делать", phonetic: "[DYE-lat']", fr: "faire", cognat: false, note: null },
          { ru: "знать", phonetic: "[znat']", fr: "savoir", cognat: false, note: null },
          { ru: "слушать", phonetic: "[SLOU-shat']", fr: "écouter", cognat: false, note: null },
          { ru: "работать", phonetic: "[ra-BO-tat']", fr: "travailler", cognat: false, note: null },
          { ru: "думать", phonetic: "[DOU-mat']", fr: "penser", cognat: false, note: null },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 verbes similaires",
        words: [
          { ru: "организовать", phonetic: "[ar-ga-ni-ZO-vat']", fr: "organiser", cognat: true, note: null },
          { ru: "планировать", phonetic: "[pla-NI-ra-vat']", fr: "planifier", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Conjuguez ЧИТАТЬ : 'Мы ...' (nous lisons)",
        options: ["читаю", "читает", "читаем", "читают"],
        correct: 2,
        feedback: "читаем ! La terminaison -ем correspond à 'nous'. Мы читаем = nous lisons."
      }
    ]
  },

  "S5J2": {
    week: 5, day: 2,
    title: "La négation et les questions",
    subtitle: "Ne...pas, est-ce que...?, particules interrogatives",
    sections: [
      {
        type: "grammar",
        tag: "Négation",
        title: "Dire NON en russe",
        pattern: "НЕ + [verbe] = ne pas [verbe]",
        examples: [
          { ru: "Я не понимаю.", fr: "Je ne comprends pas." },
          { ru: "Он не работает.", fr: "Il ne travaille pas." },
          { ru: "У меня нет времени.", fr: "Je n'ai pas le temps. (litt. : pas de temps)" },
          { ru: "Никогда!", fr: "Jamais !" },
        ]
      },
      {
        type: "grammar",
        tag: "Questions",
        title: "Poser des questions sans mot interrogatif",
        pattern: "Intonation montante OU ли = est-ce que",
        examples: [
          { ru: "Ты говоришь по-русски?", fr: "Tu parles russe ?" },
          { ru: "Говоришь ли ты по-русски?", fr: "Est-ce que tu parles russe ? (soutenu)" },
          { ru: "Правда?", fr: "Vraiment ? / C'est vrai ?" },
        ]
      },
      {
        type: "vocab",
        tag: "Mots de liaison",
        title: "Connecteurs essentiels",
        words: [
          { ru: "и / а / но", phonetic: "[i / a / no]", fr: "et / mais (contraste) / mais (opposition)", cognat: false, note: "А est plus nuancé que И : А = 'et pourtant', 'tandis que'" },
          { ru: "потому что", phonetic: "[pa-ta-MOU shto]", fr: "parce que", cognat: false, note: null },
          { ru: "поэтому", phonetic: "[pa-E-ta-mou]", fr: "donc, c'est pourquoi", cognat: false, note: null },
          { ru: "если", phonetic: "[YES-li]", fr: "si (conditionnel)", cognat: false, note: null },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots identiques",
        words: [
          { ru: "но", phonetic: "[no]", fr: "mais", cognat: false, note: "Quasi-cognat avec 'no' anglais/espagnol/italien mais signifie 'mais' !" },
          { ru: "класс!", phonetic: "[klass]", fr: "super ! / classe !", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Comment dit-on 'Je ne travaille pas parce que je suis malade' ?",
        options: [
          "Я не работаю потому что я болен.",
          "Я работаю не потому что болен.",
          "Не я работаю потому что болен.",
          "Я болен потому что не работаю."
        ],
        correct: 0,
        feedback: "Я не работаю потому что я болен. — НЕ se place juste avant le verbe. Болен = malade (forme courte de больной)."
      }
    ]
  },

  "S5J3": {
    week: 5, day: 3,
    title: "Les métiers et le travail",
    subtitle: "Parler de sa profession — vocabulaire professionnel",
    sections: [
      {
        type: "vocab",
        tag: "Métiers",
        title: "Les professions courantes",
        words: [
          { ru: "врач", phonetic: "[vratch]", fr: "médecin", cognat: false, note: null },
          { ru: "учитель / учительница", phonetic: "[ou-Tchi-tyel']", fr: "enseignant(e)", cognat: false, note: null },
          { ru: "инженер", phonetic: "[in-zhi-NYER]", fr: "ingénieur", cognat: true, note: null },
          { ru: "программист", phonetic: "[pra-gra-MIST]", fr: "programmeur", cognat: true, note: null },
          { ru: "журналист", phonetic: "[zhoour-na-LIST]", fr: "journaliste", cognat: true, note: null },
          { ru: "бизнесмен", phonetic: "[biz-nyes-MYEN]", fr: "homme d'affaires", cognat: true, note: null },
          { ru: "повар", phonetic: "[PO-var]", fr: "cuisinier / chef", cognat: false, note: null },
        ]
      },
      {
        type: "grammar",
        tag: "Structure",
        title: "Parler de son travail",
        pattern: "Я работаю + [lieu] / Я [métier]",
        examples: [
          { ru: "Кем ты работаешь?", fr: "Quel est ton métier ? (litt. : en quoi travailles-tu ?)" },
          { ru: "Я работаю врачом.", fr: "Je suis médecin. (je travaille en tant que médecin)" },
          { ru: "Я работаю в офисе.", fr: "Je travaille au bureau." },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots identiques",
        words: [
          { ru: "менеджер", phonetic: "[MYE-nye-djer]", fr: "manager", cognat: true, note: null },
          { ru: "директор", phonetic: "[di-RYEK-tor]", fr: "directeur", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Comment demande-t-on 'Quel est ton métier ?' en russe ?",
        options: ["Что ты делаешь?", "Кем ты работаешь?", "Где ты работаешь?", "Как ты работаешь?"],
        correct: 1,
        feedback: "Кем ты работаешь ? — Кем = 'en quoi' (instrumental de кто). Cette tournure est la plus naturelle pour demander le métier."
      }
    ]
  },

  "S5J4": {
    week: 5, day: 4,
    title: "Les mois et les saisons",
    subtitle: "Parler du temps — météo et calendrier",
    sections: [
      {
        type: "vocab",
        tag: "Calendrier",
        title: "Les mois de l'année",
        words: [
          { ru: "январь", phonetic: "[yan-VAR']", fr: "janvier", cognat: true, note: null },
          { ru: "февраль", phonetic: "[fev-RAL']", fr: "février", cognat: true, note: null },
          { ru: "март", phonetic: "[mart]", fr: "mars", cognat: true, note: null },
          { ru: "апрель", phonetic: "[ap-RYEL']", fr: "avril", cognat: true, note: null },
          { ru: "май", phonetic: "[maï]", fr: "mai", cognat: true, note: null },
          { ru: "июнь", phonetic: "[i-YOUN']", fr: "juin", cognat: true, note: null },
          { ru: "июль", phonetic: "[i-YOUL']", fr: "juillet", cognat: true, note: null },
          { ru: "декабрь", phonetic: "[di-KABR']", fr: "décembre", cognat: true, note: null },
        ]
      },
      {
        type: "vocab",
        tag: "Météo",
        title: "Les saisons et la météo",
        words: [
          { ru: "зима / лето / весна / осень", phonetic: "[zi-MA / LYE-ta / vyes-NA / O-syen']", fr: "hiver / été / printemps / automne", cognat: false, note: null },
          { ru: "холодно / жарко", phonetic: "[KHO-lad-na / ZHAR-ka]", fr: "il fait froid / il fait chaud", cognat: false, note: null },
          { ru: "идёт дождь", phonetic: "[i-DYOT dosht']", fr: "il pleut", cognat: false, note: null },
          { ru: "идёт снег", phonetic: "[i-DYOT snyek]", fr: "il neige", cognat: false, note: null },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mois identiques",
        words: [
          { ru: "март", phonetic: "[mart]", fr: "mars (identique !)", cognat: true, note: null },
          { ru: "май", phonetic: "[maï]", fr: "mai (identique !)", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Comment dit-on 'Il neige' en russe ?",
        options: ["Идёт дождь.", "Холодно.", "Идёт снег.", "Зима."],
        correct: 2,
        feedback: "Идёт снег — littéralement 'la neige marche/va'. Le russe dit que la neige 'va' (идти = aller/marcher). Même construction pour la pluie : идёт дождь."
      }
    ]
  },

  "S5J5": {
    week: 5, day: 5,
    title: "Les achats et les magasins",
    subtitle: "Faire ses courses — demander, marchander, payer",
    sections: [
      {
        type: "vocab",
        tag: "Commerce",
        title: "Dans les magasins",
        words: [
          { ru: "магазин", phonetic: "[ma-ga-ZIN]", fr: "magasin, boutique", cognat: true, note: null },
          { ru: "супермаркет", phonetic: "[sou-per-MAR-kyet]", fr: "supermarché", cognat: true, note: null },
          { ru: "рынок", phonetic: "[RI-nak]", fr: "marché (en plein air)", cognat: false, note: null },
          { ru: "касса", phonetic: "[KA-ssa]", fr: "caisse", cognat: true, note: null },
          { ru: "деньги", phonetic: "[DYEN'-gi]", fr: "argent", cognat: false, note: null },
          { ru: "рубль", phonetic: "[roubl']", fr: "rouble", cognat: true, note: null },
          { ru: "скидка", phonetic: "[SKID-ka]", fr: "réduction, remise", cognat: false, note: null },
        ]
      },
      {
        type: "grammar",
        tag: "Au Magasin",
        title: "Dialogues d'achat",
        pattern: "Покажите мне... = Montrez-moi...",
        examples: [
          { ru: "Покажите мне это, пожалуйста.", fr: "Montrez-moi ça s'il vous plaît." },
          { ru: "Есть ли скидка?", fr: "Y a-t-il une réduction ?" },
          { ru: "Можно попробовать?", fr: "Puis-je essayer ?" },
          { ru: "Я возьму это.", fr: "Je prends ça." },
        ]
      },
      {
        type: "vocab",
        tag: "Cognats du jour",
        title: "2 mots proches",
        words: [
          { ru: "касса", phonetic: "[KA-ssa]", fr: "caisse (de 'cassa' italien)", cognat: true, note: null },
          { ru: "чек", phonetic: "[tchek]", fr: "reçu, ticket de caisse", cognat: true, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Exercice",
        question: "Comment dit-on 'Combien ça coûte ?' en russe ?",
        options: ["Что это?", "Сколько стоит?", "Покажите мне?", "Деньги есть?"],
        correct: 1,
        feedback: "Сколько стоит ? — Сколько = combien, стоит = ça coûte. Phrase magique pour tout voyageur !"
      }
    ]
  },

  "S5J6": {
    week: 5, day: 6,
    title: "Révision + Prononciation avancée",
    subtitle: "Réduction vocalique et assimilation — parler comme un natif",
    sections: [
      {
        type: "pronunciation",
        tag: "Prononciation Avancée",
        title: "La réduction vocalique — règles complètes",
        rules: [
          { symbol: "О → [a]", desc: "Non-accentué : молоко [malakO], хорошо [kharaSHO], спасибо [spaSIba]" },
          { symbol: "Е → [i]", desc: "Non-accentué : река [riKA], метро [miTRO], сестра [sisTRA]" },
          { symbol: "Я → [i]", desc: "Non-accentué : язык [iZYK] (langue), яблоко [YAbaka]" },
        ]
      },
      {
        type: "pronunciation",
        tag: "Assimilation",
        title: "Les consonnes qui changent",
        rules: [
          { symbol: "В fin de mot", desc: "В → [f] : Москов → [Moskovf] (rare mais existe)" },
          { symbol: "Г final", desc: "Г → [k] : друг [druk], снег [snyek]" },
          { symbol: "Д final", desc: "Д → [t] : год [got], город [GOrat]" },
          { symbol: "Б, В, З, Ж, Г final", desc: "Toutes les sonores deviennent sourdes en fin de mot : закон des voisements." },
        ]
      },
      {
        type: "vocab",
        tag: "Révision Vocabulaire",
        title: "50 mots les plus fréquents en russe",
        words: [
          { ru: "не", phonetic: "[nye]", fr: "ne pas", cognat: false, note: null },
          { ru: "на", phonetic: "[na]", fr: "sur / à (lieu)", cognat: false, note: null },
          { ru: "в", phonetic: "[v]", fr: "dans / en", cognat: false, note: null },
          { ru: "с", phonetic: "[s]", fr: "avec / de", cognat: false, note: "Double sens : с = avec (с другом) ET de (с горы = du sommet)" },
          { ru: "по", phonetic: "[pa]", fr: "le long de / par / selon", cognat: false, note: null },
          { ru: "всё", phonetic: "[fsyo]", fr: "tout / c'est tout", cognat: false, note: null },
          { ru: "уже", phonetic: "[ou-ZHE]", fr: "déjà", cognat: false, note: null },
          { ru: "ещё", phonetic: "[yi-SHCHO]", fr: "encore / toujours", cognat: false, note: null },
        ]
      },
      {
        type: "exercise",
        tag: "Prononciation",
        question: "Comment se prononce 'снег' (neige) en fin de phrase ?",
        options: ["[sneg]", "[snyeg]", "[snyek]", "[snek]"],
        correct: 2,
        feedback: "[snyek] ! Le Г final en russe se dévoise → [k]. C'est la loi d'assimilation des consonnes finales, très régulière en russe."
      }
    ]
  },

};

// ============================================================
// Génération automatique des leçons simples pour les semaines 6-13
// (Mois 2 suite et Mois 3 complet)
// ============================================================

const WEEK_THEMES = {
  6:  { theme: "Les verbes de mouvement", topics: ["aller/venir", "conduire/prendre", "partir/arriver", "courir/marcher", "Révision + Dialogue voyage", "Test semaine 6"] },
  7:  { theme: "La santé et le corps", topics: ["Chez le médecin", "Symptômes et maladies", "À la pharmacie", "Les émotions", "Bien-être et sport", "Révision santé"] },
  8:  { theme: "Manger et boire", topics: ["Petit-déjeuner russe", "Au restaurant", "Les boissons", "Cuisiner", "Recettes simples", "Révision alimentation"] },
  9:  { theme: "La ville et les lieux", topics: ["Se repérer en ville", "Les monuments", "La nature", "À l'hôtel", "Faire du tourisme", "Révision ville"] },
  10: { theme: "Le passé — был, была", topics: ["Passé masculin", "Passé féminin", "Passé pluriel", "Raconter sa journée", "Raconter ses vacances", "Révision passé"] },
  11: { theme: "Le futur et les projets", topics: ["Futur simple", "Faire des projets", "Les rêves", "Conditions si/alors", "Le futur proche", "Révision futur"] },
  12: { theme: "Culture et civilisation russes", topics: ["Littérature russe", "Musique et arts", "Fêtes russes", "Cuisine russe", "Histoire moderne", "Révision culture"] },
  13: { theme: "Révision A2 et test final", topics: ["Révision grammaire", "Révision vocabulaire", "Test dialogue A2", "Compréhension écrite", "Compréhension orale", "Certification A2"] },
};

// Generate skeleton lessons for weeks 6-13
for (let week = 6; week <= 13; week++) {
  const wt = WEEK_THEMES[week];
  for (let day = 1; day <= 6; day++) {
    const key = `S${week}J${day}`;
    if (!LESSONS_DATA[key]) {
      LESSONS_DATA[key] = {
        week,
        day,
        title: wt.topics[day - 1],
        subtitle: `Semaine ${week} — ${wt.theme}`,
        sections: [
          {
            type: "intro",
            tag: `Semaine ${week} — Jour ${day}`,
            title: wt.topics[day - 1],
            text: `Cette leçon couvre : ${wt.topics[day-1]}. Thème de la semaine : ${wt.theme}. Bonne étude !`
          },
          {
            type: "vocab",
            tag: "Vocabulaire",
            title: "Vocabulaire du jour",
            words: [
              { ru: "слово", phonetic: "[SLO-va]", fr: "mot", cognat: false, note: null },
              { ru: "язык", phonetic: "[ya-ZYK]", fr: "langue / langage", cognat: false, note: "Double sens : язык = langue (organe) ET langue (idiome) !" },
              { ru: "текст", phonetic: "[tekst]", fr: "texte", cognat: true, note: null },
              { ru: "урок", phonetic: "[ou-ROK]", fr: "leçon / cours", cognat: false, note: null },
            ]
          },
          {
            type: "grammar",
            tag: "Structure",
            title: "Construction de la leçon",
            pattern: "À approfondir dans la version complète",
            examples: [
              { ru: "Я учу русский язык.", fr: "J'apprends le russe." },
              { ru: "Каждый день немного.", fr: "Un peu chaque jour." },
            ]
          },
          {
            type: "vocab",
            tag: "Cognats du jour",
            title: "2 mots similaires",
            words: [
              { ru: "прогресс", phonetic: "[pra-GRYESS]", fr: "progrès", cognat: true, note: null },
              { ru: "практика", phonetic: "[PRAK-ti-ka]", fr: "pratique", cognat: true, note: null },
            ]
          },
          {
            type: "exercise",
            tag: "Exercice",
            question: "Que signifie 'Я учу русский язык' ?",
            options: ["Je parle russe.", "J'apprends le russe.", "J'aime le russe.", "Je lis le russe."],
            correct: 1,
            feedback: "J'apprends le russe ! Учить = apprendre/enseigner. Continuez ainsi — вы молодцы ! (vous êtes formidables !)"
          }
        ]
      };
    }
  }
}

// Flat list for navigation
const ALL_LESSONS_KEYS = [];
for (let w = 1; w <= 15; w++) {
  for (let d = 1; d <= 6; d++) {
    const k = `S${w}J${d}`;
    if (LESSONS_DATA[k]) ALL_LESSONS_KEYS.push(k);
  }
}
