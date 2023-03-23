import { useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";
function App() {
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [fileName, setFileName] = useState(undefined);
  const [uploadClicked, setUploadClicked] = useState(false);

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // @ts-ignore
      setSelectedImage(reader.result);
    };
    event.target.value = "";
  };

  const RenderImages = () => {
    const images = [];
    for (let i = 0; i < 8; i++) {
      images.push(
        <img
          key={i}
          src={selectedImage}
          alt="Valitud on ebasobiv fail või jäi fail valimata!"
          style={{ height: "105mm", width: "74.25mm" }}
        />
      );
    }
    return (
      <div className={"A4Paper"}>
        <div className={"imagesContainer"}>{images}</div>
      </div>
    );
  };

  const DeleteImage = () => {
    setSelectedImage(undefined);
    setUploadClicked(false);
  };

  const SelectedFile = () => {
    if (selectedImage === undefined) {
      return (
        <div>
          <p>Vali pilt...</p>
        </div>
      );
    }
    return (
      <div>
        <p> Valitud pilt: {fileName}</p>
      </div>
    );
  };

  return (
    <div className={"mainContentContainer"}>
      <div className={"mainContent"}>
        <div className={"logoContainer"}>
          <img className={"logo"} src={logo} alt={"logo"} />
        </div>
        <div className={"buttonContainer"}>
          <div>
            <label htmlFor="file-input" className={"mainButton"}>
              Vali pilt
            </label>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleFileInputChange}
            />
            <SelectedFile />
            <div>
              <button
                className={"mainButton"}
                onClick={() => setUploadClicked(true)}
              >
                Genereeri sildid
              </button>
              <button
                className={"mainButton deleteButton"}
                onClick={DeleteImage}
              >
                Kustuta
              </button>
            </div>
          </div>
        </div>
        {uploadClicked && <RenderImages />}
      </div>
      <footer>
        <p>&copy; Copyright Tanel Märjama 2023</p>
      </footer>
    </div>
  );
}

export default App;
