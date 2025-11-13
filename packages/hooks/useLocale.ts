/**
 * fork = require( https://github.com/element-plus/element-plus/blob/dev/packages/hooks/use-locale/index.ts)
 */
import type { Ref } from "vue"
import { computed, ref, inject, unref, isRef } from "vue"
import { get } from "lodash-es"
import { localeContextKey } from "element-plus"
// import English from '@t-ui-plus/locale/lang/en'
import plusZhCn from "@t-ui-plus/locale/lang/zh-cn"
import type { Language } from "@t-ui-plus/locale"

type MaybeRef<T> = T | Ref<T>

export type TranslatorOption = Record<string, string | number>
export type Translator = (path: string, option?: TranslatorOption) => string
export type LocaleContext = {
  locale: Ref<Language>
  lang: Ref<string>
  t: Translator
}

export const buildTranslator =
  (locale: MaybeRef<Language>): Translator =>
  (path, option) =>
    translate(path, option, unref(locale))

export const translate = (
  path: string,
  option: undefined | TranslatorOption,
  locale: Language
): string =>
  (get(locale, path, path) as string).replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`
  )

export const buildLocaleContext = (locale: MaybeRef<Language>): LocaleContext => {
  const lang = computed(() => unref(locale).name)
  const localeRef = isRef(locale) ? locale : ref(locale)
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale)
  }
}

export const useLocale = (localeOverrides?: Ref<Language | undefined>) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const locale = localeOverrides || inject(localeContextKey, ref())!
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return buildLocaleContext(computed(() => (locale?.value?.plus ? locale.value : plusZhCn)) as any)
}
