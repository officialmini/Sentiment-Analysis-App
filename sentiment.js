(function (global) {

  function Sentiment() {}

  // 🔥 CORE LEXICON (trimmed sample shown — assume large dataset)
  const LEXICON = {
    abandon: -2, abandoned: -2, ability: 2, abnormal: -2, abolish: -2,
    abuse: -3, accept: 1, accident: -2, accomplish: 2, achievement: 4,
    active: 1, admirable: 3, adore: 3, advantage: 2, amazing: 4,
    angry: -3, annoy: -2, awesome: 4, awful: -3, bad: -2, beautiful: 3,
    best: 4, boring: -3, broken: -2, calm: 2, clean: 2, clever: 2,
    corrupt: -3, crazy: -2, damage: -3, danger: -2, dead: -3,
    defeat: -3, delight: 3, dirty: -2, disaster: -4, easy: 1,
    effective: 2, enjoy: 2, excellent: 4, fail: -3, failure: -3,
    fantastic: 4, fight: -2, fine: 2, frustrated: -3, funny: 2,
    good: 3, great: 3, happy: 3, hate: -3, helpful: 2, horrible: -3,
    ideal: 3, ignore: -2, important: 2, improve: 2, impressive: 3,
    joy: 3, kill: -3, kind: 2, laugh: 2, lazy: -2, love: 4,
    lucky: 3, mess: -2, mistake: -2, nice: 2, perfect: 4,
    poor: -2, powerful: 2, problem: -2, proud: 2, reject: -2,
    respect: 2, risk: -2, sad: -2, safe: 2, success: 3,
    terrible: -3, toxic: -3, ugly: -3, useless: -3, victory: 4,
    weak: -2, win: 4, wonderful: 4, worry: -2, wrong: -2, stupid: -3,
    mad: -3, foolish: -3, rubbish: -2, fuck: -4, motherfucker: -4, shit: -3,
    bitch: -3
  };

  // 🇳🇬 SLANG EXTENSION
  const SLANG = {
    dope: 3, gbam: 3, sharp: 2, clean: 2, correct: 2,
    baddo: 3, burst: 3, solid: 2,

    wahala: -3, yawa: -3, mumu: -3, ode: -2, rubbish: -3,
    cast: -2, drag: -2, over_sabi: -2, see_finish: -2
  };

  // ❗ NEGATION WORDS
  const NEGATIONS = [
    "not", "no", "never", "none", "hardly", "rarely", "isn't",
    "wasn't", "don't", "doesn't", "can't", "won't"
  ];

  // ⚡ INTENSIFIERS
  const INTENSIFIERS = {
    very: 1.5,
    too: 1.7,
    extremely: 2,
    so: 1.3,
    really: 1.4
  };

  Sentiment.prototype.analyze = function (text) {

    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/);

    let score = 0;
    let negationActive = false;
    let multiplier = 1;

    words.forEach((word, index) => {

      if (NEGATIONS.includes(word)) {
        negationActive = true;
        return;
      }

      if (INTENSIFIERS[word]) {
        multiplier = INTENSIFIERS[word];
        return;
      }

      const value = LEXICON[word] || SLANG[word];

      if (value) {
        let finalValue = value * multiplier;

        if (negationActive) finalValue *= -1;

        score += finalValue;

        negationActive = false;
        multiplier = 1;
      }
    });

    return {
      score,
      comparative: words.length ? score / words.length : 0
    };
  };

  global.Sentiment = Sentiment;

})(this);
