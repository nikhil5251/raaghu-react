import React, { useState, useEffect, useRef } from "react";
import "./rds-file-uploader.css";
import RdsIcon from "../rds-icon/rds-icon";
import RdsAvatar from "../rds-avatar";
import { useTranslation } from "react-i18next";
import { size } from "../../libs";
import file from "react-player/file";

export interface RdsFileUploaderProps {
  Drop_Area_Top_Icon?: boolean;
  Drop_Area_Side_Icon?: boolean;
  Drop_Area_With_Upload_Button?: boolean;
  Drop_Area_With_Icon?: boolean;
  placeholder?: string;
  size?: "small" | "medium" | "large";
  fileSizeLimitInMb?: number;
  colorVariant?: string;
  multiple?: boolean;
  extensions: string;
  limit?: number;
  label: string;
  onFileArray?: (files: any[]) => void;
  getFileUploaderInfo?: any;
  validation?: any[];
  title?: string;
  isRequired?: boolean;
  showTitle?: boolean;
  showHint?: boolean;
  showThumbnail?: boolean;
  hintText?: string;
  profilePic?: string;
  iconName?: string;
  hintPosition?: "right" | "left";
  onDeleteFile?: (id: any) => void;
  ref?: any;
  onChangeFileUpload?: (data: any) => void;
  selectedFile?: File | null;
  fileUrl?: string;
  preview?: boolean;
}

