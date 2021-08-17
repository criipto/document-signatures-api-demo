module.exports = {
    // ...
    // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
    src: "./src",
    schema: "./schema.json",
    language: "typescript",
    extensions: ["ts", "tsx"],
    exclude: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
    customScalars: {
      "Blob": "string"
    }
  }