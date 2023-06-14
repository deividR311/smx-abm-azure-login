/**
 *
 *
 * @export
 * @enum {number}
 */
export enum NamesServices {
    atendedor = 'api/v1/',
    Home = 'Home',
    ee_ss = 'ee_ss/',
    users = 'users/',
    users_rol = 'users_rol/',
    getAttendantseess = 'getAttendantseess/',
    getAttendantscount = 'getAttendantscount/',
    saveAttendant = 'atendedor/create',
    updateAttendant = 'atendedor/update/',
    usersUnassociated = 'getUsersUnassociated',
    getAdminUsers = 'getAdminUsers',
    saveUser = 'create',
    setRol = 'setRolService'
}

export enum KeysLocalStorage {
    Login = '*********/0*',
    session = '',
    msalToken = 'msal-token'
}

export enum ValidationsModal {
    Save = 'creación',
    Update = 'actualización',
}


export enum IconsFolderAssest {
    routeIcons = 'assets/template/icons/',
    LogoEsmax = 'logo-esmax',
    Setting = 'arrow-down'

}

export enum ResponseApi {
    Succes = 'Success'
}


export enum MessagesResponse {
    saveAttendant = 'El usuario atendedor  ',
    error = 'Ocurrió un error.',
    save = '   ha sido creado con éxito.',
    updateAttendant = 'El usuario   ',
    update = ' ha sido editado con éxito. ',
    active = ' ha sido activado con éxito. ',
    disabled = ' ha sido desactivado con éxito. '

}

