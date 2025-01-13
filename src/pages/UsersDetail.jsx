import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const UsersDetail = () => {
  // Variable to take paramater from Id Users
  const { id } = useParams();

  // Use State
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  // Function Untuk Handler Fetch API
  const getDetailUsersData = async () => {
    setLoading(true);
    try {
      const d = await axios.get(`${import.meta.env.VITE_ENDPOINT}/users/${id}`);
      setData(d.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Use State Handler
  useEffect(() => {
    getDetailUsersData();
  }, []);

  return (
    <>
      <NavLink to={"/"}>Kembali Ke Halaman Sebelumnya</NavLink>
      <h2>Data Detail Users</h2>
      {loading == true ? (
        <h4>Sedang Loading, Harap Menunggu...</h4>
      ) : data == null ? (
        <h3>Data Users Dengan ID : {id} Tidak Ditemukan</h3>
      ) : (
        <div>
          <p>ID : {data.id}</p>
          <p>Nama :{data.name} </p>
          <p>Username : {data.username}</p>
          <p>Email : {data.email}</p>
          <p>
            Alamat : {data.address.street}, {data.address.suite},
            {data.address.city}, {data.address.city}, {data.address.zipcode}
          </p>
          <p>Nomer HP : {data.phone}</p>
          <p>Website : {data.website}</p>
          <p>
            Perusahaan : {data.company.name} ({data.company.catchPhrase}) (
            {data.company.bs})
          </p>
        </div>
      )}
    </>
  );
};

export default UsersDetail;
