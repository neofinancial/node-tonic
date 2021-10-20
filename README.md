# Node Tonic

[![Build status](https://github.com/neofinancial/node-tonic/workflows/CI/badge.svg)](https://github.com/neofinancial/node-tonic/actions)

A Tonic API wrapper for Node.js

## Usage

### Installation

`npm install node-tonic` or `yarn add node-tonic`

### Creating a client

```ts
import Tonic from 'node-tonic';

const tonic = new Tonic({
  apiKey: 'XXXXXXXX', // your API key
  basePath: 'https://base-tonic-url', // base api url
});
```

### Types

The types are automatically generated from the [REST API docs](https://app.tonic.ai/apidocs/index.html) using [openapi-typescript](https://www.npmjs.com/package/openapi-typescript) package. You can regenerate types by running

```
npm run generate:types
```

### API

Here is a list of all the Tonic.ai API endpoints along with the corresponding library method. We have not yet implemented all the endpoints in the Tonic REST API. If an endpoint you need is missing please consider submitting a pull request. Reference for the endpoints is available in the [API docs](https://app.tonic.ai/apidocs/index.html).

| Endpoint                                                        | Client Method                       |
| --------------------------------------------------------------- | ----------------------------------- |
| _Accounts_                                                      |
| `/accounts/passwordchange`                                      | Not Implemented                     |
| `/accounts/passwordreset`                                       | Not Implemented                     |
| `/Accounts`                                                     | Not Implemented                     |
| _Auth_                                                          |
| `/Auth/login`                                                   | Not Implemented                     |
| `/Auth/token_refresh`                                           | Not Implemented                     |
| `/Auth/apikeys`                                                 | Not Implemented                     |
| `/Auth/apikeys/{id}`                                            | Not Implemented                     |
| _Collection_                                                    |
| `/Collection`                                                   | getCollectionNames                  |
| `/Collection/full`                                              | getCollections                      |
| _Comments_                                                      |
| `/Comments`                                                     | Not Implemented                     |
| `/Comments/{commentId}`                                         | Not Implemented                     |
| _DataSource_                                                    |
| `/DataSource`                                                   | Not Implemented                     |
| `/DataSource/minimal`                                           | Not Implemented                     |
| `/DataSource/source_db`                                         | Not Implemented                     |
| `/DataSource/destination_db`                                    | Not Implemented                     |
| `/DataSource/spark_connection_info`                             | Not Implemented                     |
| `/DataSource/delete_fkupload`                                   | Not Implemented                     |
| `/DataSource/delete_clientkey`                                  | Not Implemented                     |
| `/DataSource/delete_clientcert`                                 | Not Implemented                     |
| `/DataSource/delete_rootcert`                                   | Not Implemented                     |
| `/DataSource/delete_gbqserviceaccount`                          | Not Implemented                     |
| _GenerateData_                                                  |
| `/GenerateData`                                                 | getDataGenerationJobs               |
| `/GenerateData/jobs/{databaseScanId}`                           | getDataGenerationJob                |
| `/GenerateData/start`                                           | startDataGenerationJob              |
| `/GenerateData/cancel`                                          | cancelDataGenerationJob             |
| _Groups_                                                        |
| `/Groups`                                                       | Not Implemented                     |
| `/Groups/cleanup`                                               | Not Implemented                     |
| _PiiReport_                                                     |
| `/PiiReport/most_recent_active_or_completed_status`             | Not Implemented                     |
| `/PiiReport/cancel`                                             | Not Implemented                     |
| `/PiiReport/start`                                              | Not Implemented                     |
| `/PiiReport`                                                    | Not Implemented                     |
| _Privacy_                                                       |
| `/Privacy/history`                                              | Not Implemented                     |
| `/Privacy/privacyforcolumns`                                    | Not Implemented                     |
| `/Privacy/piitypeforcolumns`                                    | Not Implemented                     |
| `/Privacy/ignore`                                               | Not Implemented                     |
| `/Privacy/set`                                                  | Not Implemented                     |
| `/Privacy/suggestions`                                          | Not Implemented                     |
| _SchemaDiff_                                                    |
| `/SchemaDiff`                                                   | getSchemaDiff                       |
| `/SchemaDiff/resolve`                                           | resolveSchemaDiff                   |
| `/SchemaDiff/resolve_multiple`                                  | resolveMultipleSchemaDiffs          |
| _Table_                                                         |
| `/Table`                                                        | Not Implemented                     |
| `/Table/relationships`                                          | Not Implemented                     |
| _Users_                                                         |
| `/Users`                                                        | Not Implemented                     |
| _UserSettings_                                                  |
| `/UserSettings`                                                 | getUserSettings, updateUserSettings |
| _Version_                                                       |
| `/Version`                                                      | getVersion                          |
| _Webhook_                                                       |
| `/Webhook`                                                      | Not Implemented                     |
| `/Webhook/{webhookId}`                                          | Not Implemented                     |
| `/Webhook/test`                                                 | Not Implemented                     |
| _Workspace_                                                     |
| `/Workspace`                                                    | Not Implemented                     |
| `/Workspace/{workspaceId}/status`                               | Not Implemented                     |
| `/Workspace/{workspaceId}`                                      | Not Implemented                     |
| `/Workspace/{workspaceId}/replacements/{schema}/{table}`        | Not Implemented                     |
| `/Workspace/{workspaceId}/update_replacements/{schema}/{table}` | Not Implemented                     |
| `/Workspace/{workspaceId}/rename`                               | Not Implemented                     |
| `/Workspace/{workspaceId}/transfer`                             | Not Implemented                     |
| `/Workspace/{workspaceId}/copy`                                 | Not Implemented                     |
| `/Workspace/{workspaceId}/{schema}/{table}`                     | Not Implemented                     |
| `/Workspace/{workspaceId}/bulk_table_mode`                      | Not Implemented                     |
| `/Workspace/{workspaceId}/shares`                               | Not Implemented                     |
| `/Workspace/{workspaceId}/shares/{workspaceShareId}`            | Not Implemented                     |
| `/Workspace/{workspaceId}/users`                                | Not Implemented                     |
| `/Workspace/{workspaceId}/subset`                               | Not Implemented                     |

## Contributing

### Development

1. Clone this repo
2. `npm install`
3. Build package with `npm run build` or turn on watch mode with `npm run watch`

### Testing

#### `npm run test`

### Building

#### `npm run build`

If you need to clear the build cache run `npm run clean`

## Publishing

1. Update the version in `package.json`
1. Add a `CHANGELOG` entry
1. Add reference for new method(s) in this file in the API section
1. Commit your changes
1. Run `npm pack --dry-run` to see what will be published
1. Run `npm publish`
