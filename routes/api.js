"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();
  const translateToBrithish = translator.translateAmericanToBritish;
  const translateToAmerican = translator.translateBritishToAmerican;
  const _ = translator._;

  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;

    if (text == undefined || locale == undefined) {
      res.json({
        error: "Required field(s) missing",
      });
      return;
    } else if (!text.length) {
      res.json({
        error: "No text to translate",
      });
      return;
    } else if (
      locale !== "american-to-british" &&
      locale !== "british-to-american"
    ) {
      res.json({
        error: "Invalid value for locale field",
      });
      return;
    } else {
      let translation =
        locale == "american-to-british"
          ? translateToBrithish(text)
          : translateToAmerican(text);
      if (translation == text) {
        res.json({
          text: text,
          translation: "Everything looks good to me!",
        });
        return;
      }

      res.json({ text: text, translation: _(translation) });
      return;
    }
  });
};
