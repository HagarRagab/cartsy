# Contributing to Cartsy

Thank you for your interest in contributing to Cartsy! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or your preferred package manager
- Git
- A GitHub account

### Setup

1. Fork the repository
2. Clone your fork locally
3. Install dependencies
4. Create a feature branch

```bash
git clone https://github.com/your-username/cartsy.git
cd cartsy
npm install
git checkout -b feature/your-feature-name
```

## Development Workflow

1. **Create a branch** for your feature or bug fix
2. **Make your changes** following the coding standards
3. **Test your changes** thoroughly
4. **Commit your changes** with clear messages
5. **Push to your fork**
6. **Create a Pull Request**

## Coding Standards

### JavaScript/React

- Use modern ES6+ syntax
- Follow existing code style and patterns
- Use meaningful variable and function names
- Keep functions small and focused (single responsibility)
- Add comments for complex logic
- Use React Hooks properly (follow Rules of Hooks)
- Avoid inline functions in render when possible

### Component Structure

```javascript
// Import dependencies
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Component types/props (if using TypeScript)
// interface ComponentProps {
//   prop1: string;
//   prop2?: number;
// }

// Main component
export function MyComponent({ prop1, prop2 = 0 }) {
  // Hooks
  const [state, setState] = useState(null);

  // Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // Event handlers
  const handleClick = () => {
    // Handler logic
  };

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

// Export as default if needed
export default MyComponent;
```

### Styling

- Use Tailwind CSS for styling
- Follow existing design system
- Use responsive design principles
- Consider RTL support for Arabic
- Test on multiple screen sizes

### File Organization

- Group related files together
- Use descriptive file names
- Keep component files in appropriate directories
- Separate concerns (UI, logic, data)

## Commit Guidelines

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

```bash
feat(cart): add quantity increment/decrement buttons
fix(auth): resolve login redirect loop
docs(readme): update installation instructions
style(components): apply consistent formatting
refactor(api): simplify payment intent creation
test(checkout): add checkout flow tests
chore(deps): update Next.js to version 15.2
```

## Pull Request Process

### Before Submitting

1. **Update documentation** if your changes affect user-facing features
2. **Add tests** for new functionality or bug fixes
3. **Run linting** and fix any issues
4. **Test thoroughly** on multiple devices and browsers
5. **Test both languages** (English and Arabic)

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on mobile
- [ ] Tested on tablet
- [ ] Tested on desktop
- [ ] Tested in English
- [ ] Tested in Arabic
- [ ] Added automated tests

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
```

### Review Process

1. Automated checks must pass
2. At least one maintainer approval required
3. Address review feedback promptly
4. Keep PRs focused and small when possible

## Testing Guidelines

### Manual Testing

Test your changes across:

- **Devices**: Mobile, tablet, desktop
- **Browsers**: Chrome, Firefox, Safari, Edge
- **Languages**: English and Arabic
- **User flows**: Complete relevant user journeys

### Key Test Areas

- [ ] Authentication (login, signup, password reset)
- [ ] Product browsing and search
- [ ] Cart functionality
- [ ] Checkout process
- [ ] Payment processing
- [ ] Order management
- [ ] Wishlist functionality
- [ ] Language switching
- [ ] Responsive design
- [ ] Error handling

### Automated Testing (Future)

We plan to add automated testing. When available:

- Write unit tests for utility functions
- Write integration tests for components
- Write E2E tests for critical user flows
- Maintain test coverage above 80%

## Reporting Issues

### Bug Reports

When reporting bugs, include:

1. **Clear title** describing the issue
2. **Steps to reproduce** the bug
3. **Expected behavior**
4. **Actual behavior**
5. **Screenshots** or recordings if applicable
6. **Environment details**:
   - OS and version
   - Browser and version
   - Node.js version
   - Mobile device (if applicable)

### Feature Requests

When suggesting features:

1. **Clear description** of the feature
2. **Use case** or problem it solves
3. **Proposed solution** (if you have ideas)
4. **Alternatives considered**
5. **Additional context**

## Questions?

If you have questions about contributing:

- Check existing issues and discussions
- Review the codebase for similar patterns
- Ask in a GitHub Discussion
- Contact maintainers directly for complex questions

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes for significant contributions
- Project documentation

Thank you for contributing to Cartsy! 🎉
