import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDebounce } from "use-debounce";

const Home = () => {
  // useState Variable
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchDebouce] = useDebounce(search, 500);

  // Function To Get Users From Endpoint
  const getUsers = async () => {
    setLoading(true);
    try {
      const d = await axios.get(`${import.meta.env.VITE_ENDPOINT}/users`, {
        params:
          searchDebouce.replace(/\s/g, "") === ""
            ? {}
            : { email: searchDebouce },
      });
      setData(d.data);
    } catch (error) {
      alert(`Ada Kesalahan Saat Mengambil Data : ${error}`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect Handler
  useEffect(() => {
    getUsers();
  }, [searchDebouce]);

  // Export Default Pages View
  return (
    <>
      <h2>Daftar Data Users</h2>
      <label htmlFor='search'>
        <p style={{ display: "inline" }}>
          Pencarian Users Berdasarkan Email (<b>Email Harus Sama</b>) :{" "}
        </p>
        <input
          id={"search"}
          type='text'
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      <table border={1} style={{ marginTop: "20px", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Nomer</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Alamat</th>
            <th>Lihat Detail</th>
          </tr>
        </thead>
        <tbody>
          {/* Ternary Untuk Handle Loading Dan Data Null */}
          {loading == true ? (
            // Return Loading Jika Proses Fetch masih terjadi
            <tr>
              <td colSpan={5} align={"center"}>
                Loading...
              </td>
            </tr>
          ) : data.length == 0 ? (
            // Return "Users Tidak DiTermukan" Ketika Data Fetch Null Dan Loading Selesai
            <tr>
              <td colSpan={5} align={"center"}>
                Users Tidak Ditemukan..
              </td>
            </tr>
          ) : (
            // Jika Loading Telah Selesai dan Data ada maka Tampilan Array Dengan Map
            data.map((d, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{d.name}</td>
                  <td>{d.email}</td>
                  <td>{`${d.address.street} - ${d.address.suite} - ${d.address.city}`}</td>
                  <td>
                    <NavLink to={`/${d.id}`}>
                      Lihat Data Detail {d.name}
                    </NavLink>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>
  );
};

export default Home;
