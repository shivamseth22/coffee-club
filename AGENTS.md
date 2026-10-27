# AGENTS.md

## 1. Project Overview

Build a scalable, maintainable, production-quality frontend application using:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Zustand

Follow the existing project structure and installed package versions.

Before making changes, inspect `package.json`, configuration files, existing components, and the directory structure.

Do not assume a library, command, or configuration exists without verifying it.

## 2. Core Engineering Principles

- Prioritize readability, maintainability, type safety, accessibility, and performance.
- Follow existing project conventions.
- Prefer simple solutions over unnecessary abstractions.
- Make the smallest complete change that solves the task.
- Reuse existing components, hooks, utilities, and design tokens.
- Avoid duplicate logic and unnecessary dependencies.
- Do not rewrite unrelated code.
- Do not use `any` unless explicitly justified.
- Do not leave placeholder implementations or silently ignore errors.
- Never claim that tests or builds passed without running them.

## 3. Next.js Guidelines

- Follow the project's installed Next.js version.
- Use the App Router if the project is configured with it.
- Prefer Server Components by default.
- Use `"use client"` only when client-side functionality is required.
- Keep Client Components as small as practical.
- Do not turn an entire page into a Client Component just because one section needs interactivity.
- Use `next/link` for internal navigation.
- Use `next/image` for images when appropriate.
- Use Next.js metadata APIs for titles, descriptions, and SEO.
- Handle loading, errors, and missing resources appropriately.
- Keep server-only code and secrets out of client bundles.
- Do not access `window`, `document`, or other browser-only APIs during server rendering.
- Avoid unnecessary data fetching and duplicate requests.
- Follow the project's existing authentication and authorization patterns.

## 4. TypeScript Guidelines

- Use TypeScript for application code.
- Define explicit types for component props, API responses, parameters, and return values where useful.
- Prefer `type` or `interface` according to existing project conventions.
- Avoid `any`, unsafe type assertions, and non-null assertions when a safer solution exists.
- Use `unknown` for values whose types are not yet established.
- Narrow types before accessing properties.
- Avoid duplicating shared type definitions.
- Keep API response types separate from UI-specific types when their structures differ.
- Do not assume that a TypeScript type validates runtime API responses.
- Use runtime validation when required by the API contract or application risk.

## 5. Component Architecture

Prefer feature-oriented organization when the application grows.

Suggested structure:

src/
  app/
  components/
    ui/
    shared/
  features/
    feature-name/
      components/
      hooks/
      services/
      stores/
      types/
      utils/
  hooks/
  lib/
  services/
  stores/
  types/
  utils/

Adapt this structure to the actual application.

Guidelines:

- `app/`: Routes, layouts, and route-level composition.
- `components/ui/`: shadcn/ui components and reusable primitives.
- `components/shared/`: Components reused across multiple features.
- `features/`: Feature-specific components, hooks, services, and types.
- `lib/`: Shared library configuration and integrations.
- `services/`: Shared API client and cross-feature service utilities.
- `stores/`: Global Zustand stores when appropriate.
- `types/`: Truly shared application types.
- `utils/`: Small, reusable utility functions.

Do not create every directory in advance without a real need.

Keep components focused and avoid excessive prop drilling or deeply nested component trees.

## 6. shadcn/ui and Styling

- Use shadcn/ui as the primary source for standard UI primitives.
- Reuse existing shadcn/ui components before creating alternatives.
- Keep shadcn/ui components in the configured UI directory.
- Preserve the existing `components.json` configuration.
- Use Tailwind CSS for styling when consistent with the project.
- Use design tokens and CSS variables for theme colors.
- Avoid hardcoded colors when a semantic token exists.
- Maintain consistent spacing, typography, border radius, shadows, and variants.
- Use the existing `cn` utility for conditional Tailwind classes when available.
- Prefer composition and component variants over repeated class strings.
- Avoid unnecessary inline styles and global CSS overrides.
- Do not overwrite customized shadcn/ui components without inspecting their existing changes.
- Follow the installed shadcn/ui conventions and component APIs.

## 7. TanStack Query: Server State

Use TanStack Query for asynchronous server data that needs caching, synchronization, or mutation management.

- Create a shared QueryClient configuration.
- Use a stable QueryClient lifecycle appropriate for Next.js rendering.
- Avoid sharing request-specific server cache state between users.
- Use descriptive, consistently structured query keys.
- Centralize query keys where doing so improves consistency.
- Extract reusable queries into feature-level hooks when appropriate.
- Use `useQuery` for client-side queries.
- Use `useMutation` for server-side changes initiated by the client.
- Invalidate or update relevant queries after successful mutations.
- Handle loading, error, empty, and success states.
- Configure retries according to the type of error and operation.
- Avoid unnecessary duplicate queries.
- Do not store copies of query results in Zustand without a clear requirement.
- Do not fetch the same data independently in multiple places without a reason.
- Coordinate server prefetching and hydration only when the application benefits from it.
- Use the documented APIs for the installed TanStack Query version.

## 8. Zustand: Client State

Use Zustand for shared client-side state that must be accessed across components.

Appropriate examples:

- Sidebar and navigation state.
- UI preferences.
- Selected items or filters when they must be shared globally.
- Multi-step client-side workflows.
- Temporary client-side drafts.
- Client-side state that genuinely needs to persist across navigation.

Guidelines:

