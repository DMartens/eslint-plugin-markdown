const plugin = require("./lib/index.js");
const eslintApi = require("eslint/use-at-your-own-risk");

const eslint = new eslintApi.FlatESLint({
    overrideConfigFile: true,
    overrideConfig: {
        files: ["**/*.md", "**/*.mdx", "**/*.json"],
        plugins: {
            test: {
                rules: {
                    test: {
                        create: context => ({
                            Program(node) {
                                context.report({ node, message: "message" });
                            }
                        })
                    }
                }
            }
        },
        processor: plugin.processors.markdown,
        rules: {
            "test/test": "error",
        }
    }
});

const text = require('fs').readFileSync('./ISSUE_TEMPLATE.md', 'utf8');

eslint.lintText(text, { filePath: 'file.md', warnIgnored: true });
