# Branch Name Linter

Enforce standard naming conventions for Git branches (e.g., `feature/`, `bugfix/`) to keep your repository organized.

## Features

-   **Regex Validation**: Enforce specific patterns (e.g., `^(feature|bugfix|hotfix)\/`).
-   **Immediate Feedback**: Fails build if branch name is invalid.
-   **Ignore List**: Exclude specific branches like `main` or `develop`.

## Usage

Create a workflow file (e.g., `.github/workflows/branch-lint.yml`):

```yaml
name: Lint Branch Name
on: [pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Branch Linter
        uses: ./
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          regex: '^(feature|bugfix|hotfix|release)\/[a-z0-9._-]+$'
          ignore_branches: 'main,develop,master'
```

## Inputs

| Input | Description | Default |
| :--- | :--- | :--- |
| `token` | GITHUB_TOKEN | `${{ github.token }}` |
| `regex` | Regex pattern to match | `^.*$` |
| `ignore_branches` | Comma-separated list of ignored branches | `main,master` |

## Contact

Developed for Anunzio International by Anzul Aqeel.
Contact +971545822608 or +971585515742.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---
### 🔗 Part of the "Ultimate Utility Toolkit"
This tool is part of the **[Anunzio International Utility Toolkit](https://github.com/anzulaqeel-anunzio/ultimate-utility-toolkit)**.
Check out the full collection of **180+ developer tools, scripts, and templates** in the master repository.

Developed for Anunzio International by Anzul Aqeel.
