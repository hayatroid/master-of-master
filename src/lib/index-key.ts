import kuromoji from "kuromoji";

const KANJI_RE = /[一-鿿々]/;

let tokenizerPromise:
  Promise<kuromoji.Tokenizer<kuromoji.IpadicFeatures>> | undefined;

function getTokenizer(): Promise<kuromoji.Tokenizer<kuromoji.IpadicFeatures>> {
  tokenizerPromise ??= new Promise((resolve, reject) => {
    kuromoji
      .builder({ dicPath: "node_modules/kuromoji/dict" })
      .build((err, tokenizer) => {
        if (err) {
          reject(err);
        } else {
          resolve(tokenizer);
        }
      });
  });
  return tokenizerPromise;
}

const SMALL_KANA: Record<string, string> = {
  ぁ: "あ",
  ぃ: "い",
  ぅ: "う",
  ぇ: "え",
  ぉ: "お",
  っ: "つ",
  ゃ: "や",
  ゅ: "ゆ",
  ょ: "よ",
  ゎ: "わ",
};

const VOICED_KANA: Record<string, string> = {
  が: "か",
  ぎ: "き",
  ぐ: "く",
  げ: "け",
  ご: "こ",
  ざ: "さ",
  じ: "し",
  ず: "す",
  ぜ: "せ",
  ぞ: "そ",
  だ: "た",
  ぢ: "ち",
  づ: "つ",
  で: "て",
  ど: "と",
  ば: "は",
  び: "ひ",
  ぶ: "ふ",
  べ: "へ",
  ぼ: "ほ",
  ぱ: "は",
  ぴ: "ひ",
  ぷ: "ふ",
  ぺ: "へ",
  ぽ: "ほ",
  ゔ: "う",
};

export async function indexKey(title: string): Promise<string> {
  const head = [...title][0];
  if (head === undefined) {
    throw new Error("empty title");
  }
  let key = head;
  if (KANJI_RE.test(head)) {
    const tokenizer = await getTokenizer();
    const reading = tokenizer.tokenize(title)[0]?.reading;
    if (reading !== undefined) {
      key = [...reading][0]!;
    }
  }
  key = key.normalize("NFKC").toUpperCase();
  const code = key.codePointAt(0)!;
  if (code >= 0x30a1 && code <= 0x30f6) {
    key = String.fromCodePoint(code - 0x60);
  }
  key = SMALL_KANA[key] ?? key;
  key = VOICED_KANA[key] ?? key;
  return key;
}

function rank(key: string): number {
  const code = key.codePointAt(0)!;
  if (code >= 0x30 && code <= 0x39) {
    return 0;
  }
  if (code >= 0x41 && code <= 0x5a) {
    return 1;
  }
  if (code >= 0x3041 && code <= 0x3093) {
    return 2;
  }
  return 3;
}

export function compareIndexKeys(a: string, b: string): number {
  const diff = rank(a) - rank(b);
  if (diff !== 0) {
    return diff;
  }
  return a.codePointAt(0)! - b.codePointAt(0)!;
}
