
export interface Perrito {
  id: number;
  nombre: string;
  peso: number;
  edad: number;
  caracteristicas: string[];
  esterilizado: boolean;
  imagen: string;
}

export const perritos: Perrito[] = [
  {
    id: 4,
    nombre: "Luna",
    peso: 12,
    edad: 2,
    caracteristicas: ["Cariñosa", "Juguetona", "Sociable"],
    esterilizado: true,
    imagen: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600"
  },
  {
    id: 2,
    nombre: "Toby",
    peso: 18,
    edad: 1,
    caracteristicas: ["Tranquilo", "Amigable", "Paseador"],
    esterilizado: false,
    imagen: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600"
  },
  {
    id: 3,
    nombre: "Nala",
    peso: 15,
    edad: 3,
    caracteristicas: ["Dulce", "Paciente", "Sociable"],
    esterilizado: true,
    imagen: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600"
  },
  {
    id: 1,
    nombre: "Rocky",
    peso: 20,
    edad: 4,
    caracteristicas: ["Activo", "Juguetón", "Curioso"],
    esterilizado: false,
    imagen: "https://media.istockphoto.com/id/2109202034/es/foto/cachorro-activo-de-labrador-labrador-negro-de-8-semanas-participando-al-aire-libre-en-el-prado.jpg?s=612x612&w=0&k=20&c=soR9fDrbOc0Y0YSsFdNxciEgkNVstFqlqbRcu6Pv3ho="
  }
];
