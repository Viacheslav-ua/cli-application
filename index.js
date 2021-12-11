const { Command } = require("commander");
const program = new Command();

const {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      console.table(await getListContacts());
      break;

    case "get":
      const result = await getContactById(id);
      if(result === void 0) {
        console.log('\x1B[31mContact not found\x1B[37m')
        process.exit()
      }
      console.table();
      break;

    case "add":
      await addContact(name, email, phone);
      console.log("\x1B[32mSuccessfully added\x1B[37m");
      break;

    case "remove":
      await removeContact(id);
      console.log("\x1B[32mSuccessfully deleted\x1B[37m");
      break;

    default:
      console.warn("\x1B[31m Unknown action type!\x1B[37m");
  }
};

invokeAction(argv).then(() => console.log("\x1B[34mDone\x1B[37m"));
