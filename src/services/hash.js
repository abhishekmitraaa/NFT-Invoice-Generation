import crypto from "crypto";


export function hashInvoice(invoice) {
  const invoiceString = JSON.stringify(invoice);

  const hash = crypto
    .createHash("sha256")
    .update(invoiceString)
    .digest("hex");

  return hash;
}

const testInvoice = {
  invoiceId: "TEST-1",
  total: 100
};

console.log(hashInvoice(testInvoice));

