import * as os from 'os'
import * as fs from 'fs'
import mini from 'minimist'
import * as readline from 'readline'

const homedir = os.homedir()
const rcFilePath = `${homedir}/.npmrc`
const args = mini(process.argv.slice(2))
const templatePath = args.template

validatePreconditions()
generateRcFile()

export function generateRcFile() {
    readline
        .createInterface({input: process.stdin, output: process.stdout, historySize: 0})
        .question('TOKEN> ', processToken)
}

function processToken(token: string) {
    if (!token)
        exitWithMessage('Token cannot be empty')

    const b64 = Buffer.from(token.trim()).toString('base64')

    const template = fs.readFileSync(templatePath, {encoding: 'UTF-8'})
    const rcFile = template.replace(/TOKEN_PLACEHOLDER/g, b64)

    fs.writeFileSync(rcFilePath, rcFile, {encoding: 'UTF-8'})
    console.log('Token setup successful')

    process.exit()
}

function validatePreconditions() {
    const exists = fs.existsSync(rcFilePath)
    const size = exists ? fs.statSync(rcFilePath).size : 0
    if (exists && size)
        exitWithMessage('The .npmrc file already exists and contains configuration. Exiting..')

    if (!templatePath)
        exitWithMessage('--template parameter is required')

    const templateSize = fs.statSync(templatePath).size
    if (!templateSize)
        exitWithMessage('Template cannot be empty')
}

function exitWithMessage(msg: string) {
    console.warn(msg)
    process.exit(1)
}
