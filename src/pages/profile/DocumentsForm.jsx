import React, { useState } from "react";
import "./DocumentsForm.css";

function DocumentsForm() {
  const [sections, setSections] = useState([{ name: "", type: "", files: [] }]);
  const [allFiles, setAllFiles] = useState([]);

  const addSection = () => {
    setSections([...sections, { name: "", type: "", files: [] }]);
  };

  const removeSection = (index) => {
    const removedFiles = sections[index].files;
    const updatedFiles = allFiles.filter(
      (f) => !removedFiles.find((rf) => rf.name === f.file.name && f.sectionIndex === index)
    );
    setAllFiles(updatedFiles);
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const handleDrop = (index, files) => {
    const dropped = Array.from(files);
    const updatedSections = [...sections];
    updatedSections[index].files = [...updatedSections[index].files, ...dropped];
    setSections(updatedSections);
    const newGlobalFiles = dropped.map((file) => ({ file, sectionIndex: index }));
    setAllFiles((prev) => [...prev, ...newGlobalFiles]);
  };

  const handleInputFileChange = (index, files) => {
    handleDrop(index, files);
  };

  const removeFileFromSection = (sectionIndex, fileName) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].files = updatedSections[sectionIndex].files.filter(
      (file) => file.name !== fileName
    );
    setSections(updatedSections);
    setAllFiles(allFiles.filter((f) => !(f.file.name === fileName && f.sectionIndex === sectionIndex)));
  };

  const getFileType = (name) => {
    if (/\.(jpe?g|png|gif)$/i.test(name)) return "image";
    if (/\.pdf$/i.test(name)) return "pdf";
    if (/\.(doc|docx)$/i.test(name)) return "word";
    return "other";
  };

  const getIcon = (type) => {
    if (type === "pdf") return "📄";
    if (type === "word") return "📝";
    return "📁";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", sections);
    alert("Form submitted! Check console for details.");
  };

  return (
    <div className="documents-wrapper">
      <form className="form-panel" onSubmit={handleSubmit}>
        <h2>Upload Employee Documents</h2>
        {sections.map((section, index) => (
          <div
            key={index}
            className="section"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleDrop(index, e.dataTransfer.files);
            }}
          >
            <div className="section-header">
              <strong>Document Section {index + 1}</strong>
              <button type="button" onClick={() => removeSection(index)}>🗑️</button>
            </div>
            <input
              type="text"
              placeholder="Document Name"
              value={section.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              required
            />
            <select
              value={section.type}
              onChange={(e) => handleChange(index, "type", e.target.value)}
              required
            >
              <option value="">Select Document Type</option>
              <option>ID</option>
              <option>Resume</option>
              <option>Contract</option>
            </select>
            <label className="upload-box">
              <input
                type="file"
                multiple
                onChange={(e) => handleInputFileChange(index, e.target.files)}
              />
              <p>📁 Drag or Click to Upload</p>
              <span>(PDF, DOCX, JPG, PNG)</span>
            </label>

            <div className="file-preview">
              {section.files.map((file, idx) => {
                const type = getFileType(file.name);
                return (
                  <div className="file-item" key={idx}>
                    {type === "image" ? (
                      <img src={URL.createObjectURL(file)} alt={file.name} />
                    ) : (
                      <span className="file-icon">{getIcon(type)}</span>
                    )}
                    <span className="file-name">{file.name}</span>
                    <button type="button" onClick={() => removeFileFromSection(index, file.name)}>×</button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <button type="button" className="add-section" onClick={addSection}>+ Add More Documents</button>
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <div className="uploaded-sidebar">
        <h3>Uploaded Files</h3>
        {allFiles.length === 0 ? (
          <p className="empty-note">No documents uploaded yet.</p>
        ) : (
          <ul>
            {allFiles.map((item, idx) => (
              <li key={idx}>
                {getFileType(item.file.name) === "image" ? (
                  <img src={URL.createObjectURL(item.file)} alt={item.file.name} className="thumb" />
                ) : (
                  <span className="icon">{getIcon(getFileType(item.file.name))}</span>
                )}
                <span className="filename">{item.file.name}</span>
                <span className="delete-btn" onClick={() => removeFileFromSection(item.sectionIndex, item.file.name)}>×</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DocumentsForm;
