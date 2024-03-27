import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAppSelector } from "../app/hooks";
import { AxiosError } from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Navbar from "../components/Navbar";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ViewPDF() {
  const { id } = useParams();

  const [bookInfo, setBookInfo] = useState<{
    category: string;
    title: string;
    author: string;
    coverImage: string;
    bookFile: File;
    _id: string;
  } | null>(null);
  const { token } = useAppSelector((state) => state.auth);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const getBookInfo = async () => {
    try {
      const { data } = await api.get(`/books/${id}`, config);
      setBookInfo(data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.log(err);
        const msg =
          typeof err?.response?.data?.message === "object"
            ? err?.response?.data?.message[0]
            : err?.response?.data?.message;
        console.log(msg);
        return;
      }
    }
  };

  const [numPages, setNumPages] = useState<number | 0>(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }

  // function changePageBack() {
  //   changePage(-1);
  // }

  // function changePageNext() {
  //   changePage(+1);
  // }

  useEffect(() => {
    getBookInfo();
  }, []);

  return (
    <div className="bg-gray-200">
      <Navbar />
      <center className="flex flex-col bg-gray-200 top-24 relative">
        {/* <div>
        <Document
          file={bookInfo?.bookFile}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            renderAnnotationLayer={false}
            renderTextLayer={false}
            pageNumber={pageNumber}
            className={"bg-red-500 w-[100%]"}
          />
        </Document>
      </div>
      <p>
        {" "}
        Page {pageNumber} of {numPages}
      </p> */}
        {/* {pageNumber > 1 && (
        <button onClick={changePageBack}>Previous Page</button>
      )}
      {pageNumber < numPages && (
        <button onClick={changePageNext}>Next Page</button>
      )} */}

        <center>
          <div>
            <Document
              file={bookInfo?.bookFile}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        </center>
      </center>
    </div>
  );
}

export default ViewPDF;
