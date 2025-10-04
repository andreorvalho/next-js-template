const { exec } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.test') });

module.exports = (on, config) => {
  // Reset database before running tests
  on('before:run', () => {
    return new Promise((resolve, reject) => {
      exec('npx prisma migrate reset --force --skip-seed && npx ts-node prisma/seed.ts', {
        env: {
          ...process.env,
          DATABASE_URL: process.env.DATABASE_URL,
        },
      }, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error seeding database: ${stderr}`);
          return reject(err);
        }
        console.log(`Database seeded: ${stdout}`);
        resolve();
      });
    });
  });

  // Add custom command for resetting test database
  on('task', {
    resetTestDatabase() {
      return new Promise((resolve, reject) => {
        exec('npx prisma migrate reset --force --skip-seed && npx ts-node prisma/seed.ts', {
          env: {
            ...process.env,
            DATABASE_URL: process.env.DATABASE_URL,
          },
        }, (err, stdout, stderr) => {
          if (err) {
            console.error(`Error resetting test database: ${stderr}`);
            return reject(err);
          }
          console.log(`Test database reset: ${stdout}`);
          resolve('Database reset successful');
        });
      });
    },
  });
};
