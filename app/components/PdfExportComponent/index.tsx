"use client";
import React, { useState, useEffect } from "react";
import {
  Document,
  Page,
  Text,
  Svg,
  G,
  View,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";

const assignments = [
  {
    type: "written",
    label: "Written Assignment",
    options: [
      {
        value: `Formatted the file name and document title correctly`,
        additionalInfo: `eg: 
DM4001/001 - Essay - James Dixon`,
        alternativeValue: `I have correctly formatted the file name and document title.`,
      },
      {
        value: "Formatted with font size 12 using a standard sans-serif font",
        additionalInfo: "eg: Arial, Helvetica, Montserrat.",
        alternativeValue: `I have correctly formatted the text so it size 12 and a standard sans-serif font.`,
      },
      {
        value: "Double-spaced text",
        additionalInfo: "",
        alternativeValue: `I have double-spaced text.`,
      },
      {
        value:
          "Cited sources in-text and in the bibliography, using the Harvard Referencing",
        additionalInfo: "eg: Barker, D. (2013) Book Title. Routledge: Reading",
        alternativeValue: `I have used the Harvard Referencing System to cite sources.`,
      },
      {
        value:
          "Have you proof-read your assignment to identify and remove errors",
        additionalInfo: "",
        alternativeValue: `I have proof-read this assignment to identify and remove errors.`,
      },
    ],
  },
  {
    type: "practical",
    label: "Practical Assignment",
    options: [
      {
        value: `Have you formatted file names and document titles correctly?`,
        additionalInfo: `eg: 
DM4001/001 - Essay - James Dixon`,
        alternativeValue: `I have correctly formatted the file names and document titles.`,
      },
      {
        value: `Have you used appropriate file types?`,
        additionalInfo: `Eg: Video (MP4, MPEG, MOV), Audio (MP3, WAV), Graphics (PSD, JPG, PNG)`,
        alternativeValue: `I have used appropriate file types for this assignment.`,
      },
      {
        value: `Standard aspect ratio?`,
        additionalInfo: `Eg: 4:3, 16:9, 9:16 or 1:1`,
      },
      {
        value: `Have you watched the exported file through?`,
        additionalInfo:
          "This will help you avoid basic technical issues like black-screen or silenced audio.",
        alternativeValue: `I have watched the exported file through before submitting it.`,
      },
      {
        value: `Have you included evidence of an iterative process (ie previous versions)?`,
        additionalInfo: "This is essential for accessing higher grades.",
        alternativeValue: `I have included evidence of an iterative process.`,
      },
    ],
  },
  {
    type: "presentation",
    label: "Presentation Assignment",
    options: [
      {
        value: `Formatted the file name and document title correctly`,
        additionalInfo: `eg: 
DM5001/001 - Presentation - James Dixon`,
        alternativeValue: `I have correctly formatted the file name and document title.`,
      },
      {
        value:
          "Cited sources in-text and in the bibliography, using the Harvard Referencing",
        additionalInfo: "eg: Barker, D. (2013) Book Title. Routledge: Reading",
        alternativeValue: `I have used the Harvard Referencing System to cite sources.`,
      },
      {
        value: `Is your presentation video in an appropriate file type?`,
        additionalInfo: `Eg: Video (MP4, MPEG, MOV)`,
        alternativeValue: `I have uploaded my presentation in an appropriate file type.`,
      },
    ],
  },
];

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "flex-start",
    padding: "75px 50px 50px 50px",
  },
  header: { color: "#232323", textAlign: "left", fontSize: "40px" },
  logo: {},
  body: { color: "#232323", textAlign: "left", fontSize: "16px" },
});

