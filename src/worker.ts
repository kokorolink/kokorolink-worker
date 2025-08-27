import { Worker } from "bullmq";

const connection = {
  host: process.env.REDIS_HOST || "redis",
  port: +(process.env.REDIS_PORT || 6379)
};

const w = new Worker("emails", async (job) => {
  console.log("Processing:", job.name, job.data);
}, { connection });

w.on("completed", (job) => console.log(`Job ${job.id} done`));
w.on("failed", (job, err) => console.error(`Job ${job?.id} failed`, err));
