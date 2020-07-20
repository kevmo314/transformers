import MonacoWebpackPlugin from `monaco-editor-webpack-plugin`;

export function onCreateWebpackConfig({ actions }) {
  actions.setWebpackConfig({
    plugins: [new MonacoWebpackPlugin()],
  });
}
