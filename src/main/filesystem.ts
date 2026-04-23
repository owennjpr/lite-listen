import { app } from 'electron'
import fs from 'node:fs/promises'
import { ParseFileKind } from './utils'

export const mkdir = async (path: string): Promise<string> => {
  const prefix = app.getPath('userData')
  const full_path = prefix + path
  fs.mkdir(full_path, { recursive: true })
  return full_path
}

export const intakeFilePaths = async (paths: string[]): Promise<string> => {
  const results: string[] = []
  for (const p of paths) {
    const stat = await fs.stat(p)
    if (stat.isDirectory()) {
      console.log('folder')
    } else if (stat.isFile()) {
      const { kind, ext } = ParseFileKind(p)
      console.log(`path: ${p}, kind: ${kind}, ext: ${ext}`)
    }
  }
  console.log(results)
  return paths.reduce((prev, curr, ind) => prev + curr + ' ' + ind)
}
