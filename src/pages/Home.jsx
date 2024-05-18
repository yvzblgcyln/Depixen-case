import React, { useEffect, useState } from "react";
import { getReq, deleteReq } from "../helpers/firebase";
import Box from "@mui/material/Box";
import EmptyCard from "../components/EmptyCard";
import Card from "../components/Card";
import InputCard from "../components/InputCard";
import { deleteArrayItem } from "../helpers/cruds";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyDefault } from "../helpers/toastDefault";

const collectioName = "DepixenCase";

export default function BoxSystemProps() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // get data on mount
  useEffect(() => {
    getData();
  }, []);

  // get data
  const getData = async () => {
    setLoading(true);
    const res = await getReq(collectioName);
    if (res) setData(res);
    setLoading(false);
  };

  // handle delete
  const handleDelete = async (id) => {
    setLoading(true);
    const res = await deleteReq(collectioName, id);
    if (res) {
      setData(deleteArrayItem(data, id));
      toast.success(" Silme işlemi başarılı", notifyDefault);
    } else toast.error(" Silme ilemi başarısız", notifyDefault);
    setLoading(false);
  };

  return (
    <div className="bg-[#e1dfdf] w-full appeal-animation f-center flex-col gap-4 min-h-screen ">
      <Box className="w-[440px] h-fit f-center flex-col gap-8 py-8  bg-white scale-75">
        {loading ? (
          <div className="min-h-[400px] f-center">
            <div className="loader "></div>
          </div>
        ) : (
          <InputCard getData={getData} setLoading={setLoading} collectioName={collectioName} />
        )}

        <div className="w-full h-2 bg-[#a09d9d]"></div>
        {data.length
          ? data.map((data, index) => <Card key={index} handleDelete={handleDelete} data={data} />)
          : !data.length && <EmptyCard />}
      </Box>
    </div>
  );
}
