import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/api/graphql',
  documents: ['src/**/*.graphql', 'src/**/*.tsx'],
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        namingConvention: {
          enumValues: 'keep',
        },
        enumsAsTypes: false,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
