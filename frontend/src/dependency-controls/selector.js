import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectDependency = state => state.dependency || initialState

const selectDependencyData = createSelector(
    selectDependency,
    dependency => dependency.data
)

const selectisLoading = createSelector(
    selectDependency,
    dependency => dependency.isLoading
)

const selectisError = createSelector(
    selectDependency,
    dependency => dependency.isError
)

export {selectDependency, selectDependencyData, selectisLoading, selectisError}