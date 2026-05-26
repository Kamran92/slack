declare module 'leo-profanity' {
  export function clean(text: string): string
  export function has(text: string): boolean
  export function add(words: string | string[]): void
  export function remove(words: string | string[]): void
  export function setDictionary(words: string | string[]): void
  export function getDictionary(): string[]
  export function loadDictionary(words: string | string[]): void
  const LeoProfanity: {
    clean: (text: string) => string
    has: (text: string) => boolean
    add: (words: string | string[]) => void
    remove: (words: string | string[]) => void
    setDictionary: (words: string | string[]) => void
    getDictionary: () => string[]
    loadDictionary: (words: string | string[]) => void
  }
  export default LeoProfanity
}