"use client";
import Image from "next/image";
import PdfExportComponent from "./components/PdfExportComponent";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col items-start justify-between py-14 gap-y-2 w-3/4">
      <Image
        alt={"SVG Bam Logo"}
        src={"/svg-logo.png"}
        width={"100"}
        height={"73"}
      />
      <div className="flex flex-col gap-y-0 mt-2">
        <h5 className="text-base font-semibold uppercase tracking-wider opacity-50 text-white">
          Bristol Academy of Media | Higher Ed.
        </h5>
        <h1 className="text-3xl font-extrabold text-white">
          Pre-Submission Assessment Checklist
        </h1>
      </div>

      <section className="flex flex-col w-full mt-4">
        <PdfExportComponent />
      </section>
    </main>
  );
}
