import { randomBytes, scryptSync } from "node:crypto";
import { createInterface } from "node:readline";

// Accept a local terminal prompt, never a CLI argument or a committed plaintext password.
if (!process.stdin.isTTY || !process.stdout.isTTY) {
  console.error("Ejecuta este script en una terminal interactiva para introducir una contraseña oculta.");
  process.exit(1);
}
const prompt = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
let hidden = false;
const write = prompt._writeToOutput.bind(prompt);
prompt._writeToOutput = (value) => { if (!hidden) write(value); };
prompt.question("Contraseña del panel (mínimo 14 caracteres): ", (password) => {
  hidden = false;
  prompt.close();
  process.stdout.write("\n");
  if (password.length < 14 || password.length > 256) {
    console.error("Usa entre 14 y 256 caracteres.");
    process.exitCode = 1;
    return;
  }
  const salt = randomBytes(16);
  const key = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
  process.stdout.write(`CRM_ADMIN_PASSWORD_HASH=scrypt$16384$8$1$${salt.toString("hex")}$${key.toString("hex")}\n`);
});
hidden = true;
