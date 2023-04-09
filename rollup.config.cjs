const path = require("path")

const {getBabelOutputPlugin} = require('@rollup/plugin-babel')

const typescript = require("@rollup/plugin-typescript")
const replace = require('@rollup/plugin-replace')
const externals = require('rollup-plugin-node-externals')

const pkg = require("./package.json")


module.exports = {
  input: "./src/main/minio.mjs",
  plugins: [
    getBabelOutputPlugin({presets: ['@babel/preset-env']}),
    externals({builtinsPrefix: 'strip'}),
    typescript({
      tsconfig: "tsconfig.build.json",
    }),
    replace({
      'process.env.MINIO_JS_PACKAGE_VERSION': JSON.stringify(pkg.version),
      preventAssignment: true,
    })
  ],
  output: [
    // ES module (for bundlers) build.
    {
      format: "esm",
      file: pkg.module,
      sourcemap: true,
      sourcemapExcludeSources: false,
    },
    // CommonJS (for Node) build.
    {
      format: "cjs",
      file: pkg.main,
      sourcemap: true,
      sourcemapExcludeSources: false,
    },
  ],
}
