export interface userData {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

export interface fetchData {
    page?: number,
    per_page?: number,
    total?: 12,
    totla_page?: 2,
    data?: userData[]
}

export interface fetchReturn {
    loading: boolean,
    data: fetchData
}