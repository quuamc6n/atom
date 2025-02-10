import { Job } from "../../db/src/entity/Job";
import { AppDataSource } from "../../db/src/data-source";

const deleteJob = async (jobId: number) => {
  const jobRepo = AppDataSource.getRepository(Job);
  const thisJob = await jobRepo.findOneBy({ id: jobId });
  if (!thisJob) {
    throw new Error(`Job with ID ${jobId} not found`);
  }

  const { affected } = await AppDataSource.manager.delete(Job, thisJob);
  if (!affected || affected === 0) {
    throw new Error("Error deleting job");
  }
  return thisJob;
};

export default deleteJob;
