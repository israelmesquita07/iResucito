import badges from './badges';

var search = [
  {
    title: 'Alfabético',
    note: 'Todos los salmos en orden alfabético',
    route: 'SalmoList',
    params: {},
    badge: badges.Alfabético
  },
  {
    title: 'Etapa del Camino',
    divider: true
  },
  {
    title: 'Precatecumenado',
    note: 'Los salmos para la etapa del Precatecumenado',
    route: 'SalmoList',
    params: { filter: { etapa: 'Precatecumenado' } },
    badge: badges.Precatecumenado
  },
  {
    title: 'Catecumenado',
    note: 'Los salmos para la etapa del Catecumenado',
    route: 'SalmoList',
    params: { filter: { etapa: 'Catecumenado' } },
    badge: badges.Catecumenado
  },
  {
    title: 'Elección',
    note: 'Los salmos para la etapa de la Elección',
    route: 'SalmoList',
    params: { filter: { etapa: 'Eleccion' } },
    badge: badges.Eleccion
  },
  {
    title: 'Liturgia',
    note: 'Los salmos para las celebraciones litúrgicas',
    route: 'SalmoList',
    params: { filter: { etapa: 'Liturgia' } },
    badge: badges.Liturgia
  },
  {
    title: 'Tiempo litúrgico',
    divider: true
  },
  {
    title: 'Adviento',
    note: 'Los salmos para tiempo de Adviento',
    route: 'SalmoList',
    params: { filter: { adviento: true } },
    badge: null
  },
  {
    title: 'Navidad',
    note: 'Los salmos para tiempo de Navidad',
    route: 'SalmoList',
    params: { filter: { navidad: true } },
    badge: null
  },
  {
    title: 'Cuaresma',
    note: 'Los salmos para tiempo de Cuaresma',
    route: 'SalmoList',
    params: { filter: { cuaresma: true } },
    badge: null
  },
  {
    title: 'Pascua',
    note: 'Los salmos para tiempo de Pascua',
    route: 'SalmoList',
    params: { filter: { pascua: true } },
    badge: null
  },
  {
    title: 'Pentecostés',
    note: 'Los salmos para tiempo de Pentecostés',
    route: 'SalmoList',
    params: { filter: { pentecostes: true } },
    badge: null
  },
  {
    title: 'Orden litúrgico',
    divider: true
  },
  {
    title: 'Entrada',
    note: 'Los salmos para inicio de las liturgias',
    route: 'SalmoList',
    params: { filter: { entrada: true } },
    badge: null
  },
  {
    title: 'Paz y Ofrendas',
    note: 'Los salmos para el saludo de la paz y las ofrendas',
    route: 'SalmoList',
    params: { filter: { paz: true } },
    badge: null
  },
  {
    title: 'Fracción del Pan',
    note: 'Los salmos para la fracción del pan',
    route: 'SalmoList',
    params: { filter: { fraccion: true } },
    badge: null
  },
  {
    title: 'Comunión',
    note: 'Los salmos para la comunión',
    route: 'SalmoList',
    params: { filter: { comunion: true } },
    badge: null
  },
  {
    title: 'Final',
    note: 'Los salmos para la salida de las liturgias',
    route: 'SalmoList',
    params: { filter: { final: true } },
    badge: null
  },
  {
    title: 'Cantos a la Virgen',
    note: 'Los salmos dedicados a la Virgen María',
    route: 'SalmoList',
    params: { filter: { virgen: true } },
    badge: null
  },
  {
    title: 'Cantos de los Niños',
    note: 'Los salmos para los niños',
    route: 'SalmoList',
    params: { filter: { niños: true } },
    badge: null
  },
  {
    title: 'Laúdes y Vísperas',
    note: 'Los salmos de Laúdes y Vísperas',
    route: 'SalmoList',
    params: { filter: { laudes: true } },
    badge: null
  }
];

search = search.map(item => {
  if (item.params) {
    item.params.title = item.title;
  }
  return item;
});

export default search;