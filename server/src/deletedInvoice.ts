import { Invoice } from "../../db/src/entity/Invoice";
import { AppDataSource } from "../../db/src/data-source";

const deleteInvoice = async (invoiceId: number) => {
  const invoiceRepo = AppDataSource.getRepository(Invoice);
  const thisInvoice = await invoiceRepo.findOneBy({ id: invoiceId });
  if (!thisInvoice) {
    throw new Error(`Estimate with ID ${invoiceId} not found`);
  }
  const { affected } = await AppDataSource.manager.delete(Invoice, thisInvoice);
  if (!affected || affected === 0) {
    throw new Error("Error deleting estimate");
  }
  return thisInvoice;
};

export default deleteInvoice;
