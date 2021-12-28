import { assertEquals, superoak } from "../deps.js";
import * as questionService from "../services/questionService.js";
import { app } from "../app.js";

Deno.test("Test if any response", async () => {
  const testClient = await superoak(app);
  await testClient.get("/").expect(200);
});

Deno.test("Test if any response, questions", async () => {
  const testClient = await superoak(app);
  await testClient.get("/questions").expect(302);
});

Deno.test("Test if any response, quiz", async () => {
  const testClient = await superoak(app);
  await testClient.get("/quiz").expect(302);
});

Deno.test("Test if any response, statistics", async () => {
  const testClient = await superoak(app);
  await testClient.get("/statistics").expect(302);
});

Deno.test("Test if any response, api", async () => {
  const testClient = await superoak(app);
  await testClient.get("/api/questions/random").expect(302);
});
