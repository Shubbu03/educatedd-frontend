import { ChangeEvent, useState } from 'react';

type Props = {
    handleSubmit : () => void
}
function Uploader({handleSubmit}:Props) {
  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };

  const handleUploadClick = () => {
    if (!fileList) {
      return;
    }


    const data = new FormData();
    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });


    // fetch('https://httpbin.org/post', {
    //   method: 'POST',
    //   body: data,
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));

  };

  // 👇 files is not an array, but it's iterable, spread to get an array of files
  const files = fileList ? [...fileList] : [];

  return (
    <div>
      <input type="file" onChange={handleSubmit} multiple />

      <ul>
        {files.map((file, i) => (
          <li key={i}>
            {file.name} - {file.type}
          </li>
        ))}
      </ul>

      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default Uploader;
