import { input } from '@inquirer/prompts';
import { exec } from 'child_process';

async function createTag() {
    try {
        // Prompt for the tag name using the new API
        const tagName = await input({ message: 'Enter the tag name you want to create:' });

        // Create the Git tag
        exec(`git tag ${tagName}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error creating tag: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`Tag created: ${tagName}`);

            // Push the tag to the remote repository
            exec(`git push origin ${tagName}`, (pushError, pushStdout, pushStderr) => {
                if (pushError) {
                    console.error(`Error pushing tag to remote: ${pushError.message}`);
                    return;
                }
                if (pushStderr) {
                    console.error(`stderr while pushing: ${pushStderr}`);
                    return;
                }
                console.log(`Tag pushed to remote: ${tagName}`);
            });
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

createTag();
