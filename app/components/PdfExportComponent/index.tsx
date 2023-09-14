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
        value: `Formatted the file name and document title correctly?`,
        additionalInfo: `eg: 
DM4001/001 - Essay - James Dixon`,
      },
      {
        value: "Formatted with font size 12 using a standard sans-serif font?",
        additionalInfo: "eg: Arial, Helvetica, Montserrat.",
      },
      {
        value: "Double-spaced text?",
        additionalInfo: "",
      },
      {
        value:
          "Cited sources in-text and in the bibliography, using the Harvard Referencing?",
        additionalInfo: "eg: Barker, D. (2013) Book Title. Routledge: Reading",
      },
      {
        value:
          "Have you proof-read your assignment to identify and remove errors?",
        additionalInfo:
          "I have proof-read your assignment to identify and remove errors.",
      },
    ],
  },
  {
    type: "practical",
    label: "Practical Assignment",
    options: [
      {
        value: `Have you formatted file names and document titles correctly? eg: 
DM4001/001 - Essay - James Dixon`,
        additionalInfo: "I correctly formatted file names and document titles.",
      },
      {
        value: `Have you used appropriate file types? Eg: Video (MP4, MPEG, MOV), Audio (MP3, WAV), Graphics (PSD, JPG, PNG)`,
        alternativeValue: `I have used appropriate file types, eg: Video (MP4, MPEG, MOV), Audio (MP3, WAV), Graphics (PSD, JPG, PNG)`,
      },
      // Add more options as needed
    ],
  },
  {
    type: "presentation",
    label: "Presentation Assignment",
    options: [
      {
        value: "Option 1",
        additionalInfo: "Alternate Value 1",
      },
      {
        value: "Option 2",
        additionalInfo: "Alternate Value 2",
      },
      // Add more options as needed
    ],
  },
  {
    type: "other",
    label: "Other Assignment",
    options: [
      {
        value: "Option 1",
        additionalInfo: "Alternate Value 1",
      },
      {
        value: "Option 2",
        additionalInfo: "Alternate Value 2",
      },
      // Add more options as needed
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
            <Svg
              style={styles.logo}
              width="1936.000000pt"
              height="1989.000000pt"
              viewBox="0 0 1936.000000 1989.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <G
                transform="translate(0.000000,1989.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              ></G>
            </Svg>

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
        <p className="text-sm font-bold">Select an option from below.</p>

        {assessmentType === "" ? (
          <p>Please select an assessment type</p>
        ) : (
          assignments.map((assignment) => {
            if (assignment.type === assessmentType) {
              return (
                <div key={assignment.type}>
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
                      {option.value}
                    </label>
                  ))}
                </div>
              );
            }
            return null;
          })
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
                Loading
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
