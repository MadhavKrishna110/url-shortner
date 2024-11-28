import cron from "node-cron";
import urlService from '../services/urlService'

const task = cron.schedule("*/1 * * * *", () => {
  console.log("Running cron");
  urlService.cronTask();
});

task.start();
