import React, { useState } from "react";
import PDFViewer from "pdf-viewer-reactjs";

function ShowPDF() {
   let pageNo = 1;

  const forward = () => {
     pageNo = pageNo + 1
  }

  return (
    <PDFViewer
      document={{
        url: "https://arxiv.org/pdf/quant-ph/0410100.pdf",
      }}
      page={pageNo}
      onNextBtnClick={forward}
    />
  );
}

export default ShowPDF;
