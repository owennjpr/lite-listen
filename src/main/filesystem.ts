import { app } from 'electron'
import fs from 'node:fs/promises'

export const mkdir = async (path: string): Promise<string> => {
  const prefix = app.getPath('userData')
  const full_path = prefix + path
  fs.mkdir(full_path, { recursive: true })
  return full_path
}

export const intakeFilePaths = async (paths: string[]): Promise<string> => {
  console.log(paths)
  return paths.reduce((prev, curr, ind) => prev + curr + ' ' + ind)
}
