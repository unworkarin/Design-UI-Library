# Usage Notes

This tiny UI library uses Web Components to stay framework-agnostic. The `components.js` file registers custom elements:

- `<ui-button>`: a themeable button. Supports `outline` and `disabled` attributes.
- `<ui-card>`: a simple card wrapper with a `slot="title"` for the title.
- `applyTheme(theme)`: helper function to set CSS variables on `:root` for runtime theming.

To use in a project, either copy `src/ui_lib/*` into your static assets or import the module directly in modern browsers that support ES modules.