- Keep stores small and focused on a clear responsibility.
- Prefer feature-specific stores over one giant global store.
- Define explicit state and action types.
- Use selectors to subscribe to only the required state.
- Avoid duplicating state already owned by TanStack Query.
- Avoid using Zustand for simple local component state.
- Do not persist state by default.
- Persist only necessary, non-sensitive data.
- Do not store secrets, session credentials, or sensitive personal data in persisted client state.
- Avoid accessing browser storage during server rendering.
- Ensure stores used in Server Components do not leak request-specific state between users.
- Use the appropriate hydration strategy if persisted state is introduced.

## 9. Clear State Ownership

Choose state ownership based on the nature of the data:

- Server data and cache: TanStack Query.
- Shared client state: Zustand.
- Local component state: `useState` or `useReducer`.
- Form input state: The existing form library or controlled/uncontrolled inputs as appropriate.
- URL-shareable state: Search parameters or route parameters where appropriate.
- Derived state: Compute from existing state rather than maintaining duplicate copies.

Do not introduce multiple sources of truth for the same data.

## 10. API and Service Layer

- Reuse a shared API client when the project has one.
- Keep network logic separate from presentation components when practical.
- Define explicit request and response types.
- Follow the documented API contract.
- Never invent endpoints, fields, or response structures.
- Handle HTTP errors, network failures, and unexpected responses.
- Use environment variables for configurable API URLs.
- Never expose secrets through `NEXT_PUBLIC_` variables.
- Remember that `NEXT_PUBLIC_` variables are exposed to browser code.
- Do not treat frontend validation as a security boundary.
- Keep authentication and authorization enforcement on the server.
- Avoid logging secrets or sensitive user data.

## 11. Forms and Validation

- Reuse the project's existing form and validation libraries.
- If React Hook Form and Zod are installed, use them where appropriate.
- Do not add form libraries without checking the current dependencies.
- Define clear validation rules and useful error messages.
- Display server-side validation errors appropriately.
- Prevent duplicate submissions where necessary.
- Provide accessible labels and keyboard interaction.
- Do not assume frontend validation replaces server-side validation.

## 12. Accessibility and Responsive Design

- Use semantic HTML.
- Support keyboard navigation.
- Provide visible focus indicators.
- Give interactive elements accessible names.
- Use appropriate labels, descriptions, and error associations.
- Ensure sufficient color contrast.
- Do not communicate important information through color alone.
- Add meaningful alternative text to informative images.
- Follow shadcn/ui accessibility patterns and verify actual behavior.
- Build responsive layouts for the application's supported screen sizes.
- Avoid horizontal overflow and unnecessary layout shifts.
- Respect reduced-motion preferences.

## 13. Performance

- Prefer Server Components where appropriate.
- Minimize unnecessary Client Components and client-side JavaScript.
- Avoid unnecessary React effects and state.
- Use memoization only when it provides a real benefit.
- Avoid importing large libraries for small features.
- Use pagination or virtualization for large datasets when appropriate.
- Optimize images and fonts using suitable Next.js features.
- Avoid unnecessary Zustand subscriptions.
- Avoid duplicate network requests.
- Do not add complex optimization without a clear benefit.

## 14. Naming Conventions

Follow the established conventions in the repository.

Recommended defaults:

- Components: PascalCase.
- Hooks: camelCase with a `use` prefix.
- Utilities: descriptive camelCase names.
- Types: descriptive names with consistent suffixes where useful.
- Zustand stores: feature-oriented names.
- Query keys: stable, structured arrays.
- Boolean variables: meaningful names such as `isLoading`, `hasError`, and `shouldRefresh`.

Avoid vague names and unnecessary abbreviations.

## 15. Error and Loading States

For data-driven UI, consider:

- Initial loading.
- Background fetching when relevant.
- Empty results.
- API errors.
- Successful mutations.
- Validation errors.
- Disabled controls.
- Missing or incomplete data.

Use the project's existing notification, dialog, and error-handling conventions.

Do not silently swallow errors.

## 16. Testing and Validation

Before completing a change:

1. Run the relevant lint command.
2. Run TypeScript checks if configured.
3. Run relevant unit or integration tests if available.
4. Run a production build when appropriate.
5. Inspect the Git diff.
6. Check for unrelated modifications.

Use the actual scripts in `package.json`.

Do not claim a check passed if it was not run.

## 17. Git and Dependency Safety

- Preserve unrelated user changes.
- Do not overwrite customized components without inspecting them.
- Do not run destructive Git commands without explicit approval.
- Do not commit or push unless requested.
- Do not upgrade packages unnecessarily.
- Use the existing package manager.
- Update the lockfile when changing dependencies.
- Never commit environment files, credentials, or secrets.

## 18. AI Agent Workflow

For each task:

1. Read applicable AGENTS.md files.
2. Inspect relevant source files and package versions.
3. Identify the simplest implementation consistent with the architecture.
4. Reuse existing components and utilities.
5. Make focused changes.
6. Check error states, accessibility, and responsive behavior.
7. Run relevant validation commands.
8. Review the final diff.
9. Summarize changes and verification results.

If requirements are ambiguous and guessing could cause significant rework or risk, ask for clarification. Otherwise, proceed with reasonable assumptions consistent with the project.

## 19. Completion Report

At the end of a task, report:

- Summary of changes.
- Important files modified.
- Architectural decisions, if relevant.
- Tests and checks executed.
- Known issues or remaining work.

Be concise and distinguish verified results from assumptions.