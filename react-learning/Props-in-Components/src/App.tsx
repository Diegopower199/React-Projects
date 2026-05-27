import { Producto } from "./components/Producto/Producto";

const productos = [
  { id: 1, name: "Producto 1", amount: 5, price: 10.99 },
  { id: 2, name: "Producto 2", amount: 3, price: 15.5 },
  { id: 3, name: "Producto 3", amount: 8, price: 7.25 },
  { id: 4, name: "Producto 4", amount: 2, price: 20.0 },
  { id: 5, name: "Producto 5", amount: 10, price: 5.0 },
];

function App() {
  const deleteProducto = (id: number) => {
    console.log(`Producto con ID ${id} eliminado`);
  };

  return (
    <div>
      <h1>Mi Tienda</h1>
      {productos.map((producto) => (
        <Producto
          key={producto.id}
          id={producto.id}
          name={producto.name}
          amount={producto.amount}
          price={producto.price}
          onDelete={deleteProducto}
        />
      ))}
    </div>
  );
}

export default App;
