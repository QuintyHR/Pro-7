// const { getDefaultConfig } = require('expo/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);

// defaultConfig.resolver.assetExts.push('db');

// module.exports = defaultConfig;

// async function openDatabase(pathToDatabaseFile: './database.db'): Promise<SQLite.WebSQLDatabase> {
//     if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
//       await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
//     }
//     await FileSystem.downloadAsync(
//       Asset.fromModule(require(pathToDatabaseFile)).uri,
//       FileSystem.documentDirectory + 'SQLite/myDatabaseName.db'
//     );
//     return SQLite.openDatabase('database.db');
//   }