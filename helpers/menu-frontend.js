const getMenuFrontend = (role = 'USER_ROLE') => {
    const menu =   [
        {
          title : 'Dashboard',
          subtitles : [
            {path : '/',subMenu : 'Dashboard'},
            {path : 'account-settings', subMenu : 'Account-Settings'},
            {path : 'graficas',subMenu : 'Graficas'},
            {path : 'progress',subMenu : 'Progress'}
          ]
        },
        {
          title : 'Mantenimiento',
          subtitles : [
           /*  {path : 'usuarios',subMenu : 'Usuarios'}, */
            {path : 'medicos', subMenu : 'Medicos'},
            {path : 'hospitales',subMenu : 'Hospitales'}
          ]
        }
      ]

    if(role === 'ADMIN_ROLE'){
        menu[1].subtitles.unshift({titulo : 'Usuarios', url : 'usuarios'})
    }

    return menu     
}

module.exports = {
    getMenuFrontend
}