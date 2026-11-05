export const PHONE_PRIMARY = '51920780176'
export const PHONE_PRIMARY_LABEL = '+51 920 780 176'
export const PHONE_SECONDARY = '51978081417'
export const PHONE_SECONDARY_LABEL = '+51 978 081 417'
export const EMAIL = 'servigeneralesjn@gmail.com'
export const FACEBOOK = 'https://www.facebook.com/NEOTEK.SOLUCIONES.INTEGRALES'
export const LEGAL_NAME = 'Servicios Generales “J & N” Ingenieros S.A.C.'
export const RUC = '20600035933'

export const whatsappUrl = (text: string) =>
  `https://api.whatsapp.com/send?phone=${PHONE_PRIMARY}&text=${encodeURIComponent(text)}`

export const NAV = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'campo', label: 'En campo' },
  { id: 'respaldo', label: 'Respaldo legal' },
  { id: 'sedes', label: 'Sedes' },
  { id: 'contacto', label: 'Contacto' },
] as const

export type Service = { name: string; description: string }
export type ServiceGroup = {
  id: string
  title: string
  lead: string
  photo: string
  alt: string
  /** Encuadre de la foto: evita cortar el sujeto o mostrar marcas de fecha. */
  focus: string
  theme: 'ink' | 'green' | 'lime' | 'paper' | 'navy'
  services: Service[]
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: 'saneamiento',
    title: 'Saneamiento y limpieza',
    lead: 'Ambientes, reservorios y tanques en condiciones sanitarias para viviendas, comercios e industria.',
    photo: 'nuevo4panel',
    focus: '58% 50%',
    alt: 'Técnico con equipo de protección fumigando el exterior de un local',
    theme: 'ink',
    services: [
      {
        name: 'Saneamiento ambiental',
        description: 'Desinfección, fumigación, desinsectación, desratización y control de aves.',
      },
      {
        name: 'Biodigestores, tanques y pozos sépticos',
        description: 'Limpieza y desinfección de biodigestores, tanques de agua y pozos sépticos.',
      },
      {
        name: 'Limpieza de muebles',
        description: 'Lavado y secado de muebles, colchones, sillas, cojines, almohadas y alfombras.',
      },
    ],
  },
  {
    id: 'residuos',
    title: 'Residuos y transporte',
    lead: 'Operamos la cadena de residuos sólidos, desde el recojo hasta su destino final.',
    photo: 'nuevo17',
    focus: '58% 50%',
    alt: 'Camión de carga estacionado en un patio techado',
    theme: 'green',
    services: [
      {
        name: 'Recolección de residuos sólidos',
        description: 'Recolección, transporte y disposición final de residuos peligrosos y no peligrosos.',
      },
      {
        name: 'Transporte de carga',
        description: 'Traslado de carga según lo que necesite tu operación.',
      },
    ],
  },
  {
    id: 'agua',
    title: 'Agua y sanidad en obra',
    lead: 'Abastecimiento e instalaciones sanitarias para obras, eventos y situaciones de emergencia.',
    photo: 'nuevo3panel',
    focus: '56% 50%',
    alt: 'Cisterna azul de Neotek abasteciendo agua en una zona rural de Jaén',
    theme: 'lime',
    services: [
      {
        name: 'Cisternas de agua',
        description: 'Llenado de tanques y suministro de agua donde lo necesites.',
      },
      {
        name: 'Baños químicos',
        description: 'Venta y alquiler de baños portátiles para obras, eventos, conciertos y zonas rurales.',
      },
      {
        name: 'Gasfitería',
        description: 'Instalación, reparación y mantenimiento de agua, desagüe y gas en viviendas y comercios.',
      },
    ],
  },
  {
    id: 'ingenieria',
    title: 'Ingeniería y monitoreo',
    lead: 'Datos y criterio técnico para decidir con respaldo y cumplir la normativa.',
    photo: 'monitoreos2',
    focus: '40% 60%',
    alt: 'Equipo de ingenieros con cascos durante un monitoreo ambiental en campo',
    theme: 'paper',
    services: [
      {
        name: 'Mecánica de suelos, concreto, mineralógico y asfalto',
        description: 'Análisis y pruebas para garantizar calidad, estabilidad y cumplimiento en tus proyectos.',
      },
      {
        name: 'Monitoreos ocupacionales, de salud y ambientales',
        description: 'Evaluación y control de riesgos ambientales, laborales y de salud ocupacional.',
      },
      {
        name: 'Asesoría y consultoría',
        description: 'Legislación ambiental, saneamiento, seguridad, salud ocupacional y capacitaciones en monitoreo.',
      },
    ],
  },
  {
    id: 'seguridad',
    title: 'Seguridad y formación',
    lead: 'Preparación para responder ante incendios y para operar con seguridad en la vía.',
    photo: 'nuevo12',
    focus: '50% 62%',
    alt: 'Tres extintores rojos recargados con etiqueta de Neotek',
    theme: 'navy',
    services: [
      {
        name: 'Recarga de extintores',
        description: 'Venta y recarga de extintores para la seguridad de tu local.',
      },
      {
        name: 'Clases de manejo',
        description: 'Aprende a conducir con seguridad.',
      },
    ],
  },
]

