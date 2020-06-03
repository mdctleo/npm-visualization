import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectDependency = state => state.dependency || initialState

const selectDependencyData = createSelector(
    selectDependency,
    dependency => dependency.data
)

const selectDependencyLoading = createSelector(
    selectDependency,
    dependency => dependency.dependencyLoading
)

const selectDependencyError = createSelector(
    selectDependency,
    dependency => dependency.dependencyError
)

export {selectDependency, selectDependencyData, selectDependencyLoading, selectDependencyError}