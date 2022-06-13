"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;

    if (!text || !locale) {
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
      res.json({});
      return;
    }
  });
};