export const ALL_SERVICES = SERVICE_GROUPS.flatMap((g) => g.services.map((s) => s.name))

export type Credential = {
  id: string
  authority: string
  title: string
  number: string
  place: string
  date: string
  summary: string
  scope: string[]
  pdf: string
  image: string
  verify?: { url: string; key: string }
}

export const CREDENTIALS: Credential[] = [
  {
    id: 'minam',
    authority: 'Ministerio del Ambiente · DGRS',
    title: 'Empresa Operadora de Residuos Sólidos',
    number: 'R.D. N° 00290-2021-MINAM/VMGA/DGRS',
    place: 'Lima',
    date: '20 de abril de 2021',
    summary:
      'Aprueba la actualización del responsable técnico en nuestra inscripción del Registro Autoritativo de Empresas Operadoras de Residuos Sólidos.',
    scope: ['Registro EO-RS-00055-2021-MINAM/VMGA/DGRS', 'Decreto Legislativo N° 1278'],
    pdf: '/documentos/resolucion-minam-00290-2021.pdf',
    image: '/img/doc-minam.webp',
    verify: { url: 'https://ecodoc.minam.gob.pe/verifica/view', key: '69cefd' },
  },
  {
    id: 'salud',
    authority: 'Gobierno Regional Cajamarca · Dirección Sub Regional de Salud Jaén',
    title: 'Actividades de Saneamiento Ambiental',
    number: 'R.D. N° 220-2021-GR.CAJ/DSRSJ-DG/OAJ',
    place: 'Jaén',
    date: '28 de junio de 2021',
    summary:
      'Autoriza actividades de saneamiento ambiental tras acreditar equipamiento e insumos, conforme al D.S. N° 022-2001-SA y la R.M. N° 449-2001-SA/DM.',
    scope: [
      'Desinsectación',
      'Desinfección',
      'Desratización',
      'Limpieza de ambientes',
      'Limpieza y desinfección de reservorios',
      'Limpieza de tanques sépticos',
    ],
    pdf: '/documentos/resolucion-saneamiento-220-2021.pdf',
    image: '/img/doc-salud.webp',
  },
]

export type Branch = {
  id: string
  city: string
  street: string
  locality: string
  region: string
  address: string
  /** Latitud y longitud aproximadas de la ciudad, solo para el esquema de cobertura. */
  lat: number
  lon: number
}

