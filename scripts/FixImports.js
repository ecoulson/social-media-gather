const fs = require("fs");
const path = require("path");
const RequireRegex = new RegExp(/^const (.*) = require\(['|"](.*)['|"]\).*\n/, "gm");

async function main() {
    await fixDirectory(path.resolve(__dirname, "..", "src"));
}

async function fixDirectory(directoryPath) {
    const files = await readDirectory(directoryPath);
    files.forEach(async (file) => {
        const filePath = path.join(directoryPath, file);
        if (await isDir(filePath)) {
            return fixDirectory(filePath);
        }
        return await writeFile(filePath, await fixFileImports(filePath));
    })
}

async function fixFileImports(path) {
    let rawCode = await readFile(path);
    const matches = [...rawCode.matchAll(RequireRegex)];
    const requireStatements = matches
        .map(match => rawCode.substring(match.index, match.index + match[0].length));
    const updatedStatements = requireStatements.map(transformRequireStatements);
    updatedStatements.forEach(statement => {
        rawCode = rawCode.replace(statement.old, statement.new);
    })
    return rawCode;
}

function transformRequireStatements(requireStatement) {
    const path = [...requireStatement.matchAll(RequireRegex)].map(match => match[2])[0];
    const name = [...requireStatement.matchAll(RequireRegex)].map(match => match[1])[0];
    return {
        new: `import ${name} from "${path}";\n`,
        old: requireStatement
    };
        
}

function writeFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        })
    })
} 

function isDir(path) {
    return new Promise((resolve) => {
        fs.readdir(path, (err) => {
            console.log(err);
            return resolve(err ? false : true);
        })
    })
}

function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf-8", (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        })
    })
}

function readDirectory(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                return reject(err);
            }
            return resolve(files);
        })
    })
}

main();	