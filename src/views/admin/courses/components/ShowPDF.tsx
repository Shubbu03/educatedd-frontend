import React, { useEffect, useState } from "react";
import PDFViewer from "pdf-viewer-reactjs";

function ShowPDF() {
  
  const [pageNo,setPageNo] = useState(1);

  const forward = () => {
     setPageNo(pageNo + 1);
     console.log("page;;;",pageNo)
  };

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
