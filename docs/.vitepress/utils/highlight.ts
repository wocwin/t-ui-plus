import hljs from 'highlight.js'

function wrap(code: string, lang: string): string {
  return `<pre v-pre><code language="javascript">${code}\r\n</code></pre>`
}

export const highlight = (str: string, lang: string) => {
  if (!lang) {
    return wrap(str, 'text')
  }
  lang = lang.toLowerCase()

  const code = hljs.highlight(str, { language: 'javascript' }).value

  return wrap(code, 'text')
}
