// ═══════════════════════════════════════════════════════════════════
// POLYGLOTTE — CURRICULUM DATA  (A1 → B1 pour 4 langues)
// ═══════════════════════════════════════════════════════════════════
// AJOUTER DES EXERCICES : copiez un bloc exercise et changez les données.
// Types disponibles : flashcard | qcm | pair | order | listen | truefalse | fill | grammar
// Chaque leçon = tableau d'exercices. Ajoutez des leçons à une unité, ou de nouvelles unités.
// ═══════════════════════════════════════════════════════════════════

const CURRICULUM = {

// ╔══════════════════════════════════════════════════╗
// ║              🇷🇺  RUSSE                          ║
// ╚══════════════════════════════════════════════════╝
ru: {
  name: 'Russe', native: 'Русский', flag: '🇷🇺', dir: 'ltr', color: '#e05a5a',
  voice: 'ru-RU',
  units: [
    // ─── A1 ──────────────────────────────────────────────
    {
      id: 'ru-u1', level: 'A1', title: 'Alphabet I', icon: '🔤',
      lessons: [
        { id: 'ru-u1-l1', title: 'Voyelles', exercises: [
          { type:'flashcard', q:'А', a:'A (comme "ah")', hint:'La première lettre' },
          { type:'flashcard', q:'Е', a:'YE (comme "yé")', hint:'Son "ye"' },
          { type:'flashcard', q:'И', a:'I (comme "i")', hint:'Son "i"' },
          { type:'flashcard', q:'О', a:'O (comme "o")', hint:'Son "o"' },
          { type:'flashcard', q:'У', a:'OU (comme "ou")', hint:'Son "ou"' },
          { type:'flashcard', q:'Ы', a:'Y (son dur "î")', hint:'Son unique au russe' },
          { type:'flashcard', q:'Э', a:'É (comme "é")', hint:'E ouvert' },
          { type:'flashcard', q:'Ю', a:'YOU (comme "you")', hint:'Son "you"' },
          { type:'flashcard', q:'Я', a:'YA (comme "ya")', hint:'Son "ya"' },
          { type:'qcm', q:'Quelle voyelle se prononce "ou" ?', choices:['У','И','А','Е'], correct:0 },
          { type:'qcm', q:'Comment se prononce Я ?', choices:['ya','a','ye','yi'], correct:0 },
          { type:'truefalse', q:'И se prononce comme le "i" français', correct: true },
          { type:'truefalse', q:'Ю se prononce "yu"', correct: true },
          { type:'fill', q:'C___t en russe : КОТ', answer:'o', hint:'voyelle du milieu : [А/О/У]', choices:['А','О','У'] },
        ]},
        { id: 'ru-u1-l2', title: 'Consonnes similaires', exercises: [
          { type:'flashcard', q:'Б', a:'B', hint:'Similaire au B' },
          { type:'flashcard', q:'В', a:'V', hint:'Similaire au V' },
          { type:'flashcard', q:'Г', a:'G', hint:'Similaire au G' },
          { type:'flashcard', q:'Д', a:'D', hint:'Similaire au D' },
          { type:'flashcard', q:'З', a:'Z', hint:'Similaire au Z' },
          { type:'flashcard', q:'К', a:'K', hint:'Similaire au K' },
          { type:'flashcard', q:'Л', a:'L', hint:'Similaire au L' },
          { type:'flashcard', q:'М', a:'M', hint:'Similaire au M' },
          { type:'flashcard', q:'Н', a:'N', hint:'Similaire au N' },
          { type:'flashcard', q:'П', a:'P', hint:'Similaire au P' },
          { type:'flashcard', q:'Р', a:'R roulé', hint:'R vibrant' },
          { type:'flashcard', q:'С', a:'S', hint:'Similaire au S' },
          { type:'flashcard', q:'Т', a:'T', hint:'Similaire au T' },
          { type:'flashcard', q:'Ф', a:'F', hint:'Similaire au F' },
          { type:'qcm', q:'Б se prononce comme ?', choices:['B','V','P','D'], correct:0 },
          { type:'qcm', q:'Р se prononce comme ?', choices:['R roulé','L','W','V'], correct:0 },
        ]},
        { id: 'ru-u1-l3', title: 'Lettres spéciales', exercises: [
          { type:'flashcard', q:'Ж', a:'J (comme "jeu")', hint:'Son j français' },
          { type:'flashcard', q:'Х', a:'KH (comme "Bach")', hint:'Gutturale' },
          { type:'flashcard', q:'Ц', a:'TS (comme "tsar")', hint:'Affriquée' },
          { type:'flashcard', q:'Ч', a:'TCH (comme "tchèque")', hint:'Son tch' },
          { type:'flashcard', q:'Ш', a:'CH dur (comme "chi")', hint:'CH dur' },
          { type:'flashcard', q:'Щ', a:'CHTCH', hint:'CH mouillé' },
          { type:'flashcard', q:'Й', a:'Y court (comme "yeux")', hint:'Semi-voyelle' },
          { type:'flashcard', q:'Ъ', a:'Signe dur (pas de son)', hint:'Sépare les sons' },
          { type:'flashcard', q:'Ь', a:'Signe mou (pas de son)', hint:'Mouille la consonne' },
          { type:'qcm', q:'Ж se prononce comme ?', choices:['J de "jeu"','CH de "chat"','Z','GN'], correct:0 },
          { type:'qcm', q:'Ч se prononce comme ?', choices:['TCH','TS','CH','TH'], correct:0 },
          { type:'truefalse', q:'Ъ et Ь ont tous les deux un son propre', correct: false },
          { type:'truefalse', q:'Ш se prononce comme le CH français', correct: true },
        ]},
      ]
    },
    {
      id: 'ru-u2', level: 'A1', title: 'Salutations', icon: '👋',
      lessons: [
        { id: 'ru-u2-l1', title: 'Bonjour & Au revoir', exercises: [
          { type:'flashcard', q:'Привет', a:'Salut (familier)', hint:'Entre amis' },
          { type:'flashcard', q:'Здравствуйте', a:'Bonjour (formel)', hint:'Poli, à un inconnu' },
          { type:'flashcard', q:'Добрый день', a:'Bonjour (après-midi)', hint:'Milieu de journée' },
          { type:'flashcard', q:'Доброе утро', a:'Bonjour (matin)', hint:'Le matin' },
          { type:'flashcard', q:'Добрый вечер', a:'Bonsoir', hint:'Le soir' },
          { type:'flashcard', q:'До свидания', a:'Au revoir', hint:'Formel' },
          { type:'flashcard', q:'Пока', a:'Salut / Ciao', hint:'Familier' },
          { type:'qcm', q:'Comment dire "Salut" en russe ?', choices:['Привет','Здравствуйте','Пока','Спасибо'], correct:0 },
          { type:'qcm', q:'Que signifie "До свидания" ?', choices:['Au revoir','Bonjour','Merci','S\'il vous plaît'], correct:0 },
          { type:'listen', q:'Écoutez et identifiez', text:'Привет', choices:['Salut','Au revoir','Merci','S\'il vous plaît'], correct:0 },
          { type:'listen', q:'Écoutez et identifiez', text:'До свидания', choices:['Au revoir','Bonjour','Bonsoir','À bientôt'], correct:0 },
        ]},
        { id: 'ru-u2-l2', title: 'Politesse & Formules', exercises: [
          { type:'flashcard', q:'Спасибо', a:'Merci', hint:'Mot magique' },
          { type:'flashcard', q:'Пожалуйста', a:'S\'il vous plaît / De rien', hint:'Double usage' },
          { type:'flashcard', q:'Извините', a:'Excusez-moi / Pardon', hint:'Pour s\'excuser' },
          { type:'flashcard', q:'Простите', a:'Pardonnez-moi', hint:'Plus formel' },
          { type:'flashcard', q:'Как дела ?', a:'Comment allez-vous ?', hint:'Question clé' },
          { type:'flashcard', q:'Хорошо', a:'Bien', hint:'Réponse positive' },
          { type:'flashcard', q:'Плохо', a:'Mal', hint:'Réponse négative' },
          { type:'flashcard', q:'Нормально', a:'Ça va (moyen)', hint:'Neutre' },
          { type:'qcm', q:'Que signifie "Спасибо" ?', choices:['Merci','De rien','Bonjour','Pardon'], correct:0 },
          { type:'qcm', q:'Comment demander "Comment allez-vous ?" ?', choices:['Как дела?','Что это?','Где ты?','Как тебя зовут?'], correct:0 },
          { type:'pair', q:'Associez les mots et leurs traductions', pairs:[['Спасибо','Merci'],['Хорошо','Bien'],['Плохо','Mal'],['Нормально','Ça va']] },
        ]},
      ]
    },
    {
      id: 'ru-u3', level: 'A1', title: 'Chiffres & Dates', icon: '🔢',
      lessons: [
        { id: 'ru-u3-l1', title: 'Chiffres 1–10', exercises: [
          { type:'flashcard', q:'Один', a:'1', hint:'Un' },
          { type:'flashcard', q:'Два', a:'2', hint:'Deux' },
          { type:'flashcard', q:'Три', a:'3', hint:'Trois' },
          { type:'flashcard', q:'Четыре', a:'4', hint:'Quatre' },
          { type:'flashcard', q:'Пять', a:'5', hint:'Cinq' },
          { type:'flashcard', q:'Шесть', a:'6', hint:'Six' },
          { type:'flashcard', q:'Семь', a:'7', hint:'Sept' },
          { type:'flashcard', q:'Восемь', a:'8', hint:'Huit' },
          { type:'flashcard', q:'Девять', a:'9', hint:'Neuf' },
          { type:'flashcard', q:'Десять', a:'10', hint:'Dix' },
          { type:'qcm', q:'Comment dit-on "5" en russe ?', choices:['Пять','Шесть','Семь','Три'], correct:0 },
          { type:'order', q:'Remettez les chiffres dans l\'ordre (1→5)', words:['Пять','Один','Три','Два','Четыре'], answer:['Один','Два','Три','Четыре','Пять'] },
          { type:'pair', q:'Associez chiffres et mots', pairs:[['1','Один'],['5','Пять'],['7','Семь'],['10','Десять']] },
          { type:'listen', q:'Écoutez et choisissez le bon chiffre', text:'Три', choices:['3','5','7','1'], correct:0 },
        ]},
        { id: 'ru-u3-l2', title: 'Jours & Mois', exercises: [
          { type:'flashcard', q:'Понедельник', a:'Lundi', hint:'Début de semaine' },
          { type:'flashcard', q:'Вторник', a:'Mardi', hint:'2e jour' },
          { type:'flashcard', q:'Среда', a:'Mercredi', hint:'Milieu' },
          { type:'flashcard', q:'Четверг', a:'Jeudi', hint:'4e jour' },
          { type:'flashcard', q:'Пятница', a:'Vendredi', hint:'TGIF!' },
          { type:'flashcard', q:'Суббота', a:'Samedi', hint:'Week-end' },
          { type:'flashcard', q:'Воскресенье', a:'Dimanche', hint:'Repos' },
          { type:'qcm', q:'Quel jour est "Пятница" ?', choices:['Vendredi','Samedi','Lundi','Jeudi'], correct:0 },
          { type:'pair', q:'Associez les jours', pairs:[['Понедельник','Lundi'],['Среда','Mercredi'],['Пятница','Vendredi'],['Воскресенье','Dimanche']] },
          { type:'order', q:'Remettez les jours dans l\'ordre', words:['Среда','Понедельник','Пятница','Вторник','Четверг'], answer:['Понедельник','Вторник','Среда','Четверг','Пятница'] },
        ]},
      ]
    },
    {
      id: 'ru-u4', level: 'A1', title: 'Famille & Personnes', icon: '👨‍👩‍👧',
      lessons: [
        { id: 'ru-u4-l1', title: 'La famille', exercises: [
          { type:'flashcard', q:'Мама', a:'Maman', hint:'Familier' },
          { type:'flashcard', q:'Папа', a:'Papa', hint:'Familier' },
          { type:'flashcard', q:'Мать', a:'Mère', hint:'Formel' },
          { type:'flashcard', q:'Отец', a:'Père', hint:'Formel' },
          { type:'flashcard', q:'Брат', a:'Frère', hint:'Masculin' },
          { type:'flashcard', q:'Сестра', a:'Sœur', hint:'Féminin' },
          { type:'flashcard', q:'Сын', a:'Fils', hint:'Masculin' },
          { type:'flashcard', q:'Дочь', a:'Fille', hint:'Féminin' },
          { type:'flashcard', q:'Дедушка', a:'Grand-père', hint:'Côté paternel/maternel' },
          { type:'flashcard', q:'Бабушка', a:'Grand-mère', hint:'' },
          { type:'qcm', q:'Comment dit-on "frère" en russe ?', choices:['Брат','Сестра','Сын','Дочь'], correct:0 },
          { type:'pair', q:'Associez famille', pairs:[['Мать','Mère'],['Отец','Père'],['Брат','Frère'],['Бабушка','Grand-mère']] },
          { type:'qcm', q:'Que signifie "Дочь" ?', choices:['Fille (enfant)','Fils','Sœur','Mère'], correct:0 },
        ]},
        { id: 'ru-u4-l2', title: 'Se présenter', exercises: [
          { type:'flashcard', q:'Меня зовут...', a:'Je m\'appelle...', hint:'Formule de présentation' },
          { type:'flashcard', q:'Как тебя зовут?', a:'Comment t\'appelles-tu?', hint:'Informel' },
          { type:'flashcard', q:'Как вас зовут?', a:'Comment vous appelez-vous?', hint:'Formel' },
          { type:'flashcard', q:'Мне ... лет', a:'J\'ai ... ans', hint:'Donner son âge' },
          { type:'flashcard', q:'Я из Франции', a:'Je suis de France', hint:'Origine' },
          { type:'flashcard', q:'Я говорю по-русски', a:'Je parle russe', hint:'Compétence linguistique' },
          { type:'flashcard', q:'Я не понимаю', a:'Je ne comprends pas', hint:'Phrase très utile!' },
          { type:'listen', q:'Écoutez et traduisez', text:'Меня зовут Иван', choices:['Je m\'appelle Ivan','Il s\'appelle Ivan','Comment t\'appelles-tu?','Mon prénom est...'], correct:0 },
          { type:'fill', q:'___ зовут Анна.', answer:'Меня', hint:'Je m\'appelle...', choices:['Меня','Тебя','Его','Её'] },
          { type:'truefalse', q:'"Я не понимаю" signifie "Je ne parle pas"', correct: false },
        ]},
      ]
    },
    // ─── A2 ──────────────────────────────────────────────
    {
      id: 'ru-u5', level: 'A2', title: 'Grammaire — Genre & Cas', icon: '📝',
      lessons: [
        { id: 'ru-u5-l1', title: 'Genre des noms', exercises: [
          { type:'grammar', title:'Le genre en russe', content:'En russe, chaque nom a un genre : masculin, féminin ou neutre.\n• Masculin : termine par consonne ou -й (стол, чай)\n• Féminin : termine par -а/-я ou -ь (книга, тетрадь)\n• Neutre : termine par -о/-е (окно, море)' },
          { type:'qcm', q:'Quel est le genre de "стол" (table) ?', choices:['Masculin','Féminin','Neutre'], correct:0 },
          { type:'qcm', q:'Quel est le genre de "книга" (livre) ?', choices:['Féminin','Masculin','Neutre'], correct:0 },
          { type:'qcm', q:'Quel est le genre de "окно" (fenêtre) ?', choices:['Neutre','Masculin','Féminin'], correct:0 },
          { type:'truefalse', q:'Les noms qui finissent en -а sont généralement féminins', correct: true },
          { type:'pair', q:'Classez par genre (M/F/N)', pairs:[['стол — table','Masculin'],['книга — livre','Féminin'],['окно — fenêtre','Neutre'],['море — mer','Neutre']] },
        ]},
        { id: 'ru-u5-l2', title: 'Accusatif (objet direct)', exercises: [
          { type:'grammar', title:'Le cas accusatif', content:'L\'accusatif répond à "qui ?" ou "quoi ?" (objet direct).\n• Masc. animé : -а/-я (брат → брата)\n• Masc. inanimé : pas de changement (стол → стол)\n• Fém. : -а→-у, -я→-ю (книга → книгу)\n• Neutre : pas de changement (окно → окно)' },
          { type:'qcm', q:'Я вижу ___ (стол). Quelle forme ?', choices:['стол','стола','столу','столом'], correct:0 },
          { type:'qcm', q:'Я люблю ___ (книга). Quelle forme ?', choices:['книгу','книга','книге','книгой'], correct:0 },
          { type:'fill', q:'Я читаю ___ (книга).', answer:'книгу', hint:'Féminin à l\'accusatif : -а→-у', choices:['книгу','книга','книги','книге'] },
          { type:'fill', q:'Он видит ___ (брат).', answer:'брата', hint:'Masculin animé à l\'accusatif : +а', choices:['брата','брат','брату','братом'] },
          { type:'truefalse', q:'À l\'accusatif, les noms neutres ne changent pas', correct: true },
        ]},
      ]
    },
    {
      id: 'ru-u6', level: 'A2', title: 'Verbes — Présent', icon: '⚡',
      lessons: [
        { id: 'ru-u6-l1', title: 'Conjugaison 1er groupe', exercises: [
          { type:'grammar', title:'Verbes en -ать/-ять (1er groupe)', content:'Читать (lire) : я читаю, ты читаешь, он/она читает, мы читаем, вы читаете, они читают\n\nDésinences : -ю/-у, -ешь, -ет, -ем, -ете, -ют/-ут' },
          { type:'qcm', q:'Я ___ (читать)', choices:['читаю','читает','читаем','читаешь'], correct:0 },
          { type:'qcm', q:'Они ___ (читать)', choices:['читают','читает','читаем','читаешь'], correct:0 },
          { type:'fill', q:'Ты ___ книгу. (читать)', answer:'читаешь', hint:'2e personne singulier', choices:['читаешь','читает','читаю','читают'] },
          { type:'fill', q:'Мы ___ газету. (читать)', answer:'читаем', hint:'1e personne pluriel', choices:['читаем','читают','читаете','читаю'] },
          { type:'pair', q:'Associez pronom et forme verbale', pairs:[['Я','читаю'],['Ты','читаешь'],['Он/Она','читает'],['Они','читают']] },
        ]},
        { id: 'ru-u6-l2', title: 'Verbes essentiels', exercises: [
          { type:'flashcard', q:'Быть (être)', a:'есть (présent, rare) / я есть = je suis', hint:'Souvent omis au présent' },
          { type:'flashcard', q:'Говорить (parler)', a:'говорю, говоришь, говорит...', hint:'2e groupe' },
          { type:'flashcard', q:'Иметь (avoir)', a:'имею, имеешь... (rare, on dit у меня есть)', hint:'"avoir" en russe' },
          { type:'flashcard', q:'Хотеть (vouloir)', a:'хочу, хочешь, хочет, хотим...', hint:'Irrégulier' },
          { type:'flashcard', q:'Знать (savoir/connaître)', a:'знаю, знаешь, знает...', hint:'1er groupe' },
          { type:'fill', q:'Я ___ по-французски. (говорить)', answer:'говорю', hint:'1e pers. sing.', choices:['говорю','говоришь','говорит','говорим'] },
          { type:'qcm', q:'"Я хочу есть" signifie ?', choices:['J\'ai faim (je veux manger)','Je sais manger','Je peux manger','J\'aime manger'], correct:0 },
          { type:'truefalse', q:'En russe, le verbe "être" est souvent omis au présent', correct: true },
        ]},
      ]
    },
    // ─── B1 ──────────────────────────────────────────────
    {
      id: 'ru-u7', level: 'B1', title: 'Les 6 Cas', icon: '🏛️',
      lessons: [
        { id: 'ru-u7-l1', title: 'Génitif (de)', exercises: [
          { type:'grammar', title:'Le génitif', content:'Le génitif exprime : possession ("de"), absence (нет+génitif), quantité.\n• Masc. : +а/-я (брат → брата)\n• Fém. : -а/-я→-ы/-и (книга → книги)\n• Neutre : -о/-е→-а/-я (окно → окна)\nExemple : У меня нет книги (je n\'ai pas de livre)' },
          { type:'qcm', q:'У меня нет ___ (брат). Forme correcte ?', choices:['брата','брат','брату','братом'], correct:0 },
          { type:'fill', q:'Это дом ___ (отец).', answer:'отца', hint:'Génitif masc. : +а', choices:['отца','отец','отцу','отцом'] },
          { type:'qcm', q:'Le génitif s\'utilise après "нет" (ne pas avoir)', choices:['Vrai','Faux'], correct:0 },
          { type:'pair', q:'Mettez au génitif', pairs:[['брат','брата'],['книга','книги'],['окно','окна'],['сестра','сестры']] },
        ]},
        { id: 'ru-u7-l2', title: 'Datif (à/pour)', exercises: [
          { type:'grammar', title:'Le datif', content:'Le datif répond à "à qui ?" ou "pour qui ?".\n• Masc./Neutre : +у/-ю (брат → брату, окно → окну)\n• Fém. : -а/-я→-е/-и (книга → книге)\nExemple : Я дал книгу брату (j\'ai donné le livre au frère)' },
          { type:'qcm', q:'Я пишу письмо ___ (мама). Forme ?', choices:['маме','мама','мамы','мамой'], correct:0 },
          { type:'fill', q:'Я звоню ___ (брат).', answer:'брату', hint:'Datif masc. : +у', choices:['брату','брата','брат','братом'] },
          { type:'truefalse', q:'Le datif répond à la question "où ?"', correct: false },
          { type:'pair', q:'Mettez au datif', pairs:[['брат','брату'],['мама','маме'],['студент','студенту'],['сестра','сестре']] },
        ]},
      ]
    },
    {
      id: 'ru-u8', level: 'B1', title: 'Aspects & Passé', icon: '⏳',
      lessons: [
        { id: 'ru-u8-l1', title: 'Perfectif / Imperfectif', exercises: [
          { type:'grammar', title:'Les aspects verbaux', content:'C\'est LE concept central du russe.\n• Imperfectif = action en cours, répétée, habituelle → читать (lire, en cours)\n• Perfectif = action complète, ponctuelle → прочитать (avoir lu / finir de lire)\nLa plupart des verbes existent en paire : писать/написать, делать/сделать' },
          { type:'qcm', q:'J\'ai fini de lire le livre. Quel aspect ?', choices:['Perfectif (прочитал)','Imperfectif (читал)'], correct:0 },
          { type:'qcm', q:'Je lisais chaque soir. Quel aspect ?', choices:['Imperfectif (читал)','Perfectif (прочитал)'], correct:0 },
          { type:'pair', q:'Associez imperfectif et perfectif', pairs:[['читать','прочитать'],['писать','написать'],['делать','сделать'],['говорить','сказать']] },
          { type:'truefalse', q:'Le perfectif exprime une action habituelle', correct: false },
          { type:'truefalse', q:'L\'imperfectif peut s\'utiliser pour une action en cours', correct: true },
        ]},
        { id: 'ru-u8-l2', title: 'Le passé', exercises: [
          { type:'grammar', title:'Le passé russe', content:'Le passé russe varie selon le genre (pas la personne !).\n• Masc. : читал, написал\n• Fém. : читала, написала\n• Neutre : читало, написало\n• Pluriel : читали, написали\nExemple : Она читала книгу (Elle lisait le livre)' },
          { type:'qcm', q:'Мaria ___ (читать, passé fém.)', choices:['читала','читал','читали','читало'], correct:0 },
          { type:'fill', q:'Иван ___ письмо. (написать, passé masc.)', answer:'написал', hint:'Masculin singulier', choices:['написал','написала','написали','написало'] },
          { type:'pair', q:'Accordez au passé', pairs:[['Мама (читать)','читала'],['Папа (написать)','написал'],['Дети (делать)','делали'],['Окно (открыть)','открыло']] },
          { type:'truefalse', q:'Au passé russe, la forme change selon la personne (je/tu/il)', correct: false },
        ]},
      ]
    },
  ]
},

// ╔══════════════════════════════════════════════════╗
// ║              🇮🇷  PERSAN (FARSI)                ║
// ╚══════════════════════════════════════════════════╝
fa: {
  name: 'Persan', native: 'فارسی', flag: '🇮🇷', dir: 'rtl', color: '#3ec97a',
  voice: 'fa-IR',
  units: [
    {
      id: 'fa-u1', level: 'A1', title: 'Alphabet persan I', icon: '✍️',
      lessons: [
        { id: 'fa-u1-l1', title: 'Les premières lettres', exercises: [
          { type:'flashcard', q:'ا', a:'Alef — son "a" ou "â"', hint:'La première lettre' },
          { type:'flashcard', q:'ب', a:'Be — son "b"', hint:'B' },
          { type:'flashcard', q:'پ', a:'Pe — son "p"', hint:'P (n\'existe pas en arabe)' },
          { type:'flashcard', q:'ت', a:'Te — son "t"', hint:'T' },
          { type:'flashcard', q:'ث', a:'Se — son "s"', hint:'S (emprunté à l\'arabe)' },
          { type:'flashcard', q:'ج', a:'Jim — son "dj"', hint:'DJ' },
          { type:'flashcard', q:'چ', a:'Che — son "ch"', hint:'CH (n\'existe pas en arabe)' },
          { type:'flashcard', q:'ح', a:'He — son "h" aspiré', hint:'H guttural' },
          { type:'flashcard', q:'خ', a:'Khe — son "kh"', hint:'KH comme Bach' },
          { type:'flashcard', q:'د', a:'Dal — son "d"', hint:'D' },
          { type:'qcm', q:'Quelle lettre fait le son "p" ?', choices:['پ','ب','ت','ج'], correct:0 },
          { type:'qcm', q:'Quelle lettre fait le son "ch" ?', choices:['چ','ج','خ','ح'], correct:0 },
          { type:'truefalse', q:'پ (Pe) existe aussi en arabe', correct: false },
        ]},
        { id: 'fa-u1-l2', title: 'Lettres suivantes', exercises: [
          { type:'flashcard', q:'ر', a:'Re — son "r"', hint:'R' },
          { type:'flashcard', q:'ز', a:'Ze — son "z"', hint:'Z' },
          { type:'flashcard', q:'ژ', a:'Zhe — son "j"', hint:'J comme "jeu" (n\'existe pas en arabe)' },
          { type:'flashcard', q:'س', a:'Sin — son "s"', hint:'S' },
          { type:'flashcard', q:'ش', a:'Shin — son "sh"', hint:'SH' },
          { type:'flashcard', q:'ع', a:'Ayn — son guttural', hint:'Voyelle glottale' },
          { type:'flashcard', q:'غ', a:'Ghayn — son "gh"', hint:'GH guttural' },
          { type:'flashcard', q:'ف', a:'Fe — son "f"', hint:'F' },
          { type:'flashcard', q:'ق', a:'Qaf — son "q" guttural', hint:'Q profond' },
          { type:'flashcard', q:'ک', a:'Kaf — son "k"', hint:'K' },
          { type:'qcm', q:'Quelle lettre fait le son "j" (comme "jeu") ?', choices:['ژ','ز','ج','ش'], correct:0 },
          { type:'truefalse', q:'ژ (Zhe) se trouve aussi en arabe classique', correct: false },
        ]},
      ]
    },
    {
      id: 'fa-u2', level: 'A1', title: 'Mots de base', icon: '💬',
      lessons: [
        { id: 'fa-u2-l1', title: 'Salutations', exercises: [
          { type:'flashcard', q:'سلام', a:'Salam — Bonjour/Salut', hint:'Universel' },
          { type:'flashcard', q:'خداحافظ', a:'Khodâhâfez — Au revoir', hint:'"Que Dieu vous garde"' },
          { type:'flashcard', q:'ممنون', a:'Mamnoon — Merci', hint:'Informel' },
          { type:'flashcard', q:'متشکرم', a:'Moteșakkeram — Merci (formel)', hint:'Formel' },
          { type:'flashcard', q:'خوب', a:'Khob — Bien', hint:'Très courant' },
          { type:'flashcard', q:'چطوری؟', a:'Chetori? — Comment ça va?', hint:'Familier' },
          { type:'flashcard', q:'اسم شما چیست؟', a:'Esm-e shomâ chist? — Quel est votre nom?', hint:'Formel' },
          { type:'qcm', q:'Comment dit-on "Bonjour" en persan ?', choices:['سلام','خداحافظ','ممنون','خوب'], correct:0 },
          { type:'listen', q:'Écoutez et identifiez', text:'سلام', choices:['Bonjour','Au revoir','Merci','Bien'], correct:0 },
          { type:'pair', q:'Associez persan et français', pairs:[['سلام','Bonjour'],['ممنون','Merci'],['خوب','Bien'],['خداحافظ','Au revoir']] },
          { type:'truefalse', q:'"ممنون" est la forme formelle de "merci"', correct: false },
        ]},
        { id: 'fa-u2-l2', title: 'Chiffres', exercises: [
          { type:'flashcard', q:'یک', a:'Yek — 1', hint:'Un' },
          { type:'flashcard', q:'دو', a:'Do — 2', hint:'Deux' },
          { type:'flashcard', q:'سه', a:'Se — 3', hint:'Trois' },
          { type:'flashcard', q:'چهار', a:'Chahâr — 4', hint:'Quatre' },
          { type:'flashcard', q:'پنج', a:'Panj — 5', hint:'Cinq' },
          { type:'flashcard', q:'شش', a:'Shesh — 6', hint:'Six' },
          { type:'flashcard', q:'هفت', a:'Haft — 7', hint:'Sept' },
          { type:'flashcard', q:'هشت', a:'Hasht — 8', hint:'Huit' },
          { type:'flashcard', q:'نه', a:'Noh — 9', hint:'Neuf' },
          { type:'flashcard', q:'ده', a:'Dah — 10', hint:'Dix' },
          { type:'qcm', q:'Comment dit-on "5" en persan ?', choices:['پنج','شش','هفت','سه'], correct:0 },
          { type:'pair', q:'Associez chiffres', pairs:[['یک','1'],['پنج','5'],['ده','10'],['هفت','7']] },
          { type:'listen', q:'Écoutez et choisissez', text:'سه', choices:['3','5','7','9'], correct:0 },
        ]},
      ]
    },
    {
      id: 'fa-u3', level: 'A1', title: 'Vie quotidienne', icon: '🏠',
      lessons: [
        { id: 'fa-u3-l1', title: 'Maison & objets', exercises: [
          { type:'flashcard', q:'خانه', a:'Khâneh — Maison', hint:'' },
          { type:'flashcard', q:'اتاق', a:'Otâq — Pièce/Chambre', hint:'' },
          { type:'flashcard', q:'در', a:'Dar — Porte', hint:'' },
          { type:'flashcard', q:'پنجره', a:'Panjare — Fenêtre', hint:'' },
          { type:'flashcard', q:'کتاب', a:'Ketâb — Livre', hint:'' },
          { type:'flashcard', q:'میز', a:'Miz — Table', hint:'Emprunté du français !' },
          { type:'flashcard', q:'صندلی', a:'Sandali — Chaise', hint:'' },
          { type:'pair', q:'Associez les mots', pairs:[['خانه','Maison'],['کتاب','Livre'],['میز','Table'],['در','Porte']] },
          { type:'qcm', q:'"کتاب" signifie ?', choices:['Livre','Table','Chaise','Porte'], correct:0 },
          { type:'truefalse', q:'"میز" (table) est un emprunt au français', correct: true },
        ]},
      ]
    },
    // ─── A2 ──────────────────────────────────────────────
    {
      id: 'fa-u4', level: 'A2', title: 'Grammaire — Verbes', icon: '📝',
      lessons: [
        { id: 'fa-u4-l1', title: 'Verbe être (بودن)', exercises: [
          { type:'grammar', title:'Le verbe être en persan', content:'Présent du verbe "بودن" (budan — être) :\n• هستم (hastam) — je suis\n• هستی (hasti) — tu es\n• هست (hast) — il/elle est\n• هستیم (hastim) — nous sommes\n• هستید (hastid) — vous êtes\n• هستند (hastand) — ils/elles sont\n\nForme courte (suffixe) : -ام، -ای، -است/-ه، -ایم، -اید، -اند' },
          { type:'qcm', q:'Comment dit-on "je suis" en persan ?', choices:['هستم','هستی','هست','هستند'], correct:0 },
          { type:'fill', q:'من دانشجو ___ . (je suis étudiant)', answer:'هستم', hint:'1ère personne singulier', choices:['هستم','هستی','هست','هستیم'] },
          { type:'pair', q:'Associez pronom et forme', pairs:[['من (je)','هستم'],['تو (tu)','هستی'],['او (il/elle)','هست'],['آن‌ها (ils)','هستند']] },
          { type:'truefalse', q:'Le verbe être au présent peut être attaché au nom comme suffixe', correct: true },
        ]},
        { id: 'fa-u4-l2', title: 'Passé simple', exercises: [
          { type:'grammar', title:'Le passé en persan', content:'Le passé se forme avec le radical du passé + désinences :\nرفتن (aller) : radical passé = رفت\n• رفتم (raftam) — je suis allé(e)\n• رفتی (rafti) — tu es allé(e)\n• رفت (raft) — il/elle est allé(e)\n• رفتیم (raftim) — nous sommes allés\n• رفتید (raftid) — vous êtes allés\n• رفتند (raftand) — ils sont allés' },
          { type:'qcm', q:'"رفتم" signifie ?', choices:['Je suis allé(e)','Tu es allé(e)','Il est allé','Nous sommes allés'], correct:0 },
          { type:'fill', q:'او به مدرسه ___ . (aller, passé 3e sing.)', answer:'رفت', hint:'3ème personne singulier', choices:['رفت','رفتم','رفتی','رفتند'] },
          { type:'truefalse', q:'Au passé en persan, le radical change selon la personne', correct: false },
        ]},
      ]
    },
    // ─── B1 ──────────────────────────────────────────────
    {
      id: 'fa-u5', level: 'B1', title: 'Structures avancées', icon: '🏛️',
      lessons: [
        { id: 'fa-u5-l1', title: 'Subjonctif', exercises: [
          { type:'grammar', title:'Le subjonctif persan', content:'Le subjonctif (فعل التزامی) s\'emploie après "que" et pour exprimer souhait/doute/obligation.\nFormation : بـ + radical du présent + désinences\nرفتن (aller) : بروم، بروی، برود، برویم، بروید، بروند\n\nUsages : می‌خواهم بروم (je veux aller), باید بروم (je dois aller)' },
          { type:'qcm', q:'"باید بروم" signifie ?', choices:['Je dois y aller','Je veux y aller','Je suis allé','J\'irai'], correct:0 },
          { type:'fill', q:'می‌خواهم ___ . (aller, subjonctif 1e sing.)', answer:'بروم', hint:'بـ + radical présent + م', choices:['بروم','برود','بروی','برویم'] },
          { type:'truefalse', q:'"می‌خواهم" suivi d\'un subjonctif exprime un souhait', correct: true },
        ]},
        { id: 'fa-u5-l2', title: 'Vocabulaire thématique', exercises: [
          { type:'flashcard', q:'کار', a:'Kâr — Travail', hint:'' },
          { type:'flashcard', q:'دانشگاه', a:'Dâneshgâh — Université', hint:'"lieu du savoir"' },
          { type:'flashcard', q:'پزشک', a:'Pezeshk — Médecin', hint:'' },
          { type:'flashcard', q:'بازار', a:'Bâzâr — Marché/Bazar', hint:'Mot entré en français' },
          { type:'flashcard', q:'سفر', a:'Safar — Voyage', hint:'' },
          { type:'flashcard', q:'دوست', a:'Dust — Ami', hint:'"Doost"' },
          { type:'pair', q:'Associez', pairs:[['کار','Travail'],['دانشگاه','Université'],['بازار','Marché'],['دوست','Ami']] },
          { type:'qcm', q:'"بازار" est à l\'origine de quel mot français ?', choices:['Bazar','Bazaar','Bâtir','Balzar'], correct:0 },
        ]},
      ]
    },
  ]
},

// ╔══════════════════════════════════════════════════╗
// ║              🇮🇱  HÉBREU                        ║
// ╚══════════════════════════════════════════════════╝
he: {
  name: 'Hébreu', native: 'עברית', flag: '🇮🇱', dir: 'rtl', color: '#c8a94a',
  voice: 'he-IL',
  units: [
    {
      id: 'he-u1', level: 'A1', title: 'Alphabet hébreu', icon: '✡️',
      lessons: [
        { id: 'he-u1-l1', title: 'Alef-Bet I', exercises: [
          { type:'flashcard', q:'א', a:'Alef — voyelle glottale (silent)', hint:'1ère lettre' },
          { type:'flashcard', q:'ב', a:'Bet — "b" ou "v"', hint:'B ou V selon position' },
          { type:'flashcard', q:'ג', a:'Gimel — "g"', hint:'G' },
          { type:'flashcard', q:'ד', a:'Dalet — "d"', hint:'D' },
          { type:'flashcard', q:'ה', a:'He — "h"', hint:'H aspiré' },
          { type:'flashcard', q:'ו', a:'Vav — "v" ou voyelle "o/u"', hint:'V ou voyelle' },
          { type:'flashcard', q:'ז', a:'Zayin — "z"', hint:'Z' },
          { type:'flashcard', q:'ח', a:'Khet — "kh" guttural', hint:'KH fort' },
          { type:'flashcard', q:'ט', a:'Tet — "t"', hint:'T' },
          { type:'flashcard', q:'י', a:'Yod — "y" ou voyelle "i"', hint:'Y ou I' },
          { type:'qcm', q:'Quelle lettre fait le son "g" ?', choices:['ג','ד','ב','ז'], correct:0 },
          { type:'truefalse', q:'א (Alef) a un son propre fort', correct: false },
          { type:'pair', q:'Associez lettre et son', pairs:[['ב','B/V'],['ג','G'],['ד','D'],['ז','Z']] },
        ]},
        { id: 'he-u1-l2', title: 'Alef-Bet II', exercises: [
          { type:'flashcard', q:'כ', a:'Kaf — "k" ou "kh"', hint:'K ou KH' },
          { type:'flashcard', q:'ל', a:'Lamed — "l"', hint:'L' },
          { type:'flashcard', q:'מ', a:'Mem — "m"', hint:'M' },
          { type:'flashcard', q:'נ', a:'Nun — "n"', hint:'N' },
          { type:'flashcard', q:'ס', a:'Samekh — "s"', hint:'S' },
          { type:'flashcard', q:'ע', a:'Ayin — voyelle glottale', hint:'Son guttural' },
          { type:'flashcard', q:'פ', a:'Pe — "p" ou "f"', hint:'P ou F' },
          { type:'flashcard', q:'צ', a:'Tsadi — "ts"', hint:'TS comme "tsar"' },
          { type:'flashcard', q:'ק', a:'Qof — "k"', hint:'K guttural' },
          { type:'flashcard', q:'ר', a:'Resh — "r"', hint:'R' },
          { type:'flashcard', q:'ש', a:'Shin/Sin — "sh" ou "s"', hint:'SH ou S' },
          { type:'flashcard', q:'ת', a:'Tav — "t"', hint:'T' },
          { type:'qcm', q:'Quelle lettre fait le son "ts" ?', choices:['צ','ס','ז','ט'], correct:0 },
          { type:'truefalse', q:'ש peut se prononcer "sh" ou "s" selon le point diacritique', correct: true },
        ]},
      ]
    },
    {
      id: 'he-u2', level: 'A1', title: 'Mots essentiels', icon: '💬',
      lessons: [
        { id: 'he-u2-l1', title: 'Salutations', exercises: [
          { type:'flashcard', q:'שלום', a:'Shalom — Bonjour/Salut/Paix/Au revoir', hint:'Polyvalent !' },
          { type:'flashcard', q:'בוקר טוב', a:'Boker tov — Bonjour (matin)', hint:'Matin' },
          { type:'flashcard', q:'ערב טוב', a:'Erev tov — Bonsoir', hint:'Soir' },
          { type:'flashcard', q:'לילה טוב', a:'Laïla tov — Bonne nuit', hint:'Nuit' },
          { type:'flashcard', q:'תודה', a:'Toda — Merci', hint:'Très courant' },
          { type:'flashcard', q:'בבקשה', a:'Bevakasha — S\'il vous plaît / De rien', hint:'Double usage' },
          { type:'flashcard', q:'מה שלומך?', a:'Ma shlomkha? — Comment ça va? (masc.)', hint:'À un homme' },
          { type:'flashcard', q:'טוב', a:'Tov — Bien / Bon', hint:'Positif' },
          { type:'qcm', q:'Que signifie "שלום" ?', choices:['Bonjour/Paix','Au revoir','Merci','De rien'], correct:0 },
          { type:'pair', q:'Associez', pairs:[['שלום','Bonjour/Paix'],['תודה','Merci'],['טוב','Bien'],['לילה טוב','Bonne nuit']] },
          { type:'listen', q:'Écoutez et identifiez', text:'שלום', choices:['Bonjour','Au revoir','Merci','Bien'], correct:0 },
        ]},
        { id: 'he-u2-l2', title: 'Chiffres 1–10', exercises: [
          { type:'flashcard', q:'אחד', a:'Ekhad — 1 (masc.)', hint:'Masculin' },
          { type:'flashcard', q:'שתיים', a:'Shtaïm — 2 (fém.)', hint:'Féminin' },
          { type:'flashcard', q:'שלוש', a:'Shalosh — 3', hint:'Trois' },
          { type:'flashcard', q:'ארבע', a:'Arba — 4', hint:'Quatre' },
          { type:'flashcard', q:'חמש', a:'Khamesh — 5', hint:'Cinq' },
          { type:'flashcard', q:'שש', a:'Shesh — 6', hint:'Six' },
          { type:'flashcard', q:'שבע', a:'Shéva — 7', hint:'Sept' },
          { type:'flashcard', q:'שמונה', a:'Shmoné — 8', hint:'Huit' },
          { type:'flashcard', q:'תשע', a:'Tésha — 9', hint:'Neuf' },
          { type:'flashcard', q:'עשר', a:'Eser — 10', hint:'Dix' },
          { type:'qcm', q:'Comment dit-on "5" en hébreu ?', choices:['חמש','שלוש','ארבע','שש'], correct:0 },
          { type:'pair', q:'Associez', pairs:[['אחד','1'],['חמש','5'],['שבע','7'],['עשר','10']] },
        ]},
      ]
    },
    {
      id: 'he-u3', level: 'A1', title: 'Genre & Pluriel', icon: '📝',
      lessons: [
        { id: 'he-u3-l1', title: 'Genre des noms', exercises: [
          { type:'grammar', title:'Le genre en hébreu', content:'En hébreu, les noms sont masculins ou féminins.\n• Masculin : pas de terminaison spéciale (ספר — livre)\n• Féminin : souvent -ה ou -ת (ילדה — fille, אמת — vérité)\n\nLes adjectifs s\'accordent en genre :\n• Masc. : גדול (gadol — grand)\n• Fém. : גדולה (gdola — grande)' },
          { type:'qcm', q:'"ילדה" (fille) est de genre ?', choices:['Féminin','Masculin'], correct:0 },
          { type:'qcm', q:'Terminaison typique du féminin ?', choices:['-ה ou -ת','-ם ou -ן','-י ou -ו','-ש ou -ר'], correct:0 },
          { type:'pair', q:'Classez par genre', pairs:[['ספר (livre)','Masculin'],['ילדה (fille)','Féminin'],['בית (maison)','Masculin'],['אשה (femme)','Féminin']] },
        ]},
      ]
    },
    // ─── A2 ──────────────────────────────────────────────
    {
      id: 'he-u4', level: 'A2', title: 'Verbes — Présent', icon: '⚡',
      lessons: [
        { id: 'he-u4-l1', title: 'Binyan Pa\'al', exercises: [
          { type:'grammar', title:'Le présent des verbes Pa\'al', content:'Les verbes hébreux s\'organisent en "binyanim" (structures).\nPa\'al est le binyan de base.\nExemple : כתב (ktv — racine "écrire")\n• Masc. sing. : כותב (kotev)\n• Fém. sing. : כותבת (kotevet)\n• Masc. plur. : כותבים (kotvim)\n• Fém. plur. : כותבות (kotvot)\n\nLe présent hébreu = participe actif (pas de sujet obligatoire)' },
          { type:'qcm', q:'La forme "כותבת" est ?', choices:['Féminin singulier','Masculin singulier','Pluriel','Passé'], correct:0 },
          { type:'pair', q:'Accordez le verbe', pairs:[['Homme (כתב)','כותב'],['Femme (כתב)','כותבת'],['Hommes (כתב)','כותבים'],['Femmes (כתב)','כותבות']] },
          { type:'truefalse', q:'Le présent hébreu change selon la personne (je/tu/il)', correct: false },
        ]},
        { id: 'he-u4-l2', title: 'Verbes courants', exercises: [
          { type:'flashcard', q:'ללכת', a:'Lalechet — Aller (infinitif)', hint:'Aller' },
          { type:'flashcard', q:'לדבר', a:'Ledaber — Parler', hint:'Parler' },
          { type:'flashcard', q:'לאכול', a:'Le\'ekhol — Manger', hint:'Manger' },
          { type:'flashcard', q:'לשתות', a:'Lishtot — Boire', hint:'Boire' },
          { type:'flashcard', q:'להיות', a:'Lihyot — Être', hint:'Être' },
          { type:'flashcard', q:'לראות', a:'Lir\'ot — Voir', hint:'Voir' },
          { type:'flashcard', q:'לרצות', a:'Lirtsot — Vouloir', hint:'Vouloir' },
          { type:'pair', q:'Associez infinitif et sens', pairs:[['ללכת','Aller'],['לדבר','Parler'],['לאכול','Manger'],['לרצות','Vouloir']] },
          { type:'qcm', q:'"לאכול" signifie ?', choices:['Manger','Boire','Voir','Parler'], correct:0 },
        ]},
      ]
    },
    // ─── B1 ──────────────────────────────────────────────
    {
      id: 'he-u5', level: 'B1', title: 'Binyanim avancés', icon: '🏛️',
      lessons: [
        { id: 'he-u5-l1', title: 'Hif\'il & Hitpa\'el', exercises: [
          { type:'grammar', title:'Binyanim causatifs et réfléchis', content:'• Hif\'il : causatif — faire faire quelque chose\n  להכניס (lehaknis) — faire entrer, introduire\n  להוציא (lehotsí) — faire sortir, extraire\n\n• Hitpa\'el : réfléchi / réciproque\n  להתלבש (lehitlabesh) — s\'habiller\n  להתרחץ (lehitrakhets) — se laver\n  להתנשק (lehitnashek) — s\'embrasser' },
          { type:'qcm', q:'Quel binyan exprime l\'action réfléchie ?', choices:['Hitpa\'el','Hif\'il','Pa\'al','Ni\'al'], correct:0 },
          { type:'pair', q:'Classez par binyan', pairs:[['להכניס (introduire)','Hif\'il'],['להתלבש (s\'habiller)','Hitpa\'el'],['להוציא (extraire)','Hif\'il'],['להתרחץ (se laver)','Hitpa\'el']] },
          { type:'truefalse', q:'Le Hif\'il exprime une action réfléchie', correct: false },
        ]},
        { id: 'he-u5-l2', title: 'Vocabulaire courant B1', exercises: [
          { type:'flashcard', q:'חברה', a:'Khevra — Société / Compagnie / Amie', hint:'Polyvalent' },
          { type:'flashcard', q:'עבודה', a:'Avoda — Travail', hint:'' },
          { type:'flashcard', q:'כסף', a:'Kesef — Argent', hint:'Aussi : argent (métal)' },
          { type:'flashcard', q:'זמן', a:'Zman — Temps', hint:'' },
          { type:'flashcard', q:'עולם', a:'Olam — Monde / Univers', hint:'"L\'Olam" = le monde' },
          { type:'flashcard', q:'ידע', a:'Yeda — Savoir / Connaissance', hint:'Racine י-ד-ע' },
          { type:'pair', q:'Associez', pairs:[['עבודה','Travail'],['כסף','Argent'],['עולם','Monde'],['זמן','Temps']] },
        ]},
      ]
    },
  ]
},

// ╔══════════════════════════════════════════════════╗
// ║              🇸🇦  ARABE                         ║
// ╚══════════════════════════════════════════════════╝
ar: {
  name: 'Arabe', native: 'العربية', flag: '🇸🇦', dir: 'rtl', color: '#d47a3e',
  voice: 'ar-SA',
  units: [
    {
      id: 'ar-u1', level: 'A1', title: 'Alphabet arabe I', icon: '✍️',
      lessons: [
        { id: 'ar-u1-l1', title: 'Premières lettres', exercises: [
          { type:'flashcard', q:'ا', a:'Alif — son "a"', hint:'Première lettre' },
          { type:'flashcard', q:'ب', a:'Ba — son "b"', hint:'B (1 point dessous)' },
          { type:'flashcard', q:'ت', a:'Ta — son "t"', hint:'T (2 points dessus)' },
          { type:'flashcard', q:'ث', a:'Tha — son "th"', hint:'TH (3 points)' },
          { type:'flashcard', q:'ج', a:'Djim — son "dj"', hint:'DJ (1 point dessous)' },
          { type:'flashcard', q:'ح', a:'Ha — son "h" guttural', hint:'H profond' },
          { type:'flashcard', q:'خ', a:'Kha — son "kh"', hint:'KH comme Bach' },
          { type:'flashcard', q:'د', a:'Dal — son "d"', hint:'D' },
          { type:'flashcard', q:'ذ', a:'Dhal — son "dh"', hint:'DH (th anglais voiced)' },
          { type:'flashcard', q:'ر', a:'Ra — son "r"', hint:'R roulé' },
          { type:'qcm', q:'Quelle lettre a 2 points dessus et fait "t" ?', choices:['ت','ث','ب','ن'], correct:0 },
          { type:'truefalse', q:'ب et ت ont la même forme de base', correct: true },
          { type:'pair', q:'Associez lettre et son', pairs:[['ب','B'],['ت','T'],['ج','DJ'],['ر','R']] },
        ]},
        { id: 'ar-u1-l2', title: 'Suite de l\'alphabet', exercises: [
          { type:'flashcard', q:'ز', a:'Zayn — son "z"', hint:'Z' },
          { type:'flashcard', q:'س', a:'Sin — son "s"', hint:'S (3 dents)' },
          { type:'flashcard', q:'ش', a:'Shin — son "sh"', hint:'SH (3 points)' },
          { type:'flashcard', q:'ص', a:'Sad — son "s" emphatique', hint:'S emphatic' },
          { type:'flashcard', q:'ض', a:'Dad — son "d" emphatique', hint:'D emphatic' },
          { type:'flashcard', q:'ع', a:'Ayn — son guttural', hint:'Unique à l\'arabe' },
          { type:'flashcard', q:'غ', a:'Ghayn — son "gh"', hint:'GH guttural' },
          { type:'flashcard', q:'ف', a:'Fa — son "f"', hint:'F' },
          { type:'flashcard', q:'ق', a:'Qaf — son "q" profond', hint:'K guttural' },
          { type:'flashcard', q:'ك', a:'Kaf — son "k"', hint:'K' },
          { type:'flashcard', q:'ل', a:'Lam — son "l"', hint:'L' },
          { type:'flashcard', q:'م', a:'Mim — son "m"', hint:'M' },
          { type:'flashcard', q:'ن', a:'Nun — son "n"', hint:'N (1 point dessus)' },
          { type:'flashcard', q:'ه', a:'Ha — son "h"', hint:'H doux' },
          { type:'flashcard', q:'و', a:'Waw — son "w" ou "u/o"', hint:'W ou voyelle' },
          { type:'flashcard', q:'ي', a:'Ya — son "y" ou "i"', hint:'Y ou I' },
          { type:'qcm', q:'Quelle lettre fait le son "sh" ?', choices:['ش','س','ص','ث'], correct:0 },
          { type:'truefalse', q:'ع et غ ont le même son', correct: false },
        ]},
      ]
    },
    {
      id: 'ar-u2', level: 'A1', title: 'Salutations & Bases', icon: '👋',
      lessons: [
        { id: 'ar-u2-l1', title: 'Salutations', exercises: [
          { type:'flashcard', q:'السلام عليكم', a:'As-salamu alaykum — Que la paix soit sur vous', hint:'Salutation islamique universelle' },
          { type:'flashcard', q:'وعليكم السلام', a:'Wa alaykum as-salam — Et sur vous la paix', hint:'Réponse à السلام عليكم' },
          { type:'flashcard', q:'مرحبا', a:'Marhaba — Bonjour/Bienvenue', hint:'Informel' },
          { type:'flashcard', q:'شكراً', a:'Shukran — Merci', hint:'Très courant' },
          { type:'flashcard', q:'من فضلك', a:'Min fadlak — S\'il vous plaît (à un homme)', hint:'Masculin' },
          { type:'flashcard', q:'كيف حالك؟', a:'Kayfa halak? — Comment vas-tu? (masc.)', hint:'À un homme' },
          { type:'flashcard', q:'بخير', a:'Bikhayr — Bien (je vais bien)', hint:'Réponse positive' },
          { type:'flashcard', q:'مع السلامة', a:'Ma\'a as-salama — Au revoir', hint:'"Avec la paix"' },
          { type:'qcm', q:'Comment répondre à "السلام عليكم" ?', choices:['وعليكم السلام','مرحبا','شكراً','بخير'], correct:0 },
          { type:'pair', q:'Associez', pairs:[['مرحبا','Bonjour'],['شكراً','Merci'],['بخير','Bien'],['مع السلامة','Au revoir']] },
          { type:'listen', q:'Écoutez et identifiez', text:'مرحبا', choices:['Bonjour','Merci','Au revoir','S\'il vous plaît'], correct:0 },
        ]},
        { id: 'ar-u2-l2', title: 'Chiffres 1–10', exercises: [
          { type:'flashcard', q:'واحد', a:'Wahid — 1', hint:'Un' },
          { type:'flashcard', q:'اثنان', a:'Ithnan — 2', hint:'Deux' },
          { type:'flashcard', q:'ثلاثة', a:'Thalatha — 3', hint:'Trois' },
          { type:'flashcard', q:'أربعة', a:'Arba\'a — 4', hint:'Quatre' },
          { type:'flashcard', q:'خمسة', a:'Khamsa — 5', hint:'Cinq' },
          { type:'flashcard', q:'ستة', a:'Sitta — 6', hint:'Six' },
          { type:'flashcard', q:'سبعة', a:'Sab\'a — 7', hint:'Sept' },
          { type:'flashcard', q:'ثمانية', a:'Thamaniya — 8', hint:'Huit' },
          { type:'flashcard', q:'تسعة', a:'Tis\'a — 9', hint:'Neuf' },
          { type:'flashcard', q:'عشرة', a:'Ashara — 10', hint:'Dix' },
          { type:'qcm', q:'Comment dit-on "5" en arabe ?', choices:['خمسة','ستة','سبعة','أربعة'], correct:0 },
          { type:'pair', q:'Associez', pairs:[['واحد','1'],['خمسة','5'],['سبعة','7'],['عشرة','10']] },
        ]},
      ]
    },
    {
      id: 'ar-u3', level: 'A1', title: 'Vocabulaire essentiel', icon: '📚',
      lessons: [
        { id: 'ar-u3-l1', title: 'Famille', exercises: [
          { type:'flashcard', q:'أم', a:'Omm — Mère', hint:'Mère' },
          { type:'flashcard', q:'أب', a:'Ab — Père', hint:'Père' },
          { type:'flashcard', q:'أخ', a:'Akh — Frère', hint:'Frère' },
          { type:'flashcard', q:'أخت', a:'Okht — Sœur', hint:'Sœur' },
          { type:'flashcard', q:'ابن', a:'Ibn — Fils', hint:'Aussi dans les noms (Ibn Khaldoun)' },
          { type:'flashcard', q:'ابنة', a:'Ibna — Fille', hint:'Féminin de ابن' },
          { type:'flashcard', q:'جد', a:'Djad — Grand-père', hint:'' },
          { type:'flashcard', q:'جدة', a:'Djadda — Grand-mère', hint:'' },
          { type:'pair', q:'Associez famille', pairs:[['أم','Mère'],['أب','Père'],['أخ','Frère'],['أخت','Sœur']] },
          { type:'qcm', q:'"ابن" signifie ?', choices:['Fils','Frère','Père','Grand-père'], correct:0 },
        ]},
      ]
    },
    // ─── A2 ──────────────────────────────────────────────
    {
      id: 'ar-u4', level: 'A2', title: 'Grammaire arabe', icon: '📝',
      lessons: [
        { id: 'ar-u4-l1', title: 'Article défini & Genre', exercises: [
          { type:'grammar', title:'L\'article et le genre', content:'L\'article défini est "ال" (al-) — invariable.\n• Masc. : كتاب (kitâb — livre) → الكتاب (al-kitâb)\n• Fém. : مدرسة (madrasa — école) → المدرسة (al-madrasa)\n\nLe féminin se forme souvent par ajout de ة (ta marbuta) :\nمعلم (mu\'allim — enseignant masc.) → معلمة (mu\'allima — enseignante fem.)\n\nAssimilation : ال + lettres solaires → assimilation\nال + الشمس = الشمس (ash-shams — le soleil)' },
          { type:'qcm', q:'L\'article défini en arabe est ?', choices:['ال','لا','ما','هل'], correct:0 },
          { type:'fill', q:'___ كتاب (le livre)', answer:'ال', hint:'Article défini', choices:['ال','لا','ما','في'] },
          { type:'pair', q:'Mettez à la forme féminine', pairs:[['معلم','معلمة'],['طالب','طالبة'],['كبير','كبيرة'],['صغير','صغيرة']] },
          { type:'truefalse', q:'ة (ta marbuta) est souvent la marque du féminin', correct: true },
        ]},
        { id: 'ar-u4-l2', title: 'Verbe — Passé simple', exercises: [
          { type:'grammar', title:'Le passé en arabe', content:'Le passé (الماضي) est la forme de base du verbe.\nRacine ك-ت-ب (k-t-b — écrire) :\n• كَتَبَ (kataba) — il a écrit\n• كَتَبَتْ (katabat) — elle a écrit\n• كَتَبْتُ (katabtu) — j\'ai écrit\n• كَتَبْنَا (katabnâ) — nous avons écrit\n• كَتَبُوا (katabû) — ils ont écrit' },
          { type:'qcm', q:'"كَتَبَتْ" signifie ?', choices:['Elle a écrit','Il a écrit','J\'ai écrit','Ils ont écrit'], correct:0 },
          { type:'fill', q:'___ رسالة. (J\'ai écrit — ك-ت-ب)', answer:'كَتَبْتُ', hint:'1ère personne singulier', choices:['كَتَبْتُ','كَتَبَ','كَتَبَتْ','كَتَبُوا'] },
          { type:'truefalse', q:'En arabe, le verbe passé de base (kataba) correspond à "il"', correct: true },
        ]},
      ]
    },
    // ─── B1 ──────────────────────────────────────────────
    {
      id: 'ar-u5', level: 'B1', title: 'Structures B1', icon: '🏛️',
      lessons: [
        { id: 'ar-u5-l1', title: 'Duel & Pluriel brisé', exercises: [
          { type:'grammar', title:'Duel et pluriel brisé', content:'L\'arabe a 3 nombres : singulier, duel, pluriel.\n\nDuel : -ان/-ين (kitâbân = deux livres)\n\nPluriel brisé : le patron de la racine change (comme "œil→yeux" en fr.)\n• كتاب (kitâb — livre) → كتب (kutub — livres)\n• مدرسة (madrasa — école) → مدارس (madâris — écoles)\n• رجل (rajul — homme) → رجال (rijâl — hommes)\n• بيت (bayt — maison) → بيوت (buyût — maisons)' },
          { type:'qcm', q:'"كتب" est le pluriel de ?', choices:['كتاب (livre)','كاتب (écrivain)','مكتب (bureau)','كتابة (écriture)'], correct:0 },
          { type:'pair', q:'Associez singulier et pluriel', pairs:[['كتاب','كتب'],['مدرسة','مدارس'],['رجل','رجال'],['بيت','بيوت']] },
          { type:'truefalse', q:'Le duel arabe se forme en ajoutant -ان', correct: true },
        ]},
        { id: 'ar-u5-l2', title: 'Vocabulaire thématique B1', exercises: [
          { type:'flashcard', q:'حكومة', a:'Hukuma — Gouvernement', hint:'Politique' },
          { type:'flashcard', q:'مجتمع', a:'Mujtama\' — Société', hint:'Social' },
          { type:'flashcard', q:'اقتصاد', a:'Iqtisâd — Économie', hint:'' },
          { type:'flashcard', q:'تاريخ', a:'Târîkh — Histoire / Date', hint:'Double sens' },
          { type:'flashcard', q:'ثقافة', a:'Thaqâfa — Culture', hint:'' },
          { type:'flashcard', q:'لغة', a:'Lugha — Langue', hint:'' },
          { type:'pair', q:'Associez', pairs:[['حكومة','Gouvernement'],['اقتصاد','Économie'],['تاريخ','Histoire'],['لغة','Langue']] },
          { type:'qcm', q:'"تاريخ" signifie ?', choices:['Histoire/Date','Culture','Langue','Société'], correct:0 },
        ]},
      ]
    },
  ]
},

}; // fin CURRICULUM

if (typeof module !== 'undefined') module.exports = CURRICULUM;
