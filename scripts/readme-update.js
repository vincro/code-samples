const fs = require('fs-extra');
const fm = require('front-matter');

/* */
const projectData = {};

/* List the project directories */
const projectsDirectory = '../';

fs.readdir(projectsDirectory, (err, files) => {
    files.forEach(file => {
        const matcher = /project\-/;
        const projectDir = `${projectsDirectory}/${file}`;
        const readmePath = `${projectDir}/PROJECT.md`;

        if (matcher.test(file)) {

            fs.pathExists(readmePath)
                .then((exists) => {
                    if (exists) {
                        fs.readFile(readmePath, 'utf8', function(err, data){
                            if (err) throw err;

                            var content = fm(data);

                            if (Object.keys(content.attributes).length) {
                                projectData[file] = content.attributes;

                                console.log(projectData[file])
                            }
                        })
                    }
                })
                .catch(err => {
                    console.error(err)
                });
        }
    });
});