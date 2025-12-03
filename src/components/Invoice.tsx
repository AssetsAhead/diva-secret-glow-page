import { useRef } from "react";
// Invoice component for PDF generation

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Download, Printer } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface InvoiceProps {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  packageType: string;
  amount: number;
  deliveryAddress?: string;
  date: string;
  status: string;
}

const packageLabels: Record<string, string> = {
  starter: "Starter Package (1 Box)",
  standard: "Standard Package (2 Boxes)",
  premium: "Premium Package (3 Boxes)",
};

export const Invoice = ({
  orderNumber,
  customerName,
  customerEmail,
  customerPhone,
  packageType,
  amount,
  deliveryAddress,
  date,
  status,
}: InvoiceProps) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;

    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`invoice-${orderNumber}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 print:hidden">
        <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          Print
        </Button>
      </div>

      <div ref={invoiceRef} className="bg-white p-8 max-w-2xl mx-auto">
        <Card className="border-0 shadow-none">
          <CardHeader className="border-b pb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-purple-700">INVOICE</h1>
                <p className="text-gray-500 mt-1">Diva Secret Stem Cells</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Invoice #</p>
                <p className="font-semibold">{orderNumber}</p>
                <p className="text-sm text-gray-500 mt-2">Date</p>
                <p className="font-semibold">{formatDate(date)}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {/* Status Badge */}
            <div className="flex justify-end">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  status === "paid"
                    ? "bg-green-100 text-green-800"
                    : status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {status.toUpperCase()}
              </span>
            </div>

            {/* Bill To */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Bill To
                </h3>
                <p className="font-semibold text-gray-900">{customerName}</p>
                <p className="text-gray-600">{customerEmail}</p>
                {customerPhone && <p className="text-gray-600">{customerPhone}</p>}
                {deliveryAddress && (
                  <p className="text-gray-600 mt-2">{deliveryAddress}</p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  From
                </h3>
                <p className="font-semibold text-gray-900">Diva Secret</p>
                <p className="text-gray-600">Stem Cell Wellness</p>
                <p className="text-gray-600">South Africa</p>
                <p className="text-gray-600">support@divasecret.co.za</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Description
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                      Qty
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900">
                        {packageLabels[packageType] || packageType}
                      </p>
                      <p className="text-sm text-gray-500">
                        Diva Secret Stem Cell Supplement
                      </p>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-900">1</td>
                    <td className="py-4 px-4 text-right font-medium text-gray-900">
                      R {amount.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R {amount.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT (Included)</span>
                  <span>R {(amount * 0.15 / 1.15).toLocaleString("en-ZA", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-purple-700">
                    R {amount.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t pt-6 mt-6">
              <p className="text-sm text-gray-500 text-center">
                Thank you for your purchase! For any queries, please contact us at{" "}
                <a href="mailto:support@divasecret.co.za" className="text-purple-600">
                  support@divasecret.co.za
                </a>{" "}
                or WhatsApp{" "}
                <a href="https://wa.me/27679820321" className="text-purple-600">
                  +27 67 982 0321
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
