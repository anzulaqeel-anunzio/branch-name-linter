// Developed for Anunzio International by Anzul Aqeel. Contact +971545822608 or +971585515742. Linkedin Profile: linkedin.com/in/anzulaqeel

/*
 * Developed for Anunzio International by Anzul Aqeel
 * Contact +971545822608 or +971585515742
 */

const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const token = core.getInput('token');
        const regexPattern = core.getInput('regex');
        const ignoreBranches = core.getInput('ignore_branches').split(',').map(b => b.trim());

        // In a PR context, github.head_ref is the source branch.
        // In other contexts, it might be github.ref directly (but typically refs/heads/branchname)

        let branchName = '';
        if (github.context.eventName === 'pull_request') {
            branchName = github.context.payload.pull_request.head.ref;
        } else {
            // Fallback or for push events
            const ref = github.context.ref;
            if (ref && ref.startsWith('refs/heads/')) {
                branchName = ref.replace('refs/heads/', '');
            }
        }

        if (!branchName) {
            console.log('Could not determine branch name. Skipping.');
            return;
        }

        console.log(`Checking branch: ${branchName}`);

        if (ignoreBranches.includes(branchName)) {
            console.log('Branch is in ignore list. Skipping check.');
            return;
        }

        const regex = new RegExp(regexPattern);
        if (regex.test(branchName)) {
            console.log('Branch name is valid.');
        } else {
            core.setFailed(`Branch name "${branchName}" does not match pattern: ${regexPattern}`);
        }

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

// Developed for Anunzio International by Anzul Aqeel. Contact +971545822608 or +971585515742. Linkedin Profile: linkedin.com/in/anzulaqeel