const PdfExportComponent: React.FC = () => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [fullName, setFullName] = useState<string>("");
  const [moduleNumber, setModuleNumber] = useState<string>("");
  const [assessmentType, setAssessmentType] = useState<string>("");

  const handleAssessmentTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setAssessmentType(value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCheckboxes((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedCheckboxes((prevSelected) =>
        prevSelected.filter((checkbox) => checkbox !== value)
      );
    }
  };

  const generatePdfBlob = () => {
    return (
      <Document>
        <Page style={styles.page}>
          <View>
            <Text style={styles.header}>Tester</Text>
            <Text style={styles.body}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              laudantium adipisci possimus. Magnam eligendi voluptatum pariatur
              maiores. Ducimus consequatur ex dolor labore reiciendis in
              repudiandae quis porro minus et! Itaque.
            </Text>

            {selectedCheckboxes.map((checkboxValue, index) => (
              <Text key={index}>{checkboxValue}</Text>
            ))}
          </View>
        </Page>
      </Document>
    );
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <article className="flex flex-col gap-y-2 p-6 bg-gradient-to-br from-white/[4%] to-transparent mix-blend-screen rounded-lg mb-8">
        <h3 className="text-2xl font-extrabold text-white">Your Details</h3>

        <label className="flex items-center w-2/3 py-1">
          <span className="flex w-40 text-white font-bold text-sm mb-0">
            Name
          </span>
          <input
            className="input-field"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>

        <label className="flex items-center w-2/3 py-1">
          <span className="flex w-40 text-white font-bold text-sm mb-0">
            Module
          </span>
          <input
            className="input-field"
            value={moduleNumber}
            onChange={(e) => setModuleNumber(e.target.value)}
          />
        </label>
        <label className="flex items-center w-2/3 py-1">
          <span className="flex w-40 text-white font-bold text-sm mb-0">
            Assessment Type
          </span>
          <div className="flex grow items-center relative">
            <select
              value={assessmentType}
              onChange={handleAssessmentTypeChange}
              className="input-field relative"
            >
              <option value={"Please select an option"} selected>
                Please select an option
              </option>
              {assignments.map((assignment) => (
                <option key={assignment.type} value={assignment.type}>
                  {assignment.label}
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 icon icon-tabler icon-tabler-chevron-down text-[#231e32]"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 9l6 6l6 -6"></path>
              </svg>
            </div>
          </div>
        </label>
      </article>

      <article
        className={`flex flex-col gap-y-2 p-6 bg-gradient-to-br from-white/[4%] to-transparent mix-blend-screen rounded-lg transition-[height] h-auto mb-6`}
      >
        <h3 className="text-2xl font-extrabold text-white">Checklist</h3>

        {assessmentType === "" ? (
          <p className="text-sm font-bold">Select an assessment type above.</p>
        ) : (
          <>
            {assignments.map((assignment) => {
              if (assignment.type === assessmentType) {
                return (
                  <div key={assignment.type} className="gap-y-1 flex flex-col">
                    {assignment.options.map((option) => (
                      <label
                        key={option.value}
                        className="flex w-full py-1 text-white text-base font-bold gap-x-1.5"
                      >
                        <input
                          type="checkbox"
                          value={option.value}
                          onChange={handleCheckboxChange}
                          checked={selectedCheckboxes.includes(option.value)}
                        />
                        <div className="flex flex-col">
                          <span className="text-base font-bold">
                            {option.value}
                          </span>
                          <span className="text-xs font-medium opacity-90">
                            {option.additionalInfo}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </>
        )}
      </article>

      {isClient ? (
        <PDFDownloadLink
          document={generatePdfBlob()}
          fileName={`${fullName
            .replace(/[^a-zA-Z0-9\s-]/g, "")
            .replace(/\s+/g, "-")}-Submission-Checklist.pdf`}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              <button className="flex items-center bg-gradient-to-tr hover:from-[#3a334f] hover:to-[#be35b0] text-white font-bold text-base rounded-lg px-3.5 py-3 from-[#3a334f]/80 to-[#be35b0]/80 transition-all duration-150 ease-in-out hover:scale-[102%] gap-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 icon icon-tabler icon-tabler-download"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                  <path d="M7 11l5 5l5 -5"></path>
                  <path d="M12 4l0 12"></path>
                </svg>
                Download PDF
              </button>
            ) : (
              <button className="flex items-center bg-gradient-to-tr hover:from-[#3a334f] hover:to-[#be35b0] text-white font-bold text-base rounded-lg px-3.5 py-3 from-[#3a334f]/80 to-[#be35b0]/80 transition-all duration-150 ease-in-out hover:scale-[102%] gap-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 icon icon-tabler icon-tabler-download"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                  <path d="M7 11l5 5l5 -5"></path>
                  <path d="M12 4l0 12"></path>
                </svg>
                Download PDF
              </button>
            )
          }
        </PDFDownloadLink>
      ) : null}
    </>
  );
};

export default PdfExportComponent;
