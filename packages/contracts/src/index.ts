/**
 * One definition per request shape (D-02). Schemas here are the single source
 * for API validation, OpenAPI emission and React Hook Form resolution (D-22) --
 * a form and the endpoint behind it never drift because they cannot.
 */
export * from './marketing/index.ts'
