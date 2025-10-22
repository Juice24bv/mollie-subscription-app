import { useState } from 'react';

const PRODUCTEN = [
  { id: 'FRUITFULL_COMBI', name: 'FRUITFULL COMBI', price: 18.84 },
  { id: 'HEALTHY_CHOICE', name: 'HEALTHY CHOICE', price: 18.84 },
  { id: 'RAINBOW_MIX', name: 'RAINBOW MIX', price: 18.84 },
  { id: 'STRONG_PACKAGE', name: 'STRONG PACKAGE', price: 18.84 }
];

export default function AbonnementFormulier() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [geselecteerd, setGeselecteerd] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleSelectie = (id) => {
    setGeselecteerd((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const startBetaling = async () => {
    const geselecteerdeProducten = PRODUCTEN.filter((p) => geselecteerd.includes(p.id));
    const totaal = geselecteerdeProducten.reduce((sum, p) => sum + p.price, 0);

    const productenPayload = geselecteerdeProducten.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      quantity: 1
    }));

    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:
