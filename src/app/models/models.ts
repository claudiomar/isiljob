export class User{
    id_user:number;
    id_document:number;
    username:string;
    password:string;
    name:string;
    lastname:string;
    enabled:boolean;
    id_careers:number;
    roles:Roles[];
}

export class Roles{
    id_role:number;
    name_role:string;
}

export interface Area{
    id_area:number;
    desc_area:string;
}

export interface Folder{
    id_folder:number;
    desc_short:string;
    desc_long:string;
    language:string;
    id_user:number;
    id_career:number;
}

export interface Image{
    id_image:number;
    id_folder:number;
    url_image:string;
}

export interface Jobs{
    jobs:Job[];
}

export interface Job{
    id_job?:number;
    id_user?:number;
    desc_short?:string;
    desc_long?:string;
    id_area?:number;
    desc_area?:string;
    id_type?:number;
    desc_type?:string;
    id_region?:number;
    desc_region?:string;
    id_province?:number;
    desc_province?:string;
    id_district?:number;
    desc_district?:string;
    state?:boolean;
    users?:User[];
}

export interface IFolder{
    id?:string;
    name:string;
    description:string;
    frameworks:[];
    languages:[];
    images:string;
    freelance:boolean;
    uid:string;
}

export interface IProfile{
    id?:string;
    uid:string;
    perfil:string;
    contact?:IContact[];
    education?:IEducation[];

}

export interface IUser{
    id?:string;
    email:string;
    password:string;
    name:string;
    document:string;
    rsocial:string;
    ruc:string;
    type:number;
    img:string;
}

export interface IPublication{
    id?:string;
    name:string;
    description:string;
    requirements:string;
    benefits:string;
    type:string;
    uid:string;
    userName:string;
    userRSocial:string;
    userDocument:string;
    userRuc:string;
    imgUser:string;

}

/************* CV ***************/
export interface IContact{
    id?:string;
    telcelular:string;
    telfijo:string;
    email:string;
    calle:string;
    uid:string;
}

export interface IEducation{
    id?:string;
    tipoestudio:string;
    estado:string;
    titulo:string;
    area:string;
    institucion:string;
    uid:string;
}

export interface IExperience{
    id?:string;
    empresa:string;
    actividadempresa:string;
    puesto:string;
    nivelexperiencia:string;
    pais:string;
    areapuesto:string;
    descripcionresp:string;
    personascargo:string;
}

