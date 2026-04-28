export const mermaidConfig = {
  securityLevel: 'loose',
  startOnLoad: false,
  theme: 'base',
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis',
  },
  sequence: {
    useMaxWidth: true,
    wrap: true,
  },
  themeVariables: {
    primaryColor: '#f7f1e2',
    primaryBorderColor: '#1f6f67',
    primaryTextColor: '#1b221f',
    secondaryColor: '#e7dcc4',
    tertiaryColor: '#d9e8e4',
    lineColor: '#50615c',
    mainBkg: '#fffdf8',
    nodeBorder: '#9db3ae',
    clusterBkg: '#f3ede0',
    clusterBorder: '#c9c0b0',
    fontFamily:
      'Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Segoe UI, sans-serif',
  },
} as const;
