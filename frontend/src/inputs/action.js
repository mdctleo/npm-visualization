export const SET_DATE = 'SET_DATE'
export const SET_SEARCH = 'SET_SERACH'
export const DELET_SEARCH = 'DELET_SEARCH'


export const setSearchDate = (start, end) => ({
    type: SET_DATE,
    start,
    end
})

export const setSearch = (packageName) => ({
    type: SET_SEARCH,
    packageName
})

export const deleteSearch = (packageName) => ({
    type: DELET_SEARCH,
    packageName
})