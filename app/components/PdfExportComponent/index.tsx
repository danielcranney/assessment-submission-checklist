"use client";
import React, { useState } from "react";
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

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "flex-start",
    padding: "75px 50px 50px 50px",
  },
  header: { color: "#232323", textAlign: "left", fontSize: "40px" },
  body: { color: "#232323", textAlign: "left", fontSize: "16px" },
});

const PdfExportComponent: React.FC = () => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

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

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            value="Option 1"
            onChange={handleCheckboxChange}
            checked={selectedCheckboxes.includes("Option 1")}
          />
          Option 1
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="Option 2"
            onChange={handleCheckboxChange}
            checked={selectedCheckboxes.includes("Option 2")}
          />
          Option 2
        </label>
      </div>
      {/* Add more checkboxes as needed */}
      <PDFDownloadLink document={generatePdfBlob()} fileName="exported-pdf.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Export PDF"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PdfExportComponent;
