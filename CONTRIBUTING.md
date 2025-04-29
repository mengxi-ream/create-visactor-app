# Contributing to Create VisActor App

Thank you for your interest in contributing to Create VisActor App! This document provides guidelines and instructions for contributing to the project.

## Development Setup

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Link the CLI for local development:
   ```bash
   cd apps/cli
   pnpm link-cli
   ```
4. Then you can use `visactor` command to test the local CLI.

## Project Structure

This is a monorepo project managed with pnpm. The main components are:

- CLI tool
- Documentation website

## Development Workflow

1. Create a new branch for your feature/fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the project's coding standards:

   - Use TypeScript
   - Follow ESLint and Prettier configurations
   - Write tests for new features

3. Commit your changes following the [Conventional Commits](https://www.conventionalcommits.org/) specification:

   ```bash
   git commit -m "feat: add new feature"
   ```

4. Push your changes to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request (PR) to the main repository

## Code Style

- Use TypeScript for all new code
- Follow the ESLint and Prettier configurations
- Write meaningful commit messages
- Include tests for new features
- Update documentation when necessary

## Pull Request Process

1. Ensure your PR description clearly describes the problem and solution
2. Include relevant tests
3. Update documentation if needed
4. Ensure all CI checks pass
5. Request review from maintainers

## Issue Reporting

When reporting issues, please include:

- A clear description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Node version, etc.)

## Template Development

When working on templates:

- Ensure compatibility with the latest versions of frameworks
- Follow best practices for each framework
- Test the template creation process
- Update documentation for new features
- To install dependencies for the local template, run `pnpm install --ignore-workspace` in the template directory. This will ignore Turborepo settings for the template.

## Documentation

- Keep documentation up to date with changes
- Use clear and concise language
- Include code examples where appropriate
- Follow the existing documentation style

## Questions?

Feel free to open an issue if you have any questions about contributing to the project.
