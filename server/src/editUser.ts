import { AppDataSource } from "../../db/src/data-source";
import { User } from "../../db/src/entity/User";

// WIP - going to have more to edit
const editUser = async (name: string, email: string) => {
  const userRepo = AppDataSource.getRepository(User);
  const thisUser = await userRepo.findOneBy({ email: email });
  if (!thisUser) {
    throw new Error("User not found");
  }

  thisUser.name = name;

  const savedUser = await AppDataSource.manager.save(thisUser);
  if (!savedUser) {
    throw new Error("Error saving new job");
  }
  return savedUser;
};

export default editUser;
