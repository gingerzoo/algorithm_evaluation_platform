import React, { memo, useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { getDocument } from "@/pages/Home/services";

interface Iprops {
  children?: ReactNode;
}

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFviewer: FC<Iprops> = (props) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfData, setPdfData] = React.useState<ArrayBuffer | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const url = "./myfile.pdf";

  const getFile = async () => {
    const res = await getDocument("Entirely.pdf");
    // const arrayBuffer = await res.arrayBuffer();
    console.log("res", res);
    const pdfBlob = new Blob([res], { type: "application/pdf" });
    console.log("pdfBlob", pdfBlob);
    const pdfData = URL.createObjectURL(pdfBlob);
    console.log("pdfData", pdfData);
    setPdfUrl(pdfData);
  };

  useEffect(() => {
    getFile();
  }, []);

  //   useEffect(() => {
  //     if (pdfData) {
  //       const file = new File([pdfData], "myfile.pdf", {
  //         type: "application/pdf"
  //       });
  //       console.log("file", file);
  //       setPdfFile(file);
  //     }
  //   }, [pdfData]);

  function onDocumentLoadSuccess() {
    setNumPages(numPages);
  }

  //   const handleFileChange = (event: any) => {
  //     const file = event.target.files[0];
  //     console.log("input_pdf", file);
  //     if (file) {
  //       const fileURL = URL.createObjectURL(file);
  //       setPdfUrl(fileURL);
  //     }
  //   };

  return (
    <div>
      <h3>我是pdfviewer</h3>

      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading="努力加载中..."
        renderMode="canvas"
      >
        <Page
          pageNumber={pageNumber}
          loading="努力加载中..."
          renderMode="canvas"
          width={720}
        />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export default memo(PDFviewer);

// import React, { memo, useEffect, useRef } from "react";
// import type { FC, ReactNode } from "react";
// import { pdfjs } from "react-pdf";

// interface Iprops {
//   children?: ReactNode;
// }
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// const PDFviewer: FC<Iprops> = (props) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const pdfUrl = "./myfile.pdf";
//   useEffect(() => {
//     const renderPDF = async () => {
//       const loadingTask = pdfjs.getDocument(pdfUrl);
//       const pdf = await loadingTask.promise;
//       console.log("pdf", pdf);
//       const page = await pdf.getPage(1);

//       const viewport = page.getViewport({ scale: 1 });
//       const canvas = canvasRef.current;
//       if (canvas) {
//         const context = canvas.getContext("2d") as CanvasRenderingContext2D;
//         canvas.height = viewport.height;
//         canvas.width = viewport.width;

//         await page.render({
//           canvasContext: context,
//           viewport
//         });
//       }
//     };

//     renderPDF();
//   }, [pdfUrl]);

//   return <canvas ref={canvasRef} />;
// };

// export default memo(PDFviewer);
