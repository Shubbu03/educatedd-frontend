import { ChangeEvent, useState } from "react";
import axios from "axios";

// type Props = {
//     handleSubmit : () => void
// }
//{handleSubmit}:Props
function Uploader() {
  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };

  function extractFileNameWithoutExtension(filename: string) {
    const lastIndex = filename.lastIndexOf(".");

    if (lastIndex !== -1) {
      return filename.substring(0, lastIndex);
    } else {
      return filename;
    }
  }

  const handleUploadClick = async () => {
    if (!fileList) {
      return;
    }

    const data = new FormData();
    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });

    //call /courses/upload from here!!!!

    const accessToken = localStorage.getItem("accessToken");

    const fileName = extractFileNameWithoutExtension(files[0].name);

    await axios
      .post(
        `http://localhost:3005/courses/upload?file=${fileName}`,
        {
          originalname: files[0].name,
        },
        {
          headers: {
            "x-api-token": `${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log("the uploaded file is:", res);
        // setDataLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const files = fileList ? [...fileList] : [];

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />

      <ul>
        {files.map((file, i) => (
          <>
            <li key={i}>
              {file.name} - {file.type}
            </li>
            {/* {console.log("file name is::",file.name)} */}
          </>
        ))}
      </ul>

      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default Uploader;
