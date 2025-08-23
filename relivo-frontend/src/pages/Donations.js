const Donations = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold">Make a Donation 🙌</h2>
    <form className="mt-4 space-y-3">
      <input type="text" placeholder="Donor Name" className="border p-2 w-full" />
      <select className="border p-2 w-full">
        <option>Money</option>
        <option>Food</option>
        <option>Clothes</option>
      </select>
      <input type="number" placeholder="Amount/Quantity" className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Donate</button>
    </form>
  </div>
);

export default Donations;