export const BRANCHES: Branch[] = [
  { id: 'jaen', city: 'Jaén', street: 'Esquina Calle Los Cedros con México', locality: 'Jaén', region: 'Cajamarca', address: 'Esquina Calle Los Cedros con México, Jaén', lat: -5.71, lon: -78.81 },
  { id: 'olmos', city: 'Olmos', street: 'Mz 11 Lt. 7, Centro Poblado Cruce Jaén', locality: 'Olmos', region: 'Lambayeque', address: 'Mz 11 Lt. 7, Centro Poblado Cruce Jaén, Olmos, Lambayeque', lat: -5.98, lon: -79.75 },
  { id: 'chiclayo', city: 'Chiclayo', street: 'Av. Pedro Ruiz 1921', locality: 'Chiclayo', region: 'Lambayeque', address: 'Av. Pedro Ruiz 1921, Chiclayo', lat: -6.77, lon: -79.84 },
  { id: 'cajamarca', city: 'Cajamarca', street: 'Jr. Arcomayo 221', locality: 'Cajamarca', region: 'Cajamarca', address: 'Jr. Arcomayo 221, referencia posta La Tulpuna, Cajamarca', lat: -7.16, lon: -78.51 },
  { id: 'lima', city: 'Lima', street: 'Calle Los Zafiros 235, Balconcillo', locality: 'La Victoria', region: 'Lima', address: 'Calle Los Zafiros 235, Balconcillo, La Victoria, Lima', lat: -12.07, lon: -77.02 },
]

export type GalleryPhoto = { id: string; alt: string }

export const GALLERY: GalleryPhoto[] = [
  { id: 'nuevo15', alt: 'Técnico con traje de protección trabajando junto a un pozo séptico abierto' },
  { id: 'nuevo11', alt: 'Camión transportando baños químicos azules y rosados' },
  { id: 'nuevo6', alt: 'Tres trabajadores con equipos de protección y respiradores, de noche' },
  { id: 'imgport', alt: 'Equipo con uniforme y protección preparando insumos de desinfección' },
  { id: 'nuevo3', alt: 'Cisterna azul de Neotek con manguera desplegada en zona rural' },
  { id: 'nuevo16', alt: 'Técnico con casco colocando una trampa de roedores' },
  { id: 'nuevo8', alt: 'Baños químicos transportados en un remolque' },
  { id: 'monitoreos2', alt: 'Equipo de ingenieros durante un monitoreo ambiental en campo' },
  { id: 'nuevo14', alt: 'Técnico fumigando en el ingreso de un concesionario automotriz' },
  { id: 'img7', alt: 'Trabajadores limpiando un pozo con manguera y camión cisterna' },
  { id: 'nuevo13', alt: 'Camión cisterna de agua maniobrando bajo un cielo despejado' },
  { id: 'img9', alt: 'Técnico fumigando entre estanterías de un almacén de calzado' },
  { id: 'nuevo7', alt: 'Representante de Neotek con chaleco frente a maquinaria pesada amarilla' },
  { id: 'nuevo2', alt: 'Cisterna roja de agua potable regando una vía pública' },
  { id: 'img5', alt: 'Baño químico azul instalado sobre una camioneta en zona de obra' },
  { id: 'nuevo10', alt: 'Equipo trabajando de noche con mangueras en el ingreso de un centro comercial' },
  { id: 'img10', alt: 'Técnico aplicando tratamiento en una oficina comercial' },
  { id: 'nuevo17', alt: 'Camión de carga en un patio techado' },
  { id: 'nuevo4', alt: 'Técnico realizando una termonebulización en el exterior de un local' },
  { id: 'img3', alt: 'Dos representantes intercambiando documentos junto a una camioneta' },
  { id: 'nuevo1', alt: 'Camioneta blanca frente a una planta industrial' },
  { id: 'img12', alt: 'Técnico trabajando entre sacos cubiertos en un almacén' },
  { id: 'nuevo5', alt: 'Técnico abriendo la tapa metálica de una cámara subterránea' },
  { id: 'img4', alt: 'Baño químico azul transportado en una camioneta tras una reja' },
  { id: 'nuevo12', alt: 'Tres extintores rojos con etiqueta de Neotek' },
  { id: 'img11', alt: 'Técnico aplicando tratamiento en una tienda de calzado' },
  { id: 'img8', alt: 'Técnicos trabajando en el exterior de un edificio industrial' },
  { id: 'nuevo9', alt: 'Técnico con traje blanco y manguera limpiando un pozo de noche' },
]
