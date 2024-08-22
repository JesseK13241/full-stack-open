## CI setup for a hypothetical team

For our hypothetical application the primary language of choice is Python. The project consists of about 6 people.

The chosen version control system is GitHub, which comes with a built-in CI setup (GitHub Actions).

### Linting and Formatting

The coding conventions are enforced with a linter and a code formatter called [ruff](https://github.com/astral-sh/ruff). Ruff is extremely performant as it's written in Rust and it replaces several other traditional tools such as flake8 and black in one dependency. 

### Testing

Testing strategy includes two tools:

For simple functions, **doctest** is used, which encourages developers to write small examples that also double as tests. This also promotes test-driven development practices.

More complex unit tests are performed with **pytest**, which has a simple syntax and a rich plugin ecosystem. 

Both of these testing libraries integrate well with GitHub Actions.

### Building

For packaging the Python project, poetry is used. It handles dependecy management and packaging in a single tool, which makes it easier to build and distribute the application.

### Security

[Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts) alerts are enabled to enhance the repository security. 

### CI Environment alternatives

Cloud-based CI/CD (GitHub Actions) is chosen over self-hosted environment due to ease of setup and maintenance. Accessibility for all team members, regardless of their physical location, is also a big plus. 

Alternatives to GitLab Actions and Jenkins include GitLab CI/CD, CircleCI, Travis CI and Azure Pipelines for example. GitHub Actions has been chosen due to familiarity, the advanced features it provides and how well it integrates with GitHub.

If performance or cost become an issue, the environment choice can be re-evaluated.