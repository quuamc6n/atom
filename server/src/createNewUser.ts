import { User } from "../../db/src/entity/User";
import { AppDataSource } from "../../db/src/data-source";

const createNewUser = async (name: string, email: string, pass: string) => {
  const userRepo = AppDataSource.getRepository(User);
  const thisUser = await userRepo.findOneBy({ email: email });
  if (!thisUser) {
    throw new Error(`User with email ${email} already exists`);
  }

  const newUser = new User();
  newUser.name = name;
  newUser.email = email;

  // Todo: encrypt if have time. Can do with bcrypt library.
  newUser.password = pass;

  const savedUser = await AppDataSource.manager.save(newUser);
  if (!savedUser) {
    throw new Error("Error creating new user");
  }
  const { password, ...savedUserWithoutPassword } = savedUser;
  return savedUserWithoutPassword;
};

export default createNewUser;
