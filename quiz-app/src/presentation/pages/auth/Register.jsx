import React, { useEffect, useState } from "react";
import Logo from "../../components/utils/Logo";
import { useNavigate } from 'react-router-dom';
import UseUserRegister from "../../hooks/user/RegisterUser";
function LoginPage() {
  const { register } = UseUserRegister();
  const [dataForm, setDataForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const temp = [];
    for (const key in dataForm) {
      if (dataForm[key].trim() === "") {
        temp.push(`${key} field empty`);
      }
    }
    setErrors(temp);
  }, [dataForm]);

  function handleDataForm(e) {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (errors.length > 0) {
      return;
    }

    try {
      const res = await register(dataForm);
      if(res.ok) {
      localStorage.setItem("token" , res.data);
      localStorage.setItem("user" , res.user._id);

       navigate("/");
      }
      setErrors([]); // Limpiar errores si todo sale bien
    } catch (err) {
      console.error(err || err);
      setErrors(["Error fetching login user"]);
    }
  }

  return (
    <main className="main-screen-auth">
     <Logo height={370} width={370}  />
      <form className="flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit}>
        <input className="btn-primary" type="text" name="username" placeholder="Usuario"
          value={dataForm.username}
          onChange={handleDataForm}
        />
        <input className="btn-primary" type="password" name="password" placeholder="Contraseña"
          value={dataForm.password}
          onChange={handleDataForm}
        />
        <button className="btn-send" type="submit">Registrar</button>
      </form>


      <div className="pt-4">
      {errors.map((error, idx) => (
        <p key={idx} className="text-[#ffffff] font-semibold">{error}</p>
      ))}
     </div>
    </main>
  );
}

export default LoginPage;
