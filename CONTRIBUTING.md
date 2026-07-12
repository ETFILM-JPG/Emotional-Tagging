# Contributing to Emotional-Tagging

We welcome contributions! Here's how to get started.

## Before You Start

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m "feat: description"`
5. Push: `git push origin feature/your-feature`
6. Open a Pull Request

## Code Style

### TypeScript/React

```bash
# Format code
npx prettier --write .

# Lint
npm run lint
```

### Rust

```bash
cd src-tauri
cargo fmt
cargo clippy
```

### Python

```bash
cd crawler
black .
flake8 .
```

## Commit Convention

- `feat: ` - New feature
- `fix: ` - Bug fix
- `docs: ` - Documentation
- `style: ` - Code style (no logic change)
- `refactor: ` - Code refactoring
- `perf: ` - Performance improvement
- `test: ` - Test addition/modification
- `chore: ` - Build/tooling changes

## PR Process

1. Ensure all tests pass
2. Update README/documentation if needed
3. Add tests for new features
4. Request review from maintainers
5. Address feedback
6. Merge when approved

## Reporting Issues

- Check existing issues first
- Provide clear reproduction steps
- Include screenshots/logs if applicable
- Specify your OS and app version

## Questions?

Open a discussion or contact the maintainers.
