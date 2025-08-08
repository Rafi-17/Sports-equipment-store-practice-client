
export default function App() {

  const handleAddUser=e=>{
    e.preventDefault();
    const name= e.target.name.value;
    const email= e.target.email.value;
    const user={name, email};
    console.log(user);
    fetch('http://localhost:5000/users',{
      method: 'POST',
      headers:{
        'content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      e.target.reset();
      alert("User added");
    })
  }


  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Users Management System</h1>
      <h3 className="text-xl font-medium text-center mt-10">Total User:</h3>
      <form onSubmit={handleAddUser} className="max-w-md mx-auto mt-8 text-center">
        <input className="mb-2 px-3 py-1 rounded-sm" placeholder="Your Name" type="text" name="name" id="" />
        <br />
        <input className="mb-3 px-3 py-1 rounded-sm" placeholder="Your Email" type="email" name="email" id="" />
        <br />
        <input className="px-3 py-1 text-sm font-medium rounded-md bg-white text-black" type="submit" value="Submit" />
      </form>
    </div>
  )
}