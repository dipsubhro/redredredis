import { createClient } from "redis";

const client = createClient();

async function main() {
  await client.connect();

  while (1) {
    const res = await client.brPop("submissions", 0);
    console.log(res);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Processed user submissions");
  }
}

main();
