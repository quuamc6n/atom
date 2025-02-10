import { Estimate } from "../../db/src/entity/Estimate";
import { AppDataSource } from "../../db/src/data-source";

const deleteEstimate = async (estimateId: number) => {
  const estimateRepo = AppDataSource.getRepository(Estimate);
  const thisEstimate = await estimateRepo.findOneBy({ id: estimateId });
  if (!thisEstimate) {
    throw new Error(`Estimate with ID ${estimateId} not found`);
  }
  const { affected } = await AppDataSource.manager.delete(
    Estimate,
    thisEstimate.id
  );
  if (!affected || affected === 0) {
    throw new Error("Error deleting estimate");
  }
  return thisEstimate;
};

export default deleteEstimate;
