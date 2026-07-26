// HTML要素を代入
let setlang_radio = document.getElementById("setlang_radio");
let output_textarea = document.getElementById("text_output");
let input_textarea = document.getElementById("text_input");
let setsize_radio = document.getElementById("setsize_radio");
const element = document.documentElement;

// 翻訳オブジェクトを宣言
let dic_library;

// UIのサイズを設定
function size_set() {
    let ui_size = setsize_radio.elements['set_size'].value;
    if (ui_size == "mini") {
        element.style.setProperty("--main-size-width", "400px");
        element.style.setProperty("--main-size-height", "400px");
        element.style.setProperty(" --text-size", "14px");
        // console.log(getComputedStyle(element).getPropertyValue("--main-size-width"));
        console.log("agdijosoaijgoijbjoip");
    } else if (ui_size == "def") {
        element.style.setProperty("--main-size-width", "800px");
        element.style.setProperty("--main-size-height", "800px");
        element.style.setProperty(" --text-size", "14px");
    }
}

// 初期化とCOMMON.json(基礎的な辞書)をロード
async function trans_init() {
    dic_library = new Map();
    const common_json = await fetch("dic_data/COMMON.json");
    const common_librarydata = await common_json.json();
    for (const [key, value] of Object.entries(common_librarydata)) {
        dic_library.set(key, value);
    }
}

// トークナイザー
function tokenize(input_text) {
    let text = input_text.split(" ");
    return text;
}

// 翻訳の言語を設定する
async function trans_lang_set() {
    let des_lang = setlang_radio.elements['set_lang'].value;
    if (des_lang == 'C') {
        trans_init();
        const c_json = await fetch("dic_data/C.json");
        const c_librarydata = await c_json.json();
        for (const [key, value] of Object.entries(c_librarydata)) {
            dic_library.set(key, value);
        }
    } else if (des_lang == 'C++') {
        trans_init();
        const cpp_json = await fetch("dic_data/C++.json");
        const cpp_librarydata = await cpp_json.json();
        for (const [key, value] of Object.entries(cpp_librarydata)) {
            dic_library.set(key, value);
        }
    } else if (des_lang == 'C#') {
        trans_init();
        const csharp_json = await fetch("dic_data/C#.json");
        const csharp_librarydata = await csharp_json.json();
        for (const [key, value] of Object.entries(csharp_librarydata)) {
            dic_library.set(key, value);
        }
    } else if (des_lang == 'Python') {
        trans_init();
        const py_json = await fetch("dic_data/PYTHON.json");
        const py_librarydata = await py_json.json();
        for (const [key, value] of Object.entries(py_librarydata)) {
            dic_library.set(key, value);
        }
    } else if (des_lang == 'Rust') {
        trans_init();
        const rs_json = await fetch("dic_data/RUST.json");
        const rs_librarydata = await rs_json.json();
        for (const [key, value] of Object.entries(rs_librarydata)) {
            dic_library.set(key, value);
        }
    } else if (des_lang == 'Java') {
        trans_init();
        const ja_json = await fetch("dic_data/JAVA.json");
        const ja_librarydata = await ja_json.json();
        for (const [key, value] of Object.entries(ja_librarydata)) {
            dic_library.set(key, value);
        }
    } else if (des_lang == 'HTML/CSS') {
        trans_init();
        const ht_json = await fetch("dic_data/HTMLCSS.json");
        const ht_librarydata = await ht_json.json();
        for (const [key, value] of Object.entries(ht_librarydata)) {
            dic_library.set(key, value);
        }
    } else if (des_lang == 'JavaScript') {
        trans_init();
        const js_json = await fetch("dic_data/JAVASCRIPT.json");
        const js_librarydata = await js_json.json();
        for (const [key, value] of Object.entries(js_librarydata)) {
            dic_library.set(key, value);
        }
    } else if (des_lang == 'GDscript') {
        trans_init();
        const gd_json = await fetch("dic_data/GDSCRIPT.json");
        const gd_librarydata = await gd_json.json();
        for (const [key, value] of Object.entries(gd_librarydata)) {
            dic_library.set(key, value);
        }
    }
}

// 翻訳を実行し表示する
function translation() {
    if (dic_library !== undefined) {
        const text = tokenize(input_textarea.value.toLowerCase());
        const result = [];
        let i = 0;
        while (i < text.length) {
            let found = false;
            const maxLength = Math.min(8, text.length - i);
            for (let len = maxLength; len >= 1; len--) {
                const phrase = text.slice(i, i + len).join(" ");
                if (dic_library.has(phrase)) {
                    result.push(dic_library.get(phrase));
                    i += len;
                    found = true;
                    break;
                }
            }
            if (!found) {
                result.push(text[i]);
                i++;
            }
        }
        output_textarea.value = result.join(" ");
    } else {
        output_textarea.value =
            "言語を選択してください（翻訳エンジンの読み取りに失敗している可能性があります）";
    }
}



size_set();
// setsize_redioからサイズの選択を取得し設定
setsize_radio?.addEventListener('change', size_set);

// setlang_radioから翻訳する言語を取得し設定
setlang_radio?.addEventListener('change', trans_lang_set);

// input_textareaから情報を取得しtranslationに送る
input_textarea?.addEventListener("input", translation);
