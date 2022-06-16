const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

const objectInverter = (params) =>
  Object.entries(params).reduce((object, entry) => {
    object[entry[1]] = entry[0];
    return object;
  }, {});

const titleCase = (params) => {
  for (const key in params)
    if (Object.hasOwnProperty.call(params, key)) {
      let element = params[key];
      element = element.replace(element[0], element[0].toUpperCase());
      params[key] = element;
    }
};

const britishToAmericanSpelling = objectInverter(americanToBritishSpelling);
const britishToAmericanTitles = objectInverter(americanToBritishTitles);

titleCase(britishToAmericanTitles);
titleCase(americanToBritishTitles);

class Translator {
  constructor() {
    this.translateAmericanToBritish =
      this.translateAmericanToBritish.bind(this);
    this.translateBritishToAmerican =
      this.translateBritishToAmerican.bind(this);
    this.translationFromObject = this.translationFromObject.bind(this);
  }

  _(string) {
    return string.replace(string[0], string[0].toUpperCase());
  }

  translationFromObject(_str, _obj) {
    for (const key in _obj) {
      const regex = new RegExp(`${key}\\s\|${key}\\.`, "gi");
      const regX = new RegExp(key, "gi");
      if (regex.test(_str)) {
        _str = _str.replace(
          regX,
          `<span class='highlight'>${_obj[key]}</span>`
        );
      }
    }
    return _str;
  }

  translateAmericanToBritish(string) {
    let _STRING = "".concat(string);
    _STRING = this.translationFromObject(_STRING, americanToBritishSpelling);
    _STRING = this.translationFromObject(_STRING, americanToBritishTitles);
    _STRING = this.translationFromObject(_STRING, americanOnly);

    if (/\d+:\d+/.test(_STRING)) {
      _STRING = _STRING.replace(
        /(\d+):(\d+)/,
        "<span class='highlight'>$1.$2</span>"
      );
    }
    return _STRING;
  }

  translateBritishToAmerican(string) {
    let _STRING = "".concat(string);
    _STRING = this.translationFromObject(_STRING, britishToAmericanSpelling);
    _STRING = this.translationFromObject(_STRING, britishToAmericanTitles);
    _STRING = this.translationFromObject(_STRING, britishOnly);

    if (/\d+\.\d+/.test(_STRING)) {
      _STRING = _STRING.replace(
        /(\d+)\.(\d+)/,
        "<span class='highlight'>$1:$2</span>"
      );
    }
    return _STRING;
  }
}

// const trans = new Translator();

// console.log(
//   trans._(trans.translateBritishToAmerican("tea time is usually around 4 or 4.30."))
// );

module.exports = Translator;
