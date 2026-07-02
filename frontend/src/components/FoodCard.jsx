// ─── KOMPONEN: FOODCARD ───────────────────────────────────────────────────────
// "Cetakan kue" yang dipakai berulang lewat .map() di Home.jsx. Menerima data
// menu murni dari props (read-only) dan mengelola pilihan porsi via state lokal.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const fmt = (n) => 'Rp ' + n.toLocaleString('id-ID');

export default function FoodCard({ menu }) {
  const [portion, setPortion] = useState('sedang');
  const { addItem } = useCart();
  const price = menu.price[portion];

  return (
    <div className="card-surface overflow-hidden flex flex-col hover:border-bw-gold/60 transition-colors">
      <Link to={`/menu/${menu.id}`} className="block aspect-[4/3] overflow-hidden bg-bw-surface2">
        <img
          src={menu.image}
          alt={menu.name}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <Link to={`/menu/${menu.id}`} className="font-display text-lg text-bw-text hover:text-bw-gold">
          {menu.emoji} {menu.name}
        </Link>
        <p className="text-sm text-bw-muted line-clamp-2">{menu.description}</p>

        <div className="mt-auto flex flex-col gap-2 pt-2">
          <select
            value={portion}
            onChange={(e) => setPortion(e.target.value)}
            className="input-field text-sm py-2"
          >
            {Object.entries(menu.price).map(([size, p]) => (
              <option key={size} value={size}>
                {size[0].toUpperCase() + size.slice(1)} — {fmt(p)}
              </option>
            ))}
          </select>
          <div className="flex items-center justify-between">
            <span className="text-bw-goldlight font-semibold">{fmt(price)}</span>
            <button
              onClick={() => addItem(menu, portion, price)}
              className="btn-gold text-sm px-3 py-2"
            >
              + Tambah
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
