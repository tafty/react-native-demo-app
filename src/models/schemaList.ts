import { schemaList as schemaV1 } from './v1/schemaList'

import { default as migrationV1 } from './v1/migration'

export default class SchemaList {
  /**
   * TODO: Update Schema Migration Logic
   * Each schema that is left in the application needs to be in the correct
   * position in the schema list to allow the current implementation
   * of schema migrations to work.
   *
   * The migration logic uses the schema version to find it in the schema
   * list. Therefore schema 4 needs to be the 4th item in the schemas list.
   *
   * A possible simple solution might be to maintain the correct offset in
   * the logic that finds the schema.
   *
   */
  static schemas = [
    {
      schema: schemaV1,
      schemaVersion: 1,
      migration: migrationV1,
    },
  ]
}
