const fs = require('fs');
const path = require('path');
const { program } = require('commander');

// Define the command-line interface
program
    .option('-s, --section <section>', 'Section name')
    .option('-v, --version <version>', 'Version')
    .option('-n, --name <name>', 'Feature name')
    .parse(process.argv);

// Function to create the file structure
function createFileStructure(section, version, name) {
    const baseDir = path.join('src', section, name, version);
    const templateDir = path.join(__dirname, 'templates'); // Adjust this path to your templates directory

    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });

        const mappings = [
            { template: 'BaseController.js', target: `${name}Controller.js` },
            { template: 'BaseService.js', target: `${name}Service.js` },
            { template: 'BaseRoutes.js', target: `${name}Routes.js` },
        ];

        mappings.forEach(({ template, target }) => {
            const templatePath = path.join(templateDir, template);
            const targetPath = path.join(baseDir, target);
            if (fs.existsSync(templatePath)) {
                const content = fs.readFileSync(templatePath, 'utf8');
                fs.writeFileSync(targetPath, content);
                console.log(`${target} created successfully.`);
            } else {
                console.warn(`Template file ${template} not found.`);
            }
        });
    } else {
        console.log('Directory already exists. File structure not created.');
    }
}

// Main function
function main() {
    const { section, version, name } = program.opts();
    if (!section || !version || !name) {
        console.error('Error: Please provide all required options.');
        program.help(); // Show help message
        process.exit(1);
    }

    createFileStructure(section, version, name);
}

main();
