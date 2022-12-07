// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'menu',
    title: 'Menú',
    type: 'group',
    children: [
        {
            id: 'formulario',
            title: 'Formulario de Usuarios',
            type: 'item',
            url: '/',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'datagrid',
            title: 'Listado de Usuarios',
            type: 'item',
            url: '/datagridmuestra',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