const RdsFileUploader = (props: RdsFileUploaderProps) => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(
    "No file chosen"
  );
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [previewSrcs, setPreviewSrcs] = useState<string[]>([]);
  const { t } = useTranslation();
  const [validation, setValidation] = useState(props.validation || []);
  //const [avatarImage, setAvatarImage] = useState<string | ArrayBuffer | null>(props.profilePic || null); // State to store the uploaded image

  const [fileArray, setFileArray] = useState<File[]>([]);
  const [fileName, setFileName] = useState<string[]>([]);
  const [fileSize, setFileSize] = useState<number[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sizeClass =
    props.size === "small"
      ? "form-control-sm"
      : props.size === "large"
      ? "form-control-lg"
      : "";

  //const withIcon = props.iconName ? true : false;

  useEffect(() => {
    if (props.selectedFile) {
      setSelectedFileName(props.selectedFile.name);
      setPreviewSrc(URL.createObjectURL(props.selectedFile));
      setFileArray([props.selectedFile]);
      setFileName([props.selectedFile.name]);
      setFileSize([props.selectedFile.size]);
    } else if (props.fileUrl) {
      setPreviewSrc(props.fileUrl);
      setSelectedFileName("Uploaded File");
    } else {
      setSelectedFileName("No file chosen");
    }
  }, [props.selectedFile, props.fileUrl]);

  const onDelete = (id: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== id);
    setSelectedFiles(newFiles);
    props.onDeleteFile && props.onDeleteFile(id);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    const tempFN = fileName.filter((_, i) => i !== id);
    setFileName(tempFN);
    const tempFS = fileSize.filter((_, i) => i !== id);
    setFileSize(tempFS);
    const tempFA = fileArray.filter((_, i) => i !== id);
    setFileArray(tempFA);
    const tempPreviewSrcs = previewSrcs.filter((_, i) => i !== id);
    setPreviewSrcs(tempPreviewSrcs);

    if (tempFA.length > 0) {
      setSelectedFileName(tempFA[0].name);
      setPreviewSrc(URL.createObjectURL(tempFA[0]));
    } else {
      setSelectedFileName("No file chosen");
      setPreviewSrc(null);
    }

    props.onDeleteFile && props.onDeleteFile(true);
  };

  const onchangehandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files);
      const exceededFiles = selectedFiles.filter(
        (file) => props.limit !== undefined && file.size > props.limit * 1048576
      ); // Check against the limit

      if (exceededFiles.length > 0) {
        setValidationMessage(`File size should not exceed 150 kb.`);
        return;
      } else {
        setValidationMessage(null);
      }

      if (props.multiple) {
        setFileArray((prevFiles) => [...prevFiles, ...selectedFiles]);
        setFileName((prevNames) => [...prevNames, ...selectedFiles.map(file => file.name)]);
        setFileSize((prevSizes) => [...prevSizes, ...selectedFiles.map(file => file.size)]);
        setSelectedFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        const newPreviewSrcs = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviewSrcs((prevSrcs) => [...prevSrcs, ...newPreviewSrcs]);
      } else {
        setFileArray(selectedFiles);
        setFileName(selectedFiles.map(file => file.name));
        setFileSize(selectedFiles.map(file => file.size));
        setSelectedFiles(selectedFiles);
        setPreviewSrcs([URL.createObjectURL(selectedFiles[0])]);
      }

      if (!props.multiple) {
        setSelectedFileName(selectedFiles[0].name);
        setPreviewSrc(URL.createObjectURL(selectedFiles[0]));
        if (props.onChangeFileUpload) {
          props.onChangeFileUpload(selectedFiles[0]);
        }
      }
    } else {
      setSelectedFileName("No file chosen");
      setPreviewSrc(null);
      setPreviewSrcs([]);
    }

    const allowedExtensions = props.extensions.split(", ");
    const newFiles: File[] = [];
    const newValidation: { isError: boolean; hint: string }[] = [];

    Array.from(files || []).forEach((file: File) => {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (!allowedExtensions.includes(fileExtension || "")) {
        newValidation.push({
          isError: true,
          hint: `File with extension '${fileExtension}' is not allowed`,
        });
        return;
      }

      const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB
      if (
        props.fileSizeLimitInMb != null &&
        fileSizeInMB > props.fileSizeLimitInMb
      ) {
        newValidation.push({
          isError: true,
          hint: "File size exceeds the limit",
        });
        return;
      }

      newFiles.push(file);
    });

   

    setValidation(newValidation);

    props.getFileUploaderInfo &&
      props.getFileUploaderInfo({
        files: newFiles,
      });

    if (props.Drop_Area_Top_Icon) {
      event.target.value = "";
    }
    if (props.Drop_Area_Side_Icon) {
      event.target.value = "";
    }
    if (newFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewSrc(e.target?.result as string);
      };
      reader.readAsDataURL(newFiles[0]);
    }
  };

  const onChangeHandlerForSingleSelection = (event: any) => {
    event.stopPropagation();
    const files = Array.from(event.target.files || []);
    const allowedExtensions = props.extensions.split(", ");
    const newFiles: File[] = [];
    const newValidation: { isError: boolean; hint: string }[] = [];

    files.forEach((file) => {
      const fileExtension = (file as File).name.split(".").pop()?.toLowerCase();
      if (!allowedExtensions.includes(fileExtension || "")) {
        newValidation.push({
          isError: true,
          hint: `File with extension '${fileExtension}' is not allowed`,
        });
        return;
      }

      const fileSizeInMB = (file as File).size / (1024 * 1024); // Convert size to MB
      if (props.fileSizeLimitInMb != null) {
        if (fileSizeInMB > props.fileSizeLimitInMb) {
          newValidation.push({
            isError: true,
            hint: "File size exceeds the limit",
          });
          return;
        }
      }
      newFiles.push(file as File);
    });

    // Set the selected files to the new files, erasing the previous selection
    setSelectedFiles(newFiles);
    setValidation(newValidation);

    if (newFiles.length > 0) {
      const reader = new FileReader();
      
      reader.readAsDataURL(newFiles[0]);
    }

    props.getFileUploaderInfo &&
      props.getFileUploaderInfo({
        files: newFiles,
      });
  };
  const onDeleteHandlerForSingleSelection = () => {
    setSelectedFiles([]);
    // setAvatarImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  useEffect(() => {
    props.onFileArray && props.onFileArray(fileArray);
  }, [fileArray]);

  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files) as File[];
    setSelectedFiles(files as File[]);
    if (files.length > 0) {
      const reader = new FileReader();
      
      reader.readAsDataURL(files[0] as Blob);
    }
  };

  const renderFileUploader = () => {
    if (props.Drop_Area_Top_Icon) {
      return (
        <div>
          {props.showTitle && (
            <label className={"form-label label-gray"}>
              {props.title}
              {props.isRequired && <span className="text-danger ml-1">*</span>}
            </label>
          )}
          <label
            htmlFor="file-input"
            className={`multiUploader row mx-0 rounded-4 border-${
              props.colorVariant || "primary"
            } ${sizeClass}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ cursor: "pointer" }}
          >
            <div className="col-md-12 text-center">
              <RdsIcon
                colorVariant={props.colorVariant}
                height="20px"
                name="upload_data"
                stroke
                width="20px"
              />
              <div>
                {t("Drag and Drop your files or") || ""}{" "}
                <span className="text-primary text-semibold"> Browse</span>
              </div>
              <div className="fileFormat text-muted mt-2 text-semibold">
                {props.extensions}{" "}
              </div>
              <input
                id="file-input"
                data-testid="rds-file-uploader-input"
                className="d-none"
                type="file"
                accept={props.extensions}
                onChange={
                  props.multiple
                    ? onchangehandler
                    : onChangeHandlerForSingleSelection
                }
                multiple={props.multiple}
                required={props.isRequired ? true : false}
              />
            </div>
          </label>
          {props.showHint && (
            <div className={`d-flex justify-content-start text-muted mt-1`}>
              <small>{props.hintText}</small>
            </div>
          )}
          {/* Display file names */}
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="d-flex justify-content-between p-3 mt-3 fileName border"
            >
              <div className="d-flex gap-2 align-items-center">
                <span>
                  <RdsIcon
                    name={"file"}
                    height="16px"
                    width="16px"
                    stroke={true}
                    fill={false}
                  />
                </span>
                <span>{file.name}</span>
              </div>
              <div className="closeIcon">
                <span className="text-muted opacity-50">
                  {(file.size / 1048576).toFixed(2)} MB
                </span>
                <span className="iconbox ms-2" onClick={() => onDelete(index)}>
                  <RdsIcon
                    colorVariant="secondary"
                    name={"close_circle"}
                    height="16px"
                    width="16px"
                    stroke={true}
                    fill={false}
                  />
                </span>
              </div>
            </div>
          ))}
          {validation &&
            validation.map((val: any, index: number) => (
              <div key={index} className="">
                <small
                  className={`${val.isError ? "showError" : "noError d-none"}`}
                >
                  {val.isError && val.hint}
                </small>
              </div>
            ))}
        </div>
      );
    }

    if (props.Drop_Area_Side_Icon) {
      return (
        <>
          <div>
            <div>
              {props.showTitle && (
                <label className={"form-label label-gray"}>
                  {props.title || props.label}
                  {props.isRequired && <span className="text-danger ml-1">*</span>}
                </label>
              )}
            </div>
            <label
              htmlFor="file"
              className={`align-items-center multiUploader row mx-0 py-4 px-4 rounded-4 border-${props.colorVariant || "primary"}`}
            >
              <div
                className={`col-md-12 col-lg-12 col-12 d-flex align-items-center justify-content-between cursor-pointer ${dragging ? "dragging" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div>
                  <div className={`text-${props.colorVariant}`}>
                    {t("Drag and Drop your files or") || ""}{" "}
                    <span className="text-primary text-semibold"> Browse</span>
                  </div>
                  <div className="fileFormat text-muted mt-2 text-semibold">
                    {props.extensions}{" "}
                  </div>
                </div>
                <span className="ms-2">
                  <RdsIcon
                    colorVariant={props.colorVariant}
                    height="20px"
                    isAnimate
                    name="upload_data"
                    stroke
                    width="20px"
                  />
                </span>
                <input
                  data-testid="rds-file-uploader-input"
                  className={`col-md-12 input mulinput d-none ${sizeClass}`}
                  type="file"
                  name="file"
                  id="file"
                  accept={props.extensions}
                  onChange={onchangehandler}
                  multiple={props.multiple}
                />
              </div>
            </label>
            {props.showHint && (
              <div className={`d-flex text-muted mt-1 hint-${props.hintPosition}`}>
                <small>{props.hintText}</small>
              </div>
            )}
            {fileName.map((filename, i) => (
              <div
                key={i}
                className="d-flex justify-content-between p-3 mt-3 fileName"
              >
                <div className="d-flex gap-2 align-items-center">
                  <span>
                    {props.showThumbnail && selectedFiles[i]?.type.startsWith("image/") ? (
                      <img
                        src={previewSrcs[i]}
                        alt={filename}
                        height="40px"
                        width="40px"
                        className="file-thumbnail"
                      />
                    ) : (
                      <RdsIcon
                        name={"file"}
                        height="16px"
                        width="16px"
                        stroke={true}
                        fill={false}
                      />
                    )}
                  </span>
                  <span>{filename}</span>
                </div>
                <div className="closeIcon d-flex align-items-center">
                  <span className="text-muted opacity-50">
                    {(fileSize[i] / 1048576).toFixed(2)} MB
                  </span>
                  <span className="iconbox ms-2" onClick={() => onDelete(i)}>
                    <RdsIcon
                      colorVariant="secondary"
                      name={"close_circle"}
                      height="16px"
                      width="16px"
                      stroke={true}
                      fill={false}
                    />
                  </span>
                </div>
              </div>
            ))}
            {validationMessage && (
              <div className="text-danger">{validationMessage}</div>
            )}
          </div>
        </>
       
      );
      //   return (
      //     <div>
      //         {/* Multiple file uploader with side icon */}
      //         <div>
      //             {props.showTitle && (
      //                 <label className={"form-label label-gray"}>
      //                     {props.title}
      //                     {props.isRequired && (
      //                         <span className="text-danger ml-1">*</span>
      //                     )}
      //                 </label>
      //             )}
      //         </div>
      //         <label
      //             htmlFor="file-input-side-icon"
      //             className={`align-items-center multiUploader row mx-0 rounded-4 border-${props.colorVariant || "primary"
      //                 } ${sizeClass}`}
      //         >
      //             <div
      //                 className={`col-md-12 col-lg-12 col-12 d-flex align-items-center justify-content-between cursor-pointer ${dragging ? "dragging" : ""
      //                     }`}
      //                 onDragOver={handleDragOver}
      //                 onDragLeave={handleDragLeave}
      //                 onDrop={handleDrop}
      //             >
      //                 <div>
      //                     <div>
      //                         {t("Drag and Drop your files or") || ""}{" "}
      //                         <span className="text-primary text-semibold"> Browse</span>
      //                     </div>
      //                     <div className="fileFormat text-muted mt-2 text-semibold">
      //                         {props.extensions}{" "}
      //                     </div>
      //                 </div>
      //                 <span className="ms-2">
      //                     <RdsIcon
      //                         colorVariant={props.colorVariant}
      //                         height="20px"
      //                         isAnimate
      //                         name="upload_data"
      //                         stroke
      //                         width="20px"
      //                     />
      //                 </span>
      //                 <input
      //                     data-testid="rds-file-uploader-input"
      //                     className={`col-md-12 input mulinput d-none`}
      //                     type="file"
      //                     id="file-input-side-icon"
      //                     accept={props.extensions}
      //                     onChange={
      //                         props.multiple
      //                             ? onchangehandler
      //                             : onChangeHandlerForSingleSelection
      //                     }
      //                     multiple={props.multiple}
      //                     required={props.isRequired ? true : false}
      //                 />
      //             </div>
      //         </label>
      //         {props.showHint && (
      //             <div className={`d-flex text-muted mt-1 hint-${props.hintPosition}`}>
      //                 <small>{props.hintText}</small>
      //             </div>
      //         )}

      //         {/* Display file names */}
      //         {selectedFiles.map((file, index) => (
      //             <div
      //                 key={index}
      //                 className="d-flex justify-content-between p-3 mt-3 fileName border"
      //             >
      //                 <div className="d-flex gap-2 align-items-center">
      //                     <span>
      //                         {props.showThumbnail && previewSrc && file.type.startsWith("image/") ? (
      //                             <img
      //                                 src={previewSrc}
      //                                 alt={file.name}
      //                                 height="40px"
      //                                 width="40px"
      //                                 className="file-thumbnail"
      //                             />
      //                         ) : (
      //                             <RdsIcon
      //                                 name={"file"}
      //                                 height="16px"
      //                                 width="16px"
      //                                 stroke={true}
      //                                 fill={false}
      //                             />
      //                         )}
      //                     </span>
      //                     <span>{file.name}</span>
      //                 </div>
      //                 <div className="closeIcon">
      //                     <span className="text-muted opacity-50">
      //                         {(file.size / 1048576).toFixed(2)} MB
      //                     </span>
      //                     <span className="iconbox ms-2" onClick={() => onDelete(index)}>
      //                         <RdsIcon
      //                             colorVariant="danger"
      //                             name={"delete"}
      //                             height="16px"
      //                             width="16px"
      //                             stroke={true}
      //                             fill={false}
      //                         />
      //                     </span>
      //                 </div>
      //             </div>
      //         ))}
      //         {validation &&
      //             validation.map((val: any, index: number) => (
      //                 <div key={index} className="">
      //                     <small
      //                         className={`${val.isError ? "showError" : "noError d-none"}`}
      //                     >
      //                         {val.isError && val.hint}
      //                     </small>
      //                 </div>
      //             ))}
      //     </div>
      //  );
    }

    if (props.Drop_Area_With_Upload_Button) {
      return (
        <div>
          {/* Multiple file uploader with side icon */}
          <div>
            {props.showTitle && (
              <label className={"form-label label-gray"}>
                {props.title}
                {props.isRequired && (
                  <span className="text-danger ml-1">*</span>
                )}
              </label>
            )}
          </div>
          <label
            htmlFor="file-input-with-upload-button"
            className={`align-items-center multiUploader row mx-0 rounded-4 border-${
              props.colorVariant || "primary"
            } ${sizeClass}`}
          >
            <div
              className={`col-md-12 col-lg-12 col-12 d-flex align-items-center justify-content-between ${
                dragging ? "dragging" : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{ cursor: "pointer" }}
            >
              <span className="me-2 upload-icon-color">
                <RdsIcon
                  colorVariant={props.colorVariant}
                  height="20px"
                  isAnimate
                  name="upload_data"
                  stroke={true}
                  width="20px"
                />
              </span>
              <div className="flex-grow-1 text-center d-flex justify-content-end">
                <div>
                  {t("Drag and Drop your files") || ""}{" "}
                  <span className="text-muted mx-2"> or </span>
                  <button
                    className={`btn btn-primary btn-sm`}
                    onClick={() => document.getElementById("file")?.click()}
                  >
                    Upload Files
                  </button>
                </div>
              </div>
              <input
                data-testid="rds-file-uploader-input"
                className={`col-md-12 input mulinput d-none`}
                type="file"
                id="file-input-with-upload-button"
                accept={props.extensions}
                onChange={
                  props.multiple
                    ? onchangehandler
                    : onChangeHandlerForSingleSelection
                }
                multiple={props.multiple}
                required={props.isRequired ? true : false}
              />
            </div>
          </label>
          {props.showHint && (
            <div
              className={`d-flex justify-content-start text-muted mt-1 ${props.hintPosition}`}
            >
              <small>{props.hintText}</small>
            </div>
          )}

          {/* Display file names */}
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="d-flex justify-content-between p-3 mt-3 fileName border"
            >
              <div className="d-flex gap-2 align-items-center">
                <span>
                  <RdsIcon
                    name={"file"}
                    height="16px"
                    width="16px"
                    stroke={true}
                    fill={false}
                  />
                </span>
                <span>{file.name}</span>
              </div>
              <div className="closeIcon">
                <span className="text-muted opacity-50">
                  {(file.size / 1048576).toFixed(2)} MB
                </span>
                <span className="iconbox ms-2" onClick={() => onDelete(index)}>
                  <RdsIcon
                    colorVariant="secondary"
                    name={"close_circle"}
                    height="16px"
                    width="16px"
                    stroke={true}
                    fill={false}
                  />
                </span>
              </div>
            </div>
          ))}
          {validation &&
            validation.map((val: any, index: number) => (
              <div key={index} className="">
                <small
                  className={`${val.isError ? "showError" : "noError d-none"}`}
                >
                  {val.isError && val.hint}
                </small>
              </div>
            ))}
        </div>
      );
    }

    if (props.Drop_Area_With_Icon) {
       return (
           <div className="">
               <div>
                   {props.showTitle && (
                       <label className={"form-label label-gray"}>
                           {props.title}
                           {props.isRequired && <span className="text-danger ml-1">*</span>}
                       </label>
                   )}
               </div>
               <div>
                   <form>
                       <div className={`align-items-center d-flex mt-1 flex-row`}>
                           <label
                               htmlFor="drop-area-with-icon"
                               className={`border-end-0 align-items-center custom-file-button-rounded cursor-pointer ${sizeClass}`}
                           >

                               {props.profilePic ? (
                                   <RdsAvatar
                                       profilePic={props.profilePic} // Ensure avatarImage is a string
                                       size="largest"
                                       border="dashed" withProfilePic={true}
                                   />
                               ) : (
                                   <RdsAvatar
                                       iconName={props.iconName}
                                       size="largest"
                                       border="dashed"
                                   />
                               )}
                           </label>

                           <input
                               ref={fileInputRef}
                               data-testid="rds-file-uploader-input"
                               className={`col-md-12 input mulinput d-none text-${props.colorVariant}`}
                               type="file"
                               id="drop-area-with-icon"
                               accept={props.extensions}
                               onChange={onChangeHandlerForSingleSelection}
                               multiple={false}
                               required={props.isRequired ? true : false}
                           />
                       </div>
                       <div className="d-flex justify-content-between">
                           <div>
                               {" "}
                               {validation &&
                                   validation.map((val: any, index: number) => (
                                       <div key={index} className="">
                                           <small
                                               className={`${val.isError ? "showError" : "noError d-none"
                                                   }`}
                                           >
                                               {val.isError && val.hint}
                                           </small>
                                       </div>
                                   ))}
                           </div>
                       </div>
                   </form>
               </div>
           </div>
       );
    }

    return (
      <div className="">
        <div>
          {props.showTitle && (
            <label className={"form-label label-gray"}>
              {props.title}
              {props.isRequired && <span className="text-danger ml-1">*</span>}
            </label>
          )}
        </div>
        <div>
          <form>
            <div className={`align-items-center d-flex mt-1 flex-row`}>
              <label
                htmlFor="file1"
                className={`border-end-0 align-items-center custom-file-button ${sizeClass}`}
              >
                Choose File
              </label>
              <span
                className={`chosenFileSpan deleteOptionCss ps-3 small-placeholder ${sizeClass}`}
              >
                {selectedFiles.length > 0
                  ? selectedFiles[0].name
                  : "No file chosen"}
                {selectedFiles.length > 0 && (
                  <span
                    className="iconbox ms-2"
                    onClick={() => onDeleteHandlerForSingleSelection()}
                  >
                    <RdsIcon
                      colorVariant="danger"
                      name={"delete"}
                      height="16px"
                      width="16px"
                      stroke={true}
                      fill={false}
                    />
                  </span>
                )}
              </span>
              <input
                ref={fileInputRef}
                data-testid="rds-file-uploader-input"
                className={`col-md-12 input mulinput d-none text-${props.colorVariant}`}
                type="file"
                id="file1"
                accept={props.extensions}
                onChange={onChangeHandlerForSingleSelection}
                multiple={false}
                required={props.isRequired ? true : false}
              />
            </div>
            <div className="d-flex justify-content-between">
              <div>
                {" "}
                {validation &&
                  validation.map((val: any, index: number) => (
                    <div key={index} className="">
                      <small
                        className={`${
                          val.isError ? "showError" : "noError d-none"
                        }`}
                      >
                        {val.isError && val.hint}
                      </small>
                    </div>
                  ))}
              </div>
              {props.showHint && (
                <div className="d-flex justify-content-start text-muted mt-1">
                  <small>{props.hintText}</small>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  };

  return <>{renderFileUploader()}</>;
};

export default RdsFileUploader;

