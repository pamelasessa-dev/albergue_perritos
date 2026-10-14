export interface Perrito {
  id: number;
  nombre: string;
  raza: string;
  sexo: string;
  edad: number;
  peso: number;
  esterilizado: boolean;
  imagen: string;
  caracteristicas: string[];
}

export const perritos: Perrito[] = [
  {
    id: 1,
    nombre: "Luna",
    raza: "Labrador",
    sexo: "Hembra",
    edad: 2,
    peso: 25,
    esterilizado: true,
    imagen: "https://images.dog.ceo/breeds/labrador/n02099712_5643.jpg",
    caracteristicas: ["Cariñosa", "Juguetona"],
  },
  {
    id: 2,
    nombre: "Toby",
    raza: "Beagle",
    sexo: "Macho",
    edad: 4,
    peso: 12,
    esterilizado: false,
    imagen: "https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg",
    caracteristicas: ["Activo", "Amigable"],
  },
  {
    id: 3,
    nombre: "Mora",
    raza: "Golden retriever",
    sexo: "Hembra",
    edad: 1,
    peso: 22,
    esterilizado: true,
    imagen: "https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg",
    caracteristicas: ["Dulce", "Sociable"],
  },
  {
    id: 4,
    nombre: "Rocky",
    raza: "Bulldog",
    sexo: "Macho",
    edad: 6,
    peso: 24,
    esterilizado: false,
    imagen: "https://images.dog.ceo/breeds/bulldog-english/jager-1.jpg",
    caracteristicas: ["Tranquilo", "Leal"],
  },
  {
    id: 5,
    nombre: "Nina",
    raza: "Caniche",
    sexo: "Hembra",
    edad: 3,
    peso: 8,
    esterilizado: true,
    imagen: "https://images.dog.ceo/breeds/poodle-standard/n02113799_2280.jpg",
    caracteristicas: ["Inteligente", "Activa"],
  },
  {
    id: 6,
    nombre: "Simba",
    raza: "Pastor alemán",
    sexo: "Macho",
    edad: 5,
    peso: 32,
    esterilizado: true,
    imagen: "https://images.dog.ceo/breeds/germanshepherd/n02106662_10820.jpg",
    caracteristicas: ["Protector", "Obediente"],
  },
  {
    id: 7,
    nombre: "Coco",
    raza: "Mestizo",
    sexo: "Macho",
    edad: 0.5,
    peso: 5,
    esterilizado: false,
    imagen: "https://images.dog.ceo/breeds/mix/Polo.jpg",
    caracteristicas: ["Juguetón", "Curioso"],
  },
  {
    id: 8,
    nombre: "Kira",
    raza: "Beagle",
    sexo: "Hembra",
    edad: 8,
    peso: 14,
    esterilizado: true,
    imagen: "https://images.dog.ceo/breeds/beagle/n02088364_11013.jpg",
    caracteristicas: ["Tranquila", "Cariñosa"],
  },
  {
    id: 9,
    nombre: "Max",
    raza: "Labrador",
    sexo: "Macho",
    edad: 2,
    peso: 28,
    esterilizado: false,
    imagen: "https://images.dog.ceo/breeds/labrador/n02099712_7415.jpg",
    caracteristicas: ["Energético", "Amigable"],
  },
  {
    id: 10,
    nombre: "Olivia",
    raza: "Golden retriever",
    sexo: "Hembra",
    edad: 7,
    peso: 26,
    esterilizado: true,
    imagen: "https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg",
    caracteristicas: ["Dócil", "Sociable"],
  },
];
