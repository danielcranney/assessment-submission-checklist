import Image from "next/image";
import PdfExportComponent from "./components/PdfExportComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col gap-y-4 container mx-auto p-20">
        <h1 className="text-8xl font-extrabold">Submission Checklist</h1>
        
        <PdfExportComponent />
      </div>
    </main>
  );
}
