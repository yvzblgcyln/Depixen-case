import { useEffect, useState } from "react";
import { getReq, addReq, updateReq, deleteReq, filterReq, filterMultiReq, uploadFile } from "../../helpers/firebase";
import { deleteArrayItem, updateArray } from "../../helpers/cruds";

export default function Firebase() {
  const collectioName = "test";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  // get data
  const getData = async () => {
    setLoading(true);
    const res = await getReq(collectioName);
    if (res) {
      setData(res);
    }
    setLoading(false);
  };

  // get single filtered data
  const filterData = async () => {
    const filter = { field: "name", value: "test" };
    setLoading(true);
    const res = await filterReq(collectioName, filter);
    if (res) {
      setData(res);
    }
    setLoading(false);
  };

  // get multi filtered data
  const filterMultiData = async () => {
    const filters = [
      { field: "name", value: "test" },
      { field: "state", value: "CA" },
    ];
    setLoading(true);
    const res = await filterMultiReq(collectioName, filters);
    if (res) {
      setData(res);
    }
    setLoading(false);
  };

  // add data
  const addData = async () => {
    const dataSet = {
      name: "Los Angeless",
      country: "USA",
      state: "CA",
    };
    setLoading(true);
    const res = await addReq(collectioName, dataSet);
    if (res) {
      getData();
    }
    setLoading(false);
  };

  // update data
  const updateData = async (id) => {
    const updatedDataSet = {
      name: "new",
      country: "new",
    };
    setLoading(true);
    const res = await updateReq(collectioName, id, updatedDataSet);
    if (res) {
      setData(updateArray(data, id, updatedDataSet));
    }
    setLoading(false);
  };

  // delete data
  const deleteData = async (id) => {
    setLoading(true);
    const res = await deleteReq(collectioName, id);
    if (res) {
      setData(deleteArrayItem(data, id));
    }
    setLoading(false);
  };

  // add files
  const [fileUpload, setFileUpload] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const handleImagePreview = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => setImgPreview(reader.result);
    reader.readAsDataURL(e.target.files[0]);
    setFileUpload(e.target.files[0]);
  };
  const handleUploadFile = async () => {
    setLoading(true);
    const res = await uploadFile(fileUpload, collectioName);
    if (res) {
      console.log(res);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <div className="crud-btns">
            <button onClick={addData}>add data</button>
            <button onClick={filterData}>filter data</button>
            <button onClick={filterMultiData}>filter multi data</button>
            <button onClick={getData}>get data</button>
          </div>
          <div className="file-upload">
            <button>
              <label htmlFor="file-selector">upload file</label>
            </button>
            <input
              id="file-selector"
              type="file"
              // accept="image/*"
              // accept=".pdf,.doc,.docx"
              onChange={handleImagePreview}
              style={{ display: "none" }}
            />
            <button onClick={handleUploadFile}>send file</button>
            {imgPreview && <img src={imgPreview} />}
          </div>
        </div>
      )}
      {data?.map((data) => (
        <div key={data.id}>
          <span>{data.name} - </span>
          <span>{data.country}</span>
          <button onClick={() => updateData(data.id)}>update data</button>
          <button onClick={() => deleteData(data.id)}>delete data</button>
        </div>
      ))}
    </div>
  );
}
