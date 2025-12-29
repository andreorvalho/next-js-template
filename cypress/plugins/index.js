const { exec } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.test') });

module.exports = (on, config) => {
  const resetDatabase = () => {
    return new Promise((resolve, reject) => {
      // Reset the database - this will apply migrations but may skip seed
      // We'll run seed explicitly after to ensure it uses the correct environment
      exec('NODE_ENV=test npx dotenv-cli -e .env.test -- npx prisma migrate reset --force', {
        env: process.env,
        cwd: path.resolve(__dirname, '../..'),
      }, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error resetting database: ${stderr}`);
          return reject(err);
        }

        // Always run seed explicitly to ensure it runs with the correct environment
        // Run the seed script directly from package.json since prisma.config.ts doesn't have seed configured
        exec('NODE_ENV=test npx dotenv-cli -e .env.test -- node -r ts-node/register/transpile-only prisma/seed.ts', {
          env: process.env,
          cwd: path.resolve(__dirname, '../..'),
        }, (seedErr, seedStdout, seedStderr) => {
          if (seedErr) {
            console.error(`Error running seed: ${seedStderr}`);
            return reject(seedErr);
          }
          resolve('Database reset and seeded successfully');
        });
      });
    });
  };

  // Add custom commands for database operations
  on('task', {
    resetTestDatabase() {
      return resetDatabase();
    },
  });
};
