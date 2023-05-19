export enum E_sort{
    'asc' = 'asc',
    'desc' = 'desc',
}

export interface I_filterData{
    search?:string,
    sort?:E_sort
}