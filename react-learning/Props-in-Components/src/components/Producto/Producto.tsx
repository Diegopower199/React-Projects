import "./Producto.css";

interface ProductoProps {
  id: number;
  name: string;
  amount: number;
  price: number;
  onDelete: (id: number) => void;
}

export const Producto = ({
  id,
  name,
  amount,
  price,
  onDelete,
}: ProductoProps) => {
  return (
    <div className="divElements">
      <p>ID: {id}</p>
      <p>{name}</p>
      <p>Cantidad: {amount}</p>
      <p>Precio: ${price.toFixed(2)}</p>
      <button onClick={() => onDelete(id)}>Eliminar</button>
    </div>
  );
};
